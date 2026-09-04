const clusterLabels = {
  all: '全部',
  time: '夜與朝',
  home: '家與物件',
  feeling: '關係與感受',
  action: '動作與狀態',
  stance: '語氣與判斷',
};

const vocabulary = [
  ['朝', 'あさ', '名詞', '早晨；早上', 'time', '一天開始的時段；「朝になる」是到了早上。', '朝は窓を開けて深呼吸する。', '早上我會打開窗戶深呼吸。'],
  ['朝方', 'あさがた', '名詞', '清晨；接近早晨時', 'time', '比「朝」更聚焦天將亮或剛亮的時段。', '朝方まで雨の音が聞こえた。', '直到清晨都聽得到雨聲。'],
  ['夜', 'よる', '名詞', '夜晚', 'time', '常搭配「夜になる、夜を過ごす」。', '夜になると町が静かになる。', '到了夜晚，城鎮就安靜下來。'],
  ['明日', 'あした／あす', '名詞・副詞', '明天', 'time', '「あした」較口語；「あす」常見於播報與較正式語境。', '明日の朝、もう一度この言葉を思い出す。', '明早再回想一次這個詞。'],
  ['いつまで', 'いつまで', '副詞', '到何時；直到什麼時候', 'time', '詢問狀態或動作持續的終點。', 'この店はいつまで開いていますか。', '這間店營業到幾點？'],
  ['いつか', 'いつか', '副詞', '有一天；某時', 'time', '時間未確定，可指未來的某一天。', 'いつか日本で朝市に行きたい。', '有一天我想去日本逛早市。'],
  ['いつだって', 'いつだって', '副詞', '無論何時；總是', 'time', '比「いつも」更帶強調或口語情緒。', '困った時はいつだって連絡してね。', '遇到困難時隨時聯絡我。'],
  ['知らない間に', 'しらないあいだに', '表現', '在不知不覺間', 'time', '表示事情在自己沒察覺時發生。', '知らない間に外が明るくなっていた。', '不知不覺間外面已經亮了。'],
  ['三分', 'さんぷん', '名詞', '三分鐘', 'time', '「分」的讀音會變化：一分＝いっぷん、三分＝さんぷん。', '三分だけ目を閉じて休んだ。', '我只閉眼休息了三分鐘。'],
  ['何度', 'なんど', '名詞・副詞', '幾次；多少次', 'time', '可詢問次數，也可和「も」表示多次。', '何度読んでも新しい発見がある。', '無論讀幾次都有新發現。'],

  ['古着', 'ふるぎ', '名詞', '二手衣；舊衣', 'home', '現在也常指有風格的古著服飾，不一定只是穿舊的衣服。', '休日に古着屋でシャツを探した。', '假日我去古著店找襯衫。'],
  ['シャツ', 'しゃつ', '名詞', '襯衫；上衣', 'home', '外來語；襯衫常說「シャツを着る」。', '白いシャツを洗って窓辺に干した。', '我把白襯衫洗好晾在窗邊。'],
  ['部屋', 'へや', '名詞', '房間', 'home', '以空間本身為焦點；「部屋にいる」是在房裡。', '部屋の机で日記を書いた。', '我在房間的書桌寫日記。'],
  ['家', 'いえ／うち', '名詞', '房子；家', 'home', '「いえ」偏建築或家；「うち」也可表自己的家與內部圈子。', '今日は早く家に帰りたい。', '今天想早點回家。'],
  ['帰宅', 'きたく', '名詞・サ變', '回家；返家', 'home', '較書面或中性；口語常直接說「家に帰る」。', '帰宅したら、まず手を洗う。', '回家後先洗手。'],
  ['帰る', 'かえる', '五段動詞', '回去；回家', 'home', '目的地常用「に／へ」；家中有人時回家可說「ただいま」。', '仕事のあと、まっすぐ家へ帰った。', '工作後我直接回家。'],
  ['帰る場所', 'かえるばしょ', '短語', '可以回去的地方；歸處', 'home', '不只物理地點，也可帶心理歸屬感。', '安心して帰る場所があるのは大切だ。', '有一個能安心回去的地方很重要。'],
  ['鍵', 'かぎ', '名詞', '鑰匙；關鍵', 'home', '實體鑰匙也可比喻解決問題的關鍵。', '出かける前に鍵を確認した。', '出門前我確認了鑰匙。'],
  ['ポスト', 'ぽすと', '名詞', '郵筒；信箱', 'home', '在住宅語境常指收信的信箱。', '手紙をポストに入れた。', '我把信放進郵筒。'],
  ['隣', 'となり', '名詞', '隔壁；旁邊', 'home', '通常指同類事物旁邊的位置；人的旁邊也常用。', '電車で友達の隣に座った。', '在電車上我坐在朋友旁邊。'],
  ['ベル', 'べる', '名詞', '鈴；門鈴', 'home', '外來語；「ベルが鳴る」表示鈴聲響起。', '玄関のベルが一度鳴った。', '玄關門鈴響了一次。'],
  ['目覚まし', 'めざまし', '名詞', '鬧鐘；喚醒物', 'home', '「目覚まし時計」的簡稱。', '目覚ましを六時半にセットした。', '我把鬧鐘設在六點半。'],
  ['寝癖', 'ねぐせ', '名詞', '睡亂的頭髮；睡相習慣', 'home', '日常多指睡醒後翹亂的頭髮。', '鏡を見ながら寝癖を直した。', '我照鏡子整理睡亂的頭髮。'],
  ['おかえり', 'おかえり', '寒暄語', '歡迎回來', 'home', '對回到家或熟悉場所的人說；較禮貌可說「おかえりなさい」。', '玄関で家族に「おかえり」と言った。', '我在玄關對家人說「歡迎回來」。'],
  ['ただいま', 'ただいま', '寒暄語', '我回來了', 'home', '回到家時使用；也能表示「現在」，需靠語境判斷。', 'ドアを開けて「ただいま」と声をかけた。', '我打開門喊了一聲「我回來了」。'],

  ['恋', 'こい', '名詞', '戀情；愛戀', 'feeling', '多指對特定對象的浪漫情感。', '恋について友達と静かに話した。', '我和朋友安靜地談了戀愛這件事。'],
  ['寿命', 'じゅみょう', '名詞', '壽命；可使用期間', 'feeling', '可指生命長度，也能比喻物品或狀態能維持多久。', 'この電池の寿命は約三年です。', '這顆電池的壽命約三年。'],
  ['彼', 'かれ', '代名詞・名詞', '他；男朋友', 'feeling', '是否指戀人由語境決定；不能一律翻成男朋友。', '彼は同じクラスの学生です。', '他是同班同學。'],
  ['怖い', 'こわい', 'い形容詞', '害怕的；可怕的', 'feeling', '既可說對象可怕，也可表自己害怕。', '明日の結果を見るのが少し怖い。', '我有點害怕看明天的結果。'],
  ['嫌い', 'きらい', '名詞・な形容詞', '討厭；不喜歡', 'feeling', '對象通常用「が」；語氣比「苦手」直接。', '私は早起きがあまり好きではない。', '我不太喜歡早起。'],
  ['独り', 'ひとり', '名詞・副詞', '獨自；孤身一人', 'feeling', '和「一人」讀音相同；「独り」較強調孤獨感或文學色彩。', '今夜は独りで静かに過ごしたい。', '今晚我想獨自安靜度過。'],
  ['抵抗', 'ていこう', '名詞・サ變', '抵抗；抗拒', 'feeling', '可說「抵抗する、抵抗がある」。', '人前で話すことに少し抵抗がある。', '我對在人前說話有點抗拒。'],
  ['笑顔', 'えがお', '名詞', '笑容；笑臉', 'feeling', '常搭配「笑顔になる、笑顔を見せる」。', 'その知らせを聞いて笑顔になった。', '聽到那個消息後，我露出了笑容。'],
  ['胸', 'むね', '名詞', '胸口；心中', 'feeling', '可指身體，也常用來表內心感受。', '懐かしい写真を見て胸が熱くなった。', '看到懷念的照片，心中一陣激動。'],
  ['会いたい', 'あいたい', '表現', '想見面', 'feeling', '「会う」的たい形，表示說話者想做這個動作。', '久しぶりに祖母に会いたい。', '好久沒見了，我想見奶奶。'],
  ['欲しい', 'ほしい', 'い形容詞', '想要某物', 'feeling', '想要的東西通常用「が」；想做動作用「Vたい」。', '旅行用の小さい鞄が欲しい。', '我想要一個旅行用的小包包。'],
  ['素敵', 'すてき', 'な形容詞', '美好；很棒；迷人', 'feeling', '可以形容人、物、時間或想法。', '朝の公園で素敵な景色を見た。', '我在早晨的公園看見很棒的景色。'],
  ['夢', 'ゆめ', '名詞', '夢；夢想', 'feeling', '可指睡夢，也可指未來願望。', '将来の夢を小さな紙に書いた。', '我把未來的夢想寫在小紙上。'],
  ['病', 'やまい', '名詞', '疾病；苦惱的比喻', 'feeling', '「病」可有文學語感；實際健康問題需由專業醫療判斷。', '物語では不安を病にたとえることがある。', '故事裡有時會把不安比喻成疾病。'],

  ['言う', 'いう', '五段動詞', '說；叫作', 'action', '內容可放在引用助詞「と」前。', 'わからない時は正直にそう言う。', '不知道時就誠實地那樣說。'],
  ['蝕む', 'むしばむ', '五段動詞', '侵蝕；逐漸損害', 'action', '常描述疾病、不安或壓力逐步造成傷害，語氣較強。', '強いストレスが健康を蝕むこともある。', '強烈壓力有時會逐漸損害健康。'],
  ['壊す', 'こわす', '五段動詞', '弄壞；破壞', 'action', '他動詞；某人使物品、關係或狀態受損。', '大切な時計を落として壊してしまった。', '我把重要的手錶摔壞了。'],
  ['眠る', 'ねむる', '五段動詞', '睡；入睡', 'action', '比「寝る」更聚焦睡眠狀態，也帶書面或文學感。', '旅の前日は早めに眠った。', '旅行前一天我提早入睡。'],
  ['満たす', 'みたす', '五段動詞', '裝滿；滿足', 'action', '他動詞，讓容器、條件或心情達到充足狀態。', '水でコップを満たした。', '我用水把杯子裝滿。'],
  ['足りる', 'たりる', '一段動詞', '足夠；充足', 'action', '自動詞；必要量通常用「で」或主語「が」。', '説明は五分で足ります。', '說明五分鐘就夠了。'],
  ['側にいる', 'そばにいる', '短語', '在身旁；陪在旁邊', 'action', '「そば」表示很近的位置，也能含陪伴感。', '不安な時、友達が側にいてくれた。', '不安時，朋友陪在我身旁。'],
  ['いなくなる', 'いなくなる', '表現', '變得不在；離開', 'action', '「いる」的否定狀態加「なる」，表示從在場變成不在。', '春になると渡り鳥がいなくなる。', '到了春天，候鳥就離開了。'],
  ['空回る', 'からまわる', '五段動詞', '空轉；徒勞無功', 'action', '可指機械空轉，也可指努力沒有產生預期效果。', '焦るほど説明が空回ってしまった。', '越著急，說明越是徒勞無功。'],
  ['手につく', 'てにつく', '慣用表現', '能專心著手', 'action', '多用否定「何も手につかない」，表示無法專心做事。', '結果が気になって勉強が手につかない。', '因為在意結果，無法專心讀書。'],
  ['居る', 'いる', '一段動詞', '在；存在（人、動物）', 'action', '一般常用平假名「いる」；漢字「居る」可突出停留、存在。', '週末はできるだけ家にいる。', '週末我盡可能待在家。'],
  ['過ごす', 'すごす', '五段動詞', '度過；生活', 'action', '時間內容常用「を」：夜を過ごす。', '休日を家族とゆっくり過ごした。', '我和家人悠閒度過假日。'],
  ['連絡する', 'れんらくする', 'サ變動詞', '聯絡', 'action', '對象常用「に」；「連絡を取る」是保持聯絡。', '遅れる時は先生に連絡する。', '遲到時會聯絡老師。'],
  ['待つ', 'まつ', '五段動詞', '等待', 'action', '對象可用「を」：バスを待つ；場所用「で」。', '駅の前で友達を待った。', '我在車站前等朋友。'],
  ['鳴る', 'なる', '五段動詞', '響；鳴', 'action', '自動詞，鈴、電話等自己呈現響起狀態。', '目覚ましが鳴る前に目が覚めた。', '鬧鐘響之前我就醒了。'],
  ['整える', 'ととのえる', '一段動詞', '整理；調整完善', 'action', '讓外觀、狀態或條件變得有秩序。', '出かける前に髪を整えた。', '出門前我整理了頭髮。'],
  ['叶う', 'かなう', '五段動詞', '實現；如願', 'action', '願望本身用「が」：夢が叶う。', '小さな目標が一つ叶った。', '一個小目標實現了。'],
  ['死にかける', 'しにかける', '一段動詞', '瀕死；差點失去作用', 'action', '「Vます語幹＋かける」表示做到一半或接近某狀態；此詞語氣強，亦可作誇張比喻。', '古い植物が枯れかけていたので水をやった。', '老植物快枯萎了，所以我澆了水。'],
  ['忘れる', 'わすれる', '一段動詞', '忘記', 'action', '「忘れてしまう」可加上完成、遺憾或非本意語氣。', '大事な約束を忘れないようにメモした。', '為了不忘記重要約定，我記了筆記。'],

  ['誰にも', 'だれにも', '表現', '對任何人都…（接否定）', 'stance', '疑問詞＋にも＋否定形成全面否定。', 'この話は誰にも言わなかった。', '這件事我沒有對任何人說。'],
  ['ような', 'ような', '連體表現', '像…那樣的', 'stance', '接名詞，表示比喻、例示或依據內容。', '春のような暖かい日だった。', '那是像春天一樣溫暖的日子。'],
  ['まで', 'まで', '助詞', '直到；到…為止', 'stance', '標示時間、空間或範圍的終點。', '図書館は夜九時まで開いている。', '圖書館開到晚上九點。'],
  ['でも', 'でも', '接續詞・助詞', '但是；即使；…之類', 'stance', '功能依位置改變；句首常是轉折，名詞後也能表示舉例或最低條件。', '短い時間でも毎日続けたい。', '即使時間短也想每天持續。'],
  ['ちゃんと', 'ちゃんと', '副詞', '確實地；好好地', 'stance', '表示符合期待、規則或完整做到。', '寝る前にちゃんと窓を閉めた。', '睡前我確實關好了窗戶。'],
  ['なんだか', 'なんだか', '副詞', '總覺得；不知為何', 'stance', '理由不明或難以具體說明的感受。', '今日はなんだか眠い。', '今天總覺得很睏。'],
  ['他にも', 'ほかにも', '表現', '此外還有；其他也', 'stance', '表示除已知項目之外還有同類。', 'この町には他にも静かな公園がある。', '這座城鎮還有其他安靜的公園。'],
  ['気がする', 'きがする', '慣用表現', '覺得；感覺好像', 'stance', '降低斷定程度，表達主觀感受或推測。', 'この方法なら続けられる気がする。', '我覺得這個方法能持續下去。'],
  ['できるだけ', 'できるだけ', '副詞', '盡可能', 'stance', '在能力或條件容許範圍內做到最大程度。', 'できるだけ日本語で答えてみよう。', '盡可能試著用日文回答吧。'],
  ['そうして', 'そうして', '接續詞', '然後；就這樣', 'stance', '承接前面的方式或事件，推進敘事。', '毎日一語覚えた。そうして語彙が増えた。', '每天記一個詞，就這樣詞彙增加了。'],
  ['結局', 'けっきょく', '副詞・名詞', '結果；到頭來', 'stance', '經過變化、猶豫或嘗試後得到的結果。', '迷ったが、結局歩いて帰った。', '雖然猶豫，結果還是走路回家。'],
  ['全部', 'ぜんぶ', '名詞・副詞', '全部', 'stance', '口語常用；較書面的說法是「すべて」。', '今日の問題に全部答えた。', '我回答了今天全部的問題。'],
  ['予定のない', 'よていのない', '連體表現', '沒有預定的', 'stance', '「Nのない＋名詞」表示缺少某項內容。', '予定のない休日を家で過ごした。', '我在家度過沒有安排的假日。'],
  ['わざとらしい', 'わざとらしい', 'い形容詞', '做作；不自然刻意', 'stance', '表示刻意表現得太明顯，讓人感到不自然。', 'わざとらしい笑い方はすぐに気づかれる。', '做作的笑法很快就會被察覺。'],
  ['また', 'また', '副詞', '又；再次', 'stance', '表示重複，也可用來補充另一件事。', '明日の朝、また練習しよう。', '明早再練習吧。'],
  ['らしい', 'らしい', '助動詞・形容詞', '聽說；似乎；很有…特質', 'stance', '接普通形可表傳聞或有根據的推測；接名詞也可表典型特質。', '午後から雨が降るらしい。', '聽說下午會下雨。'],
  ['もっと', 'もっと', '副詞', '更加；再多一些', 'stance', '用來提高程度或數量。', 'もっと自然に話せるようになりたい。', '我想說得更自然。'],
  ['そんな', 'そんな', '連體詞', '那樣的；那種', 'stance', '指對方附近、前文內容或帶心理距離的事物。', 'そんな素敵な朝なら早く起きたい。', '如果是那麼美好的早晨，我會想早起。'],
];

