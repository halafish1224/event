import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const epub = fileURLToPath(new URL('harunohi-jp50-kobo.epub', import.meta.url));
const work = mkdtempSync(join(tmpdir(), 'harunohi-verify-'));
const list = execFileSync('unzip', ['-Z1', epub], { encoding: 'utf8' }).trim().split('\n');
const detail = execFileSync('zipinfo', ['-v', epub], { encoding: 'utf8' });
assert.equal(list[0], 'mimetype');
assert.match(detail, /mimetype[\s\S]*?compression method:\s+none \(stored\)/);
for (const required of ['META-INF/container.xml', 'EPUB/package.opf', 'EPUB/nav.xhtml', 'EPUB/styles.css']) assert(list.includes(required), required);
execFileSync('unzip', ['-qq', epub, '-d', work]);

const xmlFiles = list.filter((path) => /\.(?:xml|opf|xhtml)$/.test(path)).map((path) => join(work, path));
execFileSync('python3', ['-c', 'import sys, xml.etree.ElementTree as ET\nfor p in sys.argv[1:]: ET.parse(p)', ...xmlFiles]);

const opf = readFileSync(join(work, 'EPUB/package.opf'), 'utf8');
const manifest = [...opf.matchAll(/<item\s+[^>]*href="([^"]+)"[^>]*\/>/g)].map((match) => match[1]);
for (const href of manifest) assert(list.includes(`EPUB/${href}`), `Missing manifest item: ${href}`);
const spineIds = [...opf.matchAll(/<itemref\s+idref="([^"]+)"\s*\/>/g)].map((match) => match[1]);
const manifestIds = new Set([...opf.matchAll(/<item\s+id="([^"]+)"/g)].map((match) => match[1]));
for (const id of spineIds) assert(manifestIds.has(id), `Missing spine manifest id: ${id}`);

const documents = new Map();
for (const file of list.filter((path) => path.endsWith('.xhtml'))) documents.set(file.replace('EPUB/', ''), readFileSync(join(work, file), 'utf8'));
for (const [file, text] of documents) {
  const ids = [...text.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `Duplicate ID in ${file}`);
  for (const match of text.matchAll(/href="([^"#]+)?(?:#([^"]+))?"/g)) {
    const targetFile = match[1] || file;
    if (/^[a-z]+:/i.test(targetFile)) continue;
    if (targetFile.endsWith('.css')) {
      assert(list.includes(`EPUB/${targetFile}`), `Broken stylesheet link ${file} -> ${targetFile}`);
      continue;
    }
    assert(documents.has(targetFile), `Broken document link ${file} -> ${targetFile}`);
    if (match[2]) assert(documents.get(targetFile).includes(`id="${match[2]}"`), `Broken fragment ${targetFile}#${match[2]}`);
  }
}

const sentenceText = documents.get('sentences.xhtml');
assert.equal((sentenceText.match(/id="harunohi-s\d{3}"/g) || []).length, 58);
assert(!sentenceText.includes('北千住駅{'));
assert(!sentenceText.includes('僕らは何も見えない'));
assert(![...documents.values()].join('\n').includes('<script'));
assert(![...documents.values()].join('\n').match(/(?:href|src)="https?:\/\//));
rmSync(work, { recursive: true, force: true });
console.log(`PASS: EPUB ZIP, OPF, nav, spine, XML/XHTML, links, 58 stable IDs, offline/no-script and copyright boundary verified. EPUBCheck not installed; not run.`);
