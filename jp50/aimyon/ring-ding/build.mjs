import { readFileSync, writeFileSync } from 'node:fs';
import { grammar, lines, stages, words, practice } from './content.mjs';

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = s => s.replace(/\[[^\]]+\]/g,'');
const ruby = s => esc(s).replace(/([\p{Script=Han}々]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const link = (href,label) => `<a href="${esc(href)}">${label}</a>`;
const gLink = id => link('#g-'+id,esc(grammar.find(g=>g[0]===id)[1]));
const lLink = n => link('#l-'+n,`第 ${n} 行`);
const stageFor = n => stages.find(s=>n>=s[2] && n<=s[3]);
// Each vocabulary item gets explicit lyric references, including inflected forms.
const refs = [[1],[1],[1],[2],[2,20],[2],[3],[3],[3],[4],[4],[4],[4],[5],[5,6,35],[5],[5],[6,12],[6],[7,9],[8],[4,7,8,19,21,26,35],[8],[9],[9],[9],[10],[10,36],[11],[11],[11],[11,17,31,40],[11],[12],[12,31],[12],[13],[14,28,37],[14,28,37],[14,28,37],[14,37],[15,38],[15,29,38],[15,38],[15,38],[16,30,39],[16,39],[16,39],[16,18,32,33,39,41],[17,31,40],[18,41],[19],[19,24],[20,34],[20],[21],[22],[22],[23],[23],[23],[24],[24],[25],[25],[25],[25],[26],[26],[27],[28],[28],[29],[29],[30],[30],[30],[30],[32],[33],[34],[34],[35],[35],[35],[36]];
if(refs.length!==words.length) throw Error(`Vocabulary reference count ${refs.length} != ${words.length}`);
if(lines.length!==41) throw Error('Expected all 41 supplied lyric lines');
const maps = stages.map(([id,title,start,end,path,prompt],i)=>`<article class="map-card" id="m-${id}"><span class="number">${String(i+1).padStart(2,'0')}</span><h3>${title}</h3><p>${path}</p><p class="muted">${prompt}</p><div class="chips">${Array.from({length:end-start+1},(_,j)=>lLink(start+j)).join('')}</div></article>`).join('\n');
const lyricHtml=lines.map(([ja,zh,note,gs],i)=>{
 const n=i+1, stage=stageFor(n);
 const vocab=words.flatMap((w,j)=>refs[j].includes(n)?[link('#w-'+(j+1),ruby(w[0]))]:[]);
 return `<article class="line" id="l-${n}"><div class="meta"><span>${String(n).padStart(2,'0')} · ${stage[1]}</span>${link('#m-'+stage[0],'回到地圖')}</div><h3 lang="ja">${ruby(ja)}</h3><p class="translation">${esc(zh)}</p><details><summary>語意、句構與語氣</summary><p>${esc(note)}</p><div class="chips">${gs.map(gLink).join('')}</div><h4>句中詞語</h4><div class="chips" lang="ja">${vocab.join('')}</div><p class="prompt">先回想：這句是在邀請、引用、否定，還是催促？說出一個助詞或活用作為依據。</p></details>${n>36?`<p class="muted">${link('#l-'+(n-23),'對照第一次副歌')} · ${link('#practice','用回想練習檢查理解')}</p>`:''}</article>`;
}).join('\n');
const grammarHtml=grammar.map(([id,title,form,note,example,translation],i)=>`<article class="entry" id="g-${id}"><span class="meta">句構 ${String(i+1).padStart(2,'0')}</span><h3>${title}</h3><p class="formula">${esc(form)}</p><p>${esc(note)}</p><div class="example"><p lang="ja">${ruby(example)}</p><p>${translation}</p></div><div class="chips">${lines.flatMap((l,j)=>l[3].includes(id)?[lLink(j+1)]:[]).join('')}</div></article>`).join('\n');
const wordHtml=words.map(([word,reading,pos,meaning,note],i)=>`<article class="word" id="w-${i+1}" data-search="${esc([plain(word),reading,meaning,pos].join(' '))}"><h3 lang="ja">${ruby(word)}</h3><p class="meta">${esc(reading)} · ${pos}</p><p><strong>${meaning}</strong>。${note}</p><div class="chips">${refs[i].map(lLink).join('')}</div></article>`).join('\n');
const practiceHtml=practice.map(([q,a,note,g,n],i)=>`<article class="exercise"><h3>${i+1}. ${q}</h3><label for="answer-${i}">先在心裡回答，或寫下你的答案</label><textarea id="answer-${i}" rows="2" placeholder="先試著想，再展開解答；此欄不會儲存。"></textarea><details><summary>核對答案與原因</summary><div class="example"><p lang="ja">${ruby(a)}</p><p>${note}</p></div><div class="chips">${gLink(g)}${lLink(n)}</div><p class="muted">能解釋原因再換詞造句；若答錯，重讀對應歌詞，稍後再試。</p></details></article>`).join('\n');
const html=`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet"><meta name="googlebot" content="noindex, nofollow, nosnippet">
<title>RING DING｜愛繆日文教材・逐句假名與語氣練習</title><meta name="description" content="RING DING 完整41行假名、語意句構、字詞片語、親密語氣辨析與主動回想教材。">
<link rel="stylesheet" href="style.css"><script src="app.js" defer></script></head><body>
<a href="#lyrics" class="skip">跳到逐句教材</a><header id="top"><a href="../songs/">← 歌曲學習帳</a><p class="eyebrow">AIMYON NOTEBOOK · 06</p><h1 lang="en">RING DING</h1><p class="lead">聽懂直率的關心，也學會把關心說得合適。</p><p class="meta">作詞・作曲：あいみょん（依提供資料）</p>
<nav aria-label="本頁教材"><a href="#lyrics">41 行逐句</a><a href="#map">思緒地圖</a><a href="#grammar">${grammar.length} 組句構</a><a href="#words">${words.length} 個字詞</a><a href="#tone">語氣轉換</a><a href="#practice">回想練習</a><a href="#connections">跨曲連結</a></nav>
<div class="controls" hidden><button type="button" id="reading-toggle" aria-pressed="false">隱藏假名</button><button type="button" id="translation-toggle" aria-pressed="false">隱藏逐句中文</button></div></header>
<main><section class="start" aria-labelledby="start-title"><h2 id="start-title">今天先讀 4 行就好</h2><p>從${lLink(1)}到${lLink(4)}：先讀出日文，猜說話者正在做什麼，再展開解析。最後遮住中文，用自己的話說明「誰在說、說給誰、帶什麼態度」。初學者先認字詞；已有基礎再拆縮約、使役與否定範圍。</p><p>本曲可讀成親密的人用吐槽拉近距離，並把關心化成見面的承諾。這是有文本依據的閱讀角度，並非作者對人物關係的唯一解答。閱讀歌詞的粗話，與在生活中安慰朋友，是兩項需要分開練習的能力。</p><a class="primary" href="#l-1">開始第一句</a></section>
<section id="map"><h2>九站思緒地圖</h2><p>一次沿一條路走：情境 → 歌詞 → 句構 → 自己的句子。每個詞條和句構都能連回歌詞。</p><div class="map">${maps}</div></section>
<section id="lyrics"><h2>逐句讀懂，保留完整副歌</h2><p class="note">依您提供的日文保留41行及原表記，移除排版用的 HTML 空白碼。漢字上方為假名，中文是重新校準的教材譯文；補出的主語與情境會在解析說明。讀音不含高低音調標記。</p>${lyricHtml}</section>
<section id="grammar"><h2>${grammar.length} 組句構，把形式還原</h2><p>先找原句，再看自創例句；能辨認原句，不代表已能在新情境使用。</p>${grammarHtml}</section>
<section id="words"><h2>${words.length} 個字詞與片語</h2><div class="search" hidden><label for="word-search">找日文、假名或中文</label><input type="search" id="word-search" placeholder="例如：ほっとく、逞強、使役" autocomplete="off"><p role="status" id="word-count" class="meta"></p><button type="button" id="clear-search">顯示全部字詞</button></div><div class="vocab">${wordHtml}</div></section>
<section id="tone"><h2>讀懂語氣，再換成自己的關心</h2><p>同一句在熟人間可能是玩笑，也可能令人受傷。下面是日常改寫練習，不是把歌詞判成標準安慰法；請依對方意願和關係選詞。</p>
<article class="entry"><h3>從評價人格，改為詢問狀態</h3><p>${link('#l-25','第25行')}用根暗、うざい評價對方，口氣尖銳。</p><div class="example"><p lang="ja">つらそうだね。話[はな]したくなったら、聞[き]くよ。</p><p>你看起來很難受。想說的時候，我會聽。</p></div><p>保留傾聽的意圖，讓對方決定何時說。</p></article>
<article class="entry"><h3>從命令，改為可選擇的邀請</h3><p>${link('#l-30','第30行')}的出てこいよ是命令，說話者掌握主導。</p><div class="example"><p lang="ja">明日[あした]、よかったら一緒[いっしょ]に出[で]かけない？</p><p>明天方便的話，要不要一起出門？</p></div><p>否定疑問句可作邀請，並留下拒絕空間。</p></article>
<article class="entry"><h3>從「我真的不管你」，改為確認界線</h3><p>${link('#l-26','第26行')}用ぞ強硬回應對方想獨處的要求。</p><div class="example"><p lang="ja">今[いま]は一人[ひとり]でいたい？ 必要[ひつよう]な時[とき]は連絡[れんらく]してね。</p><p>現在想自己待一下嗎？需要的時候再聯絡我。</p></div><p>不把對方暫時不想說話理解為挑釁。</p></article>
<article class="entry"><h3>從誇張威脅，改為具體約定</h3><p>${link('#l-18','第18行')}的ぶん殴る即使在歌中是誇飾，字面仍是揍人。</p><div class="example"><p lang="ja">明日[あした]、会[あ]おうね。難[むずか]しかったら教[おし]えて。</p><p>明天見吧。不方便的話告訴我。</p></div><p>保留相見承諾，用可協調的條件取代威脅。</p></article>
<article class="entry"><h3>五處容易被中文帶偏的意思</h3><ul><li>${link('#l-4','言う訳ない')}是「才不會說」，不只是「沒說出口」。</li><li>${link('#l-8','言わせて欲しい')}是「希望讓我說」，不含「不得不」的義務。</li><li>${link('#l-12','わんわん泣く')}是「放聲大哭」；${link('#l-13','ぶりっ子')}是「裝可愛」，不只是撒嬌的小孩。</li><li>${link('#l-17','指切りげんまん')}是日本拉勾套語，中文的「一百年」不在原文中。</li><li>${link('#l-35','時の流れに身を任せ')}重點是順著時間，不直接保證「自然就會解決」。</li></ul></article></section>
<section id="practice"><h2>10 題主動回想</h2><p>每次挑2題，先回答再看解答。答對後改一個人物、時間或動詞，讓句構離開歌詞也能用。</p>${practiceHtml}
<article class="entry"><h3>一週的輕量複習</h3><ol><li>今天：讀第1–8行，練縮約與使役；最後閉眼說出2個重點。</li><li>明天：先回想昨天2個重點，再讀第9–18行，對比のに、くせに與ても。</li><li>第3天：讀第19–27行，練引用否定和てあげる，改寫一句關心。</li><li>第5天：讀第28–36行，比較兩次副歌的條件和動作；不要先看中文。</li><li>第7天：讀第37–41行，做5題回想，接到另一首歌找同一語法。</li></ol><p>這是可調整的安排，不是固定的「大腦最佳間隔」。常錯的題提早重看，能獨立解釋並造句的題延後。</p></article>
<article class="entry"><h3>教學者的20分鐘帶讀</h3><p>3分鐘：請學習者判斷開頭是安慰還是吐槽，接受有文字依據的不同解讀。7分鐘：示範拆一個引用句，再讓學習者拆另一句。5分鐘：兩人各把一個強硬表達改成可選擇的邀請，不要求分享私人經驗。5分鐘：合上解說，回答一題、造一句，再核對。</p><p>回饋只抓一個可修正點，例如「行動者弄反」或「否定範圍漏讀」。評量分成能讀、能解釋、能轉用三項，避免把熟悉旋律誤認為已經會用。</p></article></section>
<section id="connections"><h2>讓新歌接回記憶中的歌</h2><div class="connections">
<article class="entry"><h3>想要誰做？</h3><p>本曲${link('#g-let','使役＋てほしい')}希望「讓我說」；${link('../ai-no-hana/#g-request','〈愛の花〉てほしい')}希望對方前來。用同一問句檢查：真正做動作的是誰？</p></article>
<article class="entry"><h3>晴不晴，都還有行動</h3><p>本曲${link('#g-weather','肯定ても＋否定ても')}對照${link('../ai-no-hana/#g-zutomo','〈愛の花〉ずとも')}：前者明列兩種情況，後者是較書面的否定讓步。分辨「如果放晴」與「即使不放晴」。</p></article>
<article class="entry"><h3>往後走的方向</h3><p>本曲${link('#g-teiku','出していこう')}與${link('../ichi-ni-tsuite/#g-teiku','〈いちについて〉ていく')}都向往後延伸。這首加上意向形，邀請一起做；另一首可描寫持續的變化。</p></article>
<article class="entry"><h3>休息、哭泣與相伴</h3><p>回到${link('../idontlikemornings/','〈朝が嫌い〉')}找睡眠與不安，再到${link('../KimiWaRokkuWoKikanai/','〈君はロックを聴かない〉')}觀察用音樂靠近對方，最後到${link('../marigold/','〈マリーゴールド〉')}比較陪伴如何被描寫。每次選一個相同概念與一個不同說法，不必一次重讀全部。</p></article></div><a href="../songs/">返回完整歌曲目錄 →</a></section>
<section id="sources"><h2>學習依據與查核入口</h2><p>「全向」在此指讀音、詞義、句構、語氣、情境、產出六個入口；是本教材的編排方式，不是宣稱已被驗證的獨立腦科學療法。地圖用來引導比較，回想題用來檢查是否真的能提取。</p><ul>
<li><a href="https://www.nature.com/articles/s44159-022-00089-1" rel="noreferrer">Carpenter、Pan、Butler（2022）：間隔學習與提取練習回顧</a>。支持分散練習、主動提取和校準自我判斷的方向；不能推出人人相同的複習天數。</li>
<li><a href="https://www.nature.com/articles/s44271-025-00234-5" rel="noreferrer">2025：線上講課中插入測驗的研究</a>。以703名大學與社區學院學生檢驗學習中的提取練習；並非專門測試這份日文歌詞教材。本頁採先作答再核對，效果需由自己的回想表現觀察。</li>
<li><a href="https://kotobank.jp/word/わんわん-666104" rel="noreferrer">辭典：わんわん</a>。核對大聲哭泣與犬吠是不同語境的用法。</li>
<li><a href="https://www.aimyong.net/news/detail/3532?lang=zh-tw" rel="noreferrer">AIMYON 官方：RING DING 音樂錄影帶入口</a>。聆聽時挑一小段對照，先試著辨音再看假名；不以合成語音代替原唱。</li>
<li><a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag" rel="noreferrer">Google：搜尋索引指令說明</a>。本頁有noindex；這是請搜尋引擎不收錄，不是密碼保護。</li></ul><p class="meta">非官方個人學習教材。日文依使用者提供文字；中文、解析與練習為本教材整理，不冒稱AIMYON官方教學或心理健康建議。資料核對：2026-09-08。</p></section></main>
<footer><a href="#top">回到頁首</a> · <a href="../songs/">歌曲學習帳</a></footer></body></html>`;
// Annotate the authored examples in the static template as well as the dataset.
const output = html.replace(/([\p{Script=Han}々]+)\[([^\]]+)\]/gu,'<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const ids=[...output.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length) throw Error('Duplicate anchor ids');
for(const m of output.matchAll(/href="#([^"]+)"/g)) if(!ids.includes(m[1])) throw Error('Broken anchor '+m[1]);
for(const m of output.matchAll(/href="(\.\.\/[^"#]+)(?:#([^"]+))?"/g)) {
 const path=m[1]+(m[1].endsWith('/')?'index.html':'');
 const target=readFileSync(new URL(path,import.meta.url),'utf8');
 if(m[2]&&!target.includes(`id="${m[2]}"`)) throw Error('Missing cross-song anchor '+m[0]);
}
// All kanji in the supplied lyric must have a reading, including compounds.
for(const [ja] of lines) if(/[\p{Script=Han}々]/u.test(ja.replace(/[\p{Script=Han}々]+\[[^\]]+\]/gu,''))) throw Error('Unannotated lyric: '+ja);
writeFileSync(new URL('./index.html',import.meta.url),output);
console.log(`Built RING DING: ${lines.length} lines, ${grammar.length} grammar topics, ${words.length} words, ${practice.length} exercises; all anchors and lyric readings checked.`);
