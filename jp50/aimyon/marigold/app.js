const clusterLabels = {
  all: '全部',
  emotion: '心與情緒',
  perception: '觀看與印象',
  action: '動作與關係',
  scene: '景物與時間',
  manner: '程度與語氣',
};

const vocabulary = [
  ['心', 'こころ', '名詞', '心；內在世界', 'emotion', '比「気持ち」範圍更廣，可指人的內心、精神或真心。', '心が落ち着く場所を見つけた。', '我找到了能讓心平靜的地方。'],
  ['気持ち', 'きもち', '名詞', '感受；當下心情', 'emotion', '適合描述此刻感覺，也可表示對人的心意。', '今の気持ちを短い言葉で話した。', '我用簡短的話說出現在的感受。'],
  ['想い', 'おもい', '名詞', '帶有重量的心意；思念', 'emotion', '常帶情感累積，寫作中比「思い」更強調心意。', '遠くにいる友達への想いを手紙にした。', '我把對遠方朋友的心意寫成信。'],
  ['恋', 'こい', '名詞', '戀情；愛戀', 'emotion', '多指對特定對象的浪漫情感。', '初めての恋を今でも覚えている。', '我現在仍記得初戀。'],
  ['恋しい', 'こいしい', 'い形容詞', '思念；眷戀', 'emotion', '重點是因距離或不在身邊而想念。', '旅に出ると、家の味が恋しくなる。', '旅行時會想念家的味道。'],
  ['大好き', 'だいすき', 'な形容詞', '非常喜歡', 'emotion', '直接表達強烈喜愛，不一定只用於戀愛。', '私は夏の朝の空が大好きだ。', '我非常喜歡夏日清晨的天空。'],
  ['幸せ', 'しあわせ', '名詞・な形容詞', '幸福；幸福的', 'emotion', '可描述狀態，也能說「幸せな時間」。', '温かいお茶を飲む時間が幸せだ。', '喝熱茶的時間很幸福。'],
  ['希望', 'きぼう', '名詞', '希望', 'emotion', '可搭配「持つ、失う、見える」。', '小さな成功が次の希望になった。', '小小的成功成了下一步的希望。'],
  ['絶望', 'ぜつぼう', '名詞', '絕望', 'emotion', '語氣很強；日常小挫折不一定適合使用。', '一度の失敗で絶望する必要はない。', '不需要因一次失敗就絕望。'],
  ['優しさ', 'やさしさ', '名詞', '溫柔；體貼', 'emotion', '由「優しい」名詞化，指一種性質或表現。', '彼の優しさは言葉より行動に表れる。', '他的體貼比起言語更表現在行動上。'],
  ['本当', 'ほんとう', '名詞・な形容詞', '真正；真實', 'emotion', '可說「本当の理由」「本当に」。', '本当の理由をゆっくり説明した。', '我慢慢說明了真正的理由。'],
  ['可哀想', 'かわいそう', 'な形容詞', '可憐的', 'emotion', '是說話者的評價，對人使用時須留意是否居高臨下。', 'すぐに可哀想だと決めつけないで。', '不要立刻就認定對方很可憐。'],
  ['不思議', 'ふしぎ', '名詞・な形容詞', '不可思議；奇妙', 'emotion', '描述難以解釋、令人感到奇妙的事。', '初めてなのに、不思議なくらい安心した。', '明明是第一次，卻不可思議地感到安心。'],
  ['強い', 'つよい', 'い形容詞', '強的；強烈的', 'emotion', '可形容風、力量、意志、味道與感情。', '今日は風が強いから帽子に気をつけて。', '今天風大，要留意帽子。'],
  ['強さ', 'つよさ', '名詞', '強度；堅強', 'emotion', '「い形容詞去い＋さ」把程度或性質名詞化。', '声の強さを少し下げてください。', '請稍微降低音量。'],

  ['目', 'め', '名詞', '眼睛；視線', 'perception', '除器官外，也常出現在「目で見る、目を閉じる」。', '目を閉じて、三つの言葉を思い出す。', '閉上眼，回想三個詞。'],
  ['目の前', 'めのまえ', '名詞', '眼前；面前', 'perception', '可指物理位置，也可指迫近眼前的事情。', '目の前の一問だけに集中しよう。', '先專心眼前這一題吧。'],
  ['奥', 'おく', '名詞', '深處；裡面', 'perception', '「目の奥、店の奥、心の奥」都能表達內部深處。', '店の奥に静かな席がある。', '店的深處有安靜的座位。'],
  ['見つめる', 'みつめる', '一段動詞', '凝視；注視', 'perception', '有意識地持續看著某個對象。', '答えを見る前に、例文をよく見つめた。', '看答案前，我仔細注視例句。'],
  ['見える', 'みえる', '一段動詞', '看得見；呈現某種樣子', 'perception', '重點是自然進入視野或客觀可見，不是主動看。', 'ここから山がよく見える。', '從這裡能清楚看見山。'],
  ['写る', 'うつる', '五段動詞', '映在；被拍進', 'perception', '自動詞；影像或倒影自然出現在照片、鏡面或眼中。', '窓に夕焼けが写っている。', '窗戶映著晚霞。'],
  ['シルエット', 'しるえっと', '名詞', '輪廓；剪影', 'perception', '外來語，常用於逆光下只看得到外形的情境。', '夕日の中に二人のシルエットが見えた。', '夕陽中看見兩個人的剪影。'],
  ['光', 'ひかり', '名詞', '光；光亮', 'perception', '可搭配「差す、輝く、見える」。', '朝の光が部屋に入ってきた。', '晨光照進房間。'],
  ['輝く', 'かがやく', '五段動詞', '閃耀；發光', 'perception', '可形容物理光芒，也可比喻人的表情或未來。', '雨のあと、葉が光って輝いた。', '雨後，葉片閃著光。'],
  ['似る', 'にる', '一段動詞', '相似', 'perception', '通常用「AはBに似ている」，助詞是「に」。', 'この声は姉の声に少し似ている。', '這個聲音和姊姊的聲音有點像。'],
  ['懐かしい', 'なつかしい', 'い形容詞', '令人懷念的', 'perception', '看到或聽到舊事物時，回憶被喚起的感受。', 'この写真を見ると学生時代が懐かしい。', '看到這張照片就懷念學生時代。'],

  ['揺れる', 'ゆれる', '一段動詞', '搖晃；動搖', 'action', '自動詞：某物自己呈現搖動狀態。', '電車が大きく揺れた。', '電車劇烈搖晃。'],
  ['揺さぶる', 'ゆさぶる', '五段動詞', '搖動；撼動', 'action', '他動詞：外力使對象搖動，也可指撼動情緒。', 'その映画は私の心を強く揺さぶった。', '那部電影強烈撼動了我的心。'],
  ['抱きしめる', 'だきしめる', '一段動詞', '緊抱；擁抱', 'action', '比「抱く」更有緊緊抱住的動作感。', '久しぶりに会った家族を抱きしめた。', '我擁抱久別重逢的家人。'],
  ['離れる', 'はなれる', '一段動詞', '離開；分離', 'action', '自動詞：主體離開某地或彼此產生距離。', '駅から離れると町が静かになった。', '離開車站後，街道安靜下來。'],
  ['離す', 'はなす', '五段動詞', '放開；使分離', 'action', '他動詞：主動把抓著的東西放開。', '危ないので、子どもの手を離さない。', '因為危險，不放開孩子的手。'],
  ['寄せ合う', 'よせあう', '五段動詞', '彼此靠近；相互依偎', 'action', '「合う」表示雙方互相做同一動作。', '寒い夜、みんなで椅子を寄せ合った。', '寒冷的夜裡，大家把椅子靠在一起。'],
  ['かみしめる', 'かみしめる', '一段動詞', '仔細咀嚼；細細體會', 'action', '由實際咀嚼延伸為慢慢體會感受或意義。', '合格の喜びを静かにかみしめた。', '我靜靜體會合格的喜悅。'],
  ['歩く', 'あるく', '五段動詞', '走路；步行', 'action', '移動動詞，地點常搭配「を」，目的地常搭配「まで」。', '川のそばをゆっくり歩いた。', '我沿著河邊慢慢走。'],
  ['吐き出す', 'はきだす', '五段動詞', '吐出；傾吐', 'action', '可指吐出空氣，也可比喻把壓著的心情全說出來。', '紙に不安を全部吐き出してみた。', '我試著把不安全部寫在紙上傾吐出來。'],
  ['残す', 'のこす', '五段動詞', '留下；保留', 'action', '他動詞；「残る」則是某物自己留下來。', '大切な言葉をノートに残した。', '我把重要的話留在筆記裡。'],
  ['繋がる', 'つながる', '五段動詞', '連結；相通', 'action', '自動詞；可指線路、人際關係或概念連結。', '新しい言葉が前の記憶と繋がった。', '新詞和先前記憶連結起來了。'],
  ['つける', 'つける', '一段動詞', '加上；命名；附著', 'action', '意思很多；「名前をつける」是取名字。', '新しい学習ノートに名前をつけた。', '我替新的學習筆記取了名字。'],
  ['話す', 'はなす', '五段動詞', '說；談話', 'action', '說內容用「を」，和某人談用「と／に」。', '友達と次の旅行について話した。', '我和朋友聊了下一趟旅行。'],
  ['足りる', 'たりる', '一段動詞', '足夠', 'action', '常用「Nで足りる」「Nだけでは足りない」。', '説明は一言だけでは足りない。', '說明只用一句話並不足夠。'],
  ['キスする', 'きすする', 'サ變動詞', '親吻', 'action', '外來語加「する」構成動詞。', '母は子どもの額にキスした。', '母親親吻了孩子的額頭。'],
  ['笑える', 'わらえる', '一段動詞', '能笑；覺得好笑', 'action', '既可為「笑う」可能形，也常表示某事好笑。', '今ならあの失敗も笑える。', '現在的話，連那次失敗也能笑著看待。'],
  ['だらける', 'だらける', '一段動詞', '懶散；鬆懈', 'action', '口語，描述人失去幹勁而懶洋洋。', '休みの日は少しだらけてもいい。', '休假日稍微懶散一下也可以。'],
  ['でんぐり返し', 'でんぐりがえし', '名詞・する動詞', '翻筋斗；跌宕翻轉', 'action', '可指實際翻筋斗，也能形成生活翻來覆去的意象。', '子どもが芝生ででんぐり返しをした。', '孩子在草地上翻筋斗。'],

  ['風', 'かぜ', '名詞', '風', 'scene', '風的強弱常用「強い／弱い」。', '朝の風は少し冷たかった。', '早晨的風有點冷。'],
  ['雲', 'くも', '名詞', '雲', 'scene', '注意讀音和「蜘蛛（くも）」相同，要由語境判斷。', '白い雲が山の上に残っている。', '白雲仍留在山上。'],
  ['空', 'そら', '名詞', '天空', 'scene', '常搭配顏色、天氣與仰望的動作。', '雨のあと、空が明るくなった。', '雨後天空變亮了。'],
  ['夏', 'なつ', '名詞', '夏天', 'scene', '可組成「夏の日、夏の空、夏らしい」。', '今年の夏は海の近くで過ごしたい。', '今年夏天想在海邊度過。'],
  ['麦わら', 'むぎわら', '名詞', '麥稈；稻草', 'scene', '常見複合詞「麦わら帽子」。', '畑に乾いた麦わらが積んである。', '田裡堆著乾燥麥稈。'],
  ['帽子', 'ぼうし', '名詞', '帽子', 'scene', '戴帽子用「帽子をかぶる」。', '日差しが強いので帽子をかぶった。', '因為陽光強，所以戴上帽子。'],
  ['マリーゴールド', 'まりーごーるど', '名詞', '萬壽菊；金盞花類花卉名稱', 'scene', '外來語花名；在作品中也是重要的季節意象。', '庭にオレンジ色のマリーゴールドが咲いた。', '庭院裡開了橘色的萬壽菊。'],
  ['肌', 'はだ', '名詞', '肌膚；表面', 'scene', '可指人的皮膚，也可延伸到物體表面質感。', '春の風を肌で感じた。', '我用肌膚感受到春風。'],
  ['空気', 'くうき', '名詞', '空氣；氣氛', 'scene', '既可指實際空氣，也能指現場氣氛。', '窓を開けて新しい空気を入れた。', '我打開窗讓新鮮空氣進來。'],
  ['影', 'かげ', '名詞', '影子；身影', 'scene', '光線形成的影子，也可指人的蹤影。', '夕方になると木の影が長くなる。', '到了傍晚，樹影會變長。'],
  ['場所', 'ばしょ', '名詞', '場所', 'scene', '「遠い場所、静かな場所」皆為常用搭配。', '落ち着いて勉強できる場所を探した。', '我找了能靜心讀書的地方。'],
  ['今日', 'きょう', '名詞・副詞', '今天', 'scene', '口語最常用「きょう」；正式場合也可讀「こんにち」。', '今日覚えた言葉を寝る前に三つ言う。', '睡前說出今天記住的三個詞。'],
  ['日々', 'ひび', '名詞・副詞', '日日；每一天', 'scene', '比「毎日」更有一段日常累積的語感。', '小さな練習を日々続けている。', '我每天持續小量練習。'],
  ['言葉', 'ことば', '名詞', '話語；詞語；語言', 'scene', '可指單詞、表達或某人說過的話。', '知らない言葉を一つだけ調べた。', '我只查了一個不懂的詞。'],
  ['名前', 'なまえ', '名詞', '名字；名稱', 'scene', '取名是「名前をつける」，問名是「名前は何ですか」。', 'この色の名前を日本語で知りたい。', '我想知道這個顏色的日文名稱。'],
  ['二人', 'ふたり', '名詞', '兩人', 'scene', '人的特殊數法：一人（ひとり）、二人（ふたり）。', '二人で同じ地図を見た。', '兩個人一起看同一張地圖。'],

  ['ちょっと', 'ちょっと', '副詞', '稍微；有點', 'manner', '也可委婉拒絕或保留：「それはちょっと…」。', 'この問題はちょっと難しい。', '這個問題有點難。'],
  ['ずっと', 'ずっと', '副詞', '一直；遠比…', 'manner', '可表時間持續，也可表程度差距很大。', '朝からずっと雨が降っている。', '從早上起就一直下雨。'],
  ['まだ', 'まだ', '副詞', '仍然；還沒', 'manner', '肯定句是「仍然」，否定句常是「還沒」。', '答えはまだ見ないでください。', '請先不要看答案。'],
  ['もう', 'もう', '副詞', '已經；再', 'manner', '「もう終わった」是已經；「もう一度」是再一次。', 'もう一度、何も見ずに言ってみよう。', '再一次，試著什麼都不看說出來。'],
  ['そっと', 'そっと', '副詞', '輕輕地；悄悄地', 'manner', '強調不驚動、動作輕柔。', '机の上に本をそっと置いた。', '我輕輕把書放在桌上。'],
  ['ぎゅっと', 'ぎゅっと', '副詞', '緊緊地；用力地', 'manner', '擬態語，表達壓緊、握緊或濃縮。', '寒くて、コートの襟をぎゅっと握った。', '因為寒冷，我緊緊抓住大衣領口。'],
  ['少し', 'すこし', '副詞・名詞', '少量；稍微', 'manner', '比「ちょっと」較中性，也能作名詞。', '少し休んでから復習しよう。', '稍微休息後再複習吧。'],
  ['全部', 'ぜんぶ', '名詞・副詞', '全部', 'manner', '口語常用；較正式可用「すべて」。', '全部覚えるより、三つ使ってみよう。', '比起全背起來，先試用三個吧。'],
  ['でも', 'でも', '接續詞・助詞', '但是；即使；之類', 'manner', '句首常是「但是」，接名詞時還可能表示舉例。', '難しい。でも、少しずつなら続けられる。', '很難。但是一點一點就能持續。'],
  ['真面目に', 'まじめに', '副詞', '認真地；正經地', 'manner', '由「真面目な」變成副詞「真面目に」。', '今日は発音を真面目に練習した。', '今天認真練習了發音。'],
  ['いつまでも', 'いつまでも', '副詞', '永遠；無論到何時', 'manner', '表達沒有明確終點的持續。', 'この景色をいつまでも覚えていたい。', '我想永遠記得這片景色。'],
  ['このまま', 'このまま', '副詞・名詞', '就這樣；維持現狀', 'manner', '表示不改變目前狀態。', '今日はこのまま家で休みたい。', '今天想就這樣在家休息。'],
  ['遥か', 'はるか', '副詞・な形容詞', '遙遠；遠遠地', 'manner', '帶書面與抒情感，距離或程度都可使用。', '遥か遠くに島が見える。', '遙遠處看得到一座島。'],
  ['同じ', 'おなじ', '連體詞・な形容詞性', '相同', 'manner', '直接接名詞通常是「同じ＋名詞」，不加「な」。', '同じ言葉を別の場面で使った。', '我在不同情境使用了同一個詞。'],
];

