# いちについて：GitHub 靜態教材

`index.html` 是可直接上傳的單檔教材。正文、CSS 與互動均包含在檔案內，不依賴框架、外部字型或 CDN。`build.mjs` 是內容維護來源；修改後執行 `node build.mjs` 即可重新產出頁面。

## 建議放置位置

將 `index.html` 放入 event 儲存庫的 `jp50/aimyon/songs/ichi-ni-tsuite/index.html`。沿用目前網域設定時，預期公開網址為：

`https://event.itigre.com/jp50/aimyon/songs/ichi-ni-tsuite/`

本次建立獨立資料夾，沒有修改或推送原網站。若要讓歌曲目錄出現入口，將 `directory-entry.json` 的物件加入既有 `songs/data.json` 陣列；不要用單一物件覆蓋原陣列。

## 教材規模

- 使用者提供的 30 行完整保留，包含重複段落。
- 25 組不重複逐句解說。
- 27 組語法與句構。
- 69 個單字、片語及漢字假名。
- 九站思緒地圖、逐句往返連結、10 題主動回想。
- 可隱藏假名、隱藏逐句中文並搜尋字詞。

所有主要內容均存在 HTML，停用 JavaScript 仍可閱讀與使用錨點；只有顯示切換與搜尋功能停用。手機版從 320px 寬度設計，觸控按鈕至少 46px，支援系統減少動態效果設定。

## 禁止搜尋索引

原始 HTML 已加入 `noindex,nofollow,noarchive,nosnippet`，不透過 JavaScript插入。不要在 robots.txt 阻擋搜尋引擎讀取這個 HTML，否則它可能看不到 noindex；也不要把頁面加入 sitemap。

noindex 不會限制知道網址的人開啟頁面，也不會隱藏公開 GitHub 儲存庫中的原始碼。如需真正私人閱讀，必須使用具有登入權限的託管服務。

## 內容原則

歌詞只使用本次由使用者提供的文字，外部資料只用於核對作品名稱與官方背景。歌詞中的生命、運命、受傷及不幸屬語言與敘事分析，不構成對作者、敘述者或讀者的心理與醫療判斷。
