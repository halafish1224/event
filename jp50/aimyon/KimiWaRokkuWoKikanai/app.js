const clusterLabels = {
  all: '全部',
  sound: '聲音與唱片',
  action: '動作與變化',
  distance: '距離與情緒',
  body: '身體與視線',
  stance: '語氣與程度',
};

const vocabulary = [
  ['歌', 'うた', '名詞', '歌曲；歌', 'sound', '唱歌是「歌を歌う」，讓對方聽歌則可用「歌を聴かせる」。', '帰り道に好きな歌を口ずさんだ。', '回家路上，我哼著喜歡的歌。'],
  ['ロック', 'ろっく', '名詞', '搖滾樂', 'sound', '外來語；也可組成「ロック音楽、ロックバンド」。', '兄は昔のロックをよく聴く。', '哥哥常聽以前的搖滾樂。'],
  ['音', 'おと', '名詞', '聲音；物體發出的音', 'sound', '偏向可聽見的聲響；「声」則多指人或動物的嗓音。', '隣の部屋から小さな音が聞こえた。', '從隔壁房間傳來小小的聲音。'],
  ['メロディ', 'めろでぃ', '名詞', '旋律', 'sound', '外來語，也常寫作「メロディー」。', 'このメロディは一度聴くと忘れにくい。', '這段旋律聽過一次就不容易忘。'],
  ['聴く', 'きく', '五段動詞', '專心聆聽', 'sound', '寫作「聴く」時強調有意識地聽音樂、演講等；一般「聞く」範圍更廣。', 'イヤホンで新しいアルバムを聴いた。', '我用耳機聽了新專輯。'],
  ['聴かせる', 'きかせる', '一段動詞', '讓／使某人聽', 'sound', '「聴く／聞く」的使役形；「私に聴かせて」可表示放給我聽。', '完成した曲を友達に聴かせた。', '我把完成的曲子放給朋友聽。'],
  ['思う', 'おもう', '五段動詞', '想；認為；感覺', 'distance', '想法內容通常放在引用助詞「と」之前：～と思う。', 'この方法なら続けられると思う。', '我想用這個方法應該能持續。'],
  ['鳴る', 'なる', '五段動詞', '響；鳴；發出聲音', 'sound', '自動詞，聲音或物體自然響起。', '授業の終わりにベルが鳴った。', '下課時鈴聲響了。'],
  ['鳴り出す', 'なりだす', '五段動詞', '開始響起', 'sound', '「ます語幹＋出す」表示動作突然開始。', '静かな店で電話が鳴り出した。', '安靜的店裡電話突然響起。'],
  ['ドーナツ盤', 'どーなつばん', '名詞', '中央有大圓孔的小型唱片', 'sound', '名稱來自外形像甜甜圈，屬帶年代感的唱片文化詞。', '古い店でドーナツ盤を一枚見つけた。', '我在老店裡找到一張小唱片。'],
  ['針', 'はり', '名詞', '針；唱針', 'sound', '在唱片語境中指唱針；「針を落とす」是讓唱片開始播放的動作。', 'レコードの針を丁寧に交換した。', '我仔細更換了唱針。'],
  ['BPM', 'ビーピーエム', '名詞', '每分鐘拍數', 'sound', 'beats per minute 的縮寫，用於表示音樂速度，也可借喻心跳加速。', 'この曲のBPMを調べて練習した。', '我查了這首曲子的 BPM 再練習。'],
  ['合図', 'あいず', '名詞', '信號；暗號', 'sound', '可搭配「合図をする、合図で始める」。', '先生の合図で全員が歌い始めた。', '老師一示意，所有人就開始唱歌。'],
  ['サプライズ', 'さぷらいず', '名詞', '驚喜', 'sound', '外來語；準備驚喜常說「サプライズを用意する」。', '友達の誕生日に小さなサプライズを用意した。', '我為朋友生日準備了一個小驚喜。'],
  ['青春', 'せいしゅん', '名詞', '青春；青春時期', 'sound', '除年齡階段外，也常帶理想、衝動與回憶的情感色彩。', 'この曲を聴くと高校時代の青春を思い出す。', '聽到這首歌就想起高中時的青春。'],
  ['夢', 'ゆめ', '名詞', '夢；夢想', 'sound', '可指睡夢，也可指未來想實現的目標。', '子どもの頃の夢をノートに書いた。', '我把小時候的夢想寫在筆記裡。'],
  ['埃', 'ほこり', '名詞', '灰塵', 'sound', '「埃をかぶる」是蒙上灰塵；「埃まみれ」是沾滿灰塵。', '棚の上に埃がたまっている。', '架子上積了灰塵。'],

  ['叩く', 'たたく', '五段動詞', '敲；拍；打', 'action', '動作對象用「を」；「手を叩く」通常是拍手。', 'リズムに合わせて手を叩いた。', '我配合節奏拍手。'],
  ['踊る', 'おどる', '五段動詞', '跳舞', 'action', '可用「音楽に合わせて踊る」。文學中也可讓夢、光等擬人化。', '子どもたちは音楽に合わせて踊った。', '孩子們隨著音樂跳舞。'],
  ['落とす', 'おとす', '五段動詞', '使落下；弄丟；降低', 'action', '他動詞，含義多；唱片語境的「針を落とす」是放下唱針。', '音量を少し落としてもらえますか。', '可以請你把音量稍微降低嗎？'],
  ['止める', 'とめる', '一段動詞', '使停止；關掉', 'action', '他動詞，由某人主動停止機器、動作或聲音。', '電話が来たので音楽を止めた。', '因為電話來了，我把音樂停掉。'],
  ['止む', 'やむ', '五段動詞', '自然停止', 'action', '自動詞，常用於雨、風、聲音等自然停下；否定是「止まない」。', '雨が止んだら散歩に行こう。', '雨停後去散步吧。'],
  ['下ろす', 'おろす', '五段動詞', '放下；卸下', 'action', '他動詞；坐下常用「腰を下ろす」。', '荷物を置いて、椅子に腰を下ろした。', '放下行李後，我在椅子上坐下。'],
  ['流れる', 'ながれる', '一段動詞', '流動；播放；流逝', 'action', '可用於水、時間、音樂或資訊自然流動。', '店の中に静かな音楽が流れている。', '店裡播放著安靜的音樂。'],
  ['乾く', 'かわく', '五段動詞', '乾；乾燥', 'action', '自動詞；附件中的「乾いた」是過去形修飾名詞，也帶質感意象。', '洗ったシャツがもう乾いた。', '洗過的襯衫已經乾了。'],
  ['近づく', 'ちかづく', '五段動詞', '接近；靠近', 'action', '自動詞；接近的對象通常用「に」。', '音のする方にゆっくり近づいた。', '我慢慢靠近傳來聲音的方向。'],
  ['寄り添う', 'よりそう', '五段動詞', '靠在一起；陪伴支持', 'action', '不只物理靠近，也可指理解並陪伴某人的感受。', '不安な友達の気持ちに寄り添った。', '我陪伴並理解感到不安的朋友。'],
  ['乗り越える', 'のりこえる', '一段動詞', '跨越；克服', 'action', '可跨越物體，也常表示克服困難、悲傷或一段經歷。', '二人で大きな問題を乗り越えた。', '兩個人一起克服了大問題。'],
  ['焦がれる', 'こがれる', '一段動詞', '熱切渴望；苦苦思慕', 'action', '常用「Nに焦がれる」，比「欲しい」更強烈、較文學。', '若い頃、遠い国での生活に焦がれた。', '年輕時，我熱切嚮往在遠方國家生活。'],
  ['気づく', 'きづく', '五段動詞', '注意到；察覺', 'action', '察覺的內容或對象常用「に」：間違いに気づく。', '名前の読み方を間違えたことに気づいた。', '我注意到自己讀錯了名字。'],
  ['笑う', 'わらう', '五段動詞', '笑', 'action', '可用「声を出して笑う」「笑顔で笑う」。', '昔の写真を見て二人で笑った。', '兩個人看著舊照片笑了。'],
  ['泳ぐ', 'およぐ', '五段動詞', '游泳；游動', 'action', '「目が泳ぐ」是視線游移、顯得不安或心虛的慣用表現。', '質問されると、彼の目が少し泳いだ。', '被問到時，他的眼神稍微游移了。'],

  ['君', 'きみ', '代名詞', '你', 'distance', '多用於親近、同輩或上對下；對陌生人直接使用可能顯得冒犯。', '君の考えも聞かせてほしい。', '我也想聽聽你的想法。'],
  ['僕', 'ぼく', '代名詞', '我', 'distance', '常見於男性或偏柔和的自稱，也有人不分性別依個人風格使用。', '僕は今日は家で音楽を聴く。', '我今天在家聽音樂。'],
  ['寂しい', 'さびしい', 'い形容詞', '寂寞；冷清', 'distance', '既可說人的感受，也可說場所缺少人聲而冷清。', '友達が帰ったあと、少し寂しくなった。', '朋友回去後，我有點寂寞。'],
  ['恋', 'こい', '名詞', '戀情；愛戀', 'distance', '多指對特定對象的浪漫情感。', '彼は初めての恋について話した。', '他談起了自己的初戀。'],
  ['恋人', 'こいびと', '名詞', '戀人', 'distance', '泛指交往中的伴侶；不限定性別。', '恋人と同じ映画を見た。', '我和戀人看了同一部電影。'],
  ['精一杯', 'せいいっぱい', '名詞・副詞', '竭盡全力；能力所及', 'distance', '可說「精一杯頑張る」「自分なりの精一杯」。', '今できることを精一杯やった。', '我盡全力做了現在能做的事。'],
  ['僕なり', 'ぼくなり', '表現', '以我的方式；對我而言', 'distance', '「Nなりの＋名詞」表示符合該人的方式或程度。', 'これは僕なりの感謝の伝え方だ。', '這是我用自己的方式表達感謝。'],
  ['知る', 'しる', '五段動詞', '得知；認識', 'distance', '重點是從不知道變成知道的瞬間；已知狀態通常用「知っている」。', 'その店のことを昨日初めて知った。', '我昨天才第一次知道那家店。'],
  ['真面目', 'まじめ', '名詞・な形容詞', '認真；正經', 'distance', '可指態度誠實認真，也可指人太過一本正經。', '彼女は真面目に話を聞いてくれた。', '她認真聽我說話。'],
  ['雑', 'ざつ', '名詞・な形容詞', '粗糙；隨便；草率', 'distance', '可形容做法不細緻，但直接形容人可能語氣偏負面。', '急いで書いたので字が少し雑になった。', '因為急著寫，字變得有點潦草。'],
  ['嘘', 'うそ', '名詞', '謊言；不真實', 'distance', '「嘘をつく」是說謊；「嘘みたい」是像假的一樣。', '嘘をつかずに理由を話した。', '我沒有說謊，說明了理由。'],

  ['手', 'て', '名詞', '手', 'body', '常見搭配有「手を叩く、手を上げる、手をつなぐ」。', '質問がある人は手を上げてください。', '有問題的人請舉手。'],
  ['息', 'いき', '名詞', '呼吸；氣息', 'body', '「息を止める」停止呼吸；「息をする」呼吸。', '緊張したら、ゆっくり息をしてみよう。', '緊張時試著慢慢呼吸吧。'],
  ['腰', 'こし', '名詞', '腰；腰部', 'body', '「腰を下ろす」不是放下腰，而是坐下休息。', '公園のベンチに腰を下ろした。', '我在公園長椅坐下。'],
  ['心臓', 'しんぞう', '名詞', '心臟', 'body', '描述生理器官；緊張時可說「心臓がどきどきする」。', '走ったあと、心臓が速く打っていた。', '跑步後，心臟快速跳動。'],
  ['胸', 'むね', '名詞', '胸口；心中', 'body', '可指身體胸部，也出現在「胸が痛い、胸がいっぱい」。', '知らせを聞いて胸がいっぱいになった。', '聽到消息後，我心中百感交集。'],
  ['痛い', 'いたい', 'い形容詞', '疼痛；痛的', 'body', '身體部位通常用「が」：胸が痛い、頭が痛い。', '昨日から少し喉が痛い。', '從昨天起喉嚨有點痛。'],
  ['目', 'め', '名詞', '眼睛；視線', 'body', '「目が泳ぐ」指視線游移；「目を見る」則是看著對方眼睛。', '相手の目を見て、ゆっくり話した。', '我看著對方眼睛慢慢說。'],

  ['少し', 'すこし', '副詞・名詞', '稍微；少量', 'stance', '比「ちょっと」較中性；加「でも」後變成即使只有一點也好。', '少し休んでから続きをしよう。', '稍微休息後再繼續吧。'],
  ['こんな', 'こんな', '連體詞', '這樣的', 'stance', '指靠近說話者、正在談的類型；後面直接接名詞。', 'こんな静かな夜が好きだ。', '我喜歡這樣安靜的夜晚。'],
  ['あんな', 'あんな', '連體詞', '那樣的', 'stance', '指離雙方較遠、先前提過或帶心理距離的類型。', 'あんな大きな会場は初めてだ。', '我是第一次到那麼大的會場。'],
  ['なんか', 'なんか', '副助詞・代名詞', '像…之類；什麼的', 'stance', '口語中可舉例或刻意降低重要性；有時帶自嘲、輕視或親暱。', '難しい理論なんか知らなくても楽しめる。', '就算不懂艱深理論也能享受。'],
  ['けれども', 'けれども', '接續詞・接續助詞', '但是；雖然', 'stance', '比「けど」完整，能柔和地保留或轉折。', '時間は短いけれども、毎日続けたい。', '雖然時間短，我還是想每天持續。'],
  ['なぜ', 'なぜ', '副詞', '為什麼', 'stance', '比口語的「なんで」較中性、正式。', 'なぜこの音が懐かしく感じるのだろう。', '為什麼這個聲音讓人感到懷念呢？'],
  ['今', 'いま', '名詞・副詞', '現在；此刻', 'stance', '可表此刻，也可表與過去相比的現在。', '今わかる言葉だけで話してみよう。', '先用現在會的詞試著說吧。'],
  ['また', 'また', '副詞', '再次；另外', 'stance', '表示重複或補充另一件事。', '明日また同じ言葉を思い出す。', '明天再次回想同一個詞。'],
  ['フツフツと', 'ふつふつと', '副詞', '咕嘟咕嘟；逐漸湧起', 'stance', '擬態／擬聲語，可指液體微滾，也可指情緒從內部漸漸湧起。', '新しい挑戦への気持ちがフツフツと湧いてきた。', '挑戰新事物的心情逐漸湧上來。'],
  ['ダラダラと', 'だらだらと', '副詞', '拖拖拉拉；沒完沒了地', 'stance', '形容沒有俐落節奏地持續；有時帶負面評價。', '休日の朝をダラダラと過ごした。', '我懶散地度過假日早晨。'],
  ['さあ', 'さあ', '感動詞', '來吧；那麼', 'stance', '用來邀請、催促、轉換行動；語氣取決於聲調。', 'さあ、最初の一問を始めよう。', '來吧，開始第一題。'],
];

