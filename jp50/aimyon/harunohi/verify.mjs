import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rows,grammar,words,practice} from './content.mjs';
import {songs,concepts} from '../learning-map/content.mjs';
const html=readFileSync(new URL('index.html',import.meta.url),'utf8');
const lines=rows.split('\n').map(s=>s.split('|'));
assert.equal(lines.length,58);assert.equal(grammar.split('\n').length,29);
assert.equal(words.split('\n').length,48);assert.equal(practice.length,16);
assert.equal(concepts.length,43);
for(const [jp] of lines)assert(!/[\p{Script=Han}々]/u.test(jp.replace(/[\p{Script=Han}々ヶ]+\{[^{}]+\}/gu,'')),'Missing reading: '+jp);
assert.equal(lines[30][0],'優{やさ}しさに甘{あま}すぎて');
assert(lines[0][0].endsWith('プラットホーム'));
assert(lines[54][0].endsWith('プラットフォーム'));
assert(lines[53][0].endsWith('いこう？'));
assert(!/[{}]/.test(html),'Unconverted notation');
const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size);
assert.equal((html.match(/class="line"/g)||[]).length,58);
assert(html.includes('noindex,nofollow,noarchive,nosnippet'));
for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 if(/^https?:/.test(href))continue;
 const url=new URL(href,new URL('index.html',import.meta.url));const hash=url.hash.slice(1);url.hash='';url.search='';
 if(url.pathname.endsWith('/'))url.pathname+='index.html';
 const target=readFileSync(url,'utf8');if(hash)assert(target.includes(`id="${hash}"`),href);
}
for(const [,jp] of html.matchAll(/<(?:h3|p) lang="ja">([\s\S]*?)<\/(?:h3|p)>/g)){
 assert(!/[\p{Script=Han}々]/u.test(jp.replace(/<ruby>[\s\S]*?<\/ruby>/g,'')),'Example missing reading');
}
const catalog=JSON.parse(readFileSync(new URL('../songs/data.json',import.meta.url),'utf8'));
const cards=readFileSync(new URL('../songs/index.html',import.meta.url),'utf8');
assert.equal(catalog.length,songs.length);assert.equal((cards.match(/data-song-id=/g)||[]).length,songs.length);
for(const song of songs){assert(catalog.some(c=>c.id===song.id&&c.color===song.color));assert(cards.includes(`data-song-id="${song.id}"`));}
const own=concepts.filter(c=>c.refs.some(r=>r[0]==='harunohi'));assert.equal(own.length,21);
for(const c of own)for(const [,anchor] of c.refs.filter(r=>r[0]==='harunohi'))assert(ids.includes(anchor),anchor);

// Full Song Learning Coverage manifest must stay in lockstep with the audited source data.
const coverage=JSON.parse(readFileSync(new URL('coverage.json',import.meta.url),'utf8'));
assert.equal(coverage.song_id,'harunohi');
assert.equal(coverage.source_of_truth,'content.mjs');
assert.equal(coverage.content_schema_version,'unchanged');
assert.equal(coverage.coverage.structure.source_rows,lines.length);
assert.equal(coverage.coverage.structure.stable_sentence_ids,lines.length);
assert.equal(coverage.coverage.sentence_analysis.covered,lines.length);
assert.equal(coverage.coverage.sentence_analysis.total,lines.length);
assert.equal(coverage.coverage.grammar.items,grammar.split('\n').length);
assert.equal(coverage.coverage.vocabulary.items,words.split('\n').length);
assert.equal(coverage.coverage.retrieval_practice.items,practice.length);
assert.equal(coverage.coverage.cross_song_links.status,'partial');
assert.equal(coverage.sentence_ids.length,lines.length);
assert.equal(new Set(coverage.sentence_ids).size,coverage.sentence_ids.length);
coverage.sentence_ids.forEach((id,i)=>assert.equal(id,`harunohi-s${String(i+1).padStart(3,'0')}`));

console.log('PASS: 58 annotated lines, 29 grammar groups, 48 words, 16 practices; coverage manifest, local links, catalog parity, 21 map references, noindex and preserved source distinctions.');
