import {writeFileSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {songs, routes, concepts} from './content.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ruby=s=>esc(s).replace(/([\p{Script=Han}々ヶ]+)\{([^{}]+)\}/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const relation={before:'先學這個',next:'下一步',same:'別的用法一起看',contrast:'容易混淆',image:'意象相連'};
const song=id=>songs.find(s=>s.id===id);
const ref=([id,anchor])=>{const s=song(id);return `<a class="song-link" style="--song:${s.color}" href="../${s.path}/#${anchor}">${esc(s.title)}<span>閱讀${['words','vocabulary'].includes(anchor)?'詞彙區（再對照原文）':'對應教材'} ↗</span></a>`;};
// Fail the build when a lesson fragment or relationship is missing.
for(const c of concepts){
 for(const [id,anchor] of c.refs){const s=song(id);const html=readFileSync(new URL(`../${s.path}/index.html`,import.meta.url),'utf8');if(!html.includes(`id="${anchor}"`))throw Error(`Missing anchor: ${id}#${anchor}`);}
 for(const [type,id] of c.links)if(!relation[type]||!concepts.some(x=>x.id===id))throw Error(`Invalid edge ${c.id} -> ${id}`);
}
const lesson=c=>`<article class="concept" id="${c.id}" data-route="${c.route}" data-songs="${c.refs.map(r=>r[0]).join(' ')}">
 <div class="eyebrow">${esc(routes.find(r=>r.id===c.route).title)} <span class="status" data-status="${c.id}">尚未練習</span></div>
 <h3>${esc(c.title)}</h3><p class="prompt">先想一下：${ruby(c.question)}</p>
 <details class="study"><summary>看懂概念與例句</summary><p>${ruby(c.explanation)}</p><p class="japanese" lang="ja">${ruby(c.example)}</p><p>${esc(c.translation)}</p><small>例句包含教學自編句與使用者提供的歌詞片段；完整語境請讀連結教材。</small><div class="refs">${c.refs.map(ref).join('')}</div></details>
 <details class="recall"><summary>收起上方說明，試著回想</summary><p>${ruby(c.task)}</p><label class="js-only">我的回答（自動存於本機）<textarea data-note="${c.id}" rows="3" maxlength="2000" placeholder="先說出或寫下答案，再看提示。"></textarea></label><details class="answer"><summary>核對答案與回饋</summary><p>${ruby(c.answer)}</p></details>
 <fieldset class="js-only"><legend>核對後自評；這不是自動評分</legend><div class="ratings">${[['retry','還需要提示'],['recognize','能辨認'],['explain','能說明'],['apply','能造句']].map(([v,l])=>`<button type="button" data-rate="${v}" data-id="${c.id}" aria-pressed="false">${l}</button>`).join('')}</div></fieldset><p class="schedule" data-schedule="${c.id}"></p></details>
 <nav class="edges" aria-label="${esc(c.title)}的連結">${c.links.map(([type,id])=>`<a href="#${id}"><small>${relation[type]}</small>${esc(concepts.find(x=>x.id===id).title.split('｜')[1])} →</a>`).join('')}</nav></article>`;
const html=`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive,nosnippet"><meta name="googlebot" content="noindex,nofollow"><meta name="referrer" content="strict-origin-when-cross-origin"><title>AIMYON｜跨歌曲學習地圖</title><meta name="description" content="九首歌曲、六條學習路線、二十四個概念。用比較、回想與生活造句，串起日文學習。"><link rel="stylesheet" href="style.css"><script src="app.js" defer></script></head>
<body><a class="skip" href="#routes">跳至學習路線</a><main>
<header><a href="../songs/">← 回歌曲學習帳</a><p class="eyebrow">AIMYON NOTEBOOK / LEARNING MAP</p><h1>讓每一首歌，<br>接住上一個理解。</h1><p class="intro">九首歌・六條路線・二十四個概念<br>從一句看懂，到換首歌也認得，再變成自己的表達。</p><nav class="top-nav" aria-label="頁內導覽"><a href="#today">今天學一點</a><a href="#routes">六條路線</a><a href="#song-list">全部歌曲</a><a href="#method">學習方法</a></nav></header>
<section id="today" class="panel"><p class="eyebrow">一次一個概念，約 10 分鐘</p><h2>今天學一點</h2><p>先回想 → 看懂 → 比較兩首歌 → 自己造句 → 核對回饋。</p><div id="recommendation"><a href="#state">從「～ている：動作還是狀態？」開始 →</a></div><div class="js-only" id="resume"></div><p class="js-only" id="progress-summary"></p><details class="js-only"><summary>待複習清單</summary><ul id="review-list"></ul></details></section>
<section id="routes"><h2>選一條今天想走的路</h2><p>這是概念順序，不是歌曲難度排名。可以自由跳讀；需要時沿「先學這個」回補基礎。</p><div class="route-grid">${routes.map((r,i)=>`<a class="route-card" href="#route-${r.id}"><span>ROUTE 0${i+1} · 4 個概念</span><strong>${r.title}</strong><small>${r.description}</small></a>`).join('')}</div></section>
<section class="panel js-only" aria-label="篩選概念"><label for="search">找語法、詞語或學習問題</label><input id="search" type="search" placeholder="例如：願望、ている、推測"><label for="song-filter">依歌曲篩選</label><select id="song-filter"><option value="">全部九首歌曲</option>${songs.map(s=>`<option value="${s.id}">${esc(s.title)}</option>`).join('')}</select><button type="button" id="clear-filter">清除篩選</button><p id="filter-count" role="status"></p><label><input type="checkbox" id="reading-toggle" checked> 顯示日文假名</label></section>
<div id="lessons">${routes.map(r=>`<section class="route-section" id="route-${r.id}"><h2>${r.title}</h2><p>${r.description}</p>${concepts.filter(c=>c.route===r.id).map(lesson).join('')}</section>`).join('')}</div>
<section id="song-list"><h2>全部歌曲，隨時回到完整語境</h2><div class="route-grid">${songs.map(s=>`<a class="song-link" style="--song:${s.color}" href="../${s.path}/">${esc(s.title)}<span>完整教材 ↗</span></a>`).join('')}</div></section>
<section id="method" class="panel"><h2>學習與教學筆記</h2><p>每站先自行回想，再核對並修正，之後隔一段時間重訪。提取與間隔練習有研究支持；本站的路線、配色與排程是教學設計，不宣稱能精準測量記憶或保證學習成效。</p><p>參考：<a href="https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication">AERO：Spacing and retrieval practice guide</a>（2021 年出版，2026-09-08 查閱）。</p><details><summary>老師／自學者：10 分鐘怎麼帶？</summary><ol><li>1 分鐘：不翻教材，說出上次的一個概念。</li><li>3 分鐘：拆解本次例句，確認人物與動作。</li><li>3 分鐘：走進兩首歌曲，找出相同用法或差異。</li><li>2 分鐘：關閉說明，以自己的生活造句。</li><li>1 分鐘：核對回饋、記下問題，安排下次回想。</li></ol><p>卡住就看提示並縮小問題；能回答後換情境再試，不以回答速度評價學習者。</p></details><details><summary>進度、隱私與排程</summary><p>進度是自評，不是考試結果。還需要提示：隔天再試；能辨認：2 天；能說明：4 天；能造句：7 天。這是可理解的初始安排，不是個人化記憶演算法；可隨時提前練習。</p><p>僅儲存在此瀏覽器；無帳號、無追蹤、無自動跨裝置同步。清除瀏覽資料會失去紀錄，請先匯出。匯入將逐項合併較新紀錄，不刪除未包含的項目。</p><p>本頁設有 noindex，但不是私人空間或存取保護。舊型閱讀器若不支援 JavaScript，仍可閱讀全部概念與連結；互動進度需使用支援的瀏覽器。</p></details></section>
<section class="panel js-only"><h2>帶走你的學習進度</h2><button type="button" id="export">匯出進度 JSON</button><label for="import">匯入另一台裝置的進度</label><input type="file" id="import" accept="application/json,.json"><p id="message" role="status" aria-live="polite"></p></section>
<noscript><p class="panel">目前未啟用 JavaScript。所有教材與路線仍可閱讀；搜尋與本機進度功能暫不提供。</p></noscript><footer><a href="../songs/">回歌曲學習帳</a><p>新增的跨曲引導，不改寫原教材。閱讀・比較・回想，再向前一步。</p></footer>
</main></body></html>`;
writeFileSync(fileURLToPath(new URL('index.html',import.meta.url)),html);
console.log(`Built ${songs.length} songs / ${routes.length} routes / ${concepts.length} concepts; all lesson anchors verified.`);