const patterns = [
  ['～そうな＋名詞', '從外觀推測狀態', 'い形容詞去「い」或な形容詞語幹＋そうな＋名詞。', '寂しそうな人／楽しそうな声', '彼は少し眠そうな顔をしている。'],
  ['Vさせる', '讓／使某人做', '一段去る＋させる；五段改あ段＋せる。「聴く」變「聴かせる」。', '歌を聴かせる', '新しい曲を家族に聴かせた。'],
  ['N に Vを聴かせる', '把聲音內容提供給對方', '接受者用「に」，被聽的內容用「を」。', '君に歌を聴かせる', '友達に録音した声を聴かせた。'],
  ['Nなりの＋名詞', '符合某人的方式', '表示以該人的立場、能力或風格所能做到的程度。', '僕なりの精一杯', 'これは私なりの答えです。'],
  ['精一杯＋V', '竭盡所能做', '作副詞使用，描述投入能做到的最大程度。', '精一杯伝える', '短い時間でも精一杯練習した。'],
  ['Nまみれ', '表面沾滿不理想的東西', '常接灰塵、泥、汗、血等；不等同任何「很多」。', '埃まみれ／泥まみれ', '雨の中を走って、靴が泥まみれになった。'],
  ['N に針を落とす', '唱片文化的固定搭配', '字面是把唱針落在唱片上，語境中表示開始播放。', 'レコードに針を落とす', '夜、静かにレコードに針を落とした。'],
  ['Vます語幹＋すぎる', '做得過度', '去掉「ます」接「すぎる」；形容詞也能使用。', '止めすぎる／聴きすぎる', '昨日は音楽を聴きすぎた。'],
  ['Vます語幹＋出す', '動作突然開始', '表示原本沒有的動作開始發生，常帶突然感。', '鳴り出す／笑い出す', '子どもが急に笑い出した。'],
  ['意向形＋よ／よう', '邀請或表達意志', '五段改お段＋う；一段去る＋よう。語尾「よ」加強對對方的邀請。', '踊ろうよ／聴こうよ', '週末、一緒に映画を見ようよ。'],
  ['～なんか', '刻意降低重要性或舉例', '依語氣可能是「…之類」「才不…」或自嘲，不宜固定翻譯。', 'ロックなんか／僕なんか', '数字なんか気にせず、まず話してみよう。'],
  ['～と思いながら', '一邊想著…一邊…', '普通形＋と思う，再用「ながら」表示同時伴隨的心理狀態。', '難しいと思いながら続ける', '無理だと思いながらも、一歩進んだ。'],
  ['少しでも', '即使只有一點也好', '數量詞或程度詞＋でも，表達最低程度仍有價值。', '少しでも近づく', '少しでも自然に話せるようになりたい。'],
  ['Vてほしい', '希望別人做', '希望執行者常用「に」；是自己的願望，不是客觀要求。', '近づいてほしい／聴いてほしい', '間違いがあれば教えてほしい。'],
  ['Vてほしくて', '把願望接到後續動機', '「ほしい」變成て形「ほしくて」，可連接原因、動機或下一個動作。', '近づいてほしくて', '笑ってほしくて、短い手紙を書いた。'],
  ['～けれども', '承認前項再轉折', '比「けど」較完整，也可在句尾留下未說完的柔和語氣。', '知らないけれども', '難しいけれども、面白い。'],
  ['Nを乗り越えてきた', '一路克服至今', '「Vてくる」把過去到現在的累積帶進敘事。', '恋を乗り越えてきた', 'いくつもの失敗を乗り越えてきた。'],
  ['Vている → Vてる', '口語省略「い」', '會話與歌詞常把「ている」縮成「てる」；正式書寫仍以完整形為基本。', '知っている → 知ってる', 'その話なら、もう知ってるよ。'],
  ['Nになる', '變成某狀態', '變化結果用「に」；數字、名詞與な形容詞皆可接。', 'BPMが190になる', '練習を始めて三か月になった。'],
  ['～のかい／～んだい', '帶角色感的男性口語疑問', '常見於作品或較有角色色彩的男性口語；不是所有場合都適合模仿。', '気づくのかい／なぜ笑うんだい', '今日はどこへ行くんだい。'],
  ['～ぞ／～ぜ', '強勢男性口語終助詞', '帶粗獷、強調或角色語氣；正式場合與一般禮貌對話避免使用。', 'なったぞ／止まないぜ', '準備できたぞ。さあ、行こうぜ。'],
  ['Nみたいに／Nのように', '像…一樣', '「みたい」較口語；「よう」較中性或書面。', '嘘みたいに／恋人のように', '鳥みたいに自由に歩きたい。'],
  ['目が泳ぐ', '視線游移', '固定慣用表現，常暗示緊張、猶豫或心虛。', '質問されて目が泳ぐ', '秘密を聞かれて、彼の目が泳いだ。'],
  ['Nに焦がれる', '熱切嚮往或思慕', '對象使用「に」，比一般想要更強烈、帶文學色彩。', '恋に焦がれる', 'まだ見ぬ世界に焦がれている。'],
  ['普通形＋ことを知っている', '知道某個事實', '把整句用「こと」名詞化；口語裡「ことを」的「を」有時會省略。', '聴かないこと（を）知っている', '彼が来ないことを知っている。'],
];