const patterns = [
  ['誰にも＋否定', '對任何人都不…', '疑問詞「誰」＋にも，句尾必須搭配否定。', '誰にも言わない', 'この秘密は誰にも話しません。'],
  ['Nのような＋名詞', '像…一樣的…', '用「ような」把前面的名詞或內容變成後面名詞的比喻／例示。', '夢のような時間', '春のような暖かい風が吹いた。'],
  ['Nに蝕まれる', '受到…逐步侵蝕', '「蝕む」的被動形；受影響者用「は／が」，原因常用「に」。語氣很強。', '不安に蝕まれる', '古い建物が雨風に蝕まれている。'],
  ['いつまで＋普通形＋だろう', '自問狀態會持續到何時', '「だろう」在自問中降低斷定，帶思考與不確定。', 'いつまで続くだろう', 'この暑さはいつまで続くのだろう。'],
  ['Vるまで', '直到某動作發生', '前面用辭書形，標示後項持續到該終點。', '朝になるまで', '電車が来るまでここで待とう。'],
  ['Nでできる', '用…做成／在…時間內能完成', '「で」可標示材料、手段或所需時間，需靠名詞判斷。', '三分でできる', 'この料理は十分でできます。'],
  ['Nでは／じゃ足りない', '光是…還不夠', '口語「じゃ」來自「では」；不足的條件放在前面。', '三分じゃ足りない', '一日では足りないので、二日に分けよう。'],
  ['Nを満たす', '使…達到充足', '「満たす」是他動詞，對象用「を」。', '条件を満たす', 'この計画は三つの条件を満たしている。'],
  ['Vても', '即使…也…', 'て形＋も建立讓步：前項成立，後項仍不受影響。', '夜になっても', '雨が降っても出かけます。'],
  ['Vてほしい', '希望別人做…', '動作者常用「に」；是說話者對他人行動的願望。', '側にいてほしい', '友達に写真を送ってほしい。'],
  ['Vない間に', '趁還沒…／在沒有…期間', '「間に」聚焦期間內發生一次變化；和持續整段時間的「間」不同。', '知らない間に', '雨が降らない間に買い物へ行った。'],
  ['いなくなる', '從在場變成不在', '「いる」的否定「いない」＋變化動詞「なる」。', '人がいなくなる', '冬になると虫がいなくなる。'],
  ['Nは場所の中', '說明物品所在位置', '主題用「は」，位置用「の中」；若描述存在可加「にある」。', '鍵は箱の中', '予備の鍵は引き出しの中にあります。'],
  ['なんだか＋形容詞＋なる', '不知為何逐漸感到…', '理由不明的感受用「なんだか」；變化用「～く／に＋なる」。', 'なんだか怖くなる', '夜道を一人で歩くと、なんだか寂しくなる。'],
  ['Nがある気がする', '感覺好像有…', '把判斷包進「気がする」，比直接斷定柔和。', '理由がある気がする', 'この答えには別の考え方もある気がする。'],
  ['何も手につかない', '什麼都無法專心做', '疑問詞＋も＋否定形成全面否定；整體是慣用表現。', '勉強が手につかない', '心配で何も手につかなかった。'],
  ['予定のない＋名詞', '沒有安排的…', '「Nのない」可直接修飾後面的名詞。', '予定のない休日', '予定のない午後は本を読む。'],
  ['できるだけ＋V', '盡可能做…', '放在動詞前，表示在可行範圍內提高程度。', 'できるだけ家にいる', 'できるだけ短い文で答えてください。'],
  ['Vたくなる', '變得想做…', 'たい形去「い」＋くなる，描述願望的變化。', '帰りたくなる', 'この写真を見ると旅行したくなる。'],
  ['何度＋Vたんだろう', '自問曾做過多少次', '口語「ん」來自「の」；帶回顧與感嘆，不一定期待他人回答。', '何度読んだんだろう', 'この道を何度歩いたんだろう。'],
  ['Vないの', '不做…／不是…嗎（依語調）', '句尾「の」可說明、確認或帶情緒；陳述與疑問需靠語調和語境。', '連絡はしないの', '今日は一緒に来ないの？'],
  ['Vたら', '如果／當…之後', 'た形＋ら；可設條件，也可表示前項完成後。', '夜になったら', '家に着いたら連絡してください。'],
  ['Nにも', '也在…／連…也…', '「に」的功能加上「も」的包含或強調，解讀取決於前後文。', 'この部屋にも', '駅の近くにも図書館があります。'],
  ['Nができる', '形成；完成；能有…', '除了能力用法，也可表示新的事物、關係或設施形成。', '新しい道ができる', '来月、駅前に店ができます。'],
  ['Vのを待つ', '等待某動作發生', '「の」把整個動作名詞化，再成為「待つ」的對象。', 'ベルが鳴るのを待つ', '湯が沸くのを待っています。'],
  ['Vたい／Nが欲しい', '想做／想要物品', '動作願望用動詞たい形；想要名詞用「Nが欲しい」。', '会いたい／時間が欲しい', '友達に会いたい。もう少し時間が欲しい。'],
  ['Vてしまう', '做完；不小心／遺憾地做', '接在て形後，既可表示完成，也常加上非本意與遺憾。', '忘れてしまう', '急いでいて傘を忘れてしまった。'],
  ['Vます語幹＋かける', '做到一半／差點進入某狀態', '描述動作尚未完成或狀態剛開始。強烈動詞需留意語境。', '読みかける／枯れかける', '読みかけの本を鞄に入れた。'],
  ['普通形＋らしい', '聽說／似乎', '根據外部資訊做推測；不要和外觀直覺「そうだ」完全混同。', '雨が降るらしい', '新しい店は朝七時に開くらしい。'],
  ['もっと＋形容詞／副詞', '提高程度', '放在想提高的性質或方式前。', 'もっと素敵な朝', '次はもっとゆっくり話してください。'],
  ['そんな＋名詞＋になる', '變成那樣的…', '「そんな」承接前文描述；「になる」說明結果狀態。', 'そんな朝になる', '誰もが安心できる場所になるといい。'],
];

