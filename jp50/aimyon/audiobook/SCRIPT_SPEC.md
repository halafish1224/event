# Script Specification｜邊放邊記憶的有聲教材腳本規格

版本：v1.0
更新：2026-09-27

---

# 1. 目標

每一課不是「把課文唸出來」，而是做成一個可獨立播放的 learning session。

標準主課：**8–11 分鐘**。

每個音軌必須讓學習者至少經歷：

> 聽到 → 預測 → 安靜回想 → 開口 → 得到答案 → 換情境 → 再回想 → 自己生成

---

# 2. 標準 Track Architecture

以下時間是製作預設，不是神經科學的固定最佳秒數。正式版本可根據試聽資料調整。

## 00:00–00:25｜Orientation

功能：只說今天要學會什麼。

範例：

> 「今天只處理一件事：看到『看』，你能不能分出 見る、見える、見られる。」

規則：

- 不先講完整答案。
- 不做長前言。
- 不播放有人聲背景音樂。

---

## 00:25–01:10｜Cold Retrieval

先叫回上一課或已知概念。

主持人：

> 「先不看文字。『我主動看天空』，動詞是什麼？」

標記：

`[RECALL_PAUSE 5s]`

之後才播：

> 「見る。空を見る。」

目的：讓記憶系統先工作，再收到 feedback。

---

## 01:10–02:40｜Input Chunk A

每個 chunk 最多處理：

- 1 個核心規則，或
- 2–3 個高度相關詞。

日文輸入順序：

1. 自然速度一次。
2. 中文核心意思。
3. 必要時分節慢讀一次。
4. 自然速度再一次。

不要每個詞連續重複五遍。

---

## 02:40–03:30｜Retrieval Round 1

題型優先：

- 中文 cue → 日文。
- 情境 → 選概念。
- 原形 → 變形。

停頓後才播答案。

預設 pause：4–6 秒。

---

## 03:30–05:00｜Contrast / Meaning Boundary

如果本課有容易混淆項目，必須在此處比較。

例如：

> 見える：自然看得到。
>
> 見られる：能力或條件允許看。

然後立刻給 minimal-pair retrieval。

---

## 05:00–06:15｜Speak / Transform

要求真正開口。

例如：

> 「現在把 会う 改成『能見到』。」
>
> `[PRODUCTION_PAUSE 5s]`
>
> 「会える。」

再變一步：

> 「如果能見到？」
>
> `[PRODUCTION_PAUSE 6s]`
>
> 「会えたら。」

這裡的「說出口」是 retrieval / production 任務，不宣稱只是朗讀本身就能保證更深記憶。

---

## 06:15–07:30｜Context Generation

至少一次要求學習者自己創造 context。

主持人：

> 「不要照我的句子。用你今天真的看得到的一個東西，造一句 ～が見える。」

`[GENERATION_PAUSE 9s]`

答案不是只有一個。

主持人只提供一個示例：

> 「例如：窓から空が見える。」

---

## 07:30–08:45｜Delayed Retrieval

把音軌前段學過的概念重新問一次，但換題型。

例如前面問：

> 「自然看得到是哪一個？」

後面改問：

> 「我說：山が見られる。這句若要表達『山自然出現在視野』，哪裡要改？」

這一輪避免只靠短期工作記憶。

---

## 08:45–09:30｜Exit Retrieval

最後不做內容摘要式「再講一次」。

改成三個短 cue：

1. 今天最重要規則？
2. 一組最容易混淆的形式？
3. 自己造一句。

每題停 3–7 秒。

最後只說：

> 「如果三題有一題卡住，不需要重播整課；下一次複習系統只帶回那一個節點。」

---

# 3. Pause Vocabulary

所有腳本使用抽象 pause token，之後再由 renderer 轉 SSML。

## MICRO_PAUSE

`[PAUSE 0.8s]`

用途：語意群之間，不是 retrieval。

## ECHO_PAUSE

`[PAUSE 2.2s]`

用途：讓學習者跟讀短詞或短句。

## RECALL_PAUSE

`[PAUSE 4–6s]`

用途：有唯一或近似唯一答案的 active recall。

## GENERATION_PAUSE

`[PAUSE 8–12s]`

用途：自行造句、解釋差異、Micro Narrative。

## SELF_RATING_PAUSE

`[PAUSE 2s]`

用途：讓學習者在心裡標記：Easy / Good / Hard / Again。

這些秒數是 production defaults，必須在 pilot 後依實際 response latency 修正。

---

# 4. 語音設計

## Speaker A｜zh-TW narrator

負責：

- 任務說明。
- 中文語意。
- retrieval cue。
- corrective feedback。

要求：

- 語氣冷靜。
- 不要綜藝主持風。
- 問完問題後真的停止說話。

## Speaker B｜Japanese voice

負責：

- 單字。
- 例句。
- minimal pairs。
- 聽辨題。

要求：

- 自然日語 prosody。
- 主要例句至少保留一次自然速度版本。
- 慢讀只作 phonological support，不能把所有日文都永久慢速化。

---

# 5. Speed Profiles

不把特定 speech rate 宣稱成神經科學最佳值。

建立三種抽象 profile：