const contrasts = [
  ['聞く', '聴く', '「聞く」可指聽見、詢問與廣義聽；「聴く」強調專心聆聽音樂或內容。'],
  ['聴く', '聴かせる', '「聴く」是自己聽；「聴かせる」是讓某人聽，需留意接受者「に」。'],
  ['止める', '止む', '「止める」由某人把它停下；「止む」是雨、聲音等自然停止。'],
  ['鳴る', '鳴り出す', '「鳴る」只陳述響起；「鳴り出す」聚焦從無聲到開始響的瞬間。'],
  ['近づく', '寄り添う', '「近づく」是縮短距離；「寄り添う」還包含靠著或情感上的陪伴。'],
  ['知る', '知っている', '「知る」是獲得資訊的變化；知道後的持續狀態通常說「知っている」。'],
  ['こんな', 'あんな', '「こんな」心理距離靠近說話者；「あんな」較遠或回指雙方知道的事物。'],
  ['少し', '少しでも', '「少し」只是少量；「少しでも」帶最低限度也希望達成的心情。'],
  ['乗り越える', '焦がれる', '「乗り越える」把困難留在身後；「焦がれる」仍朝向渴望的對象。'],
  ['真面目', '雑', '「真面目」重視認真與規矩；「雑」表示做法不細緻、較草率。'],
];

