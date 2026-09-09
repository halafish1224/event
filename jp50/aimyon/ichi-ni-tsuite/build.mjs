import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('./index.html', import.meta.url));
const ruby = (text) => text.replace(/([^\s<>\[\]ぁ-ゖァ-ヺ、。？！「」『』（）／・→＋＝〜～：；…—,;:?]+)\[([^\]]+)\]/g, '<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const plain = (text) => text.replace(/\[[^\]]+\]/g, '');

const grammar = [
  ['adverb','形容動詞的副詞形','な形容詞語幹＋に＋動詞','簡単だ→簡単に。把性質轉成動作的方式。「簡単に」修飾「幸せになれる」，不是「簡單地搜尋」。','静[しず]かに話[はな]してください。','請安靜地說。'],
  ['potential','能否成為某狀態','V可能形＋名詞／のだろうか','なる→なれる，見られる在此也表示「能看」。だろうか是帶自問的推測疑問，語氣比直接問較內省。','毎日[まいにち]続[つづ]けたら、上手[じょうず]になれるだろうか。','如果每天持續，能變得熟練嗎？'],
  ['searching','一直只做某事','N＋ばかり／Vている→Vてる','ばかり把注意力集中在反覆或偏向同一件事。探してる是探している的口語縮約，表示正在或持續尋找。','同[おな]じ動画[どうが]ばかり見[み]てる。','一直只看同樣的影片。'],
  ['invitation','允許、接納與催促','いいよ＋Vて','いいよ可表示允許、安撫或接受；後面的笑って是て形，依語境可讀成柔和邀請「笑吧」。它不是字面上的命令強度。','失敗[しっぱい]してもいいよ。もう一度[いちど]やって。','失敗也沒關係。再做一次吧。'],
  ['tara','如果能做到…','Vた形＋ら','見られたら可表「如果能看待」。たら建立假設條件，未必表示動作已經完成。可能形在現代口語中也能保留を。','違[ちが]う角度[かくど]から見[み]られたら、答[こた]えが変[か]わる。','如果能從不同角度看，答案就會改變。'],
  ['darou','推測性的自問','疑問詞＋普通形＋のだろうか','どこまでも擴大程度或範圍；の把前句說明化，だろうか呈現自問。這不是期待唯一正解的普通問句。','どこまで歩[ある]けば着[つ]くのだろうか。','要走到哪裡才會抵達呢？'],
  ['passive','被放進世界的視角','V被動形＋名詞','落とす→落とされる→落とされた。落とされた世界可讀作「（我）被放落其中的世界」，省略被動者與落點；也保留「被放落的世界」之歧義。','知[し]らない町[まち]に置[お]かれた気分[きぶん]だった。','感覺像被放在陌生城鎮。'],
  ['state','過去持續的狀態','Vている→Vていた','泥濘む→泥濘んでいた，描述當時已呈現泥濘狀態。不能只拆成「泥濘了」而忽略持續背景。','昨日[きのう]から道[みち]が濡[ぬ]れていた。','道路從昨天起就一直是濕的。'],
  ['start','從起點就…','はじめから＋Vた','はじめから設定起點；つまづいた是提供文字的寫法，現代標準表記多見「つまずいた」。教材保留原字面。','はじめから全部[ぜんぶ]わかる人[ひと]はいない。','沒有人從一開始就全部明白。'],
  ['subjectobject','誰阻擋什麼','Nを＋誰かが＋他動詞','語序雖是受詞在前，助詞仍清楚標記：音を是被遮斷的對象，誰かが是行動者。誰か不等於誰も。','出口[でぐち]を誰[だれ]かが塞[ふさ]いでいる。','有人擋住了出口。'],
  ['teiku','改變一路延伸','Vて＋Vていく／Vてくる','変えていく從現在向後延伸；蝕んでくる表示變化朝說話者或現在逼近。方向不只是空間，也可表時間感。','少[すこ]しずつ形[かたち]を変[か]えていく。','會一點點持續改變形狀。'],
  ['way','以某種活法找到位置','Vていく＋生き方＋で','關係子句修飾生き方；で可標示方式、狀態或背景。跨行讀成「以這種活法找到居場所」較連貫，但主語仍省略。','自分[じぶん]に合[あ]う生[い]き方[かた]で進[すす]む。','用適合自己的生活方式前進。'],
  ['souyatte','承接前述方式','そうやって＋結果','そう指向前面所述的做法或歷程；やって來自やる。它把抽象結果「找到居場所」連回前面的受傷與改變。','何度[なんど]も試[ため]した。そうやって方法[ほうほう]を見[み]つけた。','嘗試了很多次，就這樣找到了方法。'],
  ['takute','願望成為原因或伴隨','Vます語幹＋たくて','変わる→変わりたい→変わりたくて。て形把「想改變」連到「活著」，可讀成原因、動機或伴隨狀態。','強[つよ]くなりたくて、毎日[まいにち]練習[れんしゅう]した。','因為想變強，所以每天練習。'],
  ['change','逐漸變得…','い形容詞く／な形容詞・名詞に＋なる','鈍い→鈍くなる，表示判斷力發生變化。楽だ→楽になる則用に。','夜[よる]になると、道[みち]が暗[くら]くなる。','到了晚上，道路會變暗。'],
  ['fragment','「端くれ」的貶抑與意象','Nの端[はし]くれ','端くれ可謙稱某群體中不起眼的一員，也可指微不足道的一部分。與指を切る相連時，「善的一小片／尖銳邊緣」帶創造性的雙重意象。','私[わたし]も研究者[けんきゅうしゃ]の端[はし]くれです。','我也算是研究者中的一員。'],
  ['omission','詩句中的助詞省略','N（を）V／Vて','心舐め回す可補成心を舐め回す理解；砕いて以て形收句，可是請求，也可承接未說出的對象與後續。補助詞是語法分析，不改寫原詞。','不安[ふあん]を砕[くだ]いて、前[まえ]へ進[すす]む。','擊碎不安，向前走。'],
  ['youna','像隨處可見的…','どこにでもある＋ような＋N','疑問詞＋にでも＋肯定表示無論哪裡；ような把前句變成後面名詞的例示／比喻修飾。','どこにでもあるような小[ちい]さな店[みせ]。','一間像是隨處可見的小店。'],
  ['determined','固定套路與結果背景','お＋Vます語幹／N＋の＋N／Nで','お決まり是固定、老套的模式；不幸で的で可以接續狀態，後文再追問之後是否腐壞。歌詞跨行需一起讀。','お決[き]まりの言葉[ことば]だけでは足[た]りない。','只說那些老套的話還不夠。'],
  ['whether','結果是否取決於自己','普通形＋かは＋N次第＋なのか','か把「是否腐る」名詞化，は設為主題；次第表示結果依據某條件。なのか把名詞判斷變成帶說明的疑問。','成功[せいこう]するかは準備[じゅんび]次第[しだい]だ。','能否成功取決於準備。'],
  ['switch','並列中的主語切換','AがBを誘い、（私が）V','残された時間が引發焦慮；戶惑う的經驗者自然理解為省略的「我」。日文能在連接處切換主語，中文翻譯需補出邏輯。','雨[あめ]が不安[ふあん]を誘[さそ]い、私[わたし]は戸惑[とまど]った。','雨引起不安，我感到困惑。'],
  ['takatta','未實現或回顧的願望','Vます語幹＋たかった','行く→行きたい→行きたかった。表示過去曾想去；是否真的沒去成要由後文判斷，形式本身不保證反事實。','もっと遠[とお]くまで歩[ある]きたかった。','曾想走到更遠的地方。'],
  ['sae','連…都被阻擋','N＋さえ','さえ提出極端例子，含「甚至連這個也」之意。由ピストル到汽笛，兩種起程訊號都遭遮斷。','名前[なまえ]さえ思[おも]い出[だ]せない。','連名字都想不起來。'],
  ['tooquiet','程度超乎預期','あまりに＋形容詞／副詞','あまりに＝過於、實在太；修飾静かに。命運不是猛烈襲來，而是安靜侵蝕，反差構成不安。','あまりに静[しず]かで気[き]づかなかった。','因為太安靜，所以沒有察覺。'],
  ['pretend','假裝某種樣子','Nの／普通形＋ふりをする','優しいふりをして＝裝作溫柔再做後項。自由被擬人化；這是在質問自由伴隨的風險，並非字典定義。','知[し]らないふりをしないで。','別裝作不知道。'],
  ['noquestion','追問理由的「の」','なぜ＋普通形＋の','句尾の使疑問帶說明要求或情緒。「為何自由設下陷阱」跨兩行才完整；落とし穴既可字面，也可比喻隱藏風險。','なぜ何[なに]も言[い]わないの。','為什麼什麼都不說呢？'],
  ['continue','從當下繼續活下去','Vていく','生きていく把時間方向推向未來。結尾從生きて變為生きていく，使願望轉成持續的行動。','これからも自分[じぶん]の道[みち]を生[い]きていく。','今後也會繼續走自己的人生道路。'],
];

