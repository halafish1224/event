import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readdirSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { grammar, parts, practice, rows, title, words } from '../content.mjs';
import coverage from '../coverage.json' with { type: 'json' };

const outDir = fileURLToPath(new URL('./', import.meta.url));
const output = join(outDir, 'harunohi-jp50-kobo.epub');
const work = mkdtempSync(join(tmpdir(), 'harunohi-epub-'));
const epub = join(work, 'EPUB');
mkdirSync(join(work, 'META-INF'), { recursive: true });
mkdirSync(epub, { recursive: true });

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const ruby = (value) => esc(value).replace(/([\p{Script=Han}々ヶ]+)\{([^{}]+)\}/gu,
  '<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const xhtml = (pageTitle, body) => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="zh-Hant" xml:lang="zh-Hant">
<head><meta charset="UTF-8"/><title>${esc(pageTitle)}</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>
<body>${body}</body></html>`;

const lineRows = rows.split('\n').map((row) => row.split('|'));
const grammarRows = grammar.split('\n').map((row) => row.split('|'));
const wordRows = words.split('\n').map((row) => row.split('|'));

// These are original, non-lyric semantic summaries. They preserve the audited
// stable-ID sequence without reproducing or enabling reconstruction of lyrics.
const summaries = [
  '故事先把聽者帶到北千住的交通場景。',
  '一道帶金屬色澤的入口細節補足畫面。',
  '兩人翻看舊事，記憶以帶留白的意象浮現。',
  '曾共同停留的座位成為承諾的背景。',
  '視線仍無法穿透前方，語意要接到下一句。',
  '即使未知，兩人仍把共同約定交給未來。',
  '耐過寒意的自然與動物映照人的處境。',
  '景物被讀成兩人關係的一面鏡子。',
  '尚未綻放的生命以動勢表示努力。',
  '畫面停在溫柔而持續的笑意。',
  '說話者替對方卸下立刻前進的壓力。',
  '願望把分散的珍惜想像成日後的聚合。',
  '在變化到來前，請讓等待保持下去。',
  '敘事把尚未展開的生活交給兩人共同經歷。',
  '語氣像是先試著同行，不急著保證結果。',
  '同行的最低約定，是仍把愛傳達出來。',
  '未來被擬人化，帶著未知的表情靠近。',
  '自問語氣讓預測保持開放，不當成事實。',
  '若能互相承接強項與脆弱，關係便可能改變。',
  '說話者好奇這個條件會帶來何種驚喜。',
  '未知之外，當下已經有可感受到的幸福。',
  '時間往後推，人生也可能暫時只剩一人。',
  '另一種未來則保留兩人相伴的可能。',
  '珍惜的對象可在日常裡繼續累積。',
  '步伐輕快地越過熟悉的城市座標。',
  '衣著色彩把鏡頭聚焦到同行者身上。',
  '熟悉的人此刻顯得格外遙遠。',
  '加快的足音透露情緒或距離正在改變。',
  '說話者察覺自己需要更坦率。',
  '這份需要仍包在主觀、未完全確定的感覺裡。',
  '受到溫柔照顧，反而暴露自己的鬆懈與依賴。',
  '過度害怕的狀態被收進人物背影。',
  '一個輕放手掌的動作帶出被照顧的視角。',
  '焦點落在那位不可被替代、走在前方的人。',
  '說話者轉而把願望投向未來本身。',
  '希望未來能以友善姿態回應兩人。',
  '生活的辛苦和疲憊的身體一起成為主體。',
  '它們持續尋找一個能放下緊繃的歸處。',
  '暮色提醒人一天將盡，也讓情緒沉澱。',
  '某段記憶中的燈光在往後被重新想起。',
  '回望之時，珍貴之處或許才會被察覺。',
  '安慰再次出現，這次承接了日常疲憊。',
  '聚合成花束的願望重現，形成情感回環。',
  '敘事回到那個仍看不清的共同未來。',
  '早先的相互承諾也再次被喚回。',
  '未來的模樣仍以提問方式展開。',
  '靠近的想像改用較口語的縮約呈現。',
  '互補條件重現，提醒它仍是假設而非完成。',
  '對可能發生之事的好奇再次被提出。',
  '當下幸福再次成為面對未知的支點。',
  '一人的人生分支重新出現。',
  '兩人的人生分支也再次被放在旁邊比較。',
  '說話者否定數量的上限，把視野向外擴張。',
  '共同增加珍惜之物的提議，轉成商量語氣。',
  '故事回到熟悉生活圈中的車站月台。',
  '一抹水藍色被當作可以打招呼的景物。',
  '迎接歸來的話語，讓場景帶上家的溫度。',
  '最後以踩過搖曳影子的日常瞬間收束幸福。'
];

if (lineRows.length !== 58 || summaries.length !== lineRows.length) throw new Error('Sentence summary coverage mismatch');
if (coverage.sentence_ids.length !== lineRows.length) throw new Error('Stable ID coverage mismatch');
if (grammarRows.length !== 29 || wordRows.length !== 48 || practice.length !== 16) throw new Error('Source counts changed');

const checkpoints = [
  ['00:00–', '先辨認車站與入口名詞；這一段主要建立場所。'],
  ['承諾段', '聽到否定的感知形式時，先等中心名詞出現，再找相互動作。'],
  ['花苞段', '區分「不必做」、請求與等待狀態，三種語氣不要混成命令。'],
  ['共同生活段', '抓住「試著做」與「一邊做」；它們分別說嘗試和同時動作。'],
  ['未來段', '聽條件形與句尾自問；一個設條件，一個保留不確定。'],
  ['背影段', '先找受惠方向，再判斷「非你不可」限定的是人，不是命令動作。'],
  ['歸處段', '注意持續動作與推想，讀出疲憊如何轉成日後才懂的珍惜。'],
  ['尾段', '辨認重複句位的 reference 功能，最後回到月台、歸來與日常幸福。']
];

const sentenceHtml = parts.map(([start, heading, guide], partIndex) => {
  const end = partIndex + 1 < parts.length ? parts[partIndex + 1][0] - 1 : lineRows.length;
  const items = [];
  for (let i = start; i <= end; i += 1) {
    const id = coverage.sentence_ids[i - 1];
    const grammarId = lineRows[i - 1][2];
    const repeated = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52].includes(i);
    items.push(`<article class="card" id="${id}"><h3>${id}</h3><p>${esc(summaries[i - 1])}</p><p class="meta">句型索引：<a href="grammar.xhtml#g-${esc(grammarId)}">${esc(grammarId)}</a>${repeated ? ' · 重複段：請回看首次出現的同句型／意象解析，不另建第二份歌詞資料。' : ''}</p></article>`);
  }
  return `<section><h2>${partIndex + 1}｜${esc(heading)}</h2><p>${esc(guide)}</p>${items.join('')}</section>`;
}).join('');

const vocabHtml = wordRows.map(([term, reading, kind, meaning, memory], index) =>
  `<article class="card" id="v-${index + 1}"><h3 lang="ja"><ruby>${esc(term)}<rp>（</rp><rt>${esc(reading)}</rt><rp>）</rp></ruby></h3><p class="meta">${esc(kind)}</p><p>${esc(meaning)}</p><p><strong>辨析：</strong>${esc(memory)}</p></article>`).join('');

const grammarHtml = grammarRows.map(([id, label, formation, contrast, example, translation], index) =>
  `<article class="card" id="g-${esc(id)}"><h3>${index + 1}｜${esc(label)}</h3><p>${esc(formation)}</p><p><strong>Contrast：</strong>${esc(contrast)}</p><div class="example"><p lang="ja">${ruby(example)}</p><p>${esc(translation)}</p></div></article>`).join('');

const practiceHtml = practice.map(([question, answer, grammarId], index) =>
  `<article class="card" id="q-${index + 1}"><h3>${index < 8 ? '回想' : '生成'} ${index < 8 ? index + 1 : index - 7}</h3><p>${esc(question)}</p><details><summary>核對答案與理由</summary><p>${ruby(answer)}</p><p><a href="grammar.xhtml#g-${esc(grammarId)}">回看句型：${esc(grammarId)}</a></p></details></article>`).join('');

writeFileSync(join(work, 'mimetype'), 'application/epub+zip');
writeFileSync(join(work, 'META-INF', 'container.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`);
writeFileSync(join(epub, 'styles.css'), `body{font-family:serif;line-height:1.75;margin:5%;color:#20231f;background:#fff}h1,h2,h3{line-height:1.35;page-break-after:avoid}h1{font-size:1.8em}h2{margin-top:1.8em;border-bottom:.08em solid #777;padding-bottom:.25em}.card{margin:1em 0;padding:.85em;border:.08em solid #aaa;break-inside:avoid}.meta{font-size:.9em;color:#4b514b}.example{padding:.7em;border-left:.25em solid #666}a{color:inherit;text-decoration:underline}ruby rt{font-size:.55em}nav ol{padding-left:1.3em}table{border-collapse:collapse;width:100%}th,td{border:.08em solid #777;padding:.4em;text-align:left}details{margin:.5em 0}.cover{margin-top:20%;text-align:center}.kicker{letter-spacing:.08em}.notice{border:.12em solid #555;padding:1em}`);
writeFileSync(join(epub, 'title.xhtml'), xhtml(title, `<section class="cover" epub:type="cover"><p class="kicker">JP50 · AIMYON 學習版</p><h1 lang="ja">${esc(title)}</h1><p>短時間導讀、導聽與離線複習</p><p>版本日期：2026-09-30</p></section><section class="notice"><h2>閱讀範圍</h2><p>本書不是歌詞備份，不收錄可重組的完整歌詞。句位沿用 58 個 stable IDs；內容使用原創中文語意摘要、詞彙、文法、對比與回想任務。</p><p>程度帶：N5～N3。先理解敘事與語氣，再回查形式。</p></section>`));
writeFileSync(join(epub, 'quick-listen.xhtml'), xhtml('3–5 分鐘快速導聽', `<h1>3–5 分鐘快速導聽</h1><p>歌曲從熟悉月台出發，把未知、承諾、互相承接與日常歸處連成一條時間線。第一遍只抓場景和情緒；第二遍再聽否定、條件、受惠與時間方向。</p><ol>${checkpoints.map(([label, note]) => `<li><strong>${esc(label)}</strong>：${esc(note)}</li>`).join('')}</ol><h2>結構速覽</h2><ol>${parts.map(([start, heading, guide], index) => `<li><a href="sentences.xhtml#${coverage.sentence_ids[start - 1]}">${index + 1}｜${esc(heading)}</a>：${esc(guide)}</li>`).join('')}</ol>`));
writeFileSync(join(epub, 'sentences.xhtml'), xhtml('句位導讀', `<h1>句位導讀</h1><p>每個 ID 對應網頁教材中的既有句位。摘要只說該位置在敘事中的功能；重複段落以 reference 回看首次解析。</p>${sentenceHtml}`));
writeFileSync(join(epub, 'vocabulary.xhtml'), xhtml('單字與片語', `<h1>48 個單字與片語</h1><p>保留讀音、詞性／原形、核心意思與必要辨析；搭配均取自已審核教材，但不排列成歌詞。</p>${vocabHtml}`));
writeFileSync(join(epub, 'grammar.xhtml'), xhtml('句型與文法', `<h1>29 組句型與文法</h1><p>先看形成方式，再用 Contrast 排除常見誤讀。例句皆為教材原創。</p>${grammarHtml}`));
writeFileSync(join(epub, 'practice.xhtml'), xhtml('Retrieval 與生成', `<h1>Retrieval 與生成</h1><p>先口頭回答，再展開答案。前 8 題追回形式，後 8 題把同一概念換成自己的生活句。</p>${practiceHtml}`));
writeFileSync(join(epub, 'connections.xhtml'), xhtml('跨歌曲連結與完成度', `<h1>跨歌曲連結</h1><p class="notice"><strong>狀態：partial。</strong>關聯由 learning-map 管理，尚未完成全曲雙向 audit，因此不宣稱百分比。</p><ul><li>〈愛の花〉：比較希望事件發生與受惠視角。</li><li>〈裸の心〉：比較縮約否定條件與後悔。</li><li>〈スケッチ〉：從受惠動詞辨認動作者與受益者。</li><li>〈いちについて〉：比較實際移動與朝未來延伸的時間方向。</li></ul><h2>可驗證完成度</h2><table><tbody><tr><th>歌曲結構</th><td>7 段，verified</td></tr><tr><th>stable sentence IDs</th><td>58 / 58，verified</td></tr><tr><th>原創語意摘要</th><td>58 / 58，verified</td></tr><tr><th>詞彙</th><td>48 項，verified</td></tr><tr><th>文法</th><td>29 組，verified</td></tr><tr><th>Retrieval / 生成</th><td>16 題，verified</td></tr><tr><th>跨歌曲雙向連結</th><td>partial</td></tr></tbody></table>`));
writeFileSync(join(epub, 'nav.xhtml'), xhtml('目錄', `<nav epub:type="toc" id="toc"><h1>目錄</h1><ol><li><a href="title.xhtml">書籍資訊</a></li><li><a href="quick-listen.xhtml">3–5 分鐘快速導聽</a></li><li><a href="sentences.xhtml">58 個句位導讀</a></li><li><a href="vocabulary.xhtml">48 個單字與片語</a></li><li><a href="grammar.xhtml">29 組句型與文法</a></li><li><a href="practice.xhtml">Retrieval 與生成</a></li><li><a href="connections.xhtml">跨歌曲連結與完成度</a></li></ol></nav>`));
writeFileSync(join(epub, 'package.opf'), `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="zh-Hant" prefix="dcterms: http://purl.org/dc/terms/">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">urn:jp50:aimyon:harunohi:2026-09-30</dc:identifier><dc:title>ハルノヒ｜JP50 AIMYON 學習版</dc:title><dc:language>zh-Hant</dc:language><dc:language>ja</dc:language><dc:creator>JP50</dc:creator><dc:description>不含完整歌詞的 N5–N3 導讀、導聽、詞彙、文法與回想練習。</dc:description><meta property="dcterms:modified">2026-09-30T14:24:00Z</meta></metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="css" href="styles.css" media-type="text/css"/><item id="title" href="title.xhtml" media-type="application/xhtml+xml"/><item id="quick" href="quick-listen.xhtml" media-type="application/xhtml+xml"/><item id="sentences" href="sentences.xhtml" media-type="application/xhtml+xml"/><item id="vocabulary" href="vocabulary.xhtml" media-type="application/xhtml+xml"/><item id="grammar" href="grammar.xhtml" media-type="application/xhtml+xml"/><item id="practice" href="practice.xhtml" media-type="application/xhtml+xml"/><item id="connections" href="connections.xhtml" media-type="application/xhtml+xml"/></manifest>
<spine page-progression-direction="ltr"><itemref idref="title"/><itemref idref="quick"/><itemref idref="sentences"/><itemref idref="vocabulary"/><itemref idref="grammar"/><itemref idref="practice"/><itemref idref="connections"/></spine>
</package>`);

const fixedTime = new Date('2026-09-30T14:24:00Z');
const normalizeTimes = (path) => {
  if (statSync(path).isDirectory()) for (const name of readdirSync(path)) normalizeTimes(join(path, name));
  utimesSync(path, fixedTime, fixedTime);
};
normalizeTimes(work);
rmSync(output, { force: true });
execFileSync('zip', ['-X0', output, 'mimetype'], { cwd: work, stdio: 'inherit' });
execFileSync('zip', ['-Xr9', output, 'META-INF', 'EPUB'], { cwd: work, stdio: 'inherit' });
rmSync(work, { recursive: true, force: true });
console.log(`Built ${output}`);