const course = [
  ['起點診斷：不播放、不提示', '正式開始前，以「聴く／聴かせる、止める／止む、知る／知っている、近づく／寄り添う」做 8 題判斷，只記錄混淆處。', '預測 → 揭示 → 標記弱點'],
  ['聲音地圖', '建立歌、ロック、音、メロディ、聴く、鳴る的關係。先分辨「聲音本體、接收動作、發聲狀態」。', '分類 → 朗讀 → 說意思'],
  ['唱片動作鏈', '學習ドーナツ盤、針、落とす、鳴り出す、流れる、止む。用六個詞口述唱片開始到停止。', '回想D1 → 排順序 → 口述'],
  ['邀請與使役', '學習聴かせる、Vさせる、意向形＋よ。把「我聽」改成「讓對方聽」，再改成一起做的邀請。', '變形 → 角色互換 → 邀請'],
  ['動作與節奏', '學習手を叩く、踊る、腰を下ろす、息を止める。每個詞配一個身體動作，但不在走路時看手機。', '回想D2 → 動作配詞 → 新句'],
  ['距離的三個層次', '比較近づく、寄り添う、Vてほしい：物理靠近、陪伴、希望對方採取行動。', '選詞 → 說理由 → 換人稱'],
  ['態度詞', '學習こんな／あんな、なんか、けれども、僕なり。先聽出降低重要性、心理距離與保留語氣。', '回想D3 → 語氣判斷 → 中性改寫'],
  ['第一場累積演出', '不看字詞庫，依聲音、動作、距離三類各說五詞。錯詞立即看回饋，隔兩題再回答。', '15詞提取 → 回饋 → 延遲重答'],
  ['青春與記憶', '學習青春、夢、あの日、埃、精一杯。用「過去的物件＋現在的感受」做 30 秒口述。', '回想D4 → 時間軸 → 口述'],
  ['心跳與情緒', '學習寂しい、恋、心臓、胸、痛い、焦がれる、乗り越える。區分生理感、思慕與克服。', '回想D5 → 感受分類 → 一因一果'],
  ['開始、持續、走到現在', '比較鳴る／鳴り出す、Vている、Vてきた。把同一事件改寫成開始、現在狀態與過去累積。', '回想D6 → 時間判斷 → 三式改寫'],
  ['角色口語安全課', '辨認「のかい／んだい／ぞ／ぜ」的角色感，練習理解但不把它當成通用禮貌日語。', '辨認態度 → 中性改寫 → 場合判斷'],
  ['比喻與視線', '學習Nみたいに／Nのように、目が泳ぐ、夢が踊る。判斷字面、慣用與擬人的差別。', '回想D8 → 三類判斷 → 原創比喻'],
  ['換線索提取', '同一詞改由中文、日文定義、相近詞與全新場景出題。加入與唱片、戀愛無關的生活情境。', '反向提取 → 對比 → 跨情境'],
  ['90秒音樂邀請', '使用至少十個附件字詞，向朋友介紹一首自己喜歡的歌；需包含使役、願望、轉折與一組自他概念。', '列關鍵詞 → 口述 → 回聽修正'],
];