const patterns = [
  ['～さ', '形容詞變名詞', 'い形容詞去「い」加「さ」，把性質變成可談論的程度。', '強い → 強さ／優しい → 優しさ', 'この風の強さには驚いた。'],
  ['～すぎる', '超過適當程度', '動詞ます語幹、い形容詞去い、な形容詞語幹後接「すぎる」。', '考えすぎる／強すぎる／静かすぎる', '昨日は少し働きすぎた。'],
  ['N が恋しい', '因不在身邊而想念', '想念的對象通常以「が」標示。', '家族が恋しい／故郷が恋しい', '寒い日は故郷の料理が恋しい。'],
  ['～ふりをする', '假裝某種狀態', '普通形＋ふり；な形容詞與名詞常接「な／の」。', '知らないふり／元気なふり', '聞こえないふりをしないで。'],
  ['Vてみる', '嘗試做看看', '先完成動詞て形，再接「みる」。', '食べてみる／話してみる', '短い日記を日本語で書いてみる。'],
  ['Vている', '進行或結果狀態', '不能只翻成「正在」；需依動詞判斷進行、持續或結果。', '歩いている／繋がっている', '窓に光が写っている。'],
  ['N に似ている', '與某人事物相似', '相似的基準用「に」，日常口語常說「似てる」。', '母に似ている／花に似ている', '弟の声は父に似ている。'],
  ['Vそうな N', '看起來快要…', '動詞ます語幹＋そうな＋名詞；描述從外觀推測的徵兆。', '泣きそうな顔／雨が降りそうな空', '彼は何か言いたそうな顔をしている。'],
  ['N のような N', '像…一樣的', '用名詞作比喻來修飾後面的名詞。', '雲のような形／夢のような時間', '綿のような雲が浮かんでいる。'],
  ['Vて、Vて', '連接動作或加強節奏', 'て形可以連接先後或並列動作；重複時也能形成強調。', '見て、考えて、答える', '窓を開けて、深く息を吸った。'],
  ['Vない', '普通形否定', '一段去る＋ない；五段移到あ段；する→しない、来る→こない。', '離さない／見ない／残さない', '今日は答えを先に見ない。'],
  ['～ほど…ない', '沒有到…的程度', '以「ほど」設定比較或程度上限。', '思うほど難しくない', 'この本は見た目ほど重くない。'],
  ['N という N', '名為…的；所謂…', '把名稱或內容嵌入後面的名詞。', '今日という日／希望という言葉', 'これは「間隔学習」という方法だ。'],
  ['～ようか', '一起思考要不要做', '意向形＋か可表示自問或向對方提議。', '何を話そうか／名前をつけようか', '休みの日にどこへ行こうか。'],
  ['～なんて', '舉例、輕視或意外語氣', '語氣高度依上下文；先理解說話者態度，不固定翻一個中文。', '冗談なんて言わないで', '一人でできるなんて、すごい。'],
  ['N じゃ足りない', '只靠…並不足夠', '口語「じゃ」相當於「では」。', '言葉じゃ足りない／一日じゃ足りない', '説明だけじゃ足りないから、例を見せる。'],
  ['Vても', '即使…也…', '動詞て形＋も；い形容詞用「くても」。', '離れていても／遠くても', '忙しくても、五分だけ復習する。'],
  ['Vていたい', '想維持某個狀態', '動詞て形＋いる＋たい，重點是持續。', '繋がっていたい／覚えていたい', 'これからも笑っていたい。'],
  ['～ように', '願望或目的', '「普通形＋ように」可表祈願；也可表為了達成某狀態。', '同じでありますように', '明日は晴れますように。'],
];