const contrasts = [
  ['朝', '朝方', '「朝」是一般早晨；「朝方」更靠近天將亮、清晨那一段。'],
  ['家', '部屋', '「家」是住家或歸屬範圍；「部屋」是其中一個房間空間。'],
  ['一人', '独り', '讀音相同；「一人」中性計數或單獨，「独り」常加強孤獨與文學色彩。'],
  ['いる', 'いなくなる', '「いる」是人在場的狀態；「いなくなる」是從在場變為不在。'],
  ['満たす', '足りる', '「満たす」是主動讓某物充足；「足りる」是某數量本身足夠。'],
  ['待つ', '側にいる', '「待つ」朝向尚未發生的事；「側にいる」描述當下在近處陪伴。'],
  ['Vたい', 'Nが欲しい', '「会いたい」是想做動作；「時間が欲しい」是想要名詞。'],
  ['怖い', '嫌い', '「怖い」重點是害怕；「嫌い」是討厭或不喜歡，情緒原因不一定是恐懼。'],
  ['帰宅する', '家に帰る', '意思相近；「帰宅する」較書面，「家に帰る」是自然日常口語。'],
  ['ちゃんと', 'わざとらしく', '「ちゃんと」表示確實符合期待；「わざとらしく」表示刻意過頭而不自然。'],
  ['忘れる', '忘れてしまう', '前者只陳述忘記；後者常附帶已發生、非本意或遺憾。'],
  ['叶う', 'できる', '「夢が叶う」是願望實現；「Nができる」可表完成、形成或能做到。'],
];