const transfers = [
  ['朋友「專心聽音樂」應寫 聞く 還是 聴く？', '聴く', '音楽を聴く。重點是有意識、專心地聆聽。'],
  ['想說「把新曲放給朋友聽」，接受者與內容如何標示？', '友達に新しい曲を聴かせる。', '接受者用「に」，聽的內容用「を」。'],
  ['電話自然響起，要用 鳴る 還是 鳴らす？', '電話が鳴る。', '電話自己呈現響起狀態，用自動詞「鳴る」。'],
  ['雨自然停下與主動關音樂，分別用什麼？', '雨が止む／音楽を止める', '止む是自然停止；止める是人主動使其停止。'],
  ['把「唱歌」改成「一起唱吧」的邀請。', '一緒に歌おうよ。', '歌う的意向形是歌おう；「よ」把邀請送向對方。'],
  ['「即使只有五分鐘也想練習」怎麼說？', '五分だけでも練習したい。', '「でも」可放在最低限度後，表達即使只有這些也有價值。'],
  ['對陌生客戶能直接說 君、～だい、～ぜ 嗎？', '通常不適合。', '這些形式帶親密、上下關係或角色化男性口語；正式場合宜改用姓名、あなた以外的稱呼或です／ます。'],
  ['「我昨天才知道」和「我已經知道」如何區分？', '昨日知った／もう知っている', '知る表示獲得資訊；知っている表示知道的狀態。'],
  ['用 寄り添う 寫一句與戀愛無關的句子。', '例：困っている人の気持ちに寄り添いたい。', '寄り添う也能指理解、陪伴他人的處境。'],
  ['朗讀一句後，如何確認不是只有聲音熟悉？', '遮住原句，說出意思並換一個情境重寫。', '朗讀可幫助記憶，但理解與遷移仍需額外測試。'],
];