const contrasts = [
  ['心', '気持ち／想い', '「心」是內在空間；「気持ち」偏此刻感受；「想い」常是累積、帶方向的心意。'],
  ['見つめる', '見える／写る', '「見つめる」主動凝視；「見える」自然可見；「写る」影像被映出或拍進。'],
  ['揺れる', '揺さぶる', '「揺れる」是自己搖動；「揺さぶる」是外力使某物或情緒被撼動。'],
  ['離れる', '離す', '「離れる」主體離開；「離す」由某人主動放開或使兩者分離。'],
  ['残る', '残す', '「残る」某物留下；「残す」某人把東西留下。附件出現的是「残す」。'],
  ['恋しい', '大好き', '「恋しい」含不在身邊的思念；「大好き」是直接而強烈的喜愛。'],
  ['～に似ている', '～のような', '「似ている」判斷兩者相似；「ような」用比喻來修飾後面的名詞。'],
  ['そっと', 'ぎゅっと', '「そっと」是不驚動地輕柔；「ぎゅっと」是收緊、握緊或擁緊。'],
];

const roadmap = [
  ['起點診斷：預測，不先讀答案', '正式進入 14 天前，做 8 題零提示診斷：心、気持ち、想い、見える、見つめる、離れる、離す、恋しい。只標記「會／不會」，不追求分數。', '診斷 → 回饋 → 選 3 詞口述'],
  ['心的距離', '學習心、気持ち、想い、恋、恋しい、大好き。用「內在空間／當下感受／帶方向的心意」分類。', '先猜 → 三詞對比 → 自寫一例'],
  ['看見的主動性', '學習目、目の前、奥、見つめる、見える、写る。每題先問：是人主動看，還是影像自然出現？', '回想 Day 1 → 判斷主動性 → 換景造句'],
  ['動詞成對學', '學習揺れる／揺さぶる、離れる／離す、残る／残す。用自他動詞的箭頭關係記憶。', '回想 Day 1 → 成對選詞 → 改寫主語'],
  ['景物建立線索', '把風、雲、空、光、影、夏、麦わら、帽子、肌、空気放進一張「夏日場景圖」的口頭描述。', '回想 Day 2 → 場景命名 → 30 秒描述'],
  ['動作帶出情感', '學習抱きしめる、寄せ合う、かみしめる、吐き出す、繋がる。練習「動作＋對象＋理由」。', '回想 Day 3 → 動詞配對 → 說明理由'],
  ['程度與質感', '學習ちょっと、少し、ずっと、そっと、ぎゅっと、いつまでも、遥か。用力道與時間軸排序。', '回想 Day 4 → 排序 → 用聲音演出語感'],
  ['第一次累積提取', '不看字詞庫，依「心／眼睛／動作／景物」各說 4 詞。錯題立即回饋後，隔兩題再出現。', '16 詞自由回想 → 回饋 → 延遲重答'],
  ['把詞變成句型', '學習～さ、～すぎる、～ふりをする、Vてみる、Vている。每個句型只替換一個新詞。', '回想 Day 5 → 觀察變化 → 三次替換'],
  ['比喻與外觀推測', '學習～に似ている、～のような、VそうなN。區分真的相似、比喻修飾與看起來快要發生。', '回想 Day 6 → 三選一 → 自選新對象'],
  ['否定與程度', '學習Vない、～ほど…ない、Nじゃ足りない。把肯定句改成否定，再補上程度。', '回想 Day 7 → 句型改寫 → 口說理由'],
  ['持續與願望', '學習Vても、Vていたい、～ように、～ようか。辨認讓步、持續願望、祈願與提議。', '回想 Day 8 → 功能分類 → 寫四種語氣'],
  ['換情境再找一次', '同一詞改由中文、相近詞、空格與生活情境出題。至少有一題離開夏日與戀愛情境。', '反向提取 → 對比 → 跨情境使用'],
  ['90 秒口述', '使用至少 8 個附件字詞，描述一段自己的記憶。禁止照附件順序，需包含一組自他動詞與一個願望句型。', '列詞 → 口述 → 回聽自評'],
  ['延遲遷移測驗', '先完成 20 題混合提取，再寫 5 句與歌曲無關的新例句。最後只保留仍會混淆的 5 詞進入下一輪。', '測驗 → 修正 → 建立個人弱點清單'],
];

