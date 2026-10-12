# Tae Kim 對照速學

版本 1.4.0，2026-10-13。先採 Tae Kim 首頁推薦的 Complete Guide，以原創繁中短句、回想題與本站單課對照補強基礎；不鏡像或逐字翻譯原站。

## 已完成範圍

| 批次 | 主題 | 本站連結 |
| --- | --- | --- |
| TK01 | state：だ／です | L14、好き詞彙 |
| TK01 | topic：は／も | L02、歌曲清單 |
| TK01 | ending：ね／よ／よね | L04、L11 |
| TK01 | adjectives：い／ナ名詞修飾 | L11、L14、形容詞總覽 |
| TK02 | noun-links：名詞之間的 の | L01、L04、心詞彙 |
| TK02 | noun-lists：名詞列舉 と／や | L02、L17、歌曲清單 |
| TK03 | verb-types：動詞分類與辭書形 | L06、L07 |
| TK03 | verb-object：動作對象 を | L04、の速學卡 |
| TK03 | verb-place：到達點 に／動作場所 で | L06、L18 |
| TK04 | existence-verbs：ある／いる | L06、狀態速學卡 |
| TK04 | existence-place：存在位置 に／動作場所 で | L18、助詞速學卡 |
| TK05 | verb-negative：一段／五段ない形 | L07、動詞分類卡 |
| TK05 | negative-irregular：しない／来ない | L06、L07 |
| TK05 | existence-negative：ない／いない | L07、存在速學卡 |

每組有一句規則、兩個帶假名的原創例句、一題可展開答案的回想及歌曲拆讀任務。依原站適合短例句的範圍選材，不宣稱完整移植其章節或 JLPT 等級認證。原站原文連結保留在每張卡。

## 建置與串連

以 batch-01.json、batch-02.json、batch-03.json、batch-04.json、batch-05.json 為內容來源：

    node jp50/tae-kim/build.mjs

產生速學頁、各主題 TXT、分批 TXT、all-topics.txt 及課程的 components/tae-kim-topics.json。課程來源元件 TaeKimLinks 從這份對照資料顯示入口，雙向連回 L01、L02、L04、L06、L07、L11、L14、L17、L18。修改來源後必須重建 GitHub Pages 靜態課程頁，才能讓入口實際上線。

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
- https://guidetojapanese.org/learn/complete/verbs
- https://guidetojapanese.org/learn/complete/negativeverbs
- https://guidetojapanese.org/learn/complete/verb_particles

- https://guidetojapanese.org/learn/complete/existence

## 下次更新

TK05 已完成一般動詞否定、不規則否定及存在否定三卡，銜接 L06、L07 及既有分類、存在卡。下一批 TK06 核對ます／ません與普通形、禮貌形的對照。未核對的內容維持 pending，不預先標記完成。

import-state.json 記錄本功能進度。Aurader 生產進度保持獨立，下一課仍為 L20；新增速學卡不代表完成該課。

使用者預設要求每批約算力 10%；無法量測時單次主動作業最多 420 秒，先保存材料及下一步，等使用者說「繼續」再恢復。前次 21 分鐘授權已結束；本次與後續未另行授權的批次沿用 7 分鐘規則。