const storageKey = 'aimyon-kimi-rock-mobile-lab-v1';
const sessionSize = 6;
let activeCluster = 'all';
let session = [];
let sessionIndex = 0;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // 即使瀏覽器停用 file:// 儲存，教材仍可繼續使用。
  }
}

function addDays(days) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function buildSession() {
  const progress = loadProgress();
  const due = vocabulary.filter((item) => {
    const record = progress[item[0]];
    return !record || !record.nextAt || record.nextAt <= Date.now();
  });
  const later = vocabulary.filter((item) => !due.includes(item));
  session = [...shuffle(due), ...shuffle(later)].slice(0, sessionSize);
  sessionIndex = 0;
  renderCard();
  updateProgress();
}

function renderCard() {
  const item = session[sessionIndex];
  if (!item) {
    buildSession();
    return;
  }

  const [term, reading, pos, meaning, cluster, note, example, exampleZh] = item;
  const seen = loadProgress()[term]?.seen ?? 0;
  const reverse = seen > 0 && seen % 2 === 1;

  document.querySelector('#cardMode').textContent = reverse ? '中文 → 日文＋朗讀' : '日文 → 中文＋情境';
  document.querySelector('#cardPosition').textContent = `${sessionIndex + 1} / ${sessionSize}`;
  document.querySelector('#promptInstruction').textContent = reverse ? clusterLabels[cluster] : '先說出讀音與意思';
  document.querySelector('#promptText').textContent = reverse ? meaning : term;
  document.querySelector('#promptSupport').textContent = reverse
    ? '說出日文後，再大聲讀一次並想一個新情境。'
    : '想 5–8 秒，再說它適合出現在哪一種情境。';

  document.querySelector('#answerTerm').textContent = term;
  document.querySelector('#answerReading').textContent = reading;
  document.querySelector('#answerPos').textContent = pos;
  document.querySelector('#answerMeaning').textContent = meaning;
  document.querySelector('#answerNote').textContent = note;
  document.querySelector('#answerExample').textContent = example;
  document.querySelector('#answerExampleZh').textContent = exampleZh;
  document.querySelector('#answerArea').hidden = true;
  document.querySelector('#revealAnswer').hidden = false;
}