const challenges = [
  ['窗外自然可以看見山，該用哪個「看」？', '見える', '窓から山が見える。主體沒有刻意執行觀看動作，重點是客觀可見。'],
  ['想說「一直盯著手機看」，該用哪個動詞？', '見つめる', 'スマホの画面をずっと見つめている。這是有意識、持續的觀看。'],
  ['「影像映在水面」用 見える 還是 写る？', '写る', '水面に空が写っている。影像呈現在媒介表面。'],
  ['把「風很強」改成「風的強度」。', '風の強さ', '強い去掉「い」再加「さ」，把性質名詞化。'],
  ['「我很喜歡家」與「離家後很想念家」該如何區分？', '家が大好きだ／家が恋しい', '大好き是強烈喜愛；恋しい包含不在身邊而思念。'],
  ['「我不放開手」要用 離れない 還是 離さない？', '手を離さない', '有意識地不把手放開，用他動詞「離す」的否定。'],
  ['用「即使很遠，也想保持聯絡」完成一句。', '遠くても、繋がっていたい。', 'Vていたい 表達想維持連結狀態；ても表讓步。'],
  ['用 ～てみる 說一個今天可執行的學習行動。', '例：新しい言葉で短い文を書いてみる。', '先把動詞變て形，再接みる；答案可自由替換。'],
  ['「像棉花一樣的雲」是相似判斷還是比喻修飾？', '比喻修飾：綿のような雲', '「NのようなN」把前項當作比喻，修飾後面的名詞。'],
  ['用附件字詞描述「雨後」但不要談戀愛。', '例：雨のあと、雲の奥から光が見えた。', '這是跨情境遷移；能離開原始語境使用才是目標。'],
];

