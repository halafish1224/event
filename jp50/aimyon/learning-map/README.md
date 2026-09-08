# AIMYON 跨歌曲學習地圖

新增獨立的 GitHub Pages 靜態頁，原九首教材不變。歌曲目錄只新增入口及限定 `.learning-map-entry` 的樣式。

## 維護

- `content.mjs`：九首歌曲、六條路線、24 個人工編排概念。讀音標法 `漢字{かな}`；每站有兩個教材入口與兩條概念連結。
- `build.mjs`：檢查教材錨點／概念連結，再生成可在無 JavaScript 環境閱讀的 `index.html`。
- `app.js`：漸進增強的搜尋、篩選、本機自評與筆記、複習提示及 JSON 匯出／匯入。
- `style.css`：獨立頁面樣式，無固定底部導覽、無遠端字體、無追蹤器。

在儲存庫根目錄執行：

```sh
node jp50/aimyon/learning-map/build.mjs
node jp50/aimyon/learning-map/verify.mjs
# 有 Playwright 與 Chromium 的環境：
node jp50/aimyon/learning-map/verify.mjs --browser
```

發布時包含整個 learning-map 目錄及 songs/index.html、songs/style.css 的入口更新。預期網址為 `/jp50/aimyon/learning-map/`；本說明不代表已部署。

## 邊界

- 自評分級不是自動測驗或精準熟練度推斷；間隔 1／2／4／7 天是透明初始安排。
- 進度存在目前瀏覽器，非雲端同步；匯入驗證版本、欄位及日期，依更新時間合併。
- 原先三首頁面未採統一文法錨點，連往已有詞彙區並清楚標示；不虛構深層定位。
- 原生 details 支援收合，ruby 支援假名。舊閱讀器功能須依實機支援程度為準。
- noindex 不是保密或身分驗證。
- 學習依據與教學限制已列於頁面方法區；不將意象聯想當成語法規則。
