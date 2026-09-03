import { deflateRawSync } from 'node:zlib';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'content');
const destination = path.join(root, 'exports', 'AIMYON-Japanese-教材完整版.epub');
const read = (name) => JSON.parse(readFileSync(path.join(source, name), 'utf8'));
const content = {
  lessons: read('lessons.json'),
  vocabulary: [...read('vocabulary.json'), ...read('vocabulary.core.json')],
  grammar: [...read('grammar.json'), ...read('grammar.core.json')],
  contrasts: [...read('contrasts.json'), ...read('contrasts.core.json')],
  examples: read('examples.json'),
  songs: read('songs.json'),
  questions: [...read('questions.seed.json'), ...read('questions.core.json')],
};
const maps = Object.fromEntries(
  Object.entries(content).map(([name, entries]) => [
    name,
    new Map(entries.map((entry) => [entry.id, entry])),
  ]),
);

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function items(values) {
  return values?.length
    ? `<ul>${values.map((value) => `<li>${esc(value)}</li>`).join('')}</ul>`
    : '';
}

function block(title, body) {
  return body ? `<section><h3>${esc(title)}</h3>${body}</section>` : '';
}

function byIds(ids, map) {
  return ids.flatMap((id) => (map.has(id) ? [map.get(id)] : []));
}

function vocabulary(entry) {
  const forms = Object.entries(entry.forms ?? {})
    .map(([name, value]) => `<li><strong>${esc(name)}</strong>：${esc(value)}</li>`)
    .join('');
  return `<article class="entry" id="${esc(entry.id)}"><h3 class="jp">${esc(entry.surface)}</h3><p class="reading">${esc(entry.reading_hiragana)}｜${esc(entry.romaji)}</p><p><strong>核心意思：</strong>${esc(entry.meanings.core.join('；'))}</p>${block('延伸意思', items(entry.meanings.extended))}${block('使用提示', items(entry.usage_notes))}${block('搭配與助詞', items([...(entry.collocations ?? []), ...(entry.particles ?? [])]))}${forms ? block('活用', `<ul>${forms}</ul>`) : ''}${block('自然度與記憶提示', items([...(entry.naturalness_notes ?? []), ...(entry.mnemonics ?? [])]))}</article>`;
}

function grammar(entry) {
  return `<article class="entry" id="${esc(entry.id)}"><h3>${esc(entry.title)}</h3><p class="pattern">${esc(entry.surface_pattern)}</p><p><strong>核心意思：</strong>${esc(entry.meaning_core)}</p>${block('延伸意思', items(entry.meaning_extended))}${block('形成規則', items(entry.formation_rules))}${block('使用提示', items(entry.usage_notes))}<p class="meta">程度：${esc(entry.level)}｜類別：${esc(entry.category)}｜語體：${esc(entry.register)}</p></article>`;
}

function contrast(entry) {
  const rules = entry.decision_rules
    .map((rule) => `<li><strong>${esc(rule.when)}</strong> → ${esc(rule.choose)}：${esc(rule.because)}</li>`)
    .join('');
  const pairs = entry.minimal_pairs
    .map((pair) => `<li><strong>${esc(pair.context)}</strong><br/><span class="jp">${esc(pair.left)}</span>／<span class="jp">${esc(pair.right)}</span><br/>${esc(pair.explanation)}</li>`)
    .join('');
  const corrections = entry.wrong_choice_examples
    .map((example) => `<li>${esc(example.prompt)}<br/><span class="wrong">× ${esc(example.wrong)}</span><br/><span class="correct">○ ${esc(example.correction)}</span><br/>${esc(example.reason)}</li>`)
    .join('');
  return `<article class="entry" id="${esc(entry.id)}"><h3>${esc(entry.title)}</h3><p><strong>核心問題：</strong>${esc(entry.core_question)}</p>${block('判斷規則', `<ul>${rules}</ul>`)}${block('最小對比', `<ul>${pairs}</ul>`)}${block('常見錯誤', items(entry.common_errors))}${block('錯誤修正', `<ul>${corrections}</ul>`)}<p><strong>記憶鉤子：</strong>${esc(entry.memory_hook)}</p></article>`;
}

function example(entry) {
  return `<blockquote class="example" id="${esc(entry.id)}"><p class="jp">${esc(entry.japanese)}</p><p class="reading">${esc(entry.reading)}</p><p>${esc(entry.translation_zh_tw)}</p></blockquote>`;
}