- `JA_NATURAL`：自然清楚速度。
- `JA_SUPPORT`：新句第一次拆解時稍慢。
- `JA_RETRIEVAL`：答案揭示時以自然速度為主。

初學課可先 Support，再 Natural；熟練後逐步取消 Support。

---

# 6. Audio-first / Read-along / Recall-only

同一腳本應支援三種輸出。

## Mode A｜Audio First

- 不顯示全文。
- 強制真正聽辨。

## Mode B｜Read Along

- EPUB / transcript 顯示 ruby。
- 第二輪播放使用。
- 對建立字形—聲音 mapping 有幫助。

## Mode C｜Recall Only

- 刪去大部分講解。
- 只保留 cue、silence、answer。
- 約 3–5 分鐘。

---

# 7. Memory Loop Tags

腳本檔需標記：

```text
[ORIENT]
[RECALL id=...]
[ANSWER]
[TEACH id=...]
[JA_SUPPORT]
[JA_NATURAL]
[CONTRAST id=...]
[TRANSFORM]
[GENERATE]
[DELAYED_RECALL id=...]
[EXIT_RECALL]
```

Renderer 可以依 tag 產生：

- full lesson
- review lesson
- text transcript
- SSML
- quiz metadata

---

# 8. Retrieval 規則

## Rule A｜答案前一定有 silence

錯誤：

> 「自然看得到就是見える，請跟我說見える。」

正確：

> 「自然看得到，用哪一個？」
>
> `[PAUSE 5s]`
>
> 「見える。」

## Rule B｜答案不要永遠由選項提示

初期可以：

> 見る、見える、還是見られる？

後期改：

> 不給選項。自然看得到，請說出日文。

## Rule C｜答錯不立即十遍重複

提供 feedback，插入其他內容，稍後再次提取。

---

# 9. Generation 規則

每個主課至少一題必須是 open generation。

層級：

1. 給完整句框。
2. 給兩個關鍵詞。
3. 只給文法限制。
4. 只給情境。

例如 Lesson 1：

Level 1：

> 今の＿＿を伝えたい。

Level 4：

> 說一句描述你此刻感受的日文。

---

# 10. Contrast Interleaving

不能在一課只講 A，幾天後才講 B。

只要 A/B 容易混淆，就要在同一音軌或 Review Track 交錯：

- 見える / 見られる
- 聞ける / 聞こえる
- 知る / 分かる
- 寒い / 冷たい
- たい / てほしい / つもり
- ていく / てくる

---

# 11. Unit Review

每 5 課後加入一個 8 分鐘 review track。

Review 不重新上課。

結構：

- 60% active recall。
- 25% contrast。
- 15% generation。

所有例句換語境，避免只記得原本句子。

---

# 12. Song Listening Mission

不朗讀完整歌曲歌詞。

每一 mission：4–6 分鐘。

流程：

1. 播放前先說 3 個 target nodes。
2. 學習者自行到合法音樂服務播放歌曲。
3. 播完回到教材。
4. 回想聽到哪些 target。
5. 做 2–3 題 grammar / semantic retrieval。

例如：

> 「這次聽〈ハルノヒ〉，不要追全部意思。只找未來、條件、時間方向。」

---

# 13. Background Sound Policy

教學內容原則：silence-first。

可以有：

- 0.3–0.8 秒短 earcon 區分新章節。
- intro/outro 極短無人聲聲響。

不要有：

- 有歌詞的背景歌曲。
- 長時間 ambient track 掩蓋語音。
- 宣稱某 Hz 具有記憶強化效果的 binaural beat。

Retrieval pause 必須真的安靜。

---

# 14. Attention Reset

每約 2–3 分鐘切換一次任務型態：

- listen
- recall
- discriminate
- speak
- generate

不是因為存在固定 2–3 分鐘的「大腦注意力極限」，而是為了避免單一處理模式與被動播放。

---

# 15. 不建議一邊做高負荷其他工作

「邊放邊記憶」不等於可以一邊做需要語言／工作記憶的另一件事。

推薦：

- 走路。
- 通勤坐車。
- 整理簡單物品。

不推薦：

- 同時閱讀另一篇文章。
- 同時聊天。
- 同時播放其他有人聲內容。

核心 retrieval 時最好能短暫把注意力放回音軌。

---

# 16. TTS / SSML Mapping

抽象 tag 最後可映射：

```xml
<speak>
  <voice name="zh-TW-narrator">自然看得到，用哪一個？</voice>
  <break time="5s"/>
  <voice name="ja-JP-teacher">見える。山が見える。</voice>
</speak>
```

實際 provider 的 voice 名稱與 rate syntax 不寫死在教材資料。

---

# 17. QA Checklist

每一課發布前檢查：

- [ ] 8–11 分鐘內。
- [ ] 至少 2 次 spaced retrieval。
- [ ] 至少 1 次 production。
- [ ] 至少 1 次 open generation。
- [ ] 核心答案前有 silence。
- [ ] 沒有把答案先講出來再假裝問問題。
- [ ] 有易混淆項目時有 contrast。
- [ ] 日文至少一次自然速度。
- [ ] 沒有完整歌曲歌詞。
- [ ] 沒有腦波神效宣稱。
- [ ] 不需要看螢幕也能完成核心學習。
- [ ] transcript 可另供 Read Along 使用。
