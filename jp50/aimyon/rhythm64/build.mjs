import { readFileSync, writeFileSync } from 'node:fs';
import { source, groups, grammar, words, stages, practice } from './content.mjs';

const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = s => s.replace(/\[[^\]]+\]/g,'');
const ruby = s => esc(s).replace(/([\p{Script=Han}々]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const compact = s => plain(s).replace(/\s/g,'');
const a = (href,label) => `<a href="${esc(href)}">${label}</a>`;
const para = n => a('#l-'+n,`第 ${n} 段`);
const gLink = id => { const g=grammar.find(g=>g[0]===id); if(!g)throw Error('Unknown grammar '+id);return a('#g-'+id,g[1]); };
const count=groups.reduce((n,g)=>n+g.length,0);
const repeats={5:1,11:4,12:1};
if(groups.length!==12 || source.length!==12) throw Error('Expected 12 source paragraphs');
groups.forEach((group,i)=>{
 if(compact(group.map(p=>p[0]).join(''))!==compact(source[i])) throw Error('Source mismatch paragraph '+(i+1));
 for(const [jp] of group) if(/[\p{Script=Han}々]/u.test(jp.replace(/[\p{Script=Han}々]+\[[^\]]+\]/gu,''))) throw Error('Missing reading '+jp);
});
const mapHtml=stages.map(([id,title,ns,path,prompt],i)=>`<article class="map-card" id="m-${id}"><span class="number">${String(i+1).padStart(2,'0')}</span><h3>${title}</h3><p>${path}</p><p class="muted">${prompt}</p><div class="chips">${ns.map(para).join('')}</div></article>`).join('\n');
const groupHtml=groups.map((parts,i)=>{
 const n=i+1,stage=stages.find(s=>s[2].includes(n));
 const vocab=words.flatMap((w,j)=>w[5].includes(n)?[a('#w-'+(j+1),ruby(w[0]))]:[]);
 const partsHtml=parts.map(([jp,zh,note,gs],j)=>`<article class="phrase" id="p-${n}-${j+1}"><span class="meta">短句 ${n}.${j+1}</span><h3 lang="ja">${ruby(jp)}</h3><p class="translation">${zh}</p><details><summary>語意、句構與省略</summary><p>${note}</p><div class="chips">${gs.map(gLink).join('')}</div></details></article>`).join('\n');
 return `<section class="lyric-group" id="l-${n}"><div class="meta"><span>原文段落 ${String(n).padStart(2,'0')}</span>${a('#m-'+stage[0],'回到思緒地圖')}</div><h2>${stage[1]}</h2>${repeats[n]?`<p class="note">重複段落：${para(repeats[n])}。先回想原句，再比較前後文讓語氣產生什麼變化。</p>`:''}${partsHtml}<details class="joined"><summary>把本段接起來讀</summary><p lang="ja" class="joined-lyric">${parts.map(p=>ruby(p[0])).join(' ')}</p><p class="translation">${parts.map(p=>p[1]).join('')}</p><p class="muted">以上空格是教材斷句；字詞與標點保留您的原文。短句之間不一定是完整句子。</p></details><h3>本段詞語入口</h3><div class="chips" lang="ja">${vocab.join('')}</div><div class="chips">${n>1?para(n-1):''}${n<12?para(n+1):''}${a('#practice','回想練習')}</div></section>`;
}).join('\n');
const grammarHtml=grammar.map(([id,title,form,note,jp,zh],i)=>`<article class="entry" id="g-${id}"><span class="meta">句構 ${i+1}</span><h3>${title}</h3><p class="formula">${esc(form)}</p><p>${note}</p><div class="example"><p lang="ja">${ruby(jp)}</p><p>${zh}</p></div><div class="chips">${groups.flatMap((g,j)=>g.some(p=>p[3].includes(id))?[para(j+1)]:[]).join('')}</div></article>`).join('\n');
const wordsHtml=words.map(([jp,reading,pos,meaning,note,ns],i)=>`<article class="word" id="w-${i+1}" data-search="${esc([plain(jp),reading,pos,meaning,note].join(' '))}"><h3 lang="ja">${ruby(jp)}</h3><p class="meta">${reading} · ${pos}</p><p><strong>${meaning}</strong>。${note}</p><div class="chips">${ns.map(para).join('')}</div></article>`).join('\n');
const practiceHtml=practice.map(([q,jp,note,g,n],i)=>`<article class="exercise"><h3>${i+1}. ${q}</h3><label for="answer-${i}">先回想，再用自己的話回答</label><textarea id="answer-${i}" rows="2" placeholder="可在心裡回答，或在這裡試寫；此欄不會儲存。"></textarea><details><summary>展開答案與回饋</summary><div class="example"><p lang="ja">${ruby(jp)}</p><p>${note}</p></div><div class="chips">${gLink(g)}${para(n)}</div><p class="muted">若答錯，只回看相關短句；稍後再答一次。能答對後，再替換人物或動詞造句。</p></details></article>`).join('\n');
const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"><meta name="googlebot" content="noindex, nofollow, nosnippet"><title>リズム64｜愛繆日文教材・長句拆讀與思緒記憶地圖</title><meta name="description" content="依提供的12段原文拆讀リズム64，完整假名、語意語法、字詞、跨曲連結與提取練習。"><link rel="stylesheet" href="../ring-ding/style.css"><link rel="stylesheet" href="style.css"><script src="../ring-ding/app.js" defer></script></head><body><a class="skip" href="#lyrics">跳到逐段教材</a>
<header id="top"><a href="../songs/">← 歌曲學習帳</a><p class="eyebrow">AIMYON NOTEBOOK · 07</p><h1 lang="ja">リズム<span class="title-number">64</span></h1><p class="lead">從心跳的「沒問題」，讀到心底未說完的話。</p><p class="meta">Rhythm 64 · 作詞／作曲：あいみょん · 2024年2月2日發行</p><nav aria-label="教材目錄"><a href="#lyrics">12 段拆讀</a><a href="#map">思緒地圖</a><a href="#grammar">${grammar.length} 組句構</a><a href="#words">${words.length} 個字詞</a><a href="#compare">對比與還原</a><a href="#practice">回想練習</a><a href="#connections">跨曲連結</a></nav><div class="controls" hidden><button type="button" id="reading-toggle" aria-pressed="false">隱藏假名</button><button type="button" id="translation-toggle" aria-pressed="false">隱藏逐句中文</button></div></header>
<main><section class="start"><h2>今天先學會分辨兩個「から」</h2><p>${para(1)}句尾說明理由，${para(9)}的胸口深處則是起點。先讀日文、自己猜，再核對；每次只選一個連結追下去。初學者先讀假名和詞義，進階者再把省略補回，說明你的依據。</p><a class="primary" href="#l-1">開始第一段</a><p class="muted">全向學習在這裡連接讀音、詞義、句構、時間方向、意象和自己的句子。地圖幫你找路；能否合上解說回答，才是本次練習的檢查點。</p></section>
<section id="map"><h2>七站思緒記憶地圖</h2><p>不是一路變好的直線：心跳的肯定和心底的否定同時存在。跟著詞句看變化，不替它預設單一結局。</p><div class="map">${mapHtml}</div></section>
<section id="lyrics"><h2>12 段原文，${count} 個閱讀短句</h2><p class="note">保留您提供的全部字詞、12個段落與重複部分，另加手機閱讀斷句。這${count}個短句是教材分法，不是官方歌詞行數。漢字附假名，中文為本教材重新翻譯；日文讀音未標高低音調。</p><p>每段可展開「接起來讀」。特別留意${para(7)}和${para(8)}是跨段連句，${para(9)}和${para(10)}則保留詩句接法的歧義。</p>${groupHtml}</section>
<section id="grammar"><h2>${grammar.length} 組句構與活用</h2><p>先還原形式，再決定時間方向、主語和否定範圍。下面的例句是自創練習句。</p>${grammarHtml}</section>
<section id="words"><h2>${words.length} 個字詞與片語</h2><div class="search" hidden><label for="word-search">搜尋日文、假名或中文</label><input id="word-search" type="search" placeholder="例如：錆切る、すいせい、犧牲" autocomplete="off"><p id="word-count" role="status" class="meta"></p><button id="clear-search" type="button">顯示全部字詞</button></div><div class="vocab">${wordsHtml}</div></section>
<section id="compare"><h2>把容易混淆的地方放在一起</h2><article class="entry"><h3>同一顆心，兩個聲音</h3><div class="compare-grid"><div class="example"><p lang="ja">大丈夫[だいじょうぶ]だって</p><p>引用心跳彷彿說出的「沒問題」。${para(1)}</p></div><div class="example"><p lang="ja">大丈夫[だいじょうぶ]じゃない色[いろ]</p><p>把「並不好」變成可滲出的顏色。${para(9)}</p></div></div><p>問題不是哪一句一定在說謊，而是敘述者如何同時感到支撐和難受。請用一個動詞支持你的讀法。</p></article>
<article class="entry"><h3>三個時間方向</h3><ul><li>${gLink('tekita')}：選擇和整理一路累積到現在。</li><li>${gLink('teiku')}：繼續把空氣吞入，動作往後延伸。</li><li>${gLink('tekuru')}：內裡的東西漸漸滲到當下可感受的位置。</li></ul><p>換成新句練習：<span lang="ja">学[まな]んできた → 学[まな]んでいく → わかってくる</span>。一路學到現在 → 繼續學下去 → 漸漸理解。</p></article>
<article class="entry"><h3>第9–10段：先還原，再保留另一種接法</h3><p class="formula" lang="ja">胸[むね]の底[そこ]から、［大丈夫[だいじょうぶ]じゃない色[いろ]をした水性[すいせい]］が滲[にじ]んでくる。</p><p>以上把後置的が主語接回滲んでくる。接下來，詰まる可修飾喉；也可讓水性が與詰まる相接。教學時請學習者各讀一次，說明每個が、の、を的角色，並指出停頓如何改變接法。</p><p>水性本來是性質名詞，歌詞讓它像有顏色的液體。淚水、壓住的話或情緒都是可能聯想，應標為詮釋。${gLink('inversion')}</p></article>
<article class="entry"><h3>安慰的字面與被聽見的意思</h3><p>${para(6)}呈現「被說別低落，反而低落」。和${a('../ring-ding/#tone','〈RING DING〉語氣轉換')}一起讀：說話者的好意，不一定等於對方收到的感受。</p><div class="example"><p lang="ja">今[いま]、話[はな]したい？ 聞[き]いてもいい？</p><p>現在想說說嗎？我可以聽嗎？</p></div><p>這是溝通用的自創改寫，先詢問對方意願；不是保證某個句型能讓人立刻好起來。</p></article></section>
<section id="practice"><h2>10 題回想與轉用</h2><p>先答再看解析；不要只確認「看懂答案」。能說出原因後，再改成你自己的情境。</p>${practiceHtml}<article class="entry"><h3>一週分段安排</h3><ol><li>今天：第1–3段。找引用、主語、修飾語，最後合上答案說兩個重點。</li><li>明天：先回想昨天，再讀第4–6段；練てきた、ながら、なきゃ與被動。</li><li>第3天：第7–8段，跨段接回受詞，比較三種縮約。</li><li>第5天：第9–10段，口述一個句構還原和一個可能意象，不混成同一種答案。</li><li>第7天：重讀第11–12段，做5題回想，再到另一首歌找同一語法。</li></ol><p>這是可依表現調整的學習安排，不是固定最佳間隔。忘得快就提早回想；已能解釋和造句的題可以延後。</p></article>
<article class="entry"><h3>20分鐘教學引導</h3><p>前3分鐘，讓學習者猜兩種から；接著5分鐘，示範把女神前的修飾語圈成一組；再5分鐘，由學習者還原第7–8段；最後7分鐘，比較第9–10段的兩種句法與幸福的疑問，完成一題不看答案的回想。</p><p>回饋分三層：讀音是否正確、句構是否能指出依據、解讀是否保留可能性。錯一個點就回到對應短句，不要求分享私人創傷或以同意老師的感想作為答對標準。</p></article></section>
<section id="connections"><h2>從這首，走回其他歌曲</h2><article class="entry"><h3>心跳的不同語境</h3><p>本曲把心跳當作自己的節奏，${a('../KimiWaRokkuWoKikanai/','〈君はロックを聴かない〉')}則有情感悸動的描寫。官方訪談提到「64」來自愛繆量到的放鬆時心跳，並用自己的生活節奏說明創作。這是歌名背景，不是跟讀速度或健康指標。${a('https://www.aimyong.net/feature/rhythm64','官方訪談')}</p></article>
<article class="entry"><h3>同樣是「想說」，為什麼不一定全說？</h3><p>從本曲${gLink('nominal')}接到${a('../ring-ding/#g-let','〈RING DING〉言わせてほしい')}：一首提出發言請求，一首追問釋出一切與幸福的關係。先辨識文法，再討論溝通選擇。</p></article>
<article class="entry"><h3>從現在往後，或一路走到現在</h3><p>本曲${gLink('tekita')}接到${a('../ichi-ni-tsuite/#g-teiku','〈いちについて〉ていく／てくる')}和${a('../ring-ding/#g-teiku','〈RING DING〉ていこう')}。在紙上只畫一條時間線，再說出三句的方向差異。</p></article>
<article class="entry"><h3>看見情緒，不急著替它命名</h3><p>${a('../ai-no-hana/#g-metaphor','〈愛の花〉意象與比喻')}和本曲的水性都能把抽象感受具象化；${a('../idontlikemornings/','〈朝が嫌い〉')}則可比較別人看不到的內心。回到${a('../marigold/','〈マリーゴールド〉')}時，也試著區分畫面文字和自己的聯想。</p></article><a href="../songs/">返回七首歌曲目錄 →</a></section>
<section id="sources"><h2>作品背景與學習依據</h2><article class="entry"><h3>官方談創作，教材談怎麼讀</h3><p>官方專頁列出2024年2月2日發行，並說明這首是資生堂 Beauty Wellness 的官方歌曲。訪談中，愛繆把選擇人生和女神的失物提問聯繫起來，也談到不是把想說的全部吐露就一定會幸福。這支持本教材保留最後的疑問，卻不能替每個比喻指定唯一對應。${a('https://www.aimyong.net/feature/rhythm64','作品頁與官方訪談')}</p></article>
<ul><li>${a('https://www.nature.com/articles/s44159-022-00089-1','Carpenter、Pan、Butler（2022）：間隔與提取練習回顧')}：教材採分散回想、核對與調整自我判斷。</li><li>${a('https://www.nature.com/articles/s44271-025-00234-5','2025：線上講課插入測驗的研究')}：在703名大學及社區學院學生中檢驗提取練習；並非本歌詞教材的成效實驗。本頁的編排是教學應用，效果需由實際回想觀察。</li><li>${a('https://www.aimyong.net/feature/rhythm64','官方聆聽及影音入口')}：挑一小段先辨音，再揭示假名，不以讀音標注取代聽原曲。</li><li>${a('https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag','Google：搜尋索引指令')}：本頁使用noindex，請搜尋引擎不收錄；不是登入或密碼保護。</li></ul><p class="meta">非官方個人日文學習整理。日文以您提供的12段原文為準，未從外部補入歌詞；字詞、語法、作者訪談與教材詮釋分開標示。心理學研究支持的是練習原則，不代表歌曲、顏色或64拍本身具有特定神經科學療效。核對日期：2026-09-08。</p></section></main><footer><a href="#top">回到頁首</a> · <a href="../songs/">歌曲學習帳</a></footer></body></html>`;
const output=html.replace(/([\p{Script=Han}々]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const ids=[...output.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate ids');
for(const [,id] of output.matchAll(/href="#([^"]+)"/g))if(!ids.includes(id))throw Error('Missing anchor '+id);
for(const [,path,hash] of output.matchAll(/(?:href|src)="(\.\.\/[^"#]+)(?:#([^"]+))?"/g)){
 const target=readFileSync(new URL(path+(path.endsWith('/')?'index.html':''),import.meta.url),'utf8');
 if(hash&&!target.includes(`id="${hash}"`))throw Error('Missing cross-song anchor '+path+'#'+hash);
}
for(const w of words) if(!w[5].length||w[5].some(n=>n<1||n>12))throw Error('Invalid vocabulary reference');
writeFileSync(new URL('./index.html',import.meta.url),output);
console.log(`Built rhythm64: ${groups.length} source paragraphs, ${count} reading phrases, ${grammar.length} grammar topics, ${words.length} words, ${practice.length} exercises. Source fidelity, readings, anchors, cross-song links and shared assets passed.`);
