import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_CONFIG = {
  voices: { zh: '{{ZH_TW_VOICE}}', ja: '{{JA_JP_VOICE}}' },
  rates: { zh: '-3%', ja_support: '-12%', ja_natural: '0%', ja_retrieval: '0%' },
};

const RECALL_SECTION_RE = /(COLD\s+RETRIEVAL|RETRIEVAL|DELAYED\s+RECALL|EXIT\s+RECALL|PREDICTION|CONTRAST|QUIZ|REVIEW)/i;

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cleanMarkdown(value) {
  return String(value)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim();
}

function parsePause(tag) {
  const match = tag.match(/^PAUSE\s+([0-9.]+)s$/i);
  return match ? Math.round(Number(match[1]) * 1000) : null;
}

export function parseTrack(markdown) {
  const scriptStart = markdown.indexOf('# SCRIPT');
  const body = scriptStart >= 0 ? markdown.slice(scriptStart) : markdown;
  const lines = body.split(/\r?\n/);
  const segments = [];
  let section = 'SCRIPT';
  let voice = null;
  let style = null;
  let buffer = [];

  const flush = () => {
    const text = cleanMarkdown(buffer.join(' ')).replace(/\s+/g, ' ').trim();
    if (voice && text) {
      segments.push({
        type: 'speech',
        lang: voice === 'zh' ? 'zh-TW' : 'ja-JP',
        voice,
        style,
        section,
        text,
      });
    }
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (/^#\s+Metadata/i.test(line) || /^#\s+Review-only/i.test(line)) break;
    if (/^##\s+/.test(line)) {
      flush();
      section = line.replace(/^##\s+/, '');
      continue;
    }
    if (!line || line === '---' || line.startsWith('```')) continue;
    if (/^#\s+/.test(line)) continue;

    const tagMatch = line.match(/^\[([^\]]+)\]$/);
    if (tagMatch) {
      flush();
      const tag = tagMatch[1].trim();
      const pauseMs = parsePause(tag);
      if (pauseMs != null) {
        segments.push({ type: 'break', ms: pauseMs, section });
        continue;
      }
      if (tag === 'ZH') { voice = 'zh'; style = 'zh'; continue; }
      if (tag === 'JA_SUPPORT') { voice = 'ja'; style = 'ja_support'; continue; }
      if (tag === 'JA_NATURAL') { voice = 'ja'; style = 'ja_natural'; continue; }
      if (tag === 'JA_RETRIEVAL') { voice = 'ja'; style = 'ja_retrieval'; continue; }
      if (tag === 'END') break;
      // Semantic tags such as ANSWER / RECALL / CONTRAST preserve the current speaker.
      continue;
    }
    buffer.push(line);
  }
  flush();
  return segments;
}

function selectMode(segments, mode) {
  if (mode === 'full') return segments;
  if (mode === 'recall') {
    const filtered = segments.filter(seg => RECALL_SECTION_RE.test(seg.section || ''));
    return filtered.length ? filtered : segments;
  }
  throw new Error(`Unknown mode: ${mode}`);
}

function renderSsml(segments, config = DEFAULT_CONFIG) {
  const body = segments.map(seg => {
    if (seg.type === 'break') return `  <break time="${seg.ms}ms"/>`;
    const voiceName = seg.voice === 'ja' ? config.voices.ja : config.voices.zh;
    const rate = config.rates[seg.style] ?? '0%';
    return `  <voice name="${xmlEscape(voiceName)}"><prosody rate="${xmlEscape(rate)}">${xmlEscape(seg.text)}</prosody></voice>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-TW">\n${body}\n</speak>\n`;
}

function renderAuraderText(segments) {
  return segments
    .map(seg => seg.type === 'break' ? '\n\n' : seg.text)
    .join('\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim() + '\n';
}

export function renderTrack({ input, outDir, id, config = DEFAULT_CONFIG }) {
  const markdown = readFileSync(input, 'utf8');
  const parsed = parseTrack(markdown);
  mkdirSync(outDir, { recursive: true });
  const summary = { id, source: input, total_segments: parsed.length, outputs: {} };

  for (const mode of ['full', 'recall']) {
    const selected = selectMode(parsed, mode);
    const base = resolve(outDir, `${id.toLowerCase()}-${mode}`);
    writeFileSync(`${base}.segments.json`, JSON.stringify({ id, mode, segments: selected }, null, 2) + '\n');
    writeFileSync(`${base}.ssml`, renderSsml(selected, config));
    writeFileSync(`${base}.aurader.txt`, renderAuraderText(selected));
    summary.outputs[mode] = {
      segments: selected.length,
      speech_segments: selected.filter(x => x.type === 'speech').length,
      break_segments: selected.filter(x => x.type === 'break').length,
      files: [
        `${basename(base)}.segments.json`,
        `${basename(base)}.ssml`,
        `${basename(base)}.aurader.txt`,
      ],
    };
  }
  return summary;
}

function loadConfig(path) {
  if (!path) return DEFAULT_CONFIG;
  const user = JSON.parse(readFileSync(path, 'utf8'));
  return {
    voices: { ...DEFAULT_CONFIG.voices, ...(user.voices || {}) },
    rates: { ...DEFAULT_CONFIG.rates, ...(user.rates || {}) },
  };
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isCli) {
  const [input, outDir, id, configPath] = process.argv.slice(2);
  if (!input || !outDir || !id) {
    console.error('Usage: node render-track.mjs <input.md> <out-dir> <track-id> [tts-config.json]');
    process.exit(2);
  }
  const result = renderTrack({
    input: resolve(input),
    outDir: resolve(outDir),
    id,
    config: loadConfig(configPath ? resolve(configPath) : null),
  });
  console.log(JSON.stringify(result, null, 2));
}
