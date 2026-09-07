# 愛の花：GitHub 靜態教材

交付頁面是 `index.html`：所有正文、樣式及互動均放在單檔，直接開啟即可，不需 Node.js、CDN 或伺服器端程式。`build.mjs` 是可選的內容維護來源，修改它後執行 `node build.mjs` 重新產出頁面。

## 放進既有 GitHub 網站

將 `index.html` 放至 event 儲存庫的 `jp50/aimyon/songs/ai-no-hana/index.html`。沿用目前網域設定時，預期網址是 `https://event.itigre.com/jp50/aimyon/songs/ai-no-hana/`；本次僅準備檔案，尚未推送或確認該網址上線。

若要在原目錄顯示入口，把 `directory-entry.json` 的物件加入現有 `songs/data.json` 陣列。不要拿這個單一物件覆蓋原本的陣列。本次沒有修改原目錄。

## 不被搜尋索引

頁面原始 HTML 已有 robots 與 googlebot 的 noindex / nofollow 設定，不需靠 JavaScript 插入。不要再用 robots.txt 阻止這個 HTML 被讀取，否則搜尋引擎可能無法看到 noindex。不要加入 sitemap。

noindex 是搜尋引擎指令，不是存取控制；已收錄的頁面要等重新爬取才會移除。公開 GitHub 儲存庫的程式碼頁也不受這份 HTML 的 noindex 控制。若需要只有本人能看，需另外有權限驗證的託管方式。

## 閱讀與連結

44 行使用者提供歌詞完整保留，含重複；34 組不重複解說、18 組語法、59 個字詞。漢字使用原生 ruby 假名標示。內部段落錨點可直接分享、使用瀏覽器上一頁返回。沒有外部字型、追蹤或載入依賴；停用 JavaScript 時正文與連結仍可用，只有假名／翻譯切換及搜尋停用。

舊歌曲連結依目前 songs/data.json 提供的 HTTP 短網址保留，沒有猜測尚未存在的舊頁錨點。本頁有返回目錄的連結；原目錄反向入口需加入上述 JSON 物件後才出現。

教材是非官方語言分析。語法事實與詩意解讀分開，不把敘述者等同真實作者。內容基於使用者提供文字，不從外部來源補寫歌詞。