const course = [
  ['起點診斷：先判斷，不先教', '用朝／朝方、家／部屋、怖い／嫌い、Vたい／欲しい做 8 題判斷，只標記混淆點。', '預測 → 揭示 → 記弱點'],
  ['夜與朝的時間錨點', '學習朝、朝方、夜、明日、三分。把五詞放到自己一天的時間線。', '分類 → 朗讀 → 說時刻'],
  ['房間裡的物件', '學習古着、シャツ、鍵、ポスト、ベル、目覚まし、寝癖。用「在哪裡／何時用」建立連結。', '回想D1 → 位置配對 → 新句'],
  ['回來與不在', '比較帰宅する、家に帰る、おかえり、ただいま、いなくなる。做回家情境的角色互換。', '配對 → 角色互換 → 口說'],
  ['想做、想要、希望他人做', '區分会いたい、欲しい、Vてほしい。把同一需求改寫成三種主語關係。', '選式 → 換主語 → 說理由'],
  ['從充足到不足', '學習満たす、足りる、Nじゃ足りない。分辨他動詞與狀態，再套入時間、條件、容器。', '回想D2 → 自他判斷 → 三情境'],
  ['沒有說出口的範圍', '學習誰にも＋否定、何も＋否定、他にも、全部。用「全面否定／新增／全部」做四向分類。', '回想D3 → 範圍判斷 → 改寫'],
  ['第一輪累積：夜裡關燈前', '不看字詞庫，依時間、房間、願望三類各說五詞。錯題立即回饋，隔兩題再出現。', '15詞提取 → 回饋 → 延遲重答'],
  ['不確定的語氣', '比較だろう、気がする、なんだか、らしい。把直接斷定改成自問、感覺與有根據推測。', '回想D4 → 可信度排序 → 改寫'],
  ['努力空轉的時候', '學習空回る、手につかない、抵抗、できるだけ、結局。先辨認狀態，再提出一個小行動。', '回想D5 → 因果配對 → 一步行動'],
  ['時間界線', '比較まで、Vるまで、Vても、Vない間に、Vたら。畫出「終點、讓步、期間內、條件」四種關係。', '回想D6 → 時間線 → 換句'],
  ['完成、遺憾與未完成', '比較忘れる／忘れてしまう，以及Vかける。用生活小失誤而非強烈情節練習。', '回想D7 → 語氣判斷 → 安全例句'],
  ['家與歸屬的短日記', '用部屋、帰る場所、隣、待つ、側にいる寫 4 句，不沿用附件句序。', '詞表 → 四句 → 遮住重述'],
  ['變化線索提取', '同一詞改由中文、日文定義、相近詞、時間軸與全新場景出題。', '反向提取 → 對比 → 跨情境'],
  ['給明天早上的 90 秒短箋', '使用至少十個附件字詞，描述今晚、明早與「いつか」。需含願望、不確定與一個時間句型。', '列詞 → 口述 → 錄音自評'],
];

