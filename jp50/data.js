/**
 * 日文 50 音進階記憶資料庫
 * 包含：平假名、片假名、羅馬拼音、趣味聯想口訣、多組實用單字（含羅馬拼音）
 */
const gojuonData = [
  // --- あ行 ---
  {
    hiragana: "あ", katakana: "ア", romaji: "a",
    mnemonic: "像安靜的「安」字上半部，女子張大嘴巴喊「啊（a）〜」！",
    words: [
      { jp: "あい (愛)", romaji: "ai", meaning: "愛 / 愛情" },
      { jp: "あさ (朝)", romaji: "asa", meaning: "早晨" },
      { jp: "あめ (雨)", romaji: "ame", meaning: "雨水" }
    ]
  },
  {
    hiragana: "い", katakana: "イ", romaji: "i",
    mnemonic: "兩條平行線，像「以」字的左半邊，兩根手指比「伊（i）」。",
    words: [
      { jp: "いぬ (犬)", romaji: "inu", meaning: "狗" },
      { jp: "いえ (家)", romaji: "ie", meaning: "房屋 / 家" },
      { jp: "いち (一)", romaji: "ichi", meaning: "數字 1" }
    ]
  },
  {
    hiragana: "う", katakana: "ウ", romaji: "u",
    mnemonic: "肚子被重擊一拳，彎腰倒地發出「烏（u）〜」的哀號。",
    words: [
      { jp: "うみ (海)", romaji: "umi", meaning: "大海" },
      { jp: "うた (歌)", romaji: "uta", meaning: "歌曲" },
      { jp: "うえ (上)", romaji: "ue", meaning: "上面" }
    ]
  },
  {
    hiragana: "え", katakana: "エ", romaji: "e",
    mnemonic: "像書法寫「元」氣的元，起筆優雅，讓人驚嘆「誒（e）？」。",
    words: [
      { jp: "えき (駅)", romaji: "eki", meaning: "車站" },
      { jp: "えん (円)", romaji: "en", meaning: "日圓 / 圓形" },
      { jp: "えいが (映画)", romaji: "eiga", meaning: "電影" }
    ]
  },
  {
    hiragana: "お", katakana: "オ", romaji: "o",
    mnemonic: "像「才」字多了一點，這個天才發明讓人「噢（o）！」出來。",
    words: [
      { jp: "おいしい", romaji: "oishii", meaning: "美味的" },
      { jp: "おんがく (音楽)", romaji: "ongaku", meaning: "音樂" },
      { jp: "おこめ (お米)", romaji: "okome", meaning: "白米" }
    ]
  },

  // --- か行 ---
  {
    hiragana: "か", katakana: "カ", romaji: "ka",
    mnemonic: "拿刀砍樹用力（力），揮刀發出「卡（ka）」的一聲！",
    words: [
      { jp: "かお (顔)", romaji: "kao", meaning: "臉" },
      { jp: "かさ (傘)", romaji: "kasa", meaning: "雨傘" },
      { jp: "かわ (川)", romaji: "kawa", meaning: "河流" }
    ]
  },
  {
    hiragana: "き", katakana: "キ", romaji: "ki",
    mnemonic: "長得像一把復古鑰匙（Key），插進鎖孔開門「Ki（ki）」。",
    words: [
      { jp: "き (木)", romaji: "ki", meaning: "樹木" },
      { jp: "きっぷ (切符)", romaji: "kippu", meaning: "車票" },
      { jp: "きょう (今日)", romaji: "kyou", meaning: "今天" }
    ]
  },
  {
    hiragana: "く", katakana: "ク", romaji: "ku",
    mnemonic: "像小鳥張開尖尖的嘴巴，吃不到蟲子哭（ku）了出來。",
    words: [
      { jp: "くつ (靴)", romaji: "kutsu", meaning: "鞋子" },
      { jp: "くも (雲)", romaji: "kumo", meaning: "雲朵" },
      { jp: "くるま (車)", romaji: "kuruma", meaning: "汽車" }
    ]
  },
  {
    hiragana: "け", katakana: "ケ", romaji: "ke",
    mnemonic: "像「計」劃的左邊門字旁，門打開讓人「克（ke）」制不住想進去。",
    words: [
      { jp: "けいさつ (警察)", romaji: "keisatsu", meaning: "警察" },
      { jp: "けしごむ (消しゴム)", romaji: "keshigomu", meaning: "橡皮擦" },
      { jp: "けいたい (携帯)", romaji: "keitai", meaning: "手機" }
    ]
  },
  {
    hiragana: "こ", katakana: "コ", romaji: "ko",
    mnemonic: "上下兩條平行線，就像圓圈（Co）被切開成兩半。",
    words: [
      { jp: "こども (子供)", romaji: "kodomo", meaning: "小孩" },
      { jp: "こころ (心)", romaji: "kokoro", meaning: "心靈 / 愛心" },
      { jp: "こうえん (公園)", romaji: "kouen", meaning: "公園" }
    ]
  },

  // --- さ行 ---
  {
    hiragana: "さ", katakana: "サ", romaji: "sa",
    mnemonic: "廚師手持菜刀下壓，準備「殺（sa）」魚做生魚片！",
    words: [
      { jp: "さかな (魚)", romaji: "sakana", meaning: "魚" },
      { jp: "さくら (桜)", romaji: "sakura", meaning: "櫻花" },
      { jp: "さいふ (財布)", romaji: "saifu", meaning: "皮夾" }
    ]
  },
  {
    hiragana: "し", katakana: "シ", romaji: "shi",
    mnemonic: "像美女長髮飄逸，用吸管（Shi）吸珍奶。",
    words: [
      { jp: "しんかんせん (新幹線)", romaji: "shinkansen", meaning: "新幹線" },
      { jp: "しんぶん (新聞)", romaji: "shinbun", meaning: "報紙" },
      { jp: "しろ (白)", romaji: "shiro", meaning: "白色" }
    ]
  },
  {
    hiragana: "す", katakana: "ス", romaji: "su",
    mnemonic: "公園的吊環垂下一條繩子，小男孩打「思（su）」噴嚏。",
    words: [
      { jp: "すし (寿司)", romaji: "sushi", meaning: "壽司" },
      { jp: "すき (好き)", romaji: "suki", meaning: "喜歡" },
      { jp: "すいか (西瓜)", romaji: "suika", meaning: "西瓜" }
    ]
  },
  {
    hiragana: "せ", katakana: "セ", romaji: "se",
    mnemonic: "就像「世」界的世界，右邊少了一筆，發「塞（se）」音。",
    words: [
      { jp: "せんせい (先生)", romaji: "sensei", meaning: "老師" },
      { jp: "せかい (世界)", romaji: "sekai", meaning: "世界" },
      { jp: "せなか (背中)", romaji: "senaka", meaning: "背部" }
    ]
  },
  {
    hiragana: "そ", katakana: "ソ", romaji: "so",
    mnemonic: "像一條彎曲的手術縫合線，發出「縮（so）」的聲音。",
    words: [
      { jp: "そら (空)", romaji: "sora", meaning: "天空" },
      { jp: "そうじ (掃除)", romaji: "souji", meaning: "打掃" },
      { jp: "そと (外)", romaji: "soto", meaning: "外面" }
    ]
  },

  // --- た行 ---
  {
    hiragana: "た", katakana: "タ", romaji: "ta",
    mnemonic: "就像漢字「太」少了右邊那一點，發音是「他（ta）」。",
    words: [
      { jp: "たべもの (食べ物)", romaji: "tabemono", meaning: "食物" },
      { jp: "たまご (卵)", romaji: "tamago", meaning: "雞蛋" },
      { jp: "たかい (高い)", romaji: "takai", meaning: "高的 / 昂貴的" }
    ]
  },
  {
    hiragana: "ち", katakana: "チ", romaji: "chi",
    mnemonic: "數字「5」顛倒過來寫，像一塊香濃的起司（Chi）。",
    words: [
      { jp: "ちかい (近)", romaji: "chikai", meaning: "近的" },
      { jp: "ちず (地図)", romaji: "chizu", meaning: "地圖" },
      { jp: "ちから (力)", romaji: "chikara", meaning: "力量" }
    ]
  },
  {
    hiragana: "つ", katakana: "ツ", romaji: "tsu",
    mnemonic: "大海上湧起的大海浪（Tsunami 浪頭），發音「刺（tsu）」。",
    words: [
      { jp: "つくえ (机)", romaji: "tsukue", meaning: "桌子" },
      { jp: "つき (月)", romaji: "tsuki", meaning: "月亮" },
      { jp: "つぎ (次)", romaji: "tsugi", meaning: "下一個" }
    ]
  },
  {
    hiragana: "て", katakana: "テ", romaji: "te",
    mnemonic: "伸出一隻手掌（Hand / Te），像極了打網球的姿勢。",
    words: [
      { jp: "てがみ (手紙)", romaji: "tegami", meaning: "信件" },
      { jp: "てんき (天気)", romaji: "tenki", meaning: "天氣" },
      { jp: "て (手)", romaji: "te", meaning: "手" }
    ]
  },
  {
    hiragana: "と", katakana: "ト", romaji: "to",
    mnemonic: "木刺插進腳趾頭（Toe），好痛「妥（to）」不妥協！",
    words: [
      { jp: "ともだち (友達)", romaji: "tomodachi", meaning: "朋友" },
      { jp: "とけい (時計)", romaji: "tokei", meaning: "時鐘 / 手錶" },
      { jp: "とり (鳥)", romaji: "tori", meaning: "鳥" }
    ]
  },

  // --- な行 ---
  {
    hiragana: "な", katakana: "ナ", romaji: "na",
    mnemonic: "修女（Nun）在十字架前跪著虔誠祈禱「娜（na）」麼認真。",
    words: [
      { jp: "なつ (夏)", romaji: "natsu", meaning: "夏天" },
      { jp: "名前 (なまえ)", romaji: "namae", meaning: "名字" },
      { jp: "なに (何)", romaji: "nani", meaning: "什麼" }
    ]
  },
  {
    hiragana: "に", katakana: "ニ", romaji: "ni",
    mnemonic: "漢字「仁」的右半部，或像阿拉伯數字「2（Ni）」。",
    words: [
      { jp: "にく (肉)", romaji: "niku", meaning: "肉" },
      { jp: "にほん (日本)", romaji: "nihon", meaning: "日本" },
      { jp: "にし (西)", romaji: "nishi", meaning: "西方" }
    ]
  },
  {
    hiragana: "ぬ", katakana: "ヌ", romaji: "nu",
    mnemonic: "筷子夾起一碗熱騰騰打結的麵條（Noodle），「奴（nu）」隸般忙碌。",
    words: [
      { jp: "いぬ (犬)", romaji: "inu", meaning: "狗" },
      { jp: "ぬの (布)", romaji: "nuno", meaning: "布料" },
      { jp: "ぬいぐるみ", romaji: "nuigurumi", meaning: "絨毛玩偶" }
    ]
  },
  {
    hiragana: "ね", katakana: "ネ", romaji: "ne",
    mnemonic: "像小貓咪（Neko）捲起尾巴蹲在角落睡覺捏（ne）。",
    words: [
      { jp: "ねこ (猫)", romaji: "neko", meaning: "貓" },
      { jp: "ねつ (熱)", romaji: "netsu", meaning: "發燒 / 熱量" },
      { jp: "ねんだい (年代)", romaji: "nendai", meaning: "年代" }
    ]
  },
  {
    hiragana: "の", katakana: "ノ", romaji: "no",
    mnemonic: "畫一個圈塗上一斜線，就是「禁止（No）」標誌！",
    words: [
      { jp: "のりもの (乗り物)", romaji: "norimono", meaning: "交通工具" },
      { jp: "飲み物 (のみもの)", romaji: "nomimono", meaning: "飲料" },
      { jp: "ノート", romaji: "no-to", meaning: "筆記本" }
    ]
  },

  // --- は行 ---
  {
    hiragana: "は", katakana: "ハ", romaji: "ha",
    mnemonic: "「波」浪的左半邊，開心的時候笑得「哈（ha）哈」大笑！",
    words: [
      { jp: "はな (花)", romaji: "hana", meaning: "花朵" },
      { jp: "はし (橋)", romaji: "hashi", meaning: "橋樑" },
      { jp: "はこ (箱)", romaji: "hako", meaning: "盒子" }
    ]
  },
  {
    hiragana: "ひ", katakana: "ヒ", romaji: "hi",
    mnemonic: "像人咧開嘴巴嘻嘻（hi）笑，露出彎彎的嘴角。",
    words: [
      { jp: "ひかり (光)", romaji: "hikari", meaning: "光芒" },
      { jp: "ひと (人)", romaji: "hito", meaning: "人" },
      { jp: "ひこうき (飛行機)", romaji: "hikouki", meaning: "飛機" }
    ]
  },
  {
    hiragana: "ふ", katakana: "フ", romaji: "fu",
    mnemonic: "像雄偉的富士山（Fujisan）的輪廓，吹一口氣「呼（fu）」！",
    words: [
      { jp: "ふね (船)", romaji: "fune", meaning: "船" },
      { jp: "ふく (服)", romaji: "fuku", meaning: "衣服" },
      { jp: "ふゆ (冬)", romaji: "fuyu", meaning: "冬天" }
    ]
  },
  {
    hiragana: "へ", katakana: "ヘ", romaji: "he",
    mnemonic: "像一座平緩的小山丘（Hill），向上爬發出「黑（he）」聲。",
    words: [
      { jp: "へや (部屋)", romaji: "heya", meaning: "房間" },
      { jp: "へんじ (返事)", romaji: "henji", meaning: "回覆" },
      { jp: "へいわ (平和)", romaji: "heiwa", meaning: "和平" }
    ]
  },
  {
    hiragana: "ほ", katakana: "ホ", romaji: "ho",
    mnemonic: "帆船張開高高的雙帆，順風航行「霍（ho）」了一聲。",
    words: [
      { jp: "ほん (本)", romaji: "hon", meaning: "書本" },
      { jp: "ほし (星)", romaji: "hoshi", meaning: "星星" },
      { jp: "ホテル", romaji: "hoteru", meaning: "飯店 / 旅館" }
    ]
  },

  // --- ま行 ---
  {
    hiragana: "ま", katakana: "マ", romaji: "ma",
    mnemonic: "像馬（ma）頭上的馬籠頭，騎馬喊「媽媽」！",
    words: [
      { jp: "まち (町)", romaji: "machi", meaning: "城鎮" },
      { jp: "まつり (祭り)", romaji: "matsuri", meaning: "祭典" },
      { jp: "まど (窓)", romaji: "mado", meaning: "窗戶" }
    ]
  },
  {
    hiragana: "み", katakana: "ミ", romaji: "mi",
    mnemonic: "像數字「21」的連筆，也像樂譜上的音符「Mi（mi）」。",
    words: [
      { jp: "みず (水)", romaji: "mizu", meaning: "水" },
      { jp: "みち (道)", romaji: "michi", meaning: "道路" },
      { jp: "みせ (店)", romaji: "mise", meaning: "商店" }
    ]
  },
  {
    hiragana: "む", katakana: "ム", romaji: "mu",
    mnemonic: "像乳牛（Muu）頂著一對牛角，發出「哞（mu）」的叫聲。",
    words: [
      { jp: "むし (虫)", romaji: "mushi", meaning: "昆蟲" },
      { jp: "むすこ (息子)", romaji: "musuko", meaning: "兒子" },
      { jp: "むずかしい (難しい)", romaji: "muzukashii", meaning: "困難的" }
    ]
  },
  {
    hiragana: "め", katakana: "メ", romaji: "me",
    mnemonic: "漢字「女」的連筆寫法，女人有美麗的眼睛（Me）。",
    words: [
      { jp: "め (目)", romaji: "me", meaning: "眼睛" },
      { jp: "めがね (眼鏡)", romaji: "megane", meaning: "眼鏡" },
      { jp: "めんかい (面会)", romaji: "menkai", meaning: "會面" }
    ]
  },
  {
    hiragana: "も", katakana: "モ", romaji: "mo",
    mnemonic: "釣魚鉤鉤住好吃的餌，想釣到更多的（More）魚！",
    words: [
      { jp: "もり (森)", romaji: "mori", meaning: "森林" },
      { jp: "もの (物)", romaji: "mono", meaning: "物品" },
      { jp: "もんだい (問題)", romaji: "mondai", meaning: "問題" }
    ]
  },

  // --- や行 ---
  {
    hiragana: "や", katakana: "ヤ", romaji: "ya",
    mnemonic: "像一艘帶有斜帆的豪華遊艇（Yacht），發「鴨（ya）」音。",
    words: [
      { jp: "やま (山)", romaji: "yama", meaning: "山" },
      { jp: "やすみ (休み)", romaji: "yasumi", meaning: "休息 / 假期" },
      { jp: "やさい (野菜)", romaji: "yasai", meaning: "蔬菜" }
    ]
  },
  {
    hiragana: "ゆ", katakana: "ユ", romaji: "yu",
    mnemonic: "像寫得流暢的數字「10」，這由（yu）來非常有趣。",
    words: [
      { jp: "ゆき (雪)", romaji: "yuki", meaning: "雪" },
      { jp: "ゆめ (夢)", romaji: "yume", meaning: "夢想" },
      { jp: "有名 (ゆうめい)", romaji: "yuumei", meaning: "有名的" }
    ]
  },
  {
    hiragana: "よ", katakana: "ヨ", romaji: "yo",
    mnemonic: "像一支金黃色的鑰匙（Yo），優（yo）雅地旋轉開鎖。",
    words: [
      { jp: "よる (夜)", romaji: "yoru", meaning: "夜晚" },
      { jp: "よむ (読む)", romaji: "yomu", meaning: "閱讀" },
      { jp: "よあけ (夜明け)", romaji: "yoake", meaning: "黎明" }
    ]
  },

  // --- ら行 ---
  {
    hiragana: "ら", katakana: "ラ", romaji: "ra",
    mnemonic: "像一隻單峰駱駝（Camel），發音接近拉（ra）。",
    words: [
      { jp: "らいしゅう (来週)", romaji: "raishuu", meaning: "下週" },
      { jp: "らいねん (来年)", romaji: "rainen", meaning: "明年" },
      { jp: "ラジオ", romaji: "rajio", meaning: "收音機" }
    ]
  },
  {
    hiragana: "り", katakana: "リ", romaji: "ri",
    mnemonic: "兩條立在田邊的竹竿（Reed），發音像立（ri）。",
    words: [
      { jp: "りんご", romaji: "ringo", meaning: "蘋果" },
      { jp: "りょこう (旅行)", romaji: "ryokou", meaning: "旅行" },
      { jp: "りゆ (理由)", romaji: "riyuu", meaning: "理由" }
    ]
  },
  {
    hiragana: "る", katakana: "ル", romaji: "ru",
    mnemonic: "一根轉了圈圈的繩結（Loop），發音是嚕（ru）。",
    words: [
      { jp: "くるま (車)", romaji: "kuruma", meaning: "汽車" },
      { jp: "るす (留守)", romaji: "rusu", meaning: "不在家" },
      { jp: "ルール", romaji: "ru-ru", meaning: "規則" }
    ]
  },
  {
    hiragana: "れ", katakana: "レ", romaji: "re",
    mnemonic: "禮貌的人彎腰鞠躬，發音就是「禮（re）」。",
    words: [
      { jp: "れいぞうこ (冷蔵庫)", romaji: "reizouko", meaning: "冰箱" },
      { jp: "れきし (歴史)", romaji: "rekishi", meaning: "歷史" },
      { jp: "れんしゅう (練習)", romaji: "renshuu", meaning: "練習" }
    ]
  },
  {
    hiragana: "ろ", katakana: "ロ", romaji: "ro",
    mnemonic: "像數字「3」，也像蜿蜒曲折的山路（Road）。",
    words: [
      { jp: "ろく (六)", romaji: "roku", meaning: "數字 6" },
      { jp: "ろうそく", romaji: "rousoku", meaning: "蠟燭" },
      { jp: "ろどの (路旁)", romaji: "robono", meaning: "路邊" }
    ]
  },

  // --- わ行 & 撥音 ---
  {
    hiragana: "わ", katakana: "ワ", romaji: "wa",
    mnemonic: "一隻優雅的天鵝站在水邊，發出「哇（wa）」聲。",
    words: [
      { jp: "わたし (私)", romaji: "watashi", meaning: "我" },
      { jp: "わかい (若い)", romaji: "wakai", meaning: "年輕的" },
      { jp: "わに (鰐)", romaji: "wani", meaning: "鱷魚" }
    ]
  },
  {
    hiragana: "を", katakana: "ヲ", romaji: "wo",
    mnemonic: "跨越障礙物的滑板選手，助詞專用發音（Wo）。",
    words: [
      { jp: "〜を (助詞)", romaji: "wo", meaning: "動作對象助詞" }
    ]
  },
  {
    hiragana: "ん", katakana: "ン", romaji: "n",
    mnemonic: "英文字母草書「n」的變體，作為鼻音「嗯（n）」。",
    words: [
      { jp: "にほん (日本)", romaji: "nihon", meaning: "日本" },
      { jp: "みかん", romaji: "mikan", meaning: "橘子" },
      { jp: "しんぶん (新聞)", romaji: "shinbun", meaning: "報紙" }
    ]
  }
];
