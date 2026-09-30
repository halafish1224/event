# JP50 / AIMYON — Kobo / EPUB 單曲閱讀版規格

版本：1.0

## 目的

每首已納入 JP50 / AIMYON 教材的歌曲，除互動網頁外，逐步提供一份 EPUB 3 reflowable（可重排）閱讀版，優先相容 Kobo Reader 與一般 EPUB 3 閱讀器。

這份 EPUB 的用途是「短時間導讀、導聽、離線複習」，不是歌詞備份。不得建立、輸出或拼接成可重組的完整受版權保護歌詞全文。

## 來源與一致性

- CONTENT SCHEMA v1.0.0 維持不變。
- 優先從既有正式教材資料與歌曲頁的已審核學習資料產生，不建立第二份平行內容資料庫。
- 既有 stable line / sentence IDs 應沿用；尚未建立者先完成句位 ID，再進入 EPUB 完整覆蓋。
- 重複段落使用 reference 指向首次出現的教學單元，不複製建立第二份解析資料。
- 不改動既有 localStorage、web deep links、ruby、noindex 或網頁學習進度。

## 每首 EPUB 的最低章節

1. **封面／書籍資訊**：曲名、JP50 學習版、版本日期。
2. **3–5 分鐘快速導聽**：歌曲結構、語意走向、6–10 個聽辨 checkpoint；不收錄完整歌詞。
3. **句位導讀**：stable ID、該句／句群的原創中文語意摘要、必要的極短文字線索；重複段落以 reference 呈現。
4. **單字與片語**：讀音、詞性、原形、核心意思、必要活用與搭配。
5. **句型與文法**：形成方式、語意、語氣、使用限制與原創例句。
6. **Contrast**：容易混淆的詞／句型最小對比。
7. **Retrieval**：遮答案可做的回想題、判斷題與原創造句任務。
8. **跨歌曲連結**：至少列出已審核的雙向關聯；未完成 audit 時標示 partial，不宣稱完整率。
9. **完成度**：只呈現可由資料直接驗證的項目與數量；未審核項目顯示 pending / partial，不以推測百分比呈現。

## Kobo / 電子墨水排版原則

- EPUB 3、UTF-8、reflowable；閱讀方向採一般橫排 left-to-right。
- 使用語義化 XHTML 與原生 `<ruby><rt>`；不依賴 JavaScript。
- 不嵌入外部字型、CDN、追蹤碼或遠端資源。
- 高對比、單欄、避免 Grid / Flex 作為必要閱讀結構；不使用固定頁寬／固定字級。
- 章節與大型教學單元使用合理 page-break；避免把短詞彙卡拆成兩頁。
- 目錄使用 EPUB Navigation Document；所有 stable IDs 保持唯一。
- CSS 必須在深色／淺色或電子墨水裝置上仍可閱讀，不以顏色作為唯一訊息提示。

## 檔案位置與命名

建議單曲輸出：

`jp50/aimyon/<song-slug>/reader/<song-slug>-jp50-kobo.epub`

集中下載頁 `jp50/downloads/` 只加入已實際存在、且通過檢查的 EPUB；不先放不存在的連結。

## 驗證門檻

產出後至少檢查：

- EPUB ZIP 結構正確，`mimetype` 為第一個且不壓縮。
- `META-INF/container.xml`、OPF、nav、spine 與所有 XHTML/CSS 檔案存在。
- EPUB 可被重新解壓並解析 XML / XHTML。
- 內部連結與 stable IDs 不重複、不失效。
- 未包含可重組的完整歌詞全文。
- ruby / 日文 / 繁中在閱讀器中不因 CSS 隱藏而失去資訊。
- 若環境可用 EPUBCheck，再執行 EPUBCheck；若不可用，明確回報未執行，不假裝通過。

## 產出順序

1. 先處理已有歌曲結構與 stable IDs、資料最完整的歌曲。
2. 再補逐句語意摘要、詞彙、文法、Contrast、Retrieval。
3. 最後補跨歌曲雙向連結與可驗證完成度。
4. 每次只推進一首或一個可驗證的小增量，避免大量重構。

現有 `aimyon-japanese/scripts/build-epub.mjs` 的總教材 EPUB 保留；單曲 EPUB 應與它共用相同的 EPUB 3 / 電子墨水設計原則，但不取代總教材。