const transfers = [
  ['天快亮的「清晨」要選 朝 還是 朝方？', '朝方', '朝方更聚焦接近早晨、天將亮或剛亮的一段；一般早晨用朝。'],
  ['想說「我想見朋友」與「我想要時間」，句型如何分開？', '友達に会いたい／時間が欲しい。', '動作用Vたい；想要的名詞通常用Nが欲しい。'],
  ['「歡迎回來」與「我回來了」分別是什麼？', 'おかえり／ただいま', '在家的人對回來者說おかえり；回來者說ただいま。'],
  ['鑰匙在抽屜裡，請用「は＋場所の中」說。', '鍵は引き出しの中にあります。', '主題是鍵，所在位置用「引き出しの中に」。'],
  ['「沒有對任何人說」如何避免漏掉否定？', '誰にも言わなかった。', '「誰にも」需要和否定形式一起使用。'],
  ['雨停前在這裡等，使用 Vるまで。', '雨が止むまでここで待ちます。', '終點動作用辭書形「止む」，再接まで。'],
  ['短短五分鐘「還不夠」怎麼說？', '五分じゃ足りない。', '口語じゃ來自では；足りない表示量不足。'],
  ['「聽說明早會下雨」要用 らしい。', '明日の朝は雨が降るらしい。', '普通形「降る」後接らしい，表示根據外部資訊的推測。'],
  ['因為擔心結果，什麼都無法專心做。', '結果が心配で、何も手につかない。', '「何も＋否定」和慣用語「手につかない」一起使用。'],
  ['「醒來後就聯絡」用 Vたら 表達。', '起きたら連絡します。', 'Vたら可表示前項完成後執行後項。'],
  ['「不小心忘了帶傘」如何加入遺憾感？', '傘を忘れてしまった。', 'てしまう在此表示事情已發生並帶非本意／遺憾。'],
  ['用「いつか、もっと、素敵」寫一個與戀愛無關的願望。', '例：いつか、もっと素敵な町に住みたい。', '把附件詞轉移到自己的未來生活，才是在練可用的日文。'],
];