const storeKey = 'aimyon-marigold-mobile-lab-v1';
const sessionSize = 6;
let activeCluster = 'all';
let sessionQueue = [];
let sessionIndex = 0;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) ?? {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(storeKey, JSON.stringify(progress));
  } catch {
    // 某些限制較嚴格的瀏覽器可能停用 file:// 儲存，教材仍可正常使用。
  }
}

function addDays(days) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function createSession() {
  const progress = loadProgress();
  const due = vocabulary.filter((item) => {
    const record = progress[item[0]];
    return !record || !record.nextAt || record.nextAt <= Date.now();
  });
  const waiting = vocabulary.filter((item) => !due.includes(item));
  sessionQueue = [...shuffle(due), ...shuffle(waiting)].slice(0, sessionSize);
  sessionIndex = 0;
  renderSessionCard();
  updateProgressPanel();
}

function renderSessionCard() {
  const item = sessionQueue[sessionIndex];
  if (!item) {
    createSession();
    return;
  }

  const [term, reading, pos, zh, cluster, note, example, exampleZh] = item;
  const progress = loadProgress();
  const seen = progress[term]?.seen ?? 0;
  const reverse = seen > 0 && seen % 2 === 1;

  document.querySelector('#sessionMode').textContent = reverse ? '中文 → 日文' : '日文 → 意思';
  document.querySelector('#sessionPosition').textContent = `${sessionIndex + 1} / ${sessionSize}`;
  document.querySelector('#promptLabel').textContent = reverse ? clusterLabels[cluster] : '先不要往下看';
  document.querySelector('#promptText').textContent = reverse ? zh : term;
  document.querySelector('#promptHint').textContent = reverse
    ? '請說出日文、讀音，再補一個可使用的情境。'
    : '請說出意思，並想一個可使用的情境。';

  document.querySelector('#answerTerm').textContent = term;
  document.querySelector('#answerReading').textContent = reading;
  document.querySelector('#answerPos').textContent = pos;
  document.querySelector('#answerMeaning').textContent = zh;
  document.querySelector('#answerNote').textContent = note;
  document.querySelector('#answerExample').textContent = example;
  document.querySelector('#answerExampleZh').textContent = exampleZh;
  document.querySelector('#answerArea').hidden = true;
  document.querySelector('#revealAnswer').hidden = false;
  document.querySelector('#revealAnswer').focus({ preventScroll: true });
}