function lesson(entry) {
  const vocab = byIds(entry.vocabulary_ids, maps.vocabulary);
  const grammarItems = byIds(entry.grammar_ids, maps.grammar);
  const contrasts = byIds(entry.contrast_ids, maps.contrasts);
  const examples = byIds(entry.example_sentence_ids, maps.examples);
  const songs = byIds(entry.song_ids, maps.songs);
  return `<article class="lesson" id="${esc(entry.id)}"><h2>Lesson ${String(entry.order).padStart(2, '0')}｜${esc(entry.title)}</h2><p class="objective"><strong>學習目標：</strong>${esc(entry.objective)}</p><p><strong>核心概念：</strong>${esc(entry.core_concept)}</p>${block('核心詞彙', vocab.map(vocabulary).join(''))}${block('文法', grammarItems.map(grammar).join(''))}${block('語意對比', contrasts.map(contrast).join(''))}${block('原創例句', examples.map(example).join(''))}${block('歌曲語意線索', songs.map((song) => `<p><strong>${esc(song.title_ja)}（${esc(song.title_zh_tw)}）</strong><br/>${esc(song.listening_missions.join('；'))}</p>`).join(''))}<section class="practice"><h3>提取與產出</h3><p><strong>回想：</strong>${esc(entry.retrieval_prompt)}</p><p><strong>造句：</strong>${esc(entry.generation_prompt)}</p></section></article>`;
}

function question(entry, number) {
  const options = entry.options.length
    ? `<ol>${entry.options.map((option) => `<li>${esc(option)}</li>`).join('')}</ol>`
    : '';
  return `<article class="entry"><h3>練習 ${String(number).padStart(2, '0')}</h3><p>${esc(entry.prompt)}</p>${options}<p><strong>提示 1：</strong>${esc(entry.hint_1)}</p><p><strong>提示 2：</strong>${esc(entry.hint_2)}</p><p><strong>參考答案：</strong>${esc(entry.accepted_answers.join('／'))}</p><p><strong>說明：</strong>${esc(entry.explanation)}</p></article>`;
}

const units = [...new Map(content.lessons.map((lessonEntry) => [lessonEntry.unit_id, lessonEntry])).values()].map((first) => ({
  id: first.unit_id,
  title: first.unit_title,
  lessons: content.lessons.filter((lessonEntry) => lessonEntry.unit_id === first.unit_id),
}));
if (content.lessons.length !== 30 || units.length !== 6) throw new Error('教材章節資料不完整。');

const chapters = [
  { id: 'title', href: 'title.xhtml', title: 'AIMYON Japanese｜教材完整版', body: '<section class="title-page"><p class="eyebrow">AIMYON JAPANESE</p><h1>教材完整版</h1><p>以語境、對比與原創例句，學會真正能說的日文。</p><p class="meta">30 課｜80 詞彙｜17 組文法｜20 組對比｜5 首歌曲語意任務｜31 題練習</p><p class="copyright">本書使用原創教學句，不收錄完整或大段歌詞。</p></section>' },
  ...units.map((unit, index) => ({ id: unit.id, href: `unit-${String(index + 1).padStart(2, '0')}.xhtml`, title: `單元 ${index + 1}｜${unit.title}`, body: `<h1>單元 ${index + 1}｜${esc(unit.title)}</h1>${unit.lessons.map(lesson).join('')}` })),
  { id: 'vocabulary', href: 'vocabulary.xhtml', title: '附錄一｜核心詞彙', body: `<h1>附錄一｜核心詞彙</h1>${content.vocabulary.map(vocabulary).join('')}` },
  { id: 'grammar', href: 'grammar.xhtml', title: '附錄二｜文法網絡', body: `<h1>附錄二｜文法網絡</h1>${content.grammar.map(grammar).join('')}` },
  { id: 'contrasts', href: 'contrasts.xhtml', title: '附錄三｜語意對比', body: `<h1>附錄三｜語意對比</h1>${content.contrasts.map(contrast).join('')}` },
  { id: 'songs', href: 'songs.xhtml', title: '附錄四｜歌曲語意線索', body: `<h1>附錄四｜歌曲語意線索</h1>${content.songs.map((song) => `<article class="entry"><h2 class="jp">${esc(song.title_ja)}</h2><p>${esc(song.title_zh_tw)}｜${esc(song.artist)}</p><p>${esc(song.metadata.copyright_note)}</p>${block('聆聽任務', items(song.listening_missions))}</article>`).join('')}` },
  { id: 'questions', href: 'questions.xhtml', title: '附錄五｜教材練習', body: `<h1>附錄五｜教材練習</h1>${content.questions.map((entry, index) => question(entry, index + 1)).join('')}` },
];