const storageKey = 'aimyon-asa-ga-kirai-mobile-lab-v1';
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
    // 瀏覽器若停用 file:// 儲存，教材內容仍可正常閱讀與作答。
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
    const record = progress.words?.[item[0]];
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
  if (!item) return;
  const [term, reading, pos, meaning, cluster, note, example, exampleZh] = item;
  const seen = loadProgress().words?.[term]?.seen ?? 0;
  const reverse = seen > 0 && seen % 2 === 1;

  document.querySelector('#cardMode').textContent = reverse ? '中文 → 日文＋讀音' : '日文 → 中文＋情境';
  document.querySelector('#cardPosition').textContent = `${sessionIndex + 1} / ${session.length}`;
  document.querySelector('#promptInstruction').textContent = reverse ? clusterLabels[cluster] : '先說出讀音與意思';
  document.querySelector('#promptText').textContent = reverse ? meaning : term;
  document.querySelector('#promptSupport').textContent = reverse
    ? '說出日文與讀音，再補一個自己的生活情境。'
    : '想 5–8 秒，再判斷它屬於哪一條記憶線。';
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
  progress.words ??= {};
  const record = progress.words[term] ?? { level: 0, seen: 0 };
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
  progress.words[term] = record;
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
  const records = progress.words ?? {};
  const stable = vocabulary.filter((item) => (records[item[0]]?.level ?? 0) >= 3).length;
  const due = vocabulary.filter((item) => {
    const record = records[item[0]];
    return !record || !record.nextAt || record.nextAt <= Date.now();
  }).length;
  document.querySelector('#progressText').textContent = `${stable} / ${vocabulary.length}`;
  document.querySelector('#progressBar').style.width = `${(stable / vocabulary.length) * 100}%`;
  document.querySelector('#dueText').textContent = due > 0 ? `現在有 ${due} 個字詞待提取。` : '今天到期的字詞已完成，可改做活用題。';
}