function rateCurrent(rating) {
  const term = sessionQueue[sessionIndex][0];
  const progress = loadProgress();
  const current = progress[term] ?? { level: 0, seen: 0 };
  const intervalByLevel = [1, 3, 7, 14, 30];

  if (rating === 'again') {
    current.level = 0;
    current.nextAt = addDays(0);
  } else if (rating === 'hard') {
    current.level = Math.max(1, current.level);
    current.nextAt = addDays(1);
  } else {
    current.level = Math.min(4, current.level + 1);
    current.nextAt = addDays(intervalByLevel[current.level] ?? 30);
  }

  current.seen += 1;
  progress[term] = current;
  saveProgress(progress);
  sessionIndex += 1;

  if (sessionIndex >= sessionQueue.length) {
    sessionQueue = shuffle(vocabulary).slice(0, sessionSize);
    sessionIndex = 0;
  }

  renderSessionCard();
  updateProgressPanel();
}

function updateProgressPanel() {
  const progress = loadProgress();
  const learned = vocabulary.filter((item) => (progress[item[0]]?.level ?? 0) >= 2).length;
  const due = vocabulary.filter((item) => {
    const record = progress[item[0]];
    return !record || !record.nextAt || record.nextAt <= Date.now();
  }).length;
  const percent = Math.round((learned / vocabulary.length) * 100);

  document.querySelector('#progressText').textContent = `${learned} / ${vocabulary.length}`;
  document.querySelector('#progressBar').style.width = `${percent}%`;
  document.querySelector('#dueText').textContent = due
    ? `今天有 ${due} 個尚未學習或到期字詞；本回合取 6 個。`
    : '今天的到期項目已完成，可以做自由產出。';
}

