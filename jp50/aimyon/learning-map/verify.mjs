import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {resolve, extname, join, sep} from 'node:path';
import {tmpdir} from 'node:os';
import {createRequire} from 'node:module';
import {songs,routes,concepts} from './content.mjs';
const root=resolve(fileURLToPath(new URL('../../../',import.meta.url)));
const html=readFileSync(new URL('index.html',import.meta.url),'utf8');
assert.equal(songs.length,12);assert.equal(routes.length,6);assert.equal(concepts.length,30);
const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
assert(!/[{}]/.test(html),'Unconverted reading notation');
for(const m of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),m[1]);
for(const s of songs)assert(concepts.some(c=>c.refs.some(r=>r[0]===s.id)),s.id);
console.log('PASS: counts, unique IDs, internal links, readings, all songs covered.');
// Audit the new song and its links, including query-string map entry points.
for(const slug of ['hikarimono','sketch','hadaka-no-kokoro']){
const newSongURL=new URL(`../${slug}/index.html`,import.meta.url);
const newSong=readFileSync(newSongURL,'utf8');
const songIds=[...newSong.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(songIds.length,new Set(songIds).size);
for(const [,href] of newSong.matchAll(/(?:href|src)="([^"]+)"/g)){
 if(/^(https?:)/.test(href))continue;
 const target=new URL(href,newSongURL), hash=target.hash.slice(1);target.hash='';target.search='';
 if(target.pathname.endsWith('/'))target.pathname+='index.html';
 const content=readFileSync(target,'utf8');if(hash)assert(content.includes(`id="${hash}"`),href);
}
for(const [,jp] of newSong.matchAll(/<p lang="ja">([\s\S]*?)<\/p>/g))assert(!/[\p{Script=Han}々]/u.test(jp.replace(/<ruby>[\s\S]*?<\/ruby>/g,'')),'Example reading');
}
const catalog=JSON.parse(readFileSync(new URL('../songs/data.json',import.meta.url),'utf8'));
assert.equal(catalog.length,songs.length);for(const s of songs){assert(catalog.some(c=>c.id===s.id&&c.color===s.color),s.id);}
console.log('PASS: new song IDs, all local assets/deep links, example readings, catalog/map color parity.');
if(!process.argv.includes('--browser'))process.exit(0);
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const server=createServer((req,res)=>{try{let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403).end();return;}if(path.endsWith(sep)||!extname(path))path=join(path,'index.html');if(!existsSync(path)){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript'})[extname(path)]||'application/octet-stream');res.end(readFileSync(path));}catch{res.writeHead(500).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 const page=await browser.newPage({viewport:{width:360,height:800}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const url=`http://127.0.0.1:${server.address().port}/jp50/aimyon/learning-map/`;
 const songPage=await browser.newPage({viewport:{width:360,height:800}});
 songPage.on('pageerror',e=>errors.push(e.message));
 await songPage.goto(url.replace('learning-map/','songs/'));
 await songPage.waitForSelector('[data-song-id="hadaka-no-kokoro"]');
 assert.equal(await songPage.locator('[data-song-id]').count(),12);
 assert((await songPage.locator('.learning-map-entry').textContent()).includes('30 個概念'));
 assert.equal(await songPage.locator('[data-song-id="hadaka-no-kokoro"]').getAttribute('href'),'https://event.itigre.com/jp50/aimyon/hadaka-no-kokoro/');
 await songPage.goto(url.replace('learning-map/','hadaka-no-kokoro/'));
 assert.equal(await songPage.locator('.phrase').count(),35);
 assert.equal(await songPage.locator('.word').count(),45);
 for(const width of [320,360,390,768,1024]){await songPage.setViewportSize({width,height:900});assert(await songPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`hadaka overflow ${width}`);}
 await songPage.setViewportSize({width:360,height:800});await songPage.screenshot({path:join(tmpdir(),'aimyon-hadaka-mobile.png')});
 await songPage.locator('#word-search').fill('かかえる');assert.equal(await songPage.locator('.word:visible').count(),1);
 await songPage.locator('#reading-toggle').click();assert(await songPage.locator('body').evaluate(e=>e.classList.contains('hide-reading')));
 await songPage.locator('#translation-toggle').click();assert.equal(await songPage.locator('.translation:visible').count(),0);
 await songPage.goto(url+'?song=hadaka-no-kokoro#routes');await songPage.waitForSelector('.enhanced');assert.equal(await songPage.locator('.concept:visible').count(),8);
 console.log('PASS: 12 catalog cards, new URL, 30-concept entry, hadaka mobile/search/controls/map.');
 await songPage.goto(url.replace('learning-map/','sketch/'));
 assert.equal(await songPage.locator('.phrase').count(),42);
 assert.equal(await songPage.locator('.word').count(),71);
 for(const width of [320,360,390,768,1024]){await songPage.setViewportSize({width,height:900});assert(await songPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`sketch overflow ${width}`);}
 await songPage.setViewportSize({width:360,height:800});
 await songPage.screenshot({path:join(tmpdir(),'aimyon-sketch-mobile.png')});
 await songPage.locator('#word-search').fill('えがく');assert.equal(await songPage.locator('.word:visible').count(),1);
 await songPage.locator('#word-search').fill('not-found');assert.equal(await songPage.locator('.word:visible').count(),0);
 await songPage.evaluate(()=>location.hash='w-1');await songPage.waitForFunction(()=>!document.getElementById('w-1').hidden);
 await songPage.locator('#reading-toggle').click();assert(await songPage.locator('body').evaluate(e=>e.classList.contains('hide-reading')));
 await songPage.locator('#translation-toggle').click();assert.equal(await songPage.locator('.translation:visible').count(),0);
 await songPage.goto(url+'?song=sketch#routes');await songPage.waitForSelector('.enhanced');assert.equal(await songPage.locator('#song-filter').inputValue(),'sketch');assert.equal(await songPage.locator('.concept:visible').count(),8);
 console.log('PASS: sketch widths, 42 lines, kana search, hidden word jump, controls and map entry.');
 await songPage.goto(url.replace('learning-map/','hikarimono/'));
 assert.equal(await songPage.locator('.phrase').count(),30);
 assert.equal(await songPage.locator('.word').count(),64);
 for(const width of [320,360,390,768,1024]){await songPage.setViewportSize({width,height:900});assert(await songPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`song overflow ${width}`);}
 await songPage.setViewportSize({width:360,height:800});
 await songPage.screenshot({path:join(tmpdir(),'aimyon-hikarimono-mobile.png')});
 await songPage.locator('#word-search').fill('なぐさめる');assert.equal(await songPage.locator('.word:visible').count(),1);
 await songPage.locator('#word-search').fill('not-found');assert.equal(await songPage.locator('.word:visible').count(),0);
 await songPage.evaluate(()=>location.hash='w-1');await songPage.waitForFunction(()=>!document.getElementById('w-1').hidden);
 await songPage.locator('#reading-toggle').click();assert(await songPage.locator('body').evaluate(e=>e.classList.contains('hide-reading')));
 await songPage.locator('#translation-toggle').click();assert.equal(await songPage.locator('.translation:visible').count(),0);
 await songPage.goto(url+'?song=hikarimono#routes');await songPage.waitForSelector('.enhanced');assert.equal(await songPage.locator('#song-filter').inputValue(),'hikarimono');assert.equal(await songPage.locator('.concept:visible').count(),10);
 console.log('PASS: hikarimono mobile widths, kana search, reveal hidden word, reading/translation toggles, filtered map entry.');
 await page.goto(url);await page.waitForSelector('.enhanced');
 assert.equal(await page.locator('.concept').count(),concepts.length);
 for(const width of [320,360,390,768,1024]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);}
 await page.setViewportSize({width:360,height:800});
 await page.screenshot({path:join(tmpdir(),'aimyon-learning-map-mobile.png'),fullPage:false});
 await page.locator('#song-filter').selectOption('miniskirt-highlight');assert((await page.locator('.concept:visible').count())<concepts.length);
 await page.locator('#search').fill('not-a-real-concept');assert.equal(await page.locator('.concept:visible').count(),0);
 await page.locator('#clear-filter').click();assert.equal(await page.locator('.concept:visible').count(),concepts.length);
 await page.goto(url+'#te-hoshii');
 await page.locator('#te-hoshii .study > summary').click();
 await page.locator('#te-hoshii .recall > summary').click();
 await page.waitForFunction(()=>!document.querySelector('#te-hoshii .study').open);
 await page.locator('#te-hoshii textarea').fill('希望對方做，不是自己想做。');
 await page.locator('#te-hoshii [data-rate="explain"]').click();
 await page.reload();assert.equal(await page.locator('#te-hoshii textarea').inputValue(),'希望對方做，不是自己想做。');
 assert.equal(await page.locator('[data-status="te-hoshii"]').textContent(),'能說明');
 await page.locator('#reading-toggle').uncheck();assert(await page.locator('body').evaluate(e=>e.classList.contains('hide-readings')));
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;
 const exportPath=await download.path();const saved=JSON.parse(readFileSync(exportPath,'utf8'));assert.equal(saved.records['te-hoshii'].level,'explain');
 const context2=await browser.newContext();const second=await context2.newPage();await second.goto(url);
 await second.locator('#import').setInputFiles(exportPath);await second.waitForFunction(()=>document.getElementById('message').textContent.includes('已合併 1'));
 assert.equal(await second.locator('#te-hoshii textarea').inputValue(),'希望對方做，不是自己想做。');
 await second.locator('#import').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":2,"records":{}}')});await second.waitForFunction(()=>document.getElementById('message').textContent.includes('匯入失敗'));
 assert.equal(await second.locator('[data-status="te-hoshii"]').textContent(),'能說明');
 await page.evaluate(()=>{const k='aimyon-learning-map-v1',s=JSON.parse(localStorage.getItem(k));s.records['te-hoshii'].reviewed=Date.now()-5*86400000;s.records['te-hoshii'].due=s.records['te-hoshii'].reviewed+4*86400000;localStorage.setItem(k,JSON.stringify(s));});await page.reload();assert((await page.locator('#recommendation').textContent()).includes('先複習'));
 await page.locator('#song-filter').selectOption('marigold');await page.evaluate(()=>location.hash='let-me');await page.waitForFunction(()=>!document.getElementById('let-me').hidden);
 const nojs=await browser.newContext({javaScriptEnabled:false});const basic=await nojs.newPage();await basic.goto(url);assert.equal(await basic.locator('.concept').count(),concepts.length);await basic.locator('#tai .study > summary').click();assert(await basic.locator('#tai .japanese').isVisible());
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});});const fallback=await blocked.newPage();await fallback.goto(url);await fallback.waitForSelector('.enhanced');assert((await fallback.locator('#message').textContent()).includes('無法讀取'));
 assert.deepEqual(errors,[]);console.log('PASS: 320–1024px, filter, cross-link reveal, recall, notes/reload, self-rating, due review, export/import, invalid import, no-JS, blocked storage, no page errors.');
 console.log('Screenshot: '+join(tmpdir(),'aimyon-learning-map-mobile.png'));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