function rateCurrent(rating) {
  const term = session[sessionIndex][0];
  const progress = loadProgress();
  const record = progress[term] ?? { level: 0, seen: 0 };
  const intervals = [1, 3, 7, 14, 30];

  if (rating === 'again') {
    record.level = 0;
    record.nextAt = Date.now();
  } else if (rating === 'hard') {
    record.level = Math.max(1, record.level);
    record.nextAt = addDays(1);
  } else {
    record.level = Math.min(4, record.level + 1);
    record.nextAt = addDays(intervals[record.level] ?? 30);
  }

  record.seen += 1;
  progress[term] = record;
  saveProgress(progress);
  sessionIndex += 1;

  if (sessionIndex >= session.length) {
    session = shuffle(vocabulary).slice(0, sessionSize);
    sessionIndex = 0;
  }

  renderCard();
  updateProgress();
  document.querySelector('#revealAnswer').focus({ preventScroll: true });
}

function updateProgress() {
  const progress = loadProgress();
  const stable = vocabulary.filter((item) => (progress[item[0]]?.level ?? 0) >= 2).length;
  const due = vocabulary.filter((item) => {
    const record = progress[item[0]];
    return !record || !record.nextAt || record.nextAt <= Date.now();
  }).length;
  document.querySelector('#progressText').textContent = `${stable} / ${vocabulary.length}`;
  document.querySelector('#progressBar').style.width = `${Math.round((stable / vocabulary.length) * 100)}%`;
  document.querySelector('#dueText').textContent = due
    ? `今天有 ${due} 個尚未學習或到期項目；本回合選 6 個。`
    : '今天的到期項目完成了，接下來可做跨情境口說。';
}