const units = [
  ['簡単[かんたん]に幸[しあわ]せになれる方法[ほうほう]を探[さが]してる','正在尋找能輕易獲得幸福的方法。','簡単に修飾幸せになれる；幸せになる是變得幸福，なれる是可能形。探してる呈現持續搜尋的狀態。','adverb potential searching','search'],
  ['そんな検索[けんさく]ばかり馬鹿馬鹿[ばかばか]しい?','老是做那樣的搜尋，不覺得很荒唐嗎？','そんな回指上一行；検索ばかり把行動偏向「只做搜尋」。問號讓馬鹿馬鹿しい成為對自己或讀者的反問。','searching noquestion','search'],
  ['いいよ 笑[わら]って','沒關係，笑吧。','いいよ可能是允許、接納或安撫；笑って是柔和邀請。誰對誰說並未明示，可保留內在自語或他人回應兩種讀法。','invitation omission','search'],
  ['透明[とうめい]な瞳[ひとみ]で世間[せけん]を見[み]られたら','如果能用透明清澈的眼睛看這個世間。','透明な修飾瞳；で標示觀看的媒介／視角。見られたら在此自然讀成可能形＋假設。透明是視角純淨的意象。','tara potential','search'],
  ['どこまでも楽[らく]になれるのだろうか','是否就能一直變得更加輕鬆呢？','どこまでも可由空間延伸為程度沒有界線；楽になる是變輕鬆，なれる再加可能；のだろうか呈自問。','adverb potential darou','search'],
  ['落[お]とされた世界[せかい]が少[すこ]し泥濘[ぬかる]んでいた','被放進的這個世界，地面有些泥濘。','落とされた世界可讀成「自己被放入其中的世界」；世界が接泥濘んでいた，描寫起點已難行。泥濘也是人生阻力的核心意象。','passive state','start'],
  ['はじめからつまづいた','從一開始就絆倒了。','はじめから定位起點；主語省略。提供歌詞寫つまづいた，常用標準表記是つまずいた，兩者讀音皆為つまずいた。','start omission','start'],
  ['ピストルの音[おと]を誰[だれ]かが遮[さえぎ]る','有人遮斷了發令槍聲。','音を是被遮斷的受詞；誰かが是未知行動者。ピストル可令人聯想到賽跑起跑訊號，屬有文字支持的意象，不是唯一場景。','subjectobject','obstacle'],
  ['傷[きず]つけて形[かたち]を変[か]えていく生[い]き方[かた]で','以一種受傷、又一路改變形狀的活法。','傷つけて的主客體省略，可是傷害自己、他人或彼此受傷；形を変えていく表示改變延伸至未來。整段修飾生き方。','teiku way omission','change'],
  ['そうやって居場所[いばしょ]を見[み]つけたよ','就這樣，找到了自己的容身之處。','そうやって承接上一行的活法；居場所不只地點，也指能安心存在、被接納的位置。よ把發現傳達給對方。','souyatte way','place'],
  ['変[か]わりたくて 生[い]きて','因為想改變，所以活著。','変わりたくて把願望接到生きて。生きて以て形停住，保留「活下去吧／活著並且……」的未完感，不能武斷補成唯一接續。','takute omission','change'],
  ['判断[はんだん]が鈍[にぶ]くなる 善[ぜん]の端[はし]くれで指[ゆび]を切[き]る','判斷逐漸遲鈍，被善的一小片邊緣割傷手指。','鈍くなる是狀態變化。端くれ原可指不起眼的一員／碎片；與指を切る組合後，善被具體化成也會割人的碎片或邊緣，語意刻意不安定。','change fragment','judgment'],
  ['気持[きも]ちの悪[わる]い笑顔[えがお]が心[こころ]舐[な]め回[まわ]す','令人不適的笑容，反覆舔舐著心。','気持ちの悪い修飾笑顔；が是主語。心後省略を理解最自然。舐め回す是帶侵入感的比喻，呈現虛假笑容侵蝕內心。','omission subjectobject','judgment'],
  ['もう 砕[くだ]いて','夠了，把它擊碎吧。','もう可表「已經」或情緒上的「夠了」。砕いて未明示對象，可能承接那個笑容、束縛或狀態；保留多重指向。','omission invitation','judgment'],
  ['どこにでもあるような','像是隨處可見的……','どこにでも表示無論在哪裡；あるような把整個存在句變成名詞修飾，下一行才出現中心名詞。','youna','fate'],
  ['お決[き]まりの不幸[ふこう]で','在那套司空見慣的不幸之中。','お決まりの修飾不幸，帶老套、常見模式的語感；で銜接後面的結果判斷。不能在此行就結束分析。','determined','fate'],
  ['その先[さき]で腐[くさ]るかは自分次第[じぶんしだい]なのか','之後是否會腐壞，取決於自己嗎？','腐るか把「是否腐壞」名詞化，再用は設為主題。自分次第なのか帶自問，未直接宣告一切責任都由個人承擔。','whether noquestion','fate'],
  ['残[のこ]された時間[じかん]が焦[あせ]りを誘[さそ]い戸惑[とまど]う','剩餘的時間引來焦躁，使我感到困惑。','残された是被動修飾時間。時間が焦りを誘い後，戸惑う的經驗者自然補為省略的我；同一句出現主語切換。','passive switch','time'],
  ['行[い]きたかった遠[とお]くまで','曾經想去，到那遙遠之處。','行きたかった是過去願望；遠く可名詞性地表示遠方，まで標示終點。是否實際未到達由歌曲阻礙脈絡推知，不是形式本身保證。','takatta','time'],
  ['汽笛[きてき]の音[おと]さえ誰[だれ]かが遮[さえぎ]る','甚至連汽笛聲也被某人遮斷。','さえ提出極端例子。汽笛與前段ピストル同是啟程訊號，重複「誰かが遮る」讓受阻感跨段延續。','sae subjectobject','obstacle'],
  ['運命[うんめい]があまりに 静[しず]かに蝕[むしば]んでくる','命運過於安靜地逐步侵蝕而來。','運命が是主語；蝕む的受詞省略，可理解為我、心或生活。てくる把侵蝕拉向現在與說話者。','tooquiet teiku omission','fate'],
  ['なぜ自由[じゆう]は優[やさ]しいふりをして','為何自由裝出溫柔的樣子，','自由は把抽象概念擬人化；優しいふりをして連接下一行。質問的不是自由的字典意義，而是它為何伴隨風險。','pretend noquestion','freedom'],
  ['落[お]とし穴[あな]を作[つく]るの','卻設下陷阱呢？','落とし穴を是受詞，作る是動詞；句尾の要求說明並帶情緒。與上一行合讀才是完整疑問。','noquestion subjectobject','freedom'],
  ['変[か]わりたくて 変[か]わりたくて 生[い]きて','因為想改變、如此想改變，所以活著。','願望重複使動機更強。兩次たくて都朝生きて匯聚；て形收尾仍保留未完與呼喚感。','takute omission','change'],
  ['変[か]わりたくて 生[い]きていく','因為想改變，所以繼續活下去。','最後改為生きていく，時間箭頭向未來延伸。歌曲從起點受阻走到持續行動，但不保證困難已解決。','takute continue','change'],
];

