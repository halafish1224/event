import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTrack } from './render-track.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'dist', 'unit-01');
const configPath = resolve(root, 'config', 'tts.json');
const exampleConfigPath = resolve(root, 'config', 'tts.example.json');

let config;
try {
  config = JSON.parse(readFileSync(configPath, 'utf8'));
} catch {
  config = JSON.parse(readFileSync(exampleConfigPath, 'utf8'));
}

const tracks = [
  ['L01', 'lesson-01.md'],
  ['L02', 'lesson-02.md'],
  ['L03', 'lesson-03.md'],
  ['L04', 'lesson-04.md'],
  ['L05', 'lesson-05.md'],
  ['UR1', 'unit-review-01.md'],
];

mkdirSync(outDir, { recursive: true });
const rendered = [];
for (const [id, file] of tracks) {
  rendered.push(renderTrack({
    input: resolve(root, 'tracks', file),
    outDir,
    id,
    config,
  }));
}

const playlist = {
  version: '1.0.0',
  unit: 1,
  title: 'Unit 1｜心與感知',
  generated_at: new Date().toISOString(),
  modes: ['full', 'recall'],
  tracks: rendered,
  notes: [
    'SSML contains configurable zh-TW and ja-JP voice names.',
    'Aurader TXT is a read-along/fallback export; exact retrieval silence is guaranteed only by SSML/audio rendering.',
    'No copyrighted full lyrics are included.',
  ],
};

writeFileSync(resolve(outDir, 'playlist.json'), JSON.stringify(playlist, null, 2) + '\n');
console.log(`Rendered ${rendered.length} Unit 1 tracks to ${outDir}`);
