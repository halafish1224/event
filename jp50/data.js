/**
 * 日文 50 音完整資料庫
 * 包含：平假名、片假名、羅馬拼音、記憶口訣、實用範例單字
 */
const gojuonData = [
  // --- あ行 ---
  {
    hiragana: "あ",
    katakana: "ア",
    romaji: "a",
    mnemonic: "像安靜的「安」上半部，張大嘴巴發「啊」音。",
    vocab: { jp: "あい (愛)", romaji: "ai", meaning: "愛 / 愛情" }
  },
  {
    hiragana: "い",
    katakana: "イ",
    romaji: "i",
    mnemonic: "兩條平行線，像「以」字的左半邊，發「伊」音。",
    vocab: { jp: "いぬ (犬)", romaji: "inu", meaning: "狗" }
  },
  {
    hiragana: "う",
    katakana: "ウ",
    romaji: "u",
    mnemonic: "像被踢了一腳倒地，痛苦縮著身體發出「烏」聲。",
    vocab: { jp: "うみ (海)", romaji: "umi", meaning: "大海" }
  },
  {
    hiragana: "え",
    katakana: "エ",
    romaji: "e",
    mnemonic: "像「元」氣的草書寫法，發「誒」音。",
    vocab: { jp: "えき (駅)", romaji: "eki", meaning: "車站" }
  },
  {
    hiragana: "お",
    katakana: "オ",
    romaji: "o",
    mnemonic: "像「才」字多了一點，令人「噢」一聲發出驚嘆。",
    vocab: { jp: "おいしい", romaji: "oishii", meaning: "好吃" }
  },

  // --- か行 ---
  {
    hiragana: "か",
    katakana: "カ",
    romaji: "ka",
    mnemonic: "像「力」字加一點，用力砍樹發出「卡」聲。",
    vocab: { jp: "かお (顔)", romaji: "kao", meaning: "臉" }
  },
  {
    hiragana: "き",
    katakana: "キ",
    romaji: "ki",
    mnemonic: "像一把鑰匙（Key）的形狀，發「Ki」音。",
    vocab: { jp: "き (木)", romaji: "ki", meaning: "樹木" }
  },
  {
    hiragana: "く",
    katakana: "ク",
    romaji: "ku",
    mnemonic: "像鳥類的尖嘴巴，吃不到東西哭哭（Ku）。",
    vocab: { jp: "くつ (靴)", romaji: "kutsu", meaning: "鞋子" }
  },
  {
    hiragana: "け",
    katakana: "ケ",
    romaji: "ke",
    mnemonic: "像開門的門把，或是「計」字的左半部。",
    vocab: { jp: "けいさつ (警察)", romaji: "keisatsu", meaning: "警察" }
  },
  {
    hiragana: "こ",
    katakana: "コ",
    romaji: "ko",
    mnemonic: "上下兩條平行線，像個圓圈「圈」的一半。",
    vocab: { jp: "こども (子供)", romaji: "kodomo", meaning: "小孩" }
  },

  // --- さ行 ---
  {
    hiragana: "さ",
    katakana: "サ",
    romaji: "sa",
    mnemonic: "像殺魚的刀子與砧板，發「殺 (Sa)」音。",
    vocab: { jp: "さかな (魚)", romaji: "sakana", meaning: "魚" }
  },
  {
    hiragana: "し",
    katakana: "シ",
    romaji: "shi",
    mnemonic: "像長頭髮女生的吸管（Shi），向下彎曲。",
    vocab: { jp: "しんかんせん (新幹線)", romaji: "shinkansen", meaning: "新幹線" }
  },
  {
    hiragana: "す",
    katakana: "ス",
    romaji: "su",
    mnemonic: "像吊環伸出一條繩子，吊著吸管吸（Su）飲料。",
    vocab: { jp: "すし (寿司)", romaji: "sushi", meaning: "壽司" }
  },
  {
    hiragana: "せ",
    katakana: "セ",
    romaji: "se",
    mnemonic: "像「世」界的世界，去掉右邊一筆。",
    vocab: { jp: "せんせい (先生)", romaji: "sensei", meaning: "老師" }
  },
  {
    hiragana: "そ",
    katakana: "ソ",
    romaji: "so",
    mnemonic: "像一條彎曲的手術縫合線（So）。",
    vocab: { jp: "そら (空)", romaji: "sora", meaning: "天空" }
  },

  // --- た行 ---
  {
    hiragana: "た",
    katakana: "タ",
    romaji: "ta",
    mnemonic: "像漢字「太」字，少了一點，發「他 (Ta)」音。",
    vocab: { jp: "たべもの (食べ物)", romaji: "tabemono", meaning: "食物" }
  },
  {
    hiragana: "ち",
    katakana: "チ",
    romaji: "chi",
    mnemonic: "像數字「5」倒過來寫，或是起司（Chi）塊。",
    vocab: { jp: "ちかい (近)", romaji: "chikai", meaning: "近的" }
  },
  {
    hiragana: "つ",
    katakana: "ツ",
    romaji: "tsu",
    mnemonic: "像大海湧起的大海浪（Tsunami 浪頭）。",
    vocab: { jp: "つくえ (机)", romaji: "tsukue", meaning: "桌子" }
  },
  {
    hiragana: "て",
    katakana: "テ",
    romaji: "te",
    mnemonic: "像一隻人的手掌（Hand / Te）伸出來。",
    vocab: { jp: "てがみ (手紙)", romaji: "tegami", meaning: "信件" }
  },
  {
    hiragana: "と",
    katakana: "ト",
    romaji: "to",
    mnemonic: "像插在腳趾頭（Toe）上的木刺。",
    vocab: { jp: "ともだち (友達)", romaji: "tomodachi", meaning: "朋友" }
  },

  // --- な行 ---
  {
    hiragana: "な",
    katakana: "ナ",
    romaji: "na",
    mnemonic: "像一位修女（Nun）在十字架前虔誠祈禱。",
    vocab: { jp: "夏 (なつ)", romaji: "natsu", meaning: "夏天" }
  },
  {
    hiragana: "に",
    katakana: "ニ",
    romaji: "ni",
    mnemonic: "像漢字「仁」的右半部，或是數字「2 (Ni)」。",
    vocab: { jp: "にく (肉)", romaji: "niku", meaning: "肉" }
  },
  {
    hiragana: "ぬ",
    katakana: "ヌ",
    romaji: "nu",
    mnemonic: "像一碗熱騰騰的麵條（Noodle）打結了。",
    vocab: { jp: "いぬ (犬)", romaji: "inu", meaning: "狗" }
  },
  {
    hiragana: "ね",
    katakana: "ネ",
    romaji: "ne",
    mnemonic: "像一隻小貓咪（Neko）捲著尾巴睡覺。",
    vocab: { jp: "ねこ (猫)", romaji: "neko", meaning: "貓" }
  },
  {
    hiragana: "の",
    katakana: "ノ",
    romaji: "no",
    mnemonic: "像一個「禁止（No）」進步的禁止標誌。",
    vocab: { jp: "のりもの (乗り物)", romaji: "norimono", meaning: "交通工具" }
  },

  // --- は行 ---
  {
    hiragana: "は",
    katakana: "ハ",
    romaji: "ha",
    mnemonic: "像波浪的「波」字左半部，笑得「哈（Ha）」哈大笑。",
    vocab: { jp: "はな (花)", romaji: "hana", meaning: "花朵" }
  },
  {
    hiragana: "ひ",
    katakana: "ヒ",
    romaji: "hi",
    mnemonic: "像一個人在笑嬉嬉（Hi-Hi）地微笑。",
    vocab: { jp: "ひかり (光)", romaji: "hikari", meaning: "光芒" }
  },
  {
    hiragana: "ふ",
    katakana: "フ",
    romaji: "fu",
    mnemonic: "像富士山（Fujisan）的形狀。",
    vocab: { jp: "ふね (船)", romaji: "fune", meaning: "船" }
  },
  {
    hiragana: "へ",
    katakana: "ヘ",
    romaji: "he",
    mnemonic: "像平緩的小山丘（Hill）。",
    vocab: { jp: "へや (部屋)", romaji: "heya", meaning: "房間" }
  },
  {
    hiragana: "ほ",
    katakana: "ホ",
    romaji: "ho",
    mnemonic: "像帆船的帆，發「霍（Ho）」聲。",
    vocab: { jp: "ほん (本)", romaji: "hon", meaning: "書本" }
  },

  // --- ま行 ---
  {
    hiragana: "ま",
    katakana: "マ",
    romaji: "ma",
    mnemonic: "像馬（Ma）頭上的馬籠頭。",
    vocab: { jp: "まち (町)", romaji: "machi", meaning: "城鎮" }
  },
  {
    hiragana: "み",
    katakana: "ミ",
    romaji: "mi",
    mnemonic: "像數字「21」，或是音符的「Mi」。",
    vocab: { jp: "みず (水)", romaji: "mizu", meaning: "水" }
  },
  {
    hiragana: "む",
    katakana: "ム",
    romaji: "mu",
    mnemonic: "像一隻乳牛（Muu）的頭部與牛角。",
    vocab: { jp: "むし (虫)", romaji: "mushi", meaning: "昆蟲" }
  },
  {
    hiragana: "め",
    katakana: "メ",
    romaji: "me",
    mnemonic: "像女人的眼睛（Eye/Me），或是「女」的草書。",
    vocab: { jp: "め (目)", romaji: "me", meaning: "眼睛" }
  },
  {
    hiragana: "も",
    katakana: "モ",
    romaji: "mo",
    mnemonic: "像釣魚鉤上釣到了更多的（More）魚。",
    vocab: { jp: "もり (森)", romaji: "mori", meaning: "森林" }
  },

  // --- や行 ---
  {
    hiragana: "や",
    katakana: "ヤ",
    romaji: "ya",
    mnemonic: "像一艘帶有帆的游艇（Yacht）。",
    vocab: { jp: "やま (山)", romaji: "yama", meaning: "山" }
  },
  {
    hiragana: "ゆ",
    katakana: "ユ",
    romaji: "yu",
    mnemonic: "像數字「10」的變體，發「由（Yu）」音。",
    vocab: { jp: "ゆき (雪)", romaji: "yuki", meaning: "雪" }
  },
  {
    hiragana: "よ",
    katakana: "ヨ",
    romaji: "yo",
    mnemonic: "像鑰匙鑰匙（Yo），發「優」音。",
    vocab: { jp: "よる (夜)", romaji: "yoru", meaning: "夜晚" }
  },

  // --- ら行 ---
  {
    hiragana: "ら",
    katakana: "ラ",
    romaji: "ra",
    mnemonic: "像一隻駱駝（Camel/Ra）的駝峰。",
    vocab: { jp: "らいしゅう (来週)", romaji: "raishuu", meaning: "下週" }
  },
  {
    hiragana: "り",
    katakana: "リ",
    romaji: "ri",
    mnemonic: "像兩條立起來的竹竿（Reed）。",
    vocab: { jp: "りんご", romaji: "ringo", meaning: "蘋果" }
  },
  {
    hiragana: "る",
    katakana: "ル",
    romaji: "ru",
    mnemonic: "像一條捲曲的繩圈（Loop）。",
    vocab: { jp: "くるま (車)", romaji: "kuruma", meaning: "車子" }
  },
  {
    hiragana: "れ",
    katakana: "レ",
    romaji: "re",
    mnemonic: "像一個禮貌彎腰的人，發「禮（Re）」音。",
    vocab: { jp: "れいぞうこ (冷蔵庫)", romaji: "reizouko", meaning: "冰箱" }
  },
  {
    hiragana: "ろ",
    katakana: "ロ",
    romaji: "ro",
    mnemonic: "像數字「3」，或是路（Road）的彎道。",
    vocab: { jp: "ろく (六)", romaji: "roku", meaning: "六" }
  },

  // --- わ行 & 撥音 ---
  {
    hiragana: "わ",
    katakana: "ワ",
    romaji: "wa",
    mnemonic: "像一隻美利堅大紅鶴，發「哇（Wa）」聲。",
    vocab: { jp: "わたし (私)", romaji: "watashi", meaning: "我" }
  },
  {
    hiragana: "を",
    katakana: "ヲ",
    romaji: "wo",
    mnemonic: "日文助詞專用音，像橫向跨越障礙。",
    vocab: { jp: "〜を (助詞)", romaji: "wo", meaning: "受詞格助詞" }
  },
  {
    hiragana: "ん",
    katakana: "ン",
    romaji: "n",
    mnemonic: "像英文字母「n」的草書寫法。",
    vocab: { jp: "にほん (日本)", romaji: "nihon", meaning: "日本" }
  }
];
