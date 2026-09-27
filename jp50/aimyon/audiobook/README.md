# AIMYON 日文學習｜Listening-Reading Audiobook

這個資料夾把既有 30 課教材改寫成「可以直接聽、可以停下回想、可以跟讀與主動輸出」的有聲教材規格。

## 直接使用

### Unit 1 GitHub Pages 聽讀版

`https://event.itigre.com/jp50/aimyon/audiobook/listen/`

目前可直接使用：

- L01｜心・気持ち・想い・思う
- L02｜好き・恋・恋しい・愛・愛する
- L03｜見る・見える・見られる・見つめる
- L04｜聞く・聴く・聞ける・聞こえる・言う・伝える
- L05｜感知 Knowledge Graph
- UR1｜Unit 1 Retrieval Review

聽讀頁支援：

- 手機／桌面 RWD。
- 日文 ruby 讀音。
- 回想模式：先隱藏答案，點答案區再揭曉。
- 小字／標準／大字。
- 本機課程完成紀錄與 Unit 1 進度條。
- 上一課／下一課導覽。
- 每題明確標示建議的回想停頓秒數，方便搭配 Aurader 或其他 TTS 閱讀器。

頁面保留 `noindex, nofollow`，不主動提供搜尋引擎索引。

## 核心目標

不是把 EPUB 從頭念到尾，而是把每一課做成一個約 8–11 分鐘的 learning track：

1. 先提取舊知識。
2. 再聽新的日文聲音與意思。
3. 插入安靜停頓，要求學習者自己想答案。
4. 讓學習者開口重複、變形、辨析與造句。
5. 在同一音軌後段再次提取同一概念，而不是緊鄰機械重複。
6. 下一課再交錯帶回舊概念。

## 研究立場

本專案採用 spacing、retrieval practice、production、generation/self-explanation、contextual prediction 與 contrast/interleaving 的證據作教材設計依據。

EEG／ERP／腦神經科學研究只用來理解「語意提取、語言預測、產出與記憶」的機制，不把特定腦波頻率當成學習處方。本專案不加入宣稱能以 4–8 Hz、雙耳節拍或所謂 theta 音樂直接強化記憶的設計。

## 建議成品

- 30 個主課音軌：每課約 8–11 分鐘。
- 6 個 Unit Review：每個約 8 分鐘。
- 5 個核心歌曲 Listening Mission：每個約 4–6 分鐘，只提示要尋找的概念，不重製完整歌詞。
- 1 個 Contrast Marathon：集中處理高混淆概念。
- 1 個 Final Output Challenge。

合計約 43 個可獨立播放的音軌。

## 音軌不是背景音

學習者若要「邊放邊記憶」，音軌本身必須包含明確的 retrieval pauses。純背景循環播放只能增加熟悉感，不能取代主動回想。

## 目前檔案

- `RESEARCH_BASIS.md`：研究依據、EEG／N400／theta 的可用與不可用結論。
- `SCRIPT_SPEC.md`：每個音軌的時間結構、停頓、聲音、提示與 TTS 標記。
- `tracks/manifest.json`：30 課與延伸音軌規格。
- `tracks/lesson-01.md` ～ `lesson-05.md`：Unit 1 主課製作母稿。
- `tracks/unit-review-01.md`：Unit 1 Retrieval Review。
- `tracks/production-status.json`：製作狀態。
- `listen/`：GitHub Pages 聽讀介面。

下一批腳本為 Lesson 06–10 與 Unit Review 2。