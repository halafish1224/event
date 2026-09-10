import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rows,grammar,words,practice} from './content.mjs';
import {songs,concepts} from '../learning-map/content.mjs';
const html=readFileSync(new URL('index.html',import.meta.url),'utf8');
const lines=rows.split('\n').map(s=>s.split('|'));
assert.equal(lines.length,58);assert.equal(grammar.split('\n').length,29);
assert.equal(words.split('\n').length,48);assert.equal(practice.length,16);
assert.equal(songs.length,19);assert.equal(concepts.length,39);
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
assert.equal(catalog.length,19);assert.equal((cards.match(/data-song-id=/g)||[]).length,19);
for(const song of songs){assert(catalog.some(c=>c.id===song.id&&c.color===song.color));assert(cards.includes(`data-song-id="${song.id}"`));}
const own=concepts.filter(c=>c.refs.some(r=>r[0]==='harunohi'));assert.equal(own.length,20);
for(const c of own)for(const [,anchor] of c.refs.filter(r=>r[0]==='harunohi'))assert(ids.includes(anchor),anchor);
console.log('PASS: 58 annotated lines, 29 grammar groups, 48 words, 16 practices; local links, catalog parity, 20 map references, noindex and preserved source distinctions.');
