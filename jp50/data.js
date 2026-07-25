/**
 * 50 音多維度記憶資料庫 (完整 46 音)
 * 包含：平假名、片假名、羅馬拼音、多維度記憶(字形/諧音/故事)、實用單字
 */
const gojuonData = [
  // --- あ行 ---
  {
    hiragana: "あ", katakana: "ア", romaji: "a",
    mnemonics: {
      shape: "「安」字的草書變體。",
      sound: "啊 (a)",
      story: "在甲子園球場張大嘴巴，大聲唱著愛繆（Aimyon）的歌「啊～」。"
    },
    words: [
      { jp: "あい (愛)", romaji: "ai", meaning: "愛 / 愛情" },
      { jp: "あさ (朝)", romaji: "asa", meaning: "早晨" }
    ]
  },
  {
    hiragana: "い", katakana: "イ", romaji: "i",
    mnemonics: {
      shape: "兩根平行的線條，左長右短。",
      sound: "伊 (i)",
      story: "兩個人並肩走在日本街頭，發出「伊～」的微笑聲。"
    },
    words: [
      { jp: "いぬ (犬)", romaji: "inu", meaning: "狗" },
      { jp: "いえ (家)", romaji: "ie", meaning: "房屋" }
    ]
  },
  {
    hiragana: "う", katakana: "ウ", romaji: "u",
    mnemonics: {
      shape: "像一個彎著腰、抱著肚子的人。",
      sound: "嗚 (u)",
      story: "旅行走太多路腿酸得彎下腰，發出「嗚～」的聲音。"
    },
    words: [
      { jp: "うみ (海)", romaji: "umi", meaning: "大海" },
      { jp: "うた (歌)", romaji: "uta", meaning: "歌曲" }
    ]
  },
  {
    hiragana: "え", katakana: "エ", romaji: "e",
    mnemonics: {
      shape: "像草書的「元」字。",
      sound: "誒 (e)",
      story: "聽到令人驚訝的消息，元氣滿滿地大喊：「誒？！」"
    },
    words: [
      { jp: "えき (駅)", romaji: "eki", meaning: "車站" },
      { jp: "えいが (映画)", romaji: "eiga", meaning: "電影" }
    ]
  },
  {
    hiragana: "お", katakana: "オ", romaji: "o",
    mnemonics: {
      shape: "像「才」字多了一點。",
      sound: "喔 (o)",
      story: "看到天才不可思議的表演，驚嘆地發出「喔～」。"
    },
    words: [
      { jp: "おおさか (大阪)", romaji: "oosaka", meaning: "大阪" },
      { jp: "おいしい", romaji: "oishii", meaning: "好吃的" }
    ]
  },

  // --- か行 ---
  {
    hiragana: "か", katakana: "カ", romaji: "ka",
    mnemonics: {
      shape: "「加」的左半邊。",
      sound: "咖 (ka)",
      story: "拿著相機（Camera）在鎌倉街頭，發出「咖嚓」的快門聲。"
    },
    words: [
      { jp: "カメラ", romaji: "kamera", meaning: "相機" },
      { jp: "かお (顔)", romaji: "kao", meaning: "臉" }
    ]
  },
  {
    hiragana: "き", katakana: "キ", romaji: "ki",
    mnemonics: {
      shape: "一把復古鑰匙的形狀。",
      sound: "Ki",
      story: "拿著鑰匙開門「Ki」，準備出門去旅行。"
    },
    words: [
      { jp: "きっぷ (切符)", romaji: "kippu", meaning: "車票" },
      { jp: "きょう (今日)", romaji: "kyou", meaning: "今天" }
    ]
  },
  {
    hiragana: "く", katakana: "ク", romaji: "ku",
    mnemonics: {
      shape: "小鳥張開尖尖的嘴巴。",
      sound: "哭 (ku)",
      story: "小鳥吃不到蟲子，難過地「哭」了出來。"
    },
    words: [
      { jp: "くつ (靴)", romaji: "kutsu", meaning: "鞋子" },
      { jp: "くるま (車)", romaji: "kuruma", meaning: "車子" }
    ]
  },
  {
    hiragana: "け", katakana: "ケ", romaji: "ke",
    mnemonics: {
      shape: "像「計」的左邊門字旁。",
      sound: "克 (ke)",
      story: "打開門，克制不住想衝出門拍照的心情。"
    },
    words: [
      { jp: "けいさつ (警察)", romaji: "keisatsu", meaning: "警察" },
      { jp: "けいたい (携帯)", romaji: "keitai", meaning: "手機" }
    ]
  },
  {
    hiragana: "こ", katakana: "コ", romaji: "ko",
    mnemonics: {
      shape: "圓圈被切開的上下兩半。",
      sound: "扣 (ko)",
      story: "用手沖壺慢慢繞著圓圈，滴出香醇的咖啡（Coffee）。"
    },
    words: [
      { jp: "コーヒー", romaji: "ko-hi-", meaning: "咖啡" },
      { jp: "こども (子供)", romaji: "kodomo", meaning: "小孩" }
    ]
  },

  // --- さ行 ---
  {
    hiragana: "さ", katakana: "サ", romaji: "sa",
    mnemonics: {
      shape: "一把殺魚的刀子。",
      sound: "殺 (sa)",
      story: "廚師俐落地下刀「殺」魚，準備切出美味的生魚片。"
    },
    words: [
      { jp: "さかな (魚)", romaji: "sakana", meaning: "魚" },
      { jp: "さくら (桜)", romaji: "sakura", meaning: "櫻花" }
    ]
  },
  {
    hiragana: "し", katakana: "シ", romaji: "shi",
    mnemonics: {
      shape: "長髮女孩彎曲的吸管。",
      sound: "吸 (shi)",
      story: "拿著吸管喝飲料，發出「吸」的聲音。"
    },
    words: [
      { jp: "しんかんせん (新幹線)", romaji: "shinkansen", meaning: "新幹線" },
      { jp: "しゃしん (写真)", romaji: "shashin", meaning: "照片" }
    ]
  },
  {
    hiragana: "す", katakana: "ス", romaji: "su",
    mnemonics: {
      shape: "吊環打了一個結。",
      sound: "思 (su)",
      story: "在公園散步吹到冷風，突然打了一個「思」噴嚏。"
    },
    words: [
      { jp: "すし (寿司)", romaji: "sushi", meaning: "壽司" },
      { jp: "すき (好き)", romaji: "suki", meaning: "喜歡" }
    ]
  },
  {
    hiragana: "せ", katakana: "セ", romaji: "se",
    mnemonics: {
      shape: "「世」界少了一筆。",
      sound: "塞 (se)",
      story: "旅行箱已經滿了，用力把最後一件衣服「塞」進去。"
    },
    words: [
      { jp: "せんせい (先生)", romaji: "sensei", meaning: "老師" },
      { jp: "せかい (世界)", romaji: "sekai", meaning: "世界" }
    ]
  },
  {
    hiragana: "そ", katakana: "ソ", romaji: "so",
    mnemonics: {
      shape: "英文字母 Z 加上 C。",
      sound: "縮 (so)",
      story: "天氣太冷，把脖子「縮」進溫暖的外套裡。"
    },
    words: [
      { jp: "そら (空)", romaji: "sora", meaning: "天空" },
      { jp: "そと (外)", romaji: "soto", meaning: "外面" }
    ]
  },

  // --- た行 ---
  {
    hiragana: "た", katakana: "タ", romaji: "ta",
    mnemonics: {
      shape: "「太」字少了一點。",
      sound: "他 (ta)",
      story: "指著前方說：那個人就是「他」，走在前面的旅伴。"
    },
    words: [
      { jp: "たべもの (食べ物)", romaji: "tabemono", meaning: "食物" },
      { jp: "たかい (高い)", romaji: "takai", meaning: "高的/昂貴的" }
    ]
  },
  {
    hiragana: "ち", katakana: "チ", romaji: "chi",
    mnemonics: {
      shape: "數字 5 顛倒過來寫。",
      sound: "七 (chi)",
      story: "吃了香濃的起司（Cheese），好吃到想再吃七塊。"
    },
    words: [
      { jp: "ちかてつ (地下鉄)", romaji: "chikatetsu", meaning: "地下鐵" },
      { jp: "ちず (地図)", romaji: "chizu", meaning: "地圖" }
    ]
  },
  {
    hiragana: "つ", katakana: "ツ", romaji: "tsu",
    mnemonics: {
      shape: "捲起的大海浪。",
      sound: "刺 (tsu)",
      story: "海浪打過來，冰冷的水花像針一樣「刺」在臉上。"
    },
    words: [
      { jp: "つくえ (机)", romaji: "tsukue", meaning: "桌子" },
      { jp: "つき (月)", romaji: "tsuki", meaning: "月亮" }
    ]
  },
  {
    hiragana: "て", katakana: "テ", romaji: "te",
    mnemonics: {
      shape: "伸出的一隻手掌。",
      sound: "貼 (te)",
      story: "伸出手，把郵票「貼」在明信片上寄給朋友。"
    },
    words: [
      { jp: "てがみ (手紙)", romaji: "tegami", meaning: "信件" },
      { jp: "てんき (天気)", romaji: "tenki", meaning: "天氣" }
    ]
  },
  {
    hiragana: "と", katakana: "ト", romaji: "to",
    mnemonics: {
      shape: "木刺插進腳趾頭。",
      sound: "拖 (to)",
      story: "規劃去東京（Tokyo）旅行，不想把進度往後「拖」。"
    },
    words: [
      { jp: "とうきょう (東京)", romaji: "toukyou", meaning: "東京" },
      { jp: "とけい (時計)", romaji: "tokei", meaning: "時鐘/手錶" }
    ]
  },

  // --- な行 ---
  {
    hiragana: "な", katakana: "ナ", romaji: "na",
    mnemonics: {
      shape: "十字架前的修女祈禱。",
      sound: "娜 (na)",
      story: "在安靜的寺廟前，誠心祈禱「那」個願望成真。"
    },
    words: [
      { jp: "なつ (夏)", romaji: "natsu", meaning: "夏天" },
      { jp: "なまえ (名前)", romaji: "namae", meaning: "名字" }
    ]
  },
  {
    hiragana: "に", katakana: "ニ", romaji: "ni",
    mnemonics: {
      shape: "「仁」的右半邊，也像數字 2。",
      sound: "泥 (ni)",
      story: "踩到水坑，新買的鞋子沾滿了「泥」巴。"
    },
    words: [
      { jp: "にく (肉)", romaji: "niku", meaning: "肉" },
      { jp: "にほん (日本)", romaji: "nihon", meaning: "日本" }
    ]
  },
  {
    hiragana: "ぬ", katakana: "ヌ", romaji: "nu",
    mnemonics: {
      shape: "一碗打結的麵條。",
      sound: "奴 (nu)",
      story: "吃著熱騰騰的拉麵，好吃得像個拉麵的俘「虜」。"
    },
    words: [
      { jp: "ぬいぐるみ", romaji: "nuigurumi", meaning: "絨毛玩偶" },
      { jp: "ぬの (布)", romaji: "nuno", meaning: "布料" }
    ]
  },
  {
    hiragana: "ね", katakana: "ネ", romaji: "ne",
    mnemonics: {
      shape: "一隻捲著尾巴睡覺的小貓。",
      sound: "捏 (ne)",
      story: "看到可愛的貓咪，忍不住想「捏」一下牠的肉球。"
    },
    words: [
      { jp: "ねこ (猫)", romaji: "neko", meaning: "貓" },
      { jp: "ねつ (熱)", romaji: "netsu", meaning: "發燒/熱度" }
    ]
  },
  {
    hiragana: "の", katakana: "ノ", romaji: "no",
    mnemonics: {
      shape: "圓形畫上斜線的禁止標誌。",
      sound: "No",
      story: "看到前方有禁止進入的牌子，立刻在心裡說「No」。"
    },
    words: [
      { jp: "のりもの (乗り物)", romaji: "norimono", meaning: "交通工具" },
      { jp: "ノート", romaji: "no-to", meaning: "筆記本" }
    ]
  },

  // --- は行 ---
  {
    hiragana: "は", katakana: "ハ", romaji: "ha",
    mnemonics: {
      shape: "「波」浪的左半邊。",
      sound: "哈 (ha)",
      story: "聽到一個超級好笑的笑話，開心得「哈」哈大笑。"
    },
    words: [
      { jp: "はな (花)", romaji: "hana", meaning: "花朵" },
      { jp: "はこ (箱)", romaji: "hako", meaning: "箱子" }
    ]
  },
  {
    hiragana: "ひ", katakana: "ヒ", romaji: "hi",
    mnemonics: {
      shape: "笑成彎月形狀的嘴巴。",
      sound: "嘻 (hi)",
      story: "拍紀念照時，大家一起喊 C，笑「嘻嘻」。"
    },
    words: [
      { jp: "ひかり (光)", romaji: "hikari", meaning: "光芒" },
      { jp: "ひこうき (飛行機)", romaji: "hikouki", meaning: "飛機" }
    ]
  },
  {
    hiragana: "ふ", katakana: "フ", romaji: "fu",
    mnemonics: {
      shape: "富士山的輪廓線。",
      sound: "呼 (fu)",
      story: "爬上富士山頂，看著風景深深地「呼」出一口氣。"
    },
    words: [
      { jp: "ふね (船)", romaji: "fune", meaning: "船" },
      { jp: "ふゆ (冬)", romaji: "fuyu", meaning: "冬天" }
    ]
  },
  {
    hiragana: "へ", katakana: "ヘ", romaji: "he",
    mnemonics: {
      shape: "平緩的小山丘。",
      sound: "黑 (he)",
      story: "慢慢爬過小山丘，天色漸漸變「黑」了。"
    },
    words: [
      { jp: "へや (部屋)", romaji: "heya", meaning: "房間" },
      { jp: "へいわ (平和)", romaji: "heiwa", meaning: "和平" }
    ]
  },
  {
    hiragana: "ほ", katakana: "ホ", romaji: "ho",
    mnemonics: {
      shape: "帆船張滿的風帆。",
      sound: "霍 (ho)",
      story: "帆船在海上順風航行，發出「霍」的風聲。"
    },
    words: [
      { jp: "ほん (本)", romaji: "hon", meaning: "書本" },
      { jp: "ホテル", romaji: "hoteru", meaning: "飯店" }
    ]
  },

  // --- ま行 ---
  {
    hiragana: "ま", katakana: "マ", romaji: "ma",
    mnemonics: {
      shape: "戴在馬頭上的馬籠頭。",
      sound: "媽 (ma)",
      story: "騎著帥氣的馬，開心地大喊：「媽」媽你看！"
    },
    words: [
      { jp: "まち (町)", romaji: "machi", meaning: "城鎮" },
      { jp: "まつり (祭り)", romaji: "matsuri", meaning: "祭典" }
    ]
  },
  {
    hiragana: "み", katakana: "ミ", romaji: "mi",
    mnemonics: {
      shape: "數字 21 或是樂譜上的 Mi。",
      sound: "咪 (mi)",
      story: "走在小巷子裡，聽到遠處傳來貓咪「咪」的叫聲。"
    },
    words: [
      { jp: "みず (水)", romaji: "mizu", meaning: "水" },
      { jp: "みち (道)", romaji: "michi", meaning: "道路" }
    ]
  },
  {
    hiragana: "む", katakana: "ム", romaji: "mu",
    mnemonics: {
      shape: "一隻長著角的乳牛頭部。",
      sound: "哞 (mu)",
      story: "經過廣闊的牧場，乳牛對著你大聲叫著「哞～」。"
    },
    words: [
      { jp: "むし (虫)", romaji: "mushi", meaning: "蟲" },
      { jp: "むすこ (息子)", romaji: "musuko", meaning: "兒子" }
    ]
  },
  {
    hiragana: "め", katakana: "メ", romaji: "me",
    mnemonics: {
      shape: "「女」字的草書連筆。",
      sound: "妹 (me)",
      story: "在商店街買了漂亮的小禮物，準備帶回去送給妹「妹」。"
    },
    words: [
      { jp: "め (目)", romaji: "me", meaning: "眼睛" },
      { jp: "めがね (眼鏡)", romaji: "megane", meaning: "眼鏡" }
    ]
  },
  {
    hiragana: "も", katakana: "モ", romaji: "mo",
    mnemonics: {
      shape: "釣魚用的魚鉤。",
      sound: "摸 (mo)",
      story: "在清涼的溪水裡「摸」索，想抓到更多的魚。"
    },
    words: [
      { jp: "もり (森)", romaji: "mori", meaning: "森林" },
      { jp: "もんだい (問題)", romaji: "mondai", meaning: "問題" }
    ]
  },

  // --- や行 ---
  {
    hiragana: "や", katakana: "ヤ", romaji: "ya",
    mnemonics: {
      shape: "一艘揚起風帆的小船。",
      sound: "鴨 (ya)",
      story: "在棒球場（野球 / Yakyuu）旁邊的湖裡，有一隻小「鴨」在游泳。"
    },
    words: [
      { jp: "やま (山)", romaji: "yama", meaning: "山" },
      { jp: "やきゅう (野球)", romaji: "yakyuu", meaning: "棒球" }
    ]
  },
  {
    hiragana: "ゆ", katakana: "ユ", romaji: "yu",
    mnemonics: {
      shape: "流暢的數字 10。",
      sound: "由 (yu)",
      story: "這間百年老店的故事「由」來非常引人入勝。"
    },
    words: [
      { jp: "ゆき (雪)", romaji: "yuki", meaning: "雪" },
      { jp: "ゆめ (夢)", romaji: "yume", meaning: "夢想" }
    ]
  },
  {
    hiragana: "よ", katakana: "ヨ", romaji: "yo",
    mnemonics: {
      shape: "一支金黃色的鑰匙。",
      sound: "優 (yo)",
      story: "拿著鑰匙「優」雅地打開飯店房間的門。"
    },
    words: [
      { jp: "よる (夜)", romaji: "yoru", meaning: "夜晚" },
      { jp: "よむ (読む)", romaji: "yomu", meaning: "閱讀" }
    ]
  },

  // --- ら行 ---
  {
    hiragana: "ら", katakana: "ラ", romaji: "ra",
    mnemonics: {
      shape: "一隻駱駝的駝峰。",
      sound: "拉 (ra)",
      story: "結束假期，牽著行李箱在機場慢慢「拉」著走。"
    },
    words: [
      { jp: "らいねん (来年)", romaji: "rainen", meaning: "明年" },
      { jp: "ラジオ", romaji: "rajio", meaning: "收音機" }
    ]
  },
  {
    hiragana: "り", katakana: "リ", romaji: "ri",
    mnemonics: {
      shape: "兩根立在田邊的竹竿。",
      sound: "立 (ri)",
      story: "在車站月台「立」正站好，滿心期待等著搭車去旅行。"
    },
    words: [
      { jp: "りょこう (旅行)", romaji: "ryokou", meaning: "旅行" },
      { jp: "りんご", romaji: "ringo", meaning: "蘋果" }
    ]
  },
  {
    hiragana: "る", katakana: "ル", romaji: "ru",
    mnemonics: {
      shape: "一條打了一個圓圈圈的繩結。",
      sound: "嚕 (ru)",
      story: "搭著汽車在公路上奔馳，引擎發出「嚕嚕嚕」的聲音。"
    },
    words: [
      { jp: "るす (留守)", romaji: "rusu", meaning: "不在家" },
      { jp: "ルール", romaji: "ru-ru", meaning: "規則" }
    ]
  },
  {
    hiragana: "れ", katakana: "レ", romaji: "re",
    mnemonics: {
      shape: "一個彎下腰鞠躬的人。",
      sound: "禮 (re)",
      story: "走在街上遇到朋友，很有「禮」貌地彎腰鞠躬打招呼。"
    },
    words: [
      { jp: "れんしゅう (練習)", romaji: "renshuu", meaning: "練習" },
      { jp: "れきし (歴史)", romaji: "rekishi", meaning: "歷史" }
    ]
  },
  {
    hiragana: "ろ", katakana: "ロ", romaji: "ro",
    mnemonics: {
      shape: "像阿拉伯數字的 3。",
      sound: "囉 (ro)",
      story: "走在彎彎曲曲的石板小路上，終於抵達目的地「囉」！"
    },
    words: [
      { jp: "ろく (六)", romaji: "roku", meaning: "數字 6" },
      { jp: "ろうそく", romaji: "rousoku", meaning: "蠟燭" }
    ]
  },

  // --- わ行 & 撥音 ---
  {
    hiragana: "わ", katakana: "ワ", romaji: "wa",
    mnemonics: {
      shape: "一隻單腳站立的大紅鶴。",
      sound: "哇 (wa)",
      story: "看到壯觀的美麗風景，忍不住驚呼「哇」了一聲！"
    },
    words: [
      { jp: "わたし (私)", romaji: "watashi", meaning: "我" },
      { jp: "わかい (若い)", romaji: "wakai", meaning: "年輕的" }
    ]
  },
  {
    hiragana: "を", katakana: "ヲ", romaji: "wo",
    mnemonics: {
      shape: "一個正在跨越障礙物的選手。",
      sound: "Wo",
      story: "順利跨越語言的障礙，這是日文專用的受詞助詞（Wo）。"
    },
    words: [
      { jp: "〜を (助詞)", romaji: "wo", meaning: "受詞助詞" }
    ]
  },
  {
    hiragana: "ん", katakana: "ン", romaji: "n",
    mnemonics: {
      shape: "英文字母草書的 n。",
      sound: "恩 (n)",
      story: "低頭思考下一個行程時，發出「恩...」的鼻音。"
    },
    words: [
      { jp: "にほん (日本)", romaji: "nihon", meaning: "日本" },
      { jp: "しんぶん (新聞)", romaji: "shinbun", meaning: "報紙" }
    ]
  }
];
