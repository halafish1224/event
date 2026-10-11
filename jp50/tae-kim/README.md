# Tae Kim 對照速學

版本 1.1.0，2026-10-12。先採 Tae Kim 首頁推薦的 Complete Guide，以原創繁中短句、回想題與本站單課對照補強基礎；不鏡像或逐字翻譯原站。

## 已完成範圍

| 批次 | 主題 | 本站連結 |
| --- | --- | --- |
| TK01 | state：だ／です | L14、好き詞彙 |
| TK01 | topic：は／も | L02、歌曲清單 |
| TK01 | ending：ね／よ／よね | L04、L11 |
| TK01 | adjectives：い／ナ名詞修飾 | L11、L14、形容詞總覽 |
| TK02 | noun-links：名詞之間的 の | L01、L04、心詞彙 |
| TK02 | noun-lists：名詞列舉 と／や | L02、L17、歌曲清單 |

每組有一句規則、兩個帶假名的原創例句、一題可展開答案的回想及歌曲拆讀任務。依原站適合短例句的範圍選材，不宣稱完整移植其章節或 JLPT 等級認證。原站原文連結保留在每張卡。

## 建置與串連

以 batch-01.json、batch-02.json 為內容來源：

    node jp50/tae-kim/build.mjs

產生速學頁、各主題 TXT、分批 TXT、all-topics.txt 及課程的 components/tae-kim-topics.json。課程來源元件 TaeKimLinks 從這份對照資料顯示入口，雙向連回 L01、L02、L04、L11、L14、L17。修改來源後必須重建 GitHub Pages 靜態課程頁，才能讓入口實際上線。

JP50 主入口、AIMYON 字卡首頁、30 課列表、聽讀首頁與集中下載頁均有入口。連結必須指向實際存在的檔案；下載頁亦補齊已存在的 L19。

## 來源核對

- https://guidetojapanese.org/learn/
- https://guidetojapanese.org/learn/complete/
- https://guidetojapanese.org/learn/complete/stateofbeing
- https://guidetojapanese.org/learn/complete/topic_particles
- https://guidetojapanese.org/learn/complete/ending_particles
- https://guidetojapanese.org/learn/complete/adjectives
- https://guidetojapanese.org/learn/complete/no_particle
- https://guidetojapanese.org/learn/complete/multiple_nouns

## 下次更新

TK03：先核對動詞分類、辭書形及動作助詞 を／に／で，銜接既有 L06～L10；較長的活用解釋以現有課程為主。未核對的內容維持 pending，不預先標記完成。

import-state.json 記錄本功能進度。Aurader 生產進度保持獨立，下一課仍為 L20；新增速學卡不代表完成該課。

使用者預設要求每批約算力 10%；無法量測時單次主動作業最多 420 秒，先保存材料及下一步，等使用者說「繼續」再恢復。本次使用者明確授權今晚任務可執行 21 分鐘，故本次上限為 1260 秒，後續未另行授權的批次仍沿用 7 分鐘規則。