function renderCourse() {
  document.querySelector('#courseList').innerHTML = course.map((item, index) => `
    <article class="day-card">
      <span class="day-label">${index === 0 ? 'D0' : `D${index}`}</span>
      <div><h3>${item[0]}</h3><p>${item[1]}</p><span class="day-task">${item[2]}</span></div>
    </article>
  `).join('');
}

function renderFilters() {
  document.querySelector('#clusterFilters').innerHTML = Object.entries(clusterLabels).map(([key, label]) => `
    <button type="button" data-cluster="${key}" aria-pressed="${key === activeCluster}">${label}</button>
  `).join('');
}

function renderWords() {
  const query = document.querySelector('#wordSearch').value.trim().toLocaleLowerCase('ja');
  const filtered = vocabulary.filter((item) => {
    const clusterMatch = activeCluster === 'all' || item[4] === activeCluster;
    const searchMatch = !query || item.join(' ').toLocaleLowerCase('ja').includes(query);
    return clusterMatch && searchMatch;
  });

  document.querySelector('#resultCount').textContent = `顯示 ${filtered.length} / ${vocabulary.length} 個字詞`;
  document.querySelector('#wordList').innerHTML = filtered.length ? filtered.map((item) => `
    <article class="word-card">
      <header>
        <div><h3 lang="ja">${item[0]}<span class="reading">${item[1]}</span></h3></div>
        <span class="pos">${item[2]}</span>
      </header>
      <p class="meaning">${item[3]}</p>
      <p class="note">${item[5]}</p>
      <details><summary>查看新情境</summary><p lang="ja">${item[6]}</p><p>${item[7]}</p></details>
    </article>
  `).join('') : '<p>找不到符合的字詞，請換一個關鍵字。</p>';
}