function renderRoadmap() {
  document.querySelector('#roadmapList').innerHTML = roadmap
    .map(
      ([title, body, loop], index) => `
        <details${index === 0 ? ' open' : ''}>
          <summary><span>${index === 0 ? '診' : `D${index}`}</span>${title}</summary>
          <div class="detail-body">
            <p>${body}</p>
            <div class="lesson-loop" aria-label="當日學習循環">
              ${loop.split(' → ').map((step) => `<span>${step}</span>`).join('')}
            </div>
          </div>
        </details>`,
    )
    .join('');
}

function renderClusterFilters() {
  document.querySelector('#clusterFilters').innerHTML = Object.entries(clusterLabels)
    .map(
      ([key, label]) => `
        <button type="button" data-cluster="${key}" aria-pressed="${key === activeCluster}">${label}</button>`,
    )
    .join('');
}

function renderVocabulary() {
  const query = document.querySelector('#wordSearch').value.trim().toLowerCase();
  const filtered = vocabulary.filter((item) => {
    const matchesCluster = activeCluster === 'all' || item[4] === activeCluster;
    const matchesQuery = !query || item.join(' ').toLowerCase().includes(query);
    return matchesCluster && matchesQuery;
  });

  document.querySelector('#resultCount').textContent = `顯示 ${filtered.length}／${vocabulary.length} 個字詞`;
  document.querySelector('#wordGrid').innerHTML = filtered
    .map(
      ([term, reading, pos, zh, , note, example, exampleZh]) => `
        <article class="word-card">
          <header><h3 lang="ja">${term}</h3><span>${pos}</span></header>
          <p class="reading">${reading}</p>
          <p class="meaning">${zh}</p>
          <details>
            <summary>語感與例句</summary>
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
      ([left, right, explanation]) => `
        <article class="contrast-card">
          <div class="contrast-pair">
            <strong lang="ja">${left}</strong><span>VS</span><strong lang="ja">${right}</strong>
          </div>
          <p>${explanation}</p>
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

function renderChallenges() {
  document.querySelector('#challengeList').innerHTML = challenges
    .map(
      ([question, answer, explanation], index) => `
        <details>
          <summary>Q${index + 1}　${question}</summary>
          <div class="detail-body">
            <p><strong>${answer}</strong></p>
            <p>${explanation}</p>
          </div>
        </details>`,
    )
    .join('');
}

function bindEvents() {
  document.querySelector('#startSession').addEventListener('click', () => {
    document.querySelector('#session').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('#revealAnswer').addEventListener('click', (event) => {
    event.currentTarget.hidden = true;
    document.querySelector('#answerArea').hidden = false;
    document.querySelector('[data-rating="hard"]').focus({ preventScroll: true });
  });

  document.querySelectorAll('[data-rating]').forEach((button) => {
    button.addEventListener('click', () => rateCurrent(button.dataset.rating));
  });

  document.querySelector('#clusterFilters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-cluster]');
    if (!button) return;
    activeCluster = button.dataset.cluster;
    renderClusterFilters();
    renderVocabulary();
  });

  document.querySelector('#wordSearch').addEventListener('input', renderVocabulary);

  document.querySelector('#resetProgress').addEventListener('click', () => {
    const confirmed = window.confirm('要清除這台裝置上的字詞進度嗎？教材內容不會受到影響。');
    if (!confirmed) return;
    try {
      localStorage.removeItem(storeKey);
    } catch {
      // 儲存被停用時不需要額外處理。
    }
    createSession();
  });
}

function init() {
  document.querySelector('#vocabCount').textContent = vocabulary.length;
  document.querySelector('#patternCount').textContent = patterns.length;
  renderRoadmap();
  renderClusterFilters();
  renderVocabulary();
  renderContrasts();
  renderPatterns();
  renderChallenges();
  createSession();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
