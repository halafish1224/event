小人國商城｜商品編輯器與靜態語法 v1

使用方式
1. 下載並用 Chrome 或 Edge 開啟 wow-shop-editor.html。這是獨立檔，不需安裝套件，也不需 shop-core.js 才能使用。
2. 已內建原稿的 48 筆商品／款式。左側選商品即可修改；新增時填名稱、HTTPS 圖片連結與 HTTPS 賣場網址。
3. 按「儲存商品」。可上下架、同分類同版型排序，或複製商品；副本預設下架。專題大卡固定在該分類一般卡片之前。
4. 完成後「下載商品備份 JSON」。下次或換電腦時可「匯入備份」。瀏覽器暫存可能因本機 HTML 或隱私設定不可用，JSON 才是可攜備份。
5. 匯出官網內文，貼至既有商城內文編輯器的原始碼模式，取代舊商城區塊。一次只保留一個 #wow-muji-shop。
6. 匯出 SEO 頁首，交由網站管理者放入 shop.aspx 真正的 head 或該頁的 head ContentPlaceHolder。不是貼入內文！取代舊 title、description、canonical、OG 等，勿並存重複版本。

現成檔案
- wow-shop-editor.html：獨立商品編輯器（離線可編輯；遠端圖片預覽仍需網路）。
- wow-shop-data.json：預設 48 筆商品完整備份。
- wow-shop-body.txt：現成的官網內文、限定範圍 CSS 與 JSON-LD。
- wow-shop-head.txt：現成的 SEO 頁首標籤。
- wow-shop-preview.html：完整 HTML 預覽，刻意使用 noindex,nofollow；不可作為正式上線頁。
- shop-core.js：生成核心原始碼，提供日後工程維護。獨立修改此檔不會自動改變已打包的編輯器。

版型與 SEO
- 公開商城內容為靜態 HTML；不依賴前台 JavaScript，商品連結可直接讀取。
- CSS 僅作用於 #wow-muji-shop，不修改 body、html 或全站其他區塊。
- 預設「官網主版已有 H1」，區塊從 H2 開始。若實際頁面無 H1，請取消勾選並重新匯出。
- 主版仍需有 lang="zh-TW"、UTF-8 與 viewport。不要另外插入第二組 html/head/body。
- CollectionPage、ItemList 與實際上架商品同步。每個款式為一項；共享賣場網址不代表資料重複錯誤。
- 沒有添加未提供的價格、庫存、評分或 Product Offer。
- 公開頁圖片以 CSS aspect-ratio:1/1 保留容器空間，不虛構未知的原圖 width/height。前四張展示圖 eager，其餘 lazy；可依正式頁的首屏配置再調整。
- 只有網址格式驗證，並非賣場存在、庫存或圖片連線的批次驗證。

上線前必要核對
1. HTTPS 圖片是否確實可載入。原稿的 HTTP 已改 HTTPS，需由官網實測。
2. 原相對圖片 ../../images/about/ 依 shop.aspx 位置解析為 /images/about/。
3. 蝦皮長網址依原本 shop ID 144505443 與 item ID 整理為 /product/商店ID/商品ID；需實際點擊驗證。短網址原樣保留。
4. canonical 預設 https://www.wow.com.tw/tw/about/shop.aspx，確認 www／非 www 與轉址政策後再定案。頁首與 Schema 會同步使用此設定。
5. 如主版已輸出相同園方／網站 Schema，讓 @id 一致並避免矛盾；可由工程端合併全站共用節點。
6. 冰箱貼規格與警語延用提供內容；「未滿14歲以下」僅改為「未滿14歲」。須核對實品正式包裝。
7. 確認後台儲存後仍保留 style、JSON-LD 與所需屬性；若被移除，請網站廠商改由該頁模板輸出。
8. 以 Schema Markup Validator 驗證 JSON-LD；ItemList/CollectionPage 不保證出現商品複合搜尋結果。再以 Search Console 檢視 Google 實際取得的頁面，以及 PageSpeed Insights 檢查正式頁。

本工具不直接發布網站，也不保證搜尋排名或 AI 引用。編輯器請存於工作電腦，不需上傳至公開網站。

驗證紀錄
已檢查 JavaScript 語法、48 筆種子資料、47 張一般卡與 1 張專題卡、上下架過濾、JSON-LD 解析、HTML 特殊字元跳脫及不安全網址拒絕。另已透過 jsdom 驗證初始化、新增、下架、刪除、匯出、H1 設定與無腳本錯誤。環境瀏覽器未能安裝，未完成實際瀏覽器操作與 RWD 視覺驗收。
