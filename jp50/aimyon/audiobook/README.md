# AIMYON 日文學習｜Listening-Reading Audiobook

這個資料夾把既有 30 課教材改寫成「可以直接聽、可以停下回想、可以跟讀與主動輸出」的有聲教材規格。

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
- `tracks/manifest.json`：30 課音軌規格。
- `tracks/lesson-01.md`：完整試播腳本。

下一階段可依同一模板批次建立 Lesson 02–30，再轉為 SSML/TTS 音檔。