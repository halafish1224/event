小人國 WOW 水樂園｜設施維護套件
製作版本：2026-09-16

一、檔案用途
1. wow-water-editor.html：內部表單編輯器。下載後使用最新版 Chrome 或 Edge 開啟；不要將整份檔案貼到官網或公開上傳。
2. wow-water-snippet.txt：已放入四項設施的官網內文。以文字編輯器開啟，全選複製至該頁後台的 HTML／原始碼模式。不要透過一般視覺編輯模式貼入。
3. wow-water-preview.html：獨立預覽，含模擬外框。不是後台內文；此預覽設為 noindex。
4. wow-water-data.json：可再次匯入編輯器的維護資料。請每次更新後下載備份；瀏覽器暫存不取代正式備份。

二、後續新增或修改
開啟 editor → 修改表單或匯入上次 JSON → 新增設施／圖片／調整順序 → 更新預覽／語法 → 檢視手機與桌機 → 下載 JSON 備份 → 複製官網內文 → 貼入既有後台 → 儲存後檢查正式頁。
表單欄位皆以純文字處理，不支援在簡介中貼 HTML。注意事項一行一項；標點、&、引號會自動安全轉換。
設施識別碼預設自動產生。已公開的識別碼不宜更改，以保持錨點連結有效。
圖片需填完整 https 網址及圖片說明。原圖寬高可填可不填；未提供時使用 4:3 容器預留空間並完整呈現圖片，沒有偽造原圖尺寸。
影片只輸出外連入口，不產生未驗證的 VideoObject。
編輯器離線可使用；載入遠端圖片需要網路。複製功能若被瀏覽器限制，會選取語法供手動 Ctrl+C／Command+C。

三、更新與 SEO
同一份表單資料同步產生：導覽、設施比較表、設施圖文、注意事項、ItemList JSON-LD。
正式輸出的主要資訊已完整寫入 HTML，不需前台 JavaScript 生成內容。
CSS 僅作用於 #wow-water-park。每頁只貼一次此模組；不要與舊版水樂園內文重複並存。
不依賴 Bootstrap、jQuery、Slick 等外掛。多張圖片透過原生 details 展開。
預設內文主標題為 h2（假設官網外框已有 h1）；若外框無 h1，請在表單改為 h1。
正式網址尚未提供，表單預留欄位。填寫正確的正式網址後，JSON-LD 將使用該網址加設施錨點。
僅使用 ItemList／Thing 描述可見設施內容；不承諾 Google 豐富搜尋結果、排名或 AI 引用。

官網該頁 head 設定建議（請交由該頁設定或工程人員處理，不要貼進內文）：
Title：小人國 WOW 水樂園｜設施介紹、開放資訊與戲水須知
Meta description：查看小人國 WOW 水樂園大雷雨、尼羅灘、瘋狂實驗室與 GoGo! 卡路里的開放資訊、身高限制、陪同規定及戲水注意事項，出發前掌握遊玩須知。
Canonical：使用該頁實際正式網址，不要使用範例或預覽檔網址。
確認 lang、viewport、可索引狀態、正式頁面 HTTP 狀態碼及 canonical 是否由既有版型正確輸出。
資訊整理日期須在人工確認後更新；不自動產生虛構的最近修改日期。

四、發布前需人工確認的內容
資料以本次對話提供的 2026 規範為準，未以 2025 附件覆蓋本次安全規範。
1. 「2026 年 9 月假日」尚無明列日期，未自行推定星期六日以外的適用日期。
2. 共通「6 歲以下」、個別設施「6 歲以下（含）」及 GoGo!「3 歲以上至未滿 6 歲」保持原條件，須確認是否刻意不同。
3. 泳衣、泳褲、泳帽與 100% 聚酯纖維服裝的替代關係沿用原文；須確認泳帽是否一律必需。
4. 原文「禁止飲料進入戲水區」與「允許開水／瓶裝運動飲料入場」保留；須確認飲用區域及入水域限制。
5. GoGo!「適合滿 3 歲」仍保留為適合對象描述，未自行改成禁止未滿 3 歲。
6. 移除兒福法歸因，保留園方陪同要求，避免將園規當成法條逐字引用；若要恢復法條，請先核對正式條文。
7. 原始健康、監護、眼鏡及財物保管規範保留，未就法律效力作出判斷。
8. 圖片網址依提供來源整理為絕對網址；原相對路徑 images/about 已按 /images/about 解析。需在官網確認每張圖片實際可讀取、內容與 alt 一致。

五、上線檢查
1. 先備份舊內文，僅替換該頁水樂園內文。
2. 儲存後檢查後台是否保留 style、details、JSON-LD script；若被過濾，請由廠商將 CSS／JSON-LD 放到該頁允許的位置，不要放寬整站安全設定。
3. 手機檢查：導覽可點、表格可橫向捲動、照片完整呈現、內文不溢出。
4. 核對外框標題及既有 CSS 有無干擾。獨立預覽不能替代正式網站測試。
5. 使用 Schema Markup Validator 檢查 ItemList；Rich Results Test 不顯示可用豐富搜尋結果，不代表 ItemList 語法必然錯誤。
6. 以 Search Console URL 檢查確認 Google 讀到更新後的可見內容與結構化資料。
7. 公告或狀態到期時需重新編輯並發布。靜態 HTML 不會因日期到期自行改文案；編輯器僅提示過期。

參考文件
https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
https://developers.google.com/search/docs/appearance/structured-data/video
https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

六、本次驗證範圍
已完成 JavaScript 語法、新增／編輯／排序／複製／刪除、圖片欄位、網址檢查、HTML 安全轉義、JSON 匯入與暫存載入的程式檢查，以及 HTML 標籤配對、識別碼唯一性、錨點目標與 JSON-LD 內容檢查。
本次環境未能取得瀏覽器執行檔，未完成瀏覽器視覺驗證、實際圖片 HTTP 檢查、正式後台貼入測試或 Search Console 驗證。