const order = [...Array(23).keys(), 5, 6, 7, 8, 9, 23, 24];

const words = [
 ['簡単[かんたん]','簡單','な形容詞','簡単に：簡單地；簡単な方法：簡單的方法。','adverb'],['幸[しあわ]せ','幸福','名詞・な形容詞','幸せになる：變得幸福。','potential'],['方法[ほうほう]','方法','名詞','方法を探す：尋找方法。','searching'],['探[さが]す','尋找','五段動詞','探している→探してる。','searching'],['検索[けんさく]','搜尋；檢索','名詞・サ變','検索する：進行搜尋。','searching'],['ばかり','只；總是','副助詞','強調偏向或反覆同一事項。','searching'],['馬鹿馬鹿[ばかばか]しい','荒唐；愚蠢得可笑','い形容詞','語氣直接，對人使用可能傷人。','searching'],['笑[わら]う','笑','五段動詞','笑って可連接，也可作柔和請求。','invitation'],['透明[とうめい]','透明；清澈','名詞・な形容詞','透明な瞳：清澈的眼眸。','tara'],['瞳[ひとみ]','眼眸；瞳孔','名詞','比目更帶文學及注視感。','tara'],['世間[せけん]','世間；社會人情','名詞','不完全等同世界；常包含社會眼光。','potential'],['見[み]る','看','一段動詞','見られる可表能看或被看，靠語境判斷。','potential'],['どこまでも','無論到哪；一直到底','副詞','可表示空間或程度無界。','darou'],['楽[らく]','輕鬆；舒適','名詞・な形容詞','楽になる：變輕鬆。不同於楽しい（開心）。','change'],['落[お]とす','使落下','五段他動詞','被動落とされる。','passive'],['世界[せかい]','世界','名詞','此歌也可指自己被放入的人生環境。','passive'],['少[すこ]し','一點；稍微','副詞・名詞','降低程度。','state'],['泥濘[ぬかる]む','泥濘；變得泥濘','五段動詞','泥濘んでいた：當時處於泥濘狀態。','state'],['はじめから','從一開始','副詞','設定事件起點。','start'],['つまづく','絆倒；受挫','五段動詞','提供文字表記；標準表記常見つまずく。','start'],['ピストル','手槍；發令槍','名詞','此處與起點意象連結。','subjectobject'],['音[おと]','聲音；聲響','名詞','物體聲響多用音；人聲常用声。','subjectobject'],['誰[だれ]か','某人','代名詞','誰＋か＝不特定某人。','subjectobject'],['遮[さえぎ]る','遮擋；截斷','五段動詞','光、聲音、去路都可成為受詞。','subjectobject'],['傷[きず]つける','傷害；弄傷','一段動詞','可傷害人或物；主客體需由語境補足。','omission'],['形[かたち]','形狀；形式','名詞','形を変える：改變形狀。','teiku'],['変[か]える','改變某物','一段他動詞','對照変わる：某物自己改變。','teiku'],['生[い]き方[かた]','生活方式；活法','名詞','動詞ます語幹＋方＝做法。','way'],['そうやって','就那樣；用那種方式','副詞','承接前述方法或歷程。','souyatte'],['居場所[いばしょ]','容身之處；歸屬位置','名詞','可指實際座位，也可指心理歸屬。','way'],['見[み]つける','找到；發現','一段動詞','見つけた：找到了。','souyatte'],['変[か]わる','改變','五段自動詞','変わりたい：想改變。','takute'],['生[い]きる','活著；生活','一段動詞','生きていく：今後繼續活下去。','continue'],['判断[はんだん]','判斷','名詞・サ變','判断が鈍る／判断する。','change'],['鈍[にぶ]い','遲鈍；不敏銳','い形容詞','鈍くなる：變遲鈍。','change'],['善[ぜん]','善；善意','名詞','與悪相對；歌中被具象化。','fragment'],['端[はし]くれ','微不足道的一員；一小片','名詞','常用Nの端くれ自謙。','fragment'],['指[ゆび]','手指','名詞','指を切る：割傷手指。','fragment'],['切[き]る','切；割','五段動詞','切って是促音便。','fragment'],['気持[きも]ちの悪[わる]い','令人不舒服；噁心','固定表現','可形容身體感受或令人不快的事物。','omission'],['笑顔[えがお]','笑容','名詞','笑顔が主語，不一定代表善意。','subjectobject'],['心[こころ]','心；內心','名詞','此處後面省略受詞助詞を。','omission'],['舐[な]め回[まわ]す','到處舔；反覆舔舐','五段複合動詞','歌中用於侵入內心的強烈比喻。','omission'],['もう','已經；夠了','副詞・感動詞','依語氣表示時間或情緒界線。','omission'],['砕[くだ]く','打碎；粉碎','五段他動詞','砕いて：連接或請求形式。','invitation'],['どこにでも','無論哪裡；到處','副詞','與肯定呼應。','youna'],['お決[き]まり','固定套路；老一套','名詞','お＋決まり帶既定模式語感。','determined'],['不幸[ふこう]','不幸','名詞・な形容詞','不幸な出来事：不幸事件。','determined'],['その先[さき]','那之後；前方','名詞片語','可表空間前方或事件後續。','whether'],['腐[くさ]る','腐爛；消沉腐化','五段動詞','可用於物質，也能比喻人或狀態。','whether'],['自分次第[じぶんしだい]','取決於自己','名詞片語','N次第表示依N而定。','whether'],['残[のこ]す','留下','五段他動詞','被動残される：被留下。','passive'],['時間[じかん]','時間','名詞','残された時間：所剩時間。','switch'],['焦[あせ]り','焦躁；急迫感','名詞','焦る的名詞形。','switch'],['誘[さそ]う','引誘；引發','五段動詞','焦りを誘う：引起焦躁。','switch'],['戸惑[とまど]う','困惑；不知所措','五段動詞','通常以人為感受者。','switch'],['行[い]く','去；前往','五段動詞','行きたかった：曾想去。','takatta'],['遠[とお]く','遠方；遠遠地','名詞・副詞','遠い的副詞／名詞性用法。','takatta'],['汽笛[きてき]','汽笛','名詞','船或火車的鳴笛聲。','sae'],['さえ','甚至；連…都','副助詞','提出極端例子。','sae'],['運命[うんめい]','命運','名詞','歌中被擬人成侵蝕的主體。','tooquiet'],['あまりに','太過於；實在','副詞','修飾超出預期的程度。','tooquiet'],['蝕[むしば]む','侵蝕；逐漸損害','五段動詞','蝕んでくる：逐漸逼近並造成影響。','teiku'],['なぜ','為什麼','副詞','較なんで中性或書面。','noquestion'],['自由[じゆう]','自由','名詞・な形容詞','此歌擬人化為會假裝與設陷阱。','pretend'],['優[やさ]しい','溫柔；和善','い形容詞','優しいふり：裝作溫柔。','pretend'],['ふりをする','假裝；裝作','固定表現','接名詞の或普通形。','pretend'],['落[お]とし穴[あな]','陷阱；圈套','名詞','也比喻隱藏風險。','noquestion'],['作[つく]る','製作；建立','五段他動詞','落とし穴を作る。','subjectobject'],
];

