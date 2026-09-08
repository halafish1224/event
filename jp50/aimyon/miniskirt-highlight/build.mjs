import { readFileSync, writeFileSync } from 'node:fs';
import { source, groups, grammar, words, stages, practice } from './content.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>s.replace(/\[[^\]]+\]/g,'');
const ruby=s=>esc(s).replace(/([\p{Script=Han}々0-9]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const compact=s=>plain(s).replace(/\s/g,'');
const a=(href,label)=>`<a href="${esc(href)}">${label}</a>`;
const para=n=>a('#l-'+n,`第 ${n} 段`);
const gLink=id=>{const g=grammar.find(g=>g[0]===id);if(!g)throw Error('Unknown grammar '+id);return a('#g-'+id,g[1]);};
const count=groups.reduce((sum,g)=>sum+g.length,0);
if(source.length!==8||groups.length!==8)throw Error('Expected 8 source paragraphs');
groups.forEach((g,i)=>{
 // Preserve every supplied word and repetition.
 const expected=source[i];
 if(compact(g.map(p=>p[0]).join(''))!==compact(expected))throw Error('Unexpected source change '+(i+1));
 for(const [jp] of g)if(/[\p{Script=Han}々]/u.test(jp.replace(/[\p{Script=Han}々0-9]+\[[^\]]+\]/gu,'')))throw Error('Missing reading '+jp);
});
const mapHtml=stages.map(([id,title,ns,path,prompt],i)=>`<article class="map-card" id="m-${id}"><span class="number">${String(i+1).padStart(2,'0')}</span><h3>${title}</h3><p>${path}</p><p class="muted">${prompt}</p><div class="chips">${ns.map(para).join('')}</div></article>`).join('\n');
const groupHtml=groups.map((parts,i)=>{
 const n=i+1,stage=stages.find(s=>s[2].includes(n));
 const wordLinks=words.flatMap((w,j)=>w[5].includes(n)?[a('#w-'+(j+1),ruby(w[0]))]:[]);
 return `<section class="lyric-group" id="l-${n}"><div class="meta"><span>原文段落 ${String(n).padStart(2,'0')}</span>${a('#m-'+stage[0],'回到地圖')}</div><h2>${stage[1]}</h2>${[4,8].includes(n)?`<p class="note">重複${para(1)}：先回想願望句，再比較上下文。</p>`:''}${parts.map(([jp,zh,note,gs],j)=>`<article class="phrase" id="p-${n}-${j+1}"><span class="meta">短句 ${n}.${j+1}</span><h3 lang="ja">${ruby(jp)}</h3><p class="translation">${zh}</p><details><summary>語意、句構與語氣</summary><p>${note}</p><div class="chips">${gs.map(gLink).join('')}</div></details></article>`).join('\n')}<details class="joined"><summary>把本段接起來讀</summary><p class="joined-lyric" lang="ja">${parts.map(p=>ruby(p[0])).join(' ')}</p><p class="translation">${parts.map(p=>p[1]).join('')}</p></details><h3>本段字詞</h3><div class="chips" lang="ja">${wordLinks.join('')}</div><div class="chips">${n>1?para(n-1):''}${n<8?para(n+1):''}${a('#practice','回想練習')}</div></section>`;
}).join('\n');
const grammarHtml=grammar.map(([id,title,form,note,jp,zh],i)=>`<article class="entry" id="g-${id}"><span class="meta">句構 ${i+1}</span><h3>${title}</h3><p class="formula">${esc(form)}</p><p>${note}</p><div class="example"><p lang="ja">${ruby(jp)}</p><p>${zh}</p></div><div class="chips">${groups.flatMap((g,j)=>g.some(p=>p[3].includes(id))?[para(j+1)]:[]).join('')}</div></article>`).join('\n');
const wordHtml=words.map(([jp,reading,pos,meaning,note,ns],i)=>`<article class="word" id="w-${i+1}" data-search="${esc([plain(jp),reading,pos,meaning,note].join(' '))}"><h3 lang="ja">${ruby(jp)}</h3><p class="meta">${reading} · ${pos}</p><p><strong>${meaning}</strong>。${note}</p><div class="chips">${ns.map(para).join('')}</div></article>`).join('\n');
const practiceHtml=practice.map(([q,jp,note,g,n],i)=>`<article class="exercise"><h3>${i+1}. ${q}</h3><label for="answer-${i}">先自己回答，再核對</label><textarea id="answer-${i}" rows="2" placeholder="可以口述或在這裡試寫；此欄不會儲存。"></textarea><details><summary>展開答案與回饋</summary><div class="example"><p lang="ja">${ruby(jp)}</p><p>${note}</p></div><div class="chips">${gLink(g)}${para(n)}</div><p class="muted">答錯時回看一個對應短句，稍後再試。能解釋後，換一個名詞或情境造句。</p></details></article>`).join('\n');

const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"><meta name="googlebot" content="noindex, nofollow, nosnippet"><title>ミニスカートとハイライト｜愛繆日文教材・願望與情敵視角</title><meta name="description" content="完整8段歌詞的假名、中文、願望句與推測語法、字詞索引和回想練習。"><link rel="stylesheet" href="../ring-ding/style.css"><link rel="stylesheet" href="../rhythm64/style.css"><link rel="stylesheet" href="style.css"><script src="../ring-ding/app.js" defer></script></head><body><a class="skip" href="#lyrics">跳到逐段教材</a><header id="top"><a href="../songs/">← 歌曲學習帳</a><p class="eyebrow">AIMYON NOTEBOOK · 09</p><h1 lang="ja">ミニスカートと<wbr>ハイライト</h1><p class="lead">要是那個人是我就好了——從願望讀到不甘心的認同。</p><p class="meta">作詞・作曲：あいみょん</p><nav aria-label="教材目錄"><a href="#lyrics">8 段拆讀</a><a href="#map">思緒地圖</a><a href="#grammar">${grammar.length} 組句構</a><a href="#words">${words.length} 個字詞</a><a href="#compare">語氣對照</a><a href="#practice">回想練習</a><a href="#connections">跨曲連結</a></nav><div class="controls" hidden><button id="reading-toggle" type="button" aria-pressed="false">隱藏假名</button><button id="translation-toggle" type="button" aria-pressed="false">隱藏逐句中文</button></div></header>
<main><section class="start"><h2>今天先學會一句願望</h2><p>從<a href="#l-1">第1段</a>讀出「要是是我就好了」，再到<a href="#l-5">第5段</a>找「似乎不是我」。先猜哪個是假設、哪個是推測，再展開解說。不要把敘述者想做的事，當成已經發生的事。</p><a href="#l-1" class="primary">開始第一段</a><p class="muted">讀音、詞義、句構、語氣、人物視角和自己造句，是六個可來回連結的入口；每次只沿一條路學即可。</p></section>
<section id="map"><h2>六站思緒記憶地圖</h2><p>先看角色說了什麼，再辨認願望、得知的訊息與自己的聯想。最後的幽默不一定代表已放下。</p><div class="map">${mapHtml}</div></section>
<section id="lyrics"><h2>8 段原文，${count} 個閱讀短句</h2><p class="note">依提供文字完整保留重複副歌與ah-ah，另加閱讀斷句、假名及教材譯文。${count}個短句是手機編排，不是官方行數。讀音未標高低音調。</p>${groupHtml}</section>
<section id="grammar"><h2>${grammar.length} 組句構與語氣</h2><p>每組先還原活用，再回到歌詞；下方例句是自創練習句。</p>${grammarHtml}</section>
<section id="words"><h2>${words.length} 個字詞與片語</h2><div class="search" hidden><label for="word-search">搜尋日文、假名或中文</label><input type="search" id="word-search" placeholder="例如：触れる、なんか、願望" autocomplete="off"><p id="word-count" role="status" class="meta"></p><button type="button" id="clear-search">顯示全部字詞</button></div><div class="vocab">${wordHtml}</div></section>
<section id="compare"><h2>三句話，三種態度</h2><article class="entry"><h3>願望：要是是我就好了</h3><p lang="ja" class="formula">俺[おれ]だったらいいのに。</p><p>だったら設假設，いいのに留下現實未如願的遺憾。句尾な只是感嘆，不是禁止。<a href="#g-wish">回到願望句構</a></p></article><article class="entry"><h3>得知：似乎不是我這種人</h3><p lang="ja" class="formula">俺[おれ]なんかじゃないらしい。</p><p>なんか自我貶低，じゃない否定身分，らしい表示根據資訊推測。三部分各有工作，不要一口氣只記成「失戀」。<a href="#g-nanka">還原なんか與じゃない</a></p></article><article class="entry"><h3>轉念：好像能當朋友，現在卻不行</h3><p lang="ja" class="formula">仲良[なかよ]くなれそうだ。いまは無理[むり]だけれど。</p><p>可能形＋そうだ評估前景，いまは限制當下。敘述者能認同對方眼光，但情緒還無法配合。<a href="#g-sou">查看可能形與そうだ</a></p></article>
<article class="entry"><h3>她、她的男友、我：不要把人物關係讀反</h3><p lang="ja" class="formula">［イカした彼女[かのじょ]］のボーイフレンド</p><p>先把形容她的部分圈成一組，再接の。彼女在這裡是「她」，不是「我的女友」；敘述者以俺自稱，不代表創作者在談自己的身分。<a href="#g-modifier">名詞修飾練習</a></p></article>
<article class="entry"><h3>外來語不只一個中文答案</h3><p>ショートカット在外貌脈絡是短髮。ハイライト可指亮部、提亮等，也存在同名香菸品牌；後者只證明詞義可能，不足以確認作者在此指什麼。本頁保留原詞，避免把「打亮」或「香菸」直接寫成定譯。<a href="https://www.jti.co.jp/tobacco/products/others/index.html" rel="noreferrer">同名用語的查核來源</a></p></article>
<article class="entry"><h3>能理解角色，也能調整自己的說法</h3><p>俺、あいつ、奴都帶角色口吻，不宜直接套用到所有陌生人。練習把「あいつは誰だ？」換成詢問資訊的句子：</p><div class="example"><p lang="ja">あの人[ひと]は、どなたですか。</p><p>請問那位是誰？</p></div><p>觸碰和擁抱在本文屬願望或夢境。閱讀時分清楚視角，日常互動則先確認對方意願，不把自己的心動當作雙方關係已成立。</p></article></section>
<section id="practice"><h2>10 題回想與轉用</h2><p>每次先答兩題再核對。答對後換一個人物或動詞，確認離開歌詞也能使用。</p>${practiceHtml}
<article class="entry"><h3>一週輕量安排</h3><ol><li>今天：第1–2段，練だったらいいのに與名詞修飾。</li><li>明天：先回想昨天，再讀第3–4段，辨認願望、轉折與口語稱呼。</li><li>第3天：第5–6段，拆なんか、じゃない、らしい，區分夢境和現實。</li><li>第5天：第7段，還原なれる→なれそう，解釋最後一句為何讓語氣轉彎。</li><li>第7天：第8段，先不看中文回想副歌，再選5題測試自己。</li></ol><p>依表現調整間隔，常錯的題提早再試；能說明原因並造句的題可以延後。這不是固定的最佳記憶時程。</p></article>
<article class="entry"><h3>20分鐘教學帶讀</h3><p>3分鐘：學習者先猜誰想成為誰的男朋友。5分鐘：教師示範把長名詞組圈起，再讓學生拆另一組。5分鐘：比較願望、推測、可能三種語氣。最後7分鐘：遮住解說回想一題，改寫一句人物稱呼，再用句尾說明角色轉念。</p><p>回饋先抓一個點：主語讀反、活用還原錯，或把願望當事實。討論可用虛構情境，不要求分享個人感情經歷。</p></article></section>
<section id="connections"><h2>從這首接回已有的記憶</h2><article class="entry"><h3>接到〈3636〉：猜測不是確定答案</h3><p>本曲<a href="#g-rashii">らしい</a>與<a href="../3636/#g-rashii">〈3636〉さじ加減らしい</a>都保留間接資訊的語氣；再比較<a href="../3636/#g-question">のかな</a>較明顯的自問。</p></article>
<article class="entry"><h3>接到〈リズム64〉：想是如此，與確認眼前</h3><p>本曲<a href="#g-wish">だったらいいのに</a>是願望；<a href="../rhythm64/#g-try">〈リズム64〉触ってみる</a>是嘗試確認。並排讀<span lang="ja">触[ふ]れる／触[さわ]る</span>，記得同一漢字可能對應不同動詞。</p></article>
<article class="entry"><h3>接到〈RING DING〉：同樣是口語，人際作用不同</h3><p>從<a href="../ring-ding/#tone">〈RING DING〉語氣轉換</a>比較吐槽和質問。看熟悉程度、說話目的和對方意願，而不是只背一個「很有感情」的口吻。</p></article>
<article class="entry"><h3>接到〈愛の花〉：願望與感覺</h3><p><a href="../ai-no-hana/#g-request">てほしい</a>希望對方做某事；本曲希望某個身分是自己。<a href="../ai-no-hana/#g-kigasuru">気がする</a>則表主觀感覺。試著各造一句，不要全翻成「想」。</p></article>
<article class="entry"><h3>再回到三首較早的歌</h3><p><a href="../KimiWaRokkuWoKikanai/">〈君はロックを聴かない〉</a>可比較靠近對方的方式；<a href="../marigold/">〈マリーゴールド〉</a>可比較視覺印象；<a href="../idontlikemornings/">〈朝が嫌い〉</a>可比較自我感受。遇到沒明說的主語，再看<a href="../ichi-ni-tsuite/#g-omission">〈いちについて〉省略句</a>。</p></article><a href="../songs/">返回九首歌曲目錄 →</a></section>
<section id="sources"><h2>作品與學習依據</h2><ul><li><a href="https://wmg.jp/aimyon/news/86279/">Warner Music Japan：本曲製作資訊</a>。確認作品名稱與發行脈絡；人物解讀仍以歌詞文字為依據。</li><li><a href="https://www.youtube.com/watch?v=akf0iQ-cTtQ">AIMYON 官方音源</a>。每次選一小段先辨音，再看假名，不以本頁讀音標記代替原唱。</li><li><a href="https://www.joysound.com/web/search/song/877833">JOYSOUND：詞曲與歌詞核對入口</a>。本頁以使用者提供原文編排，不另補歌詞。</li><li><a href="https://www.nature.com/articles/s44159-022-00089-1">2022：間隔與提取練習回顧</a>。支持分散回想與檢查自己的理解，不等於固定天數最有效。</li><li><a href="https://www.nature.com/articles/s44271-025-00234-5">2025：線上講課中插入測驗研究</a>。作為先回答再核對的教學參考，並非本歌詞教材的直接成效驗證。</li><li><a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag">Google：索引指令說明</a>。本頁有noindex，請搜尋引擎不收錄；不是登入保護。</li></ul><p class="meta">非官方個人學習教材。中文、語法說明與練習為本教材編寫；詞義、可能解讀與作品資料分開呈現。學習連結用來引導回想，不宣稱歌曲或配色具有特殊腦科學效果。核對：2026-09-08。</p></section></main><footer><a href="#top">回到頁首</a> · <a href="../songs/">歌曲學習帳</a></footer></body></html>`;
const output=html.replace(/([\p{Script=Han}々0-9]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const ids=[...output.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate ids');
for(const [,id] of output.matchAll(/href="#([^"]+)"/g))if(!ids.includes(id))throw Error('Missing anchor '+id);
for(const [,path,hash] of output.matchAll(/(?:href|src)="(\.\.\/[^"#]+)(?:#([^"]+))?"/g)){
 const target=readFileSync(new URL(path+(path.endsWith('/')?'index.html':''),import.meta.url),'utf8');
 if(hash&&!target.includes(`id="${hash}"`))throw Error('Missing cross-song anchor '+path+'#'+hash);
}
for(const w of words)if(!w[5].length||w[5].some(n=>n<1||n>8))throw Error('Invalid word reference');
writeFileSync(new URL('./index.html',import.meta.url),output);
console.log(`Built miniskirt-highlight: ${groups.length} paragraphs; ${count} reading phrases; ${grammar.length} grammar topics; ${words.length} words; ${practice.length} exercises. Supplied source matches exactly apart from reading spaces; readings, anchors and cross-song links verified.`);