function renderContrasts() {
  document.querySelector('#contrastList').innerHTML = contrasts.map((item) => `
    <article class="contrast-card"><div class="contrast-pair"><span lang="ja">${item[0]}</span><i></i><span lang="ja">${item[1]}</span></div><p>${item[2]}</p></article>
  `).join('');
}

function renderPatterns() {
  document.querySelector('#patternList').innerHTML = patterns.map((item, index) => `
    <details class="pattern-card">
      <summary><span>PATTERN ${String(index + 1).padStart(2, '0')} · ${item[1]}</span><strong lang="ja">${item[0]}</strong></summary>
      <div class="pattern-body"><p>${item[2]}</p><p class="formula" lang="ja">附件詞塊：${item[3]}</p><div class="pattern-example" lang="ja">${item[4]}</div></div>
    </details>
  `).join('');
}

function renderTransfers() {
  document.querySelector('#transferList').innerHTML = transfers.map((item, index) => `
    <details class="transfer-card">
      <summary>${index + 1}. ${item[0]}</summary>
      <div><p class="model-answer" lang="ja">${item[1]}</p><p>${item[2]}</p></div>
    </details>
  `).join('');
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function renderHandoff() {
  const handoff = loadProgress().handoff ?? {};
  const today = todayKey();
  const nightDone = handoff.night === today;
  const morningDone = handoff.morning === today;
  document.querySelector('#nightDone').classList.toggle('is-done', nightDone);
  document.querySelector('#nightDone').setAttribute('aria-pressed', String(nightDone));
  document.querySelector('#morningDone').classList.toggle('is-done', morningDone);
  document.querySelector('#morningDone').setAttribute('aria-pressed', String(morningDone));
  const status = morningDone
    ? '今天已完成醒後再測；晚上可換三個詞繼續。'
    : nightDone
      ? '今晚三詞已回想；明早再用一分鐘、不看答案提取。'
      : '尚未開始今晚的記憶交接。';
  document.querySelector('#handoffStatus').textContent = status;
}

function toggleHandoff(type) {
  const progress = loadProgress();
  progress.handoff ??= {};
  const today = todayKey();
  progress.handoff[type] = progress.handoff[type] === today ? null : today;
  saveProgress(progress);
  renderHandoff();
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
  renderHandoff();
  buildSession();

  document.querySelector('#revealAnswer').addEventListener('click', () => {
    document.querySelector('#answerArea').hidden = false;
    document.querySelector('#revealAnswer').hidden = true;
    document.querySelector('[data-rating="again"]').focus({ preventScroll: true });
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

  document.querySelectorAll('[data-check]').forEach((button) => {
    button.addEventListener('click', () => toggleHandoff(button.dataset.check));
  });

  document.querySelector('#resetProgress').addEventListener('click', () => {
    if (!window.confirm('確定清除這套《朝が嫌い》教材的本機學習進度嗎？')) return;
    try { localStorage.removeItem(storageKey); } catch { /* 無本機儲存時不需處理 */ }
    renderHandoff();
    buildSession();
  });
}

document.addEventListener('DOMContentLoaded', init);