const themes = [
 ['search','搜尋答案','方法を探す → 世間を見る → 自問する','adverb searching potential darou'],
 ['start','被放進世界','泥濘的起點 → 絆倒','passive state start'],
 ['obstacle','起程聲被遮斷','發令槍 → 汽笛；兩次「誰かが遮る」','subjectobject sae'],
 ['change','受傷與變形','活法改變 → 想改變 → 繼續活下去','teiku way takute continue'],
 ['place','找到居場所','そうやって → 居場所を見つけた','souyatte way'],
  ['judgment','善與笑容的銳角','判斷遲鈍 → 割傷 → 擊碎','change fragment omission'],
  ['time','剩餘時間與遠方','時間催促 → 曾想抵達的遠處','switch takatta'],
  ['fate','時間與命運','不幸 → 自分次第？→ 靜靜侵蝕','whether switch tooquiet'],
 ['freedom','自由的兩面','溫柔的假面 → 落とし穴','pretend noquestion'],
];

const firstOccurrence = (unitIndex) => order.indexOf(unitIndex) + 1;
const grammarLink = (id) => `<a href="#g-${id}">${grammar.find((item) => item[0] === id)[1]}</a>`;
const relatedLines = (id) => units.flatMap((unit, unitIndex) => unit[3].split(' ').includes(id) ? [`<a href="#l-${firstOccurrence(unitIndex)}">第 ${firstOccurrence(unitIndex)} 行</a>`] : []).join(' ');
const wordLinks = (text) => words.flatMap((word, index) => plain(text).includes(plain(word[0])) ? [`<a href="#w-${index + 1}">${ruby(word[0])}</a>`] : []).join(' ');