const css = ['body{color:#1f3127;font-family:"Noto Serif TC","Noto Serif JP","Yu Mincho",serif;line-height:1.8;margin:5%;}', 'h1,h2,h3{color:#254d38;font-family:"Noto Sans TC","Noto Sans JP",sans-serif;line-height:1.35;}', 'h1{font-size:1.8em;margin:1.8em 0 1em;page-break-before:always;}h2{font-size:1.4em;margin:2em 0 .8em;}h3{font-size:1.1em;margin:1.4em 0 .5em;}ul,ol{padding-left:1.4em;}li{margin-bottom:.45em;}', '.lesson{page-break-before:always;}.lesson:first-of-type{page-break-before:auto;}.entry{border-top:1px solid #c8c2b4;margin:1.6em 0;padding-top:.8em;page-break-inside:avoid;}', '.jp{font-family:"Noto Serif JP","Yu Mincho",serif;}.reading,.meta{color:#56675d;font-size:.9em;}.pattern{background:#edf1e9;border-left:.25em solid #789477;padding:.5em .75em;}', '.objective,.practice{background:#f2ecd8;padding:.8em 1em;}.practice{border-left:.25em solid #a58131;margin-top:1.5em;}.example{background:#f7f5ef;border-left:.25em solid #6b8d80;margin:1em 0;padding:.7em 1em;}.wrong{color:#8a332d;}.correct{color:#24613e;}', '.title-page{margin-top:28%;text-align:center;}.title-page h1{font-size:2.2em;page-break-before:auto;}.eyebrow{color:#567560;font-family:sans-serif;font-size:.8em;font-weight:bold;letter-spacing:.12em;}.copyright{color:#56675d;font-size:.85em;margin-top:3em;}'].join('\n');
const navItems = chapters.filter((chapter) => chapter.id !== 'title').map((chapter) => `<li><a href="${chapter.href}">${esc(chapter.title)}</a></li>`).join('');
const nav = `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"/><title>目錄</title><link rel="stylesheet" type="text/css" href="styles/book.css"/></head><body><nav epub:type="toc" id="toc" xmlns:epub="http://www.idpf.org/2007/ops"><h1>目錄</h1><ol>${navItems}</ol></nav></body></html>`;
const xhtml = (title, body) => `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-Hant" lang="zh-Hant"><head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="styles/book.css"/></head><body>${body}</body></html>`;
const manifest = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>', '<item id="css" href="styles/book.css" media-type="text/css"/>', ...chapters.map((chapter) => `<item id="${chapter.id}" href="${chapter.href}" media-type="application/xhtml+xml"/>`)].join('');
const spine = chapters.map((chapter) => `<itemref idref="${chapter.id}"/>`).join('');
const modified = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const opf = `<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="zh-Hant"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">urn:uuid:fbac8183-8a2d-4f36-9ac2-8a4c11d99010</dc:identifier><dc:title>AIMYON Japanese｜教材完整版</dc:title><dc:language>zh-Hant</dc:language><dc:language>ja</dc:language><dc:creator>AIMYON Japanese Learning Project</dc:creator><dc:description>以語境、對比與原創例句學習日文的完整教材。</dc:description><meta property="dcterms:modified">${modified}</meta></metadata><manifest>${manifest}</manifest><spine>${spine}</spine></package>`;

const table = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(buffer) {
  let value = 0xffffffff;
  for (const byte of buffer) value = table[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}
function zip(entries) {
  const local = [], central = [];
  const now = new Date(), time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1), date = ((Math.max(now.getFullYear(), 1980) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  let offset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name), data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data), packed = entry.store ? data : deflateRawSync(data), method = entry.store ? 0 : 8, crc = crc32(data);
    const header = Buffer.alloc(30); header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x800, 6); header.writeUInt16LE(method, 8); header.writeUInt16LE(time, 10); header.writeUInt16LE(date, 12); header.writeUInt32LE(crc, 14); header.writeUInt32LE(packed.length, 18); header.writeUInt32LE(data.length, 22); header.writeUInt16LE(name.length, 26); local.push(header, name, packed);
    const directory = Buffer.alloc(46); directory.writeUInt32LE(0x02014b50, 0); directory.writeUInt16LE(20, 4); directory.writeUInt16LE(20, 6); directory.writeUInt16LE(0x800, 8); directory.writeUInt16LE(method, 10); directory.writeUInt16LE(time, 12); directory.writeUInt16LE(date, 14); directory.writeUInt32LE(crc, 16); directory.writeUInt32LE(packed.length, 20); directory.writeUInt32LE(data.length, 24); directory.writeUInt16LE(name.length, 28); directory.writeUInt32LE(offset, 42); central.push(directory, name); offset += header.length + name.length + packed.length;
  }
  const directory = Buffer.concat(central), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, directory, end]);
}

const files = [
  { name: 'mimetype', data: 'application/epub+zip', store: true },
  { name: 'META-INF/container.xml', data: '<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>' },
  { name: 'OEBPS/package.opf', data: opf },
  { name: 'OEBPS/nav.xhtml', data: nav },
  { name: 'OEBPS/styles/book.css', data: css },
  ...chapters.map((chapter) => ({ name: `OEBPS/${chapter.href}`, data: xhtml(chapter.title, chapter.body) })),
];
mkdirSync(path.dirname(destination), { recursive: true });
rmSync(destination, { force: true });
writeFileSync(destination, zip(files));
console.log(`EPUB ready: ${destination}`);
console.log(`Chapters: ${chapters.length}; Lessons: ${content.lessons.length}; Vocabulary: ${content.vocabulary.length}; Grammar: ${content.grammar.length}; Contrasts: ${content.contrasts.length}; Songs: ${content.songs.length}; Questions: ${content.questions.length}`);
