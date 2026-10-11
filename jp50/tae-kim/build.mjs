import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const batches = readdirSync(root).filter((name) => /^batch-\d{2}\.json$/.test(name))
  .sort().map((name) => JSON.parse(readFileSync(path.join(root, name), 'utf8')));
const topics = batches.flatMap((batch) => batch.topics.map((topic) => ({ ...topic, batch: batch.batch })));
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const usedIds = new Set();
for (const topic of topics) {
  if (!/^[a-z][a-z-]*$/.test(topic.id) || usedIds.has(topic.id)) throw new Error(`Invalid/duplicate topic: ${topic.id}`);
  usedIds.add(topic.id);
}

function ruby(example) {
  const readings = new Map(example.ruby);
  const words = [...readings.keys()].sort((a, b) => b.length - a.length);
  let result = '';
  for (let index = 0; index < example.jp.length;) {
    const word = words.find((value) => example.jp.startsWith(value, index));
    if (word) {
      result += `<ruby>${escape(word)}<rt>${escape(readings.get(word))}</rt></ruby>`;
      index += word.length;
    } else result += escape(example.jp[index++]);
  }
  return result;
}

function textCard(topic) {
  return `${topic.title}\n\n一句規則：${topic.rule}\n\n` + topic.examples.map((example) =>
    `${example.jp}\n讀音：${example.kana}\n意思：${example.zh}\n`).join('\n') +
    `\n易錯提醒：${topic.tip}\n\n回想：${topic.question}\n請先想五秒，再繼續。\n答案：${topic.answer}\n\n歌曲拆讀：${topic.song_task}\n\n本站對照：\n` +
    topic.links.map(([label, href]) => `${label} https://event.itigre.com${href}`).join('\n') +
    `\n參考章節：Tae Kim · ${topic.source_title}\n${topic.source}\n\n本卡使用原創例句，非原站翻譯。\n`;
}

const meta = '版本 1.1.0｜2026-10-12';
for (const batch of batches) {
  const number = batch.batch.slice(2);
  writeFileSync(path.join(root, `batch-${number}.txt`), `JP50｜Tae Kim 對照速學 ${batch.batch}\n${meta}\n\n${batch.topics.map(textCard).join('\n==========\n\n')}\n`);
}
for (const topic of topics) writeFileSync(path.join(root, `${topic.id}.txt`), `JP50｜Tae Kim 對照速學 ${topic.batch}\n${meta}\n\n${textCard(topic)}\n`);
writeFileSync(path.join(root, 'all-topics.txt'), `JP50｜Tae Kim 對照速學 TK01–TK02\n${meta}\n\n${topics.map(textCard).join('\n==========\n\n')}\n`);