const lyricHtml = order.map((unitIndex, lineIndex) => {
  const unit = units[unitIndex];
  const repeated = order.indexOf(unitIndex) < lineIndex;
  return `<article id="l-${lineIndex + 1}" class="lyric-line" data-theme="${unit[4]}">
    <div class="line-meta"><span>${String(lineIndex + 1).padStart(2, '0')}</span>${repeated ? `<span>重現 · <a href="#l-${firstOccurrence(unitIndex)}">首次解說</a></span>` : ''}</div>
    <h3 lang="ja">${ruby(unit[0])}</h3>
    <p class="translation">${unit[1]}</p>
    <details><summary>展開語意與語法</summary><p>${ruby(unit[2])}</p>
      <div class="chip-row">${unit[3].split(' ').map(grammarLink).join(' ')} <a href="#m-${unit[4]}">意象地圖</a></div>
      <div class="word-route"><strong>句中詞語</strong><div class="chip-row">${wordLinks(unit[0])}</div></div>
      <p class="recall">回想提示：先說出這句的主語、對象、時間方向或省略內容，再核對解說。</p>
    </details>
  </article>`;
}).join('');

const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow,noarchive,nosnippet"><meta name="googlebot" content="noindex,nofollow,nosnippet"><meta name="referrer" content="no-referrer">
<title>いちについて｜AIMYON 日本語學習帳</title>
<style>
:root{color-scheme:light;--paper:#f5f1e7;--ink:#191d1b;--red:#d94a36;--blue:#27627a;--yellow:#f6ce54;--track:#d6d1c5;--card:#fffefa;--muted:#5f655f;font-family:system-ui,'Noto Sans TC','Noto Sans JP','Yu Gothic UI','Microsoft JhengHei',sans-serif;font-size:18px}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:90px}body{margin:0;color:var(--ink);background:linear-gradient(90deg,transparent 0 31px,#e7e2d7 32px,transparent 33px),var(--paper);line-height:1.85}a{color:var(--blue);text-underline-offset:4px}button,input,summary{font:inherit}button,summary{min-height:46px;cursor:pointer}button{padding:8px 13px;color:var(--ink);border:2px solid var(--ink);background:var(--card);border-radius:999px;font-weight:700}button[aria-pressed=true]{color:white;background:var(--ink)}a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--red);outline-offset:3px}header,main,footer{width:min(100%,920px);margin:auto;padding:24px max(18px,env(safe-area-inset-left))}.back{font-size:.9rem}.label{display:inline-block;margin-top:20px;padding:3px 12px;background:var(--yellow);font-weight:800;letter-spacing:.08em;transform:rotate(-1deg)}h1{margin:12px 0 0;font-size:clamp(2.4rem,8vw,4.8rem);line-height:1.05;letter-spacing:-.05em}h2{font-size:clamp(1.55rem,5vw,2.3rem);line-height:1.25}h3,p{overflow-wrap:anywhere}p{margin:10px 0}rt{font-size:.57em;font-weight:500}ruby{ruby-align:center}nav,.controls,.chip-row{display:flex;gap:8px;flex-wrap:wrap}nav{margin:22px 0 14px}nav a,.chip-row a{display:inline-block;padding:5px 10px;text-decoration:none;background:#e5eced;border-radius:999px;font-size:.82rem}.controls{margin-top:12px}.intro{border-top:5px solid var(--ink);padding-top:18px}.guide{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px 0}.guide div{padding:15px;background:var(--card);border:1px solid var(--track)}.guide strong{display:block;color:var(--red)}section{margin:58px 0;scroll-margin-top:90px}.track-map{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.track-map::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:3px;background:var(--ink);transform:translateX(-50%);z-index:-1}.track-card{padding:18px;background:var(--card);border:2px solid var(--ink);box-shadow:5px 5px 0 var(--yellow)}.track-card h3{margin:0}.track-card p{font-size:.9rem;color:var(--muted)}.track-card:nth-child(odd){margin-right:18px}.track-card:nth-child(even){margin-left:18px}.lyric-line{padding:25px 0;border-bottom:1px solid var(--track);scroll-margin-top:90px}.line-meta{display:flex;justify-content:space-between;gap:12px;color:var(--muted);font-size:.8rem;font-variant-numeric:tabular-nums}.lyric-line h3{margin:8px 0;font-size:1.22rem;line-height:2.25}.translation{padding-left:12px;border-left:4px solid var(--red)}details{padding:3px 0}summary{padding:8px 0;color:var(--blue);font-weight:750}.word-route{margin-top:15px}.word-route>strong{font-size:.8rem;color:var(--muted)}.recall{padding:12px;background:#ebeadf;border-left:3px solid var(--blue);font-size:.88rem}.grammar{padding:22px 0;border-bottom:1px solid var(--track);scroll-margin-top:90px}.grammar h3{margin-bottom:4px}.formula{font-weight:750}.example{padding:14px;background:var(--card);border-left:4px solid var(--yellow)}.vocab{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px}.word{padding:18px 0;border-bottom:1px solid var(--track);scroll-margin-top:90px}.word>strong{font-size:1.08rem}.word small{display:block;color:var(--muted)}label{font-weight:700}input{width:100%;margin:7px 0;padding:13px 15px;color:var(--ink);border:2px solid #737970;background:var(--card);border-radius:10px}.count{font-size:.88rem;color:var(--muted)}.practice details{padding:6px 0;border-bottom:1px solid var(--track)}.answer{padding:13px;background:var(--card);border-left:4px solid var(--red)}.source-note{padding:16px;border:1px solid var(--track);background:var(--card)}.hidden-reading rt{visibility:hidden}.hide-translations .translation{display:none}.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:8px;z-index:50;padding:10px;background:white}:target{animation:flash 1.1s ease-out}footer{padding-bottom:calc(32px + env(safe-area-inset-bottom));border-top:1px solid var(--track);font-size:.85rem;color:var(--muted)}@keyframes flash{from{background:#fff0a4}to{background:transparent}}@media(max-width:620px){:root{font-size:17px}header,main,footer{padding-left:max(16px,env(safe-area-inset-left));padding-right:max(16px,env(safe-area-inset-right))}.guide,.track-map,.vocab{grid-template-columns:1fr}.track-map::before{left:9px;transform:none}.track-card:nth-child(n){margin-left:19px;margin-right:0}.lyric-line h3{font-size:1.12rem}.line-meta{align-items:flex-start}}@media(max-width:340px){:root{font-size:16px}.controls button{width:100%}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important;transition:none!important}}@media print{nav,.controls,input{display:none}.guide,.track-map,.vocab{display:block}.track-card,.grammar,.word,.lyric-line{break-inside:avoid}.track-card{margin:12px 0!important;box-shadow:none}body{background:white}}
</style></head><body><a class="skip" href="#lyrics">跳到逐句教材</a>
<header><a class="back" href="https://event.itigre.com/jp50/aimyon/songs/">← 歌曲學習帳</a><div class="label">AIMYON NOTEBOOK · 05</div><h1 lang="ja">いちについて</h1><p>從被放進世界的起點，讀到繼續活下去的方向。</p>
<nav aria-label="教材目錄"><a href="#map">思緒地圖</a><a href="#lyrics">30 行逐句</a><a href="#grammar">27 組語法</a><a href="#words">69 個字詞</a><a href="#practice">主動回想</a><a href="#connections">跨歌曲連結</a></nav>
<div class="controls"><button id="reading-toggle" type="button" aria-pressed="false">隱藏假名</button><button id="translation-toggle" type="button" aria-pressed="false">隱藏逐句中文</button></div></header>
<main><section class="intro" aria-labelledby="guide-title"><h2 id="guide-title">一次沿一條線學</h2><div class="guide"><div><strong>先預測</strong>讀 2–4 行，只判斷誰、做什麼、往哪裡。</div><div><strong>再核對</strong>展開解說，立即修正助詞、活用與省略。</div><div><strong>最後轉用</strong>遮住中文，用同一語法說自己的新句。</div></div><p>「全向」在這裡是從讀音、詞義、句構、時間方向、意象和個人產出六個入口建立連結。歌曲中的痛苦表現作為語言與敘事分析，不替敘述者或真實人物做心理診斷。</p></section>
<section id="map"><h2>九站思緒記憶地圖</h2><p>從任何一站進入歌詞，再沿語法與單字連結返回。地圖呈現文字關係，沒有把詩意解讀寫成唯一答案。</p><div class="track-map">${themes.map((theme) => `<article class="track-card" id="m-${theme[0]}"><h3>${theme[1]}</h3><p>${theme[2]}</p><div class="chip-row">${units.flatMap((unit, unitIndex) => unit[4] === theme[0] ? [`<a href="#l-${firstOccurrence(unitIndex)}">第 ${firstOccurrence(unitIndex)} 行</a>`] : []).join('')}</div><div class="chip-row">${theme[3].split(' ').map(grammarLink).join('')}</div></article>`).join('')}</div></section>
<section id="lyrics"><h2>逐句讀懂完整歌詞</h2><p class="source-note">保留您提供的 30 行與重複段落。漢字上方標示假名，中文為本教材重新翻譯；跨行句必須合讀。點開每行可連到語法、字詞與思緒地圖。</p>${lyricHtml}</section>
<section id="grammar"><h2>語法與句構全解</h2>${grammar.map((item, index) => `<article class="grammar" id="g-${item[0]}"><small>GRAMMAR ${String(index + 1).padStart(2, '0')}</small><h3>${item[1]}</h3><p class="formula" lang="ja">${ruby(item[2])}</p><p>${ruby(item[3])}</p><div class="example"><p lang="ja">${ruby(item[4])}</p><p>${item[5]}</p></div><div class="chip-row">${relatedLines(item[0])}</div></article>`).join('')}</section>
<section id="words"><h2>單字與片語索引</h2><label for="word-search">搜尋日文、假名、詞性或中文</label><input id="word-search" type="search" placeholder="例如：泥濘、ぬかる、泥濘"><p id="word-count" class="count" role="status">共 ${words.length} 個字詞</p><div class="vocab">${words.map((word, index) => `<article class="word" id="w-${index + 1}" data-search="${word.join(' ')}"><strong lang="ja">${ruby(word[0])}</strong><small>${word[2]}</small><p>${word[1]}</p><p>${ruby(word[3])}</p><div class="chip-row">${grammarLink(word[4])}</div></article>`).join('')}</div></section>
<section id="practice" class="practice"><h2>主動回想與換情境</h2><p>先說答案，再展開核對。錯題立即看回饋，隔兩題再答一次；隔天、第 3 天、第 7 天重新提取，是可依自己表現調整的起始節奏。</p>${[
['「幸せになれる」的なれる是哪個動詞的什麼形式？','なる的可能形，表示「能夠變得幸福」。'],
['誰遮斷什麼？請用三個助詞片段回答。','音[おと]を／誰[だれ]かが／遮[さえぎ]る。受詞先出現，不會改變助詞功能。'],
['落とされた世界為何有兩種讀法？','可字面讀成「被放落的世界」，也可依語境補成「（我）被放進其中的世界」。關係子句省略了角色與落點。'],
['「変えていく」和「蝕んでくる」的時間方向有何不同？','ていく由現在往未來延伸；てくる把變化拉向現在或說話者。'],
['「その先で腐るかは」中的か做什麼？','把「是否腐壞」整句名詞化，再由は設成判斷主題。'],
['為何「時間が焦りを誘い戸惑う」需要補主語？','時間是誘う的主語；戸惑う的感受者自然是省略的我。並列處發生主語切換。'],
['用たくて寫「因為想找到容身之處，所以繼續走」。','居場所[いばしょ]を見[み]つけたくて、歩[ある]き続[つづ]ける。'],
['用さえ寫一個與歌曲無關的新句。','例：忙[いそが]しくて昼[ひる]ご飯[はん]さえ食[た]べられなかった。'],
['歌曲結尾從「生きて」變成「生きていく」，增加了什麼？','增加從當下往未來持續的方向，讓未完呼喚轉為繼續行動。'],
['請以自己的經驗完成三站：起點、阻礙、下一步。','例：はじめは難[むずか]しかった。時間[じかん]が足[た]りなかった。でも、少[すこ]しずつ続[つづ]けていく。']
].map((item) => `<details><summary>${item[0]}</summary><p class="answer">${ruby(item[1])}</p></details>`).join('')}</section>
<section id="connections"><h2>接回已完成的歌曲</h2><article class="grammar"><h3><a href="./../ai-no-hana/">${ruby('愛[あい]の花[はな]')}</a></h3><p>${ruby('蝕[むしば]む')}：一首由命運靜靜侵蝕而來，一首描述病或雨的侵蝕意象；${ruby('生[い]きる／命[いのち]')}：比較動作與生命名詞。</p><div class="chip-row">${grammarLink('teiku')} ${grammarLink('tooquiet')}</div></article><article class="grammar"><h3><a href="http://go.itigre.com/idontlikemornings" rel="noopener noreferrer">${ruby('朝[あさ]が嫌[きら]い')}</a></h3><p>${ruby('空回[からまわ]る／判断[はんだん]が鈍[にぶ]くなる')}：比較無法專心與判斷變慢；兩首都用變化表達內在狀態。</p><div class="chip-row">${grammarLink('change')}</div></article><article class="grammar"><h3><a href="http://go.itigre.com/Kimi-Rock" rel="noopener noreferrer">${ruby('君[きみ]はロックを聴[き]かない')}</a></h3><p>聲音在一首歌中拉近距離；本歌的發令槍與汽笛聲卻被遮斷。從「聽」與「聽不見」建立反向記憶。</p><div class="chip-row">${grammarLink('subjectobject')} ${grammarLink('sae')}</div></article><article class="grammar"><h3><a href="http://go.itigre.com/marigold" rel="noopener noreferrer">マリーゴールド</a></h3><p>比較風吹動景物的回憶，與泥濘、落とし穴形成的行路阻力。先找文字證據，再說情緒差異。</p><div class="chip-row"><a href="#m-start">泥濘的起點</a> <a href="#m-freedom">自由的陷阱</a></div></article></section>
<section id="sources"><h2>作品與方法來源</h2><ul><li><a href="https://www.aimyong.net/feature/ichinitsuite" rel="noreferrer">AIMYON 官方《いちについて》作品頁</a>：核對歌名、2025 年發行與官方訪談；官方說明作品關注人生起點與「生きること」。</li><li><a href="https://www.aimyong.net/news/detail/2599" rel="noreferrer">官方主題歌公告</a>：核對《19番目のカルテ》主題歌背景。</li><li><a href="https://www.nature.com/articles/s41599-024-03983-6" rel="noreferrer">提取練習與回饋時機研究</a>：教材採先回答、再立即核對；複習間隔仍應依個人表現調整。</li><li><a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag" rel="noreferrer">Google robots meta 說明</a>：noindex 已直接寫進原始 HTML。</li></ul><p class="source-note">非官方個人學習整理。歌詞依使用者提供文字分析；沒有從外部來源補寫歌詞。語法事實、可能解讀與作品官方背景分開呈現。noindex 是搜尋引擎指令，不是登入保護。</p></section></main>
<footer><a href="https://event.itigre.com/jp50/aimyon/songs/">返回歌曲學習帳</a> · AIMYON 日文學習整理 · 2026-09-07</footer>
<script>
const readingButton=document.querySelector('#reading-toggle');const translationButton=document.querySelector('#translation-toggle');
readingButton.addEventListener('click',()=>{const active=document.body.classList.toggle('hidden-reading');readingButton.setAttribute('aria-pressed',String(active));readingButton.textContent=active?'顯示假名':'隱藏假名'});
translationButton.addEventListener('click',()=>{const active=document.body.classList.toggle('hide-translations');translationButton.setAttribute('aria-pressed',String(active));translationButton.textContent=active?'顯示逐句中文':'隱藏逐句中文'});
document.querySelector('#word-search').addEventListener('input',(event)=>{const query=event.target.value.trim().toLowerCase();let visible=0;document.querySelectorAll('.word').forEach((item)=>{item.hidden=!item.dataset.search.toLowerCase().includes(query);if(!item.hidden)visible+=1});document.querySelector('#word-count').textContent='顯示 '+visible+' / ${words.length} 個字詞'});
</script></body></html>`;

writeFileSync(out, html, 'utf8');
console.log(JSON.stringify({ output: out, lines: order.length, uniqueLines: units.length, grammar: grammar.length, words: words.length }));