function renderCourse() {
  document.querySelector('#courseList').innerHTML = course
    .map(
      ([title, body, loop], index) => `
        <details${index === 0 ? ' open' : ''}>
          <summary><span class="day-code">${index === 0 ? '診' : `D${index}`}</span>${title}</summary>
          <div class="detail-body">
            <p>${body}</p>
            <div class="learning-loop" aria-label="當日練習順序">
              ${loop.split(' → ').map((step) => `<span>${step}</span>`).join('')}
            </div>
          </div>
        </details>`,
    )
    .join('');
}

function renderFilters() {
  document.querySelector('#clusterFilters').innerHTML = Object.entries(clusterLabels)
    .map(
      ([key, label]) => `<button type="button" data-cluster="${key}" aria-pressed="${key === activeCluster}">${label}</button>`,
    )
    .join('');
}

function renderWords() {
  const query = document.querySelector('#wordSearch').value.trim().toLowerCase();
  const filtered = vocabulary.filter((item) => {
    const clusterMatch = activeCluster === 'all' || item[4] === activeCluster;
    const queryMatch = !query || item.join(' ').toLowerCase().includes(query);
    return clusterMatch && queryMatch;
  });

  document.querySelector('#resultCount').textContent = `顯示 ${filtered.length}／${vocabulary.length} 個字詞`;
  document.querySelector('#wordList').innerHTML = filtered
    .map(
      ([term, reading, pos, meaning, , note, example, exampleZh]) => `
        <article class="word-card">
          <header><h3 lang="ja">${term}</h3><span>${pos}</span></header>
          <p class="reading">${reading}</p>
          <p class="meaning">${meaning}</p>
          <details>
            <summary>語感＋新例句</summary>
            <p>${note}</p>
            <p lang="ja">${example}</p>
            <p>${exampleZh}</p>
          </details>
        </article>`,
    )
    .join('');
}

function renderContrasts() {
  document.querySelector('#contrastList').innerHTML = contrasts
    .map(
      ([left, right, note]) => `
        <article class="contrast-card">
          <div class="contrast-pair"><strong lang="ja">${left}</strong><span>CHECK</span><strong lang="ja">${right}</strong></div>
          <p>${note}</p>
        </article>`,
    )
    .join('');
}

function renderPatterns() {
  document.querySelector('#patternList').innerHTML = patterns
    .map(
      ([form, use, explanation, source, example], index) => `
        <details${index === 0 ? ' open' : ''}>
          <summary><span class="pattern-form">${form}</span>${use}</summary>
          <div class="detail-body">
            <p>${explanation}</p>
            <p><strong>附件觀察：</strong>${source}</p>
            <p lang="ja"><strong>新情境：</strong>${example}</p>
          </div>
        </details>`,
    )
    .join('');
}

function renderTransfers() {
  document.querySelector('#transferList').innerHTML = transfers
    .map(
      ([question, answer, explanation], index) => `
        <details>
          <summary>Q${index + 1}　${question}</summary>
          <div class="detail-body"><p><strong>${answer}</strong></p><p>${explanation}</p></div>
        </details>`,
    )
    .join('');
}

function bindEvents() {
  document.querySelector('#revealAnswer').addEventListener('click', (event) => {
    event.currentTarget.hidden = true;
    document.querySelector('#answerArea').hidden = false;
    document.querySelector('[data-rating="hard"]').focus({ preventScroll: true });
  });

  document.querySelectorAll('[data-rating]').forEach((button) => {
    button.addEventListener('click', () => rateCurrent(button.dataset.rating));
  });

  document.querySelector('#wordSearch').addEventListener('input', renderWords);

  document.querySelector('#clusterFilters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-cluster]');
    if (!button) return;
    activeCluster = button.dataset.cluster;
    renderFilters();
    renderWords();
  });

  document.querySelector('#resetProgress').addEventListener('click', () => {
    if (!window.confirm('要清除這台裝置上的學習進度嗎？教材內容不會受到影響。')) return;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // 儲存停用時不需額外處理。
    }
    buildSession();
  });
}

function init() {
  document.querySelector('#wordCount').textContent = vocabulary.length;
  document.querySelector('#patternCount').textContent = patterns.length;
  document.querySelector('#contrastCount').textContent = contrasts.length;
  renderCourse();
  renderFilters();
  renderWords();
  renderContrasts();
  renderPatterns();
  renderTransfers();
  buildSession();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