const lessonTopics = {};
for (const topic of topics) for (const [, href] of topic.links) {
  const lessonId = href.match(/\/learn\/(lesson_\d{2})\//)?.[1];
  if (lessonId) (lessonTopics[lessonId] ??= []).push({ id: topic.id, title: topic.title });
}
writeFileSync(path.resolve(root, '../aimyon/aimyon-japanese/components/tae-kim-topics.json'), JSON.stringify(lessonTopics, null, 2) + '\n');

const html = `<!doctype html>
<html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="theme-color" content="#f7f2e8"><title>Tae Kim 對照速學｜JP50・AIMYON</title><meta name="description" content="六組原創繁中速學卡：句尾狀態、は／も、ね／よ、い／ナ、の、名詞列舉と／や，連回 AIMYON 課程。">
<style>:root{--bg:#f7f2e8;--paper:#fffdf8;--ink:#252922;--muted:#5e665d;--line:#d9d2c6}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{margin:0;background:var(--bg);color:var(--ink);font:1.06rem/1.8 system-ui,"PingFang TC","Microsoft JhengHei",sans-serif}main{width:min(980px,calc(100% - 32px));margin:auto;padding:24px 0 56px}a{color:#245846;text-underline-offset:4px}a:focus-visible,summary:focus-visible{outline:3px solid #aa563a;outline-offset:5px}nav,.links{display:flex;flex-wrap:wrap;gap:10px}nav a,.links a{display:inline-block;padding:9px 14px;border:1px solid var(--line);border-radius:12px;background:var(--paper)}header{padding:30px 0 18px}h1{font-size:clamp(2rem,7vw,3.4rem);line-height:1.2;letter-spacing:-.035em;margin:15px 0}h2{font-size:clamp(1.5rem,4vw,2rem);line-height:1.4;margin:12px 0}h3{font-size:1.1rem;margin:22px 0 8px}p{margin:9px 0}.meta,.small,.source,footer{font-size:.9rem;color:var(--muted)}.cards{display:grid;gap:24px}.card{padding:28px;border:1px solid var(--line);border-top:6px solid var(--accent);border-radius:20px;background:var(--paper);overflow-wrap:anywhere}.tag{font-size:.88rem;font-weight:800;color:var(--accent)}.rule{font-weight:700}.examples{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}.example{padding:18px;background:#f4f1e9;border-radius:14px}.jp{font-size:clamp(1.3rem,4vw,1.7rem);font-weight:700;line-height:2.2;margin:0}.kana{font-size:.94rem;color:var(--muted)}rt{font-size:.6em;font-weight:500}.tip{border-left:3px solid var(--accent);padding-left:14px}.practice{margin:20px 0;padding:14px;background:#f0f3ed;border-radius:12px}details{padding:14px 18px;border:1px dashed var(--line);border-radius:12px}summary{cursor:pointer;font-weight:750;min-height:30px}.answer{padding-top:8px}.next{margin:26px 0;padding:24px;background:#eee9dd;border-radius:18px}footer{margin-top:32px;padding-top:18px;border-top:1px solid var(--line)}@media(max-width:620px){.examples{grid-template-columns:1fr}.card{padding:20px}nav{gap:7px}nav a{font-size:.92rem;padding:9px 11px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}</style></head>
<body><main><nav aria-label="學習入口"><a href="/jp50/">JP50 總入口</a><a href="/jp50/aimyon/">AIMYON 字卡</a><a href="/jp50/aimyon/aimyon-japanese/learn/">30 課</a><a href="/jp50/downloads/#tae-kim">教材下載</a></nav>
<header><p class="meta">TAE KIM 對照速學 · TK01–TK02 · 2026/10/12</p><h1>先讀一句，<br>再抓住意思。</h1><p>每組一句規則、兩個例句、一題回想。從 Tae Kim 推薦的 Complete Guide 基礎範疇出發，接回 AIMYON 歌曲理解。</p><nav aria-label="速學主題">${topics.map((topic) => `<a href="#${topic.id}">${escape(topic.title)}</a>`).join('')}</nav><p class="small"><a href="./all-topics.txt" download>下載六組完整 TXT</a> · <a href="./batch-01.txt" download>TK01</a> · <a href="./batch-02.txt" download>TK02</a> · <a href="https://guidetojapanese.org/learn/complete/" target="_blank" rel="noopener noreferrer">Tae Kim Complete Guide ↗</a></p></header>
<div class="cards">${topics.map((topic, index) => `<section class="card" id="${topic.id}" style="--accent:${topic.color}" aria-labelledby="${topic.id}-title"><span class="tag">${String(index + 1).padStart(2, '0')} · ${topic.batch} · ${escape(topic.tag)}</span><h2 id="${topic.id}-title">${escape(topic.title)}</h2><p class="rule">${escape(topic.rule)}</p><div class="examples">${topic.examples.map((example) => `<div class="example"><p class="jp" lang="ja">${ruby(example)}</p><p class="kana" lang="ja">${escape(example.kana)}</p><p>${escape(example.zh)}</p></div>`).join('')}</div><p class="tip">${escape(topic.tip)}</p><h3>先回想，再看答案</h3><p>${escape(topic.question)}</p><details><summary>想好後，展開答案</summary><p class="answer">${escape(topic.answer)}</p></details><p class="practice">歌曲拆讀：${escape(topic.song_task)}</p><div class="links">${topic.links.map(([label, href]) => `<a href="${escape(href)}">${escape(label)} →</a>`).join('')}<a href="./${topic.id}.txt" download>本主題 TXT ↓</a></div><p class="source">參考：<a href="${topic.source}" target="_blank" rel="noopener noreferrer">Tae Kim · ${escape(topic.source_title)} ↗</a></p></section>`).join('\n')}</div>
<aside class="next"><h2>接著怎麼用？</h2><p>先回想 → 點進對應單課 → 選一首歌找同一個概念。名詞列舉可搭配 L17 比較動作列舉；形容詞可接回 L11、L14。</p><p class="small">下一批：動詞與動作助詞，核對原站章節後銜接既有 L06～L10。N5～N3 是整體選材目標；目前六組聚焦基礎補強。</p></aside>
<footer>教學方向與概念參考 Tae Kim's Guide to Learning Japanese；繁中說明、例句與練習由本站原創編寫。每個主題附原站章節，供延伸閱讀。</footer></main></body></html>\n`;
writeFileSync(path.join(root, 'index.html'), html);
console.log(`Built ${topics.length} quick-guide topics, ${batches.length} batches, ${Object.keys(lessonTopics).length} lesson mappings.`);
