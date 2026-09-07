import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('./index.html', import.meta.url));
// 漢字[かな] is converted to native HTML ruby. The delivered HTML needs no build step.
const ruby = s => s.replace(/([^\s<>\[\]ぁ-ゖァ-ヺ、。？！「」『』（）／・→＋＝〜～：；…—,;:!?|]+)\[([^\]]+)\]/g, '<ruby>$1<rp>（</rp><rt>$2</rt><rp>）</rp></ruby>');
const g = [
 ['ellipsis','省略與倒裝','を／へ 後面沒有動詞','日文詩句可以只留下受詞或方向，把「傳達、贈送」等動作留給讀者補足。補充是解讀，不是原詞。結尾的愛之花回應開頭，形成首尾呼應。','この花[はな]をあなたへ。','把這朵花送給你。（省略「送る」等動詞）'],
 ['tarazu','不足的書面表現','足[た]らず＋の＋名詞','足らず來自「足る」的否定書面形式。言葉足らず不是沒有愛，而是言語表達不夠充分。不要誤認成「足りない」直接刪字。','言葉[ことば]足[た]らずの説明[せつめい]だった。','那是一段說得不夠充分的說明。'],
 ['negative','強烈否定與對比','決[けっ]して＋否定／Vては＋いない','決して必須與否定呼應。「憎んではいない」把否定聚焦在「憎恨這件事」，比一般否定更容易帶出對比；並不必然表示幸福或接受一切。','決[けっ]して忘[わす]れてはいない。','絕對沒有忘記。'],
 ['modifier','把動作放到名詞前','Vた＋名詞／名詞＋ある＋名詞','歪んだ修飾雲；愛した修飾日々。た形既可表過去，也可呈現留下的狀態。「命ある」是簡潔書面修飾，約等於「命がある」。','静[しず]かに過[す]ごした日々[ひび]。','安靜度過的日子。'],
 ['transitive','誰讓什麼改變','が＋を＋他動詞','雲が是主語，空を是受詞，濁す是使天空混濁；晴れる是天空本身放晴的自動詞。注意「濁す」讀にごす，不是濁る。','雨[あめ]が川[かわ]を濁[にご]す。','雨使河川混濁。'],
 ['tekuru','把某物留在來處','Vてくる／置[お]いてきた','てくる可表做完動作再來，也可表變化持續到現在。此處「置いてきた」以留在某處、自己走到現在的視角讀最自然；不是已證实夢想永久消失。','荷物[にもつ]を家[いえ]に置[お]いてきた。','我把行李留在家裡才來。'],
 ['no','說明與抒情語尾','普通形＋の／わ','句尾の可補充說明或柔和地陳述；わ可抒情、強調。歌中的語感常帶女性化色彩，但不能只靠語尾推斷性別；一般會話也不必照搬。','今日[きょう]は少[すこ]し疲[つか]れたの。','今天有點累了。'],
 ['tara','條件與契機','Vた＋ら','晴れたら＝晴れる→晴れた→晴れたら，可譯「如果／等到放晴」。た在此構成條件，不代表事情已經發生。','雨[あめ]が止[や]んだら歩[ある]こう。','等雨停了再走吧。'],
 ['request','省略句尾的請求','Vて','傳えて是傳える的て形，獨立放在句尾常帶請求，但也能是連接未完句。此歌依呼喚語境可理解成「請傳達」。誰傳給誰仍有詩意留白。','気持[きも]ちを伝[つた]えて。','把心情傳達出去吧。'],
 ['metaphor','省略判斷詞的比喻','AはB（だ）','涙は明日の為、新しい花の種並列，將眼淚描寫成為明天而存在、孕育新花的種子。這是意象，不是客觀因果或對悲傷的要求。','経験[けいけん]は未来[みらい]の種[たね]。','經驗是未來的種子。'],
 ['ni','渴望的指向','Nに焦[こ]がれる','焦がれる比一般「想要」更熱切、較文學。「恋に焦がれた人」語法上是曾渴望戀情的人；將其譯為自己思慕的人是語境延伸，不能當唯一字面義。','自由[じゆう]に焦[こ]がれる。','熱切嚮往自由。'],
 ['techain','連續動作與省略','Vて＋Vて／Vている→Vてる','結び是結ぶ的連用形，與抱いて銜接；ゆれてる省略ている的い。這些形式連起動作與狀態，不必每個都翻成「然後」。抱いて的對象省略。','手[て]をつないで歩[ある]いている。','牽著手走著。'],
 ['kigasuru','降低斷定程度','普通形＋気[き]がする','聴こえた気がする＝感覺似乎聽見。聴こえる是不自主傳入耳中的聲音；聴く是主動聆聽。此處並未斷言對方真的說話。','声[こえ]が聞[き]こえた気[き]がする。','我感覺好像聽見了聲音。'],
 ['purpose','移動的目的＋對他人的願望','Vます語幹＋に来[く]る＋てほしい','逢いに＝逢います去ます＋に；逢いに来てほしい＝希望對方來見面。ほしい通常用假名；歌詞的欲しい沿用原寫法。','友達[ともだち]に遊[あそ]びに来[き]てほしい。','我希望朋友來玩。'],
 ['heto','朝向未來的連接','へと＋V／Vる＋名詞','へ表方向，と加強朝向、延伸的語感；繋がる修飾輪。輪可讀作關係或生命延續，屬詮釋，不只一種答案。','未来[みらい]へと続[つづ]く道[みち]。','通向未來的路。'],
 ['nantenai','不願接受的未來','Nなんて＋Vないで','なんて可帶驚訝、貶低或難以接受。来ないで把未來擬人化，祈求它不要到來；問號使語氣近似懇求，不是普通資訊問句。','そんな日[ひ]なんて来[こ]ないで。','那樣的日子，請不要到來。'],
 ['z utomo','即使仍未發生','V未然形＋ずとも','晴れずとも＝即使不放晴；ず是書面否定。する特殊變成せず。與晴れたら對比：從等待條件成立，走向條件不成立仍祈禱。','答[こた]えが出[で]ずとも考[かんが]える。','即使沒有答案也繼續思考。'],
 ['mad e','一連串轉化的終點','Nになる→なり／Vます語幹／Vるまで','なり與呼び是連用形，連接後項；になる表示成為。まで標出等待的終點。雨→風→夢→光是詩的轉化鏈，並非自然科學敘述。','風[かぜ]が止[や]むまで待[ま]つ。','等到風停為止。'],
].map(x=>{x[0]=x[0].replaceAll(' ','');return x});
// unique units: original supplied wording is retained, including repetitions below.
const units = [
 ['言葉[ことば]足[た]らずの愛[あい]を','把言語尚未充分表達的愛……','を留下尚未說完的贈予動作。開篇先呈現愛，再延後交代接受者。','tarazu ellipsis','love'],
 ['愛[あい]を貴方[あなた]へ','把愛，獻給你。','重複愛を強化核心；へ指定方向，動詞仍省略。貴方與結尾あなた指稱相同，字體變化不等於換人。','ellipsis','love'],
 ['私[わたし]は決[けっ]して今[いま]を','我絕對沒有把現在……','這一行不能單獨判斷肯否定；決して的呼應在下一行。今被名詞化為當下處境。','negative','time'],
 ['今[いま]を憎[にく]んではいない','我並不憎恨此刻。','憎む→憎んで→憎んではいない。可存在悲傷，卻否定「憎恨現在」；不要擅自補成快樂。','negative','love'],
 ['歪[ゆが]んだ雲[くも]が空[そら]を','扭曲的雲把天空……','歪んだ修飾雲；が標主語，を標受詞，等待下一行動詞。天空也可映照內在心境。','modifier transitive','sky'],
 ['空[そら]を濁[にご]して','使天空蒙上混濁。','濁して承接後文；雲使天空改變，是他動詞結構。將陰雲理解成悲傷是一種合理意象閱讀。','transitive techain','sky'],
 ['私[わたし]の夢[ゆめ]は全[すべ]て','至於我的夢，全都……','は提出主題；全て修飾後面的處置範圍，完整意思要讀到下一行。','tekuru','time'],
 ['全[すべ]て置[お]いてきたの','全都留在來時的地方了。','置いてきた帶走到此處、把事物留在身後的視角；の柔和補充。具體何處、何種夢並未明說。','tekuru no','time'],
 ['命[いのち]ある日々[ひび]','那些活著的日子。','書面命ある約等於命がある；日々指一日日累積。名詞片語留下追憶感。','modifier','time'],
 ['静[しず]かに誰[だれ]かを','靜靜地，愛著某個人……','静か是な形容詞，に轉為副詞；誰か是不特定某人，を的動詞在下一行。','modifier','love'],
 ['愛[あい]した日々[ひび]','那些曾經愛過的日子。','愛した是過去形，修飾日々；與上一行合讀為靜靜愛過某人的日子。','modifier','love'],
 ['空[そら]が晴[は]れたら','如果／等到天空放晴。','晴れる是自動詞；たら設下契機。可同時保留真實天氣與心境好轉兩層。','tara','sky'],
 ['愛[あい]を 愛[あい]を伝[つた]えて','請把愛，把愛傳達出去。','兩次愛を把焦點拉回情感。て形在此可讀為請求；對象與執行者由上下文理解。','request','love'],
 ['涙[なみだ]は明日[あした]の為[ため]','眼淚，是為了明天。','明日の為是名詞片語，省略判斷詞。明日採歌曲常見的あした讀法。','metaphor','seed'],
 ['新[あたら]しい花[はな]の種[たね]','是新花的種子。','接前行把眼淚比作種子；悲傷可能與新的生長共存，而非要求悲傷必須有用。','metaphor','seed'],
 ['恋[こい]に焦[こ]がれた人[ひと]は','那位曾熱切嚮往戀情的人……','に是焦がれる的對象；焦がれた整段修飾人。文法字面與「思慕之人」的語境譯法須分開。','ni modifier','bond'],
 ['人[ひと]は 天[てん]の上[うえ]','那個人，在天上。','上前用の；所在動詞省略。天上強烈暗示離世、追思，但並未指定真實人物身分。','ellipsis','bond'],
 ['いつかあの場所[ばしょ]で強[つよ]く','有一天，在那個地方，緊緊地……','いつか是不確定某一天；で標動作地點；強く是強い的副詞形，跨行修飾下一行動作。','techain','bond'],
 ['強[つよ]く手[て]を結[むす]び抱[だ]いて','緊緊牽起手，相擁。','結び連用形接抱いて；抱く此處讀だく。可帶請求或想像重逢的延續語感，不必斷言唯一句尾功能。','techain request','bond'],
 ['緑[みどり]ゆれてる','綠意正搖曳。','緑後省略が；ゆれてる＝揺れている，描寫持續景象。名詞緑可借指綠葉草木。','techain','sky'],
 ['貴方[あなた]の声[こえ]が聴[き]こえた気[き]がする','感覺好像聽到了你的聲音。','声が是聽得見的主體；気がする保留不確定，適合讀成回憶與感覺，而不是事實宣告。','kigasuru','bond'],
 ['逢[あ]いに 逢[あ]いに来[き]て欲[ほ]しい','希望你來，來與我相見。','逢いに是目的，来てほしい是對別人行動的願望。逢比会更富相逢、珍重的文學色彩。','purpose','bond'],
 ['涙[なみだ]は枯[か]れないわ','眼淚不會乾涸啊。','枯れる原用植物枯萎或水源乾竭，在此借喻眼淚不盡；は立主題，わ抒情。','no metaphor','seed'],
 ['明日[あした]へと繋[つな]がる輪[わ]','延續到明天的環。','繋がる是自動詞，整段修飾輪；輪與前行わ同音，聽覺相連但詞性和意義不同。','heto','bond'],
 ['木漏[こも]れ日[び]と笑[わら]う','與樹隙灑落的陽光一同微笑……','と可讀作共同伴隨，陽光被擬人化；跨行也可讓此句修飾大切な人。這裡採保留兩種連接的讀法。','modifier','sky'],
 ['大切[たいせつ]な人[ひと]を','那個珍愛的人……','大切な修飾人；を接下一行失う。不要只因換行就當成完整句。','modifier','bond'],
 ['失[うしな]う未来[みらい]なんてこないで？','要失去珍愛之人的那種未來，請別到來，好嗎？','人を失う修飾未来；こないで是来ないで，未來被當成能來去的對象。這是不願失去的祈願。','nantenai modifier','bond'],
 ['空[そら]が晴[は]れずとも','即使天空沒有放晴。','與晴れたら形成全歌重要轉折：從等待放晴到陰天仍然祈願。ずとも屬書面讓步。','zutomo','sky'],
 ['愛[あい]を胸[むね]に祈[いの]るわ','把愛懷在胸中，祈禱。','愛を胸に可補「抱いて」理解，為省略搭配；祈る的具體內容在後文延伸。','ellipsis no','love'],
 ['貴方[あなた]に刺[さ]さる雨[あめ]が','那些刺痛你的雨……','貴方に是刺さる所及對象；刺さる修飾雨，雨が是之後轉化鏈的主題主語。雨可比喻傷痛。','modifier','sky'],
 ['風[かぜ]になり','化成風，','になる的連用形なり，承接下一動作。比喻中的雨由尖銳刺痛轉為流動。','made','sky'],
 ['夢[ゆめ]を呼[よ]び','喚來夢，','呼び是呼ぶ連用形，不是過去式；夢を是受詞，與前後句共同構成願景。','made','time'],
 ['光[ひかり]になるまで','直到化成光為止。','まで收束整段等待／祈禱的終點；不是每句各自獨立。光常可讀為希望或溫暖的意象。','made','sky'],
 ['愛[あい]の花[はな]をあなたへ','把愛之花，送給你。','結尾保留を與へ而省略動詞，回扣開篇；抽象的愛凝成可贈予的花。','ellipsis metaphor','seed'],
];
const order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,11,21,22,23,24,25,26,27,28,29,30,31,32,11,12,13,14,11,21,22,23,0,33];
const words = [
 ['言葉[ことば]足[た]らず','表達不充分','名詞性表現','話說得不夠完整；不是愛的量不足。','tarazu'],['愛[あい]','愛','名詞','較廣的珍愛；此曲也能讀作追思與關懷。','ellipsis'],['貴方[あなた]','你','代名詞','和あなた同一讀音；日常稱呼常用姓名更自然。','ellipsis'],['私[わたし]','我','代名詞','敘述者；不必等同作詞者本人。','negative'],['決[けっ]して','絕對（不）','副詞','必須注意後面的否定。','negative'],['今[いま]','現在','名詞','今を：把當下處境當受詞。','negative'],['憎[にく]む','憎恨','五段動詞','憎んで是ん音便。','negative'],['歪[ゆが]む','扭曲','五段動詞','歪んだ雲：呈現歪曲狀態的雲。','modifier'],['雲[くも]','雲','名詞','雲が：造成變化的主語。','transitive'],['空[そら]','天空','名詞','與晴れる、濁す形成自他對照。','transitive'],['濁[にご]す','使混濁','五段他動詞','對照濁る（にごる）：變混濁。','transitive'],['夢[ゆめ]','夢；夢想','名詞','可指理想、想像或睡夢，歌裡保留多義。','tekuru'],['全[すべ]て','全部','名詞／副詞','修飾置いてきた的範圍。','tekuru'],['置[お]く','放置','五段動詞','置いて是て形；不是置きて。','tekuru'],['命[いのち]','生命','名詞','命ある：有生命的、活著的。','modifier'],['日々[ひび]','日日；日子','名詞','々重複前字，整體讀ひび。','modifier'],['静[しず]か','安靜','な形容詞','静かに是副詞，静かな修飾名詞。','modifier'],['誰[だれ]か','某人','代名詞','か表示不特定；不同於誰も。','modifier'],['愛[あい]する','愛；珍愛','サ變動詞','愛した→愛過的；可修飾日々。','modifier'],['晴[は]れる','放晴','一段自動詞','晴れたら／晴れずとも是全曲對照。','tara'],['伝[つた]える','傳達','一段他動詞','気持ちを伝える：傳達心情。','request'],['涙[なみだ]','眼淚','名詞','與種、輪形成跨段比喻。','metaphor'],['明日[あした]','明天','名詞','也有あす等讀法；本教材採あした。','heto'],['為[ため]','為了；緣故','名詞','此處明日のため是目的／面向未來。','metaphor'],['新[あたら]しい','新的','い形容詞','直接修飾花，不加な。','metaphor'],['花[はな]','花','名詞','由種的生長連回結尾的愛之花。','metaphor'],['種[たね]','種子','名詞','也比喻起因、開端。','metaphor'],['恋[こい]','戀情','名詞','比愛更常指浪漫戀慕，界線並非絕對。','ni'],['焦[こ]がれる','熱切思慕','一段動詞','對象用に；不要混同焦がす。','ni'],['人[ひと]','人','名詞','被關係子句修飾：焦がれた人。','modifier'],['天[てん]の上[うえ]','天上','名詞片語','帶離世暗示；不指定人物。','ellipsis'],['いつか','某一天','副詞','未定時間；與明日的相對明確不同。','heto'],['あの場所[ばしょ]','那個地方','名詞片語','あの提示距離或雙方共有記憶。','techain'],['強[つよ]く','強烈地；緊緊地','副詞形','強い→強く；在此修飾牽手、相擁。','techain'],['手[て]を結[むす]ぶ','牽起手；結合','片語','此歌帶親密連結；其他語境可指聯手。','techain'],['抱[だ]く','擁抱','五段動詞','此處抱いて讀だいて；抱く也有いだく讀法，常配抽象想法。','techain'],['緑[みどり]','綠色；綠意','名詞','借指草木綠葉。','techain'],['揺[ゆ]れる','搖曳','一段動詞','原文寫ゆれてる；完整形式揺れている。','techain'],['声[こえ]','聲音；嗓音','名詞','人聲常用声，環境聲多用音。','kigasuru'],['聴[き]こえる','聽得見','一段動詞','一般也寫聞こえる；不要直接當聴く的可能形。','kigasuru'],['気[き]がする','感覺好像','片語','給主觀感覺保留空間。','kigasuru'],['逢[あ]う','相逢','五段動詞','語感較文學，與会う讀音相同。','purpose'],['来[く]る','來','不規則動詞','来て＝きて；来ない＝こない，讀音跟著活用變。','purpose'],['欲[ほ]しい','想要','い形容詞','接Vて時是希望別人做，不是想要物品。','purpose'],['枯[か]れる','枯萎；乾涸','一段動詞','涙は枯れない用的是比喻。','metaphor'],['繋[つな]がる','相連','五段自動詞','他動詞繋ぐ：主動把東西連起來。','heto'],['輪[わ]','環；圈','名詞','和句尾わ同音，但不是同一語法。','heto'],['木漏[こも]れ日[び]','樹葉間灑落的陽光','名詞','注意日在這個複合詞裡讀び。','modifier'],['笑[わら]う','笑','五段動詞','と可指和陽光一起，帶擬人。','modifier'],['大切[たいせつ]','重要；珍愛','な形容詞','名詞前用な：大切な人。','modifier'],['失[うしな]う','失去','五段動詞','人を失う可表失去珍愛的人。','nantenai'],['未来[みらい]','未來','名詞','被人を失う整句修飾。','nantenai'],['胸[むね]','胸口；心中','名詞','愛を胸に：把愛放在心中。','ellipsis'],['祈[いの]る','祈禱；祈願','五段動詞','為希望的結果祈願。','made'],['刺[さ]さる','刺入；刺痛','五段自動詞','對象用に；對照刺す（さす）是他動詞。','modifier'],['雨[あめ]','雨','名詞','此曲可讀成帶來傷痛的雨。','made'],['風[かぜ]','風','名詞','與雨、光構成轉化鏈。','made'],['呼[よ]ぶ','呼喚','五段動詞','呼び是連用形；呼んで是て形。','made'],['光[ひかり]','光','名詞','到光為止是祈願的終點。','made'],
];
const themes=[['love','愛如何表達','言語不足 → 傳達 → 懷在胸中','tarazu request ellipsis'],['sky','天空如何轉變','雲與雨 → 風 → 光；放晴／未放晴','tara zutomo made'],['seed','悲傷如何延續','眼淚 → 種子 → 花','metaphor'],['bond','距離如何連結','天上 → 相見 → 明日的輪','purpose kigasuru heto'],['time','時間如何流動','留下的夢 → 曾愛的日子 → 明天','tekuru modifier']];
const first = i => order.indexOf(i)+1;
const plain = s => s.replace(/\[[^\]]+\]/g,'');
const wordlinks = text => words.flatMap((w,i)=>plain(text).includes(plain(w[0]))?[`<a href="#w-${i+1}">${ruby(w[0])}</a>`]:[]).join(' ');
const glink = id => `<a href="#g-${id}">${ruby(g.find(x=>x[0]===id)[1])}</a>`;
const related = id => units.flatMap((u,i)=>u[3].split(' ').includes(id)?[`<a href="#l-${first(i)}">第 ${first(i)} 行</a>`]:[]).join(' ');
const lesson = order.map((n,i)=>{
 const u=units[n],repeat=order.indexOf(n)<i;
 return `<article id="l-${i+1}" class="line" data-theme="${u[4]}"><div class="line-label">${String(i+1).padStart(2,'0')} ${repeat?`· 重現 <a href="#l-${first(n)}">首次解說 ↗</a>`:''}</div><h3 lang="ja">${ruby(u[0])}</h3><p class="translation">${u[1]}</p><details><summary>拆開語意與語法</summary><p>${ruby(u[2])}</p><div class="links">${u[3].split(' ').map(glink).join(' ')} <a href="#m-${u[4]}">回到意象地圖</a></div><p>句中詞語</p><div class="links">${wordlinks(u[0])}</div><p class="cue">先回想：此句的動作、對象、時間或省略部分是什麼？說出自己的判斷後，再對照以上解說。</p></details></article>`;
}).join('');
const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive,nosnippet"><meta name="googlebot" content="noindex,nofollow,nosnippet"><meta name="referrer" content="no-referrer"><title>愛の花｜AIMYON 日本語學習帳</title><style>
:root{color-scheme:light;--paper:#f7f4ea;--ink:#242b29;--green:#225c48;--yellow:#ffde59;--line:#d5d7cc;font-family:system-ui,'Noto Sans TC','Yu Gothic','Microsoft JhengHei',sans-serif;font-size:18px}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);line-height:1.9}main,header,footer{max-width:880px;margin:auto;padding:24px 20px}a{color:var(--green);text-underline-offset:4px}button,summary,input{font:inherit}button,summary{cursor:pointer;min-height:46px}button{background:white;border:1px solid var(--green);border-radius:8px;padding:8px 14px;color:var(--green)}button[aria-pressed=true]{background:var(--green);color:white}a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{outline:3px solid #c55120;outline-offset:4px}.tape{display:inline-block;background:var(--yellow);padding:2px 12px;font-weight:750;letter-spacing:.08em}h1{font-size:2.6rem;margin:15px 0 0}h2{font-size:1.6rem;margin:12px 0}h3{font-size:1.13rem;margin:8px 0}p{margin:12px 0}rt{font-size:.6em;font-weight:400}ruby{ruby-align:center}nav,.links,.controls{display:flex;gap:8px;flex-wrap:wrap}.links a,nav a{display:inline-block;padding:6px 10px;background:#eef3ed;border-radius:6px;font-size:.85rem}nav{padding:10px 0}section{margin:34px 0;scroll-margin-top:16px}article[id]{scroll-margin-top:22px}.map{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.map article{border:2px solid var(--ink);padding:18px;background:white}.map article:first-child{grid-column:1/-1;border-top:7px solid var(--green)}.map p{font-size:.9rem}.line{padding:24px 0;border-bottom:1px solid var(--line)}.line h3{font-size:1.25rem;line-height:2.4}.line-label{font-size:.8rem;color:#59645d;font-variant-numeric:tabular-nums}.translation{border-left:3px solid var(--green);padding-left:12px}.cue{font-size:.88rem;background:#edf1e9;padding:12px}details{padding:5px 0}summary{padding:8px 0;color:var(--green);font-weight:650}.grammar,.word{padding:20px 0;border-bottom:1px solid var(--line)}.word strong{font-size:1.12rem}.word small{display:block;color:#535d55}.example{background:white;padding:14px;border-left:3px solid #b3871d}.example p{margin:4px 0}.note{border:1px solid var(--line);padding:16px;font-size:.9rem}.hidden-reading rt{visibility:hidden}.hide-translations .translation{display:none}.vocab{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 22px}input{width:100%;padding:12px;border:1px solid #7c897f;border-radius:6px;background:white;color:var(--ink)}:target{animation:flash 1.2s ease-out}small{font-size:.8rem}.muted{color:#59645d}footer{border-top:1px solid var(--line);font-size:.85rem}.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:8px;background:white;padding:12px}li{margin:10px 0}h1,h2,h3,p,a{overflow-wrap:anywhere}@keyframes flash{from{background:#fff0a9}to{background:transparent}}@media(max-width:560px){:root{font-size:17px}.map,.vocab{grid-template-columns:1fr}header,main,footer{padding:18px 16px}h1{font-size:2.1rem}.line h3{font-size:1.16rem}.map article:first-child{grid-column:auto}}@media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}@media print{button,.controls,input,nav{display:none}.map,.vocab{display:block}details{display:block}body{background:white}article{break-inside:avoid}}
</style></head><body><a class="skip" href="#reading">跳到逐句教材</a><header><a href="https://event.itigre.com/jp50/aimyon/songs/">← 歌曲學習帳</a><p class="tape">AIMYON NOTEBOOK · 04</p><h1 lang="ja">${ruby('愛[あい]の花[はな]')}</h1><p>先讀懂一句，再看它如何連到整首歌。</p><nav aria-label="教材目錄"><a href="#map">意象地圖</a><a href="#reading">44 行逐句</a><a href="#grammar">18 組語法</a><a href="#words">59 個字詞</a><a href="#practice">回想練習</a><a href="#connections">跨歌曲連結</a></nav><div class="controls"><button id="reading-toggle" aria-pressed="false">隱藏假名</button><button id="translation-toggle" aria-pressed="false">隱藏逐句中文</button></div></header><main>
<section aria-labelledby="guide"><h2 id="guide">今天怎麼學</h2><p>第一次：读 1–4 行，辨認「誰、對谁、做什麼」。第二次：點開語法，再回到歌詞確認。第三次：遮住中文與假名，說出意思；卡住就立即看解說。每次 5–10 分鐘即可。</p><p class="note">全向引導在這裡指「聲音、詞義、句構、意象、跨歌連結、自己的表達」六個角度；不是固定學習風格分類。文意保留詩的歧義，敘述者不直接等同歌手本人。</p></section>
<section id="map"><h2>一眼看見五條連結</h2><p>從任一節點進入歌詞，再沿語法連結回來；每條路都有具體文字依據。</p><div class="map">${themes.map(t=>`<article id="m-${t[0]}"><h3>${t[1]}</h3><p>${t[2]}</p><div class="links">${units.flatMap((u,i)=>u[4]===t[0]?[`<a href="#l-${first(i)}">${first(i)} · ${ruby(u[0].slice(0,0))}${u[1].replace(/……/g,'').slice(0,12)}</a>`]:[]).join('')}</div><div class="links">${t[3].split(' ').map(glink).join('')}</div></article>`).join('')}</div></section>
<section id="reading"><h2>逐句讀懂整首歌</h2><p class="muted">保留您提供的 44 行與重複段落。漢字上方標假名；點開解說看跨行關係。中文為本教材重新翻譯。</p>${lesson}</section>
<section id="grammar"><h2>語法拆解與原創例句</h2>${g.map(x=>`<article class="grammar" id="g-${x[0]}"><h3>${x[1]}</h3><p lang="ja">${ruby(x[2])}</p><p>${ruby(x[3])}</p><div class="example"><p lang="ja">${ruby(x[4])}</p><p>${x[5]}</p></div><div class="links">${related(x[0])}</div></article>`).join('')}</section>
<section id="words"><h2>單字與片語索引</h2><label for="q">搜尋日文、假名或中文</label><input id="q" type="search" placeholder="例如：繋、つな、相連"><p id="count" role="status">共 ${words.length} 個字詞</p><div class="vocab">${words.map((w,i)=>`<article class="word" id="w-${i+1}" data-search="${w.join(' ')}"><strong lang="ja">${ruby(w[0])}</strong><small>${w[2]}</small><p>${w[1]}</p><p>${ruby(w[3])}</p><div class="links">${glink(w[4])}</div></article>`).join('')}</div></section>
<section id="practice"><h2>回想 → 回饋 → 換情境</h2><p>先遮住答案回答，再展開核對。今天、隔天、第 3 天、第 7 天重答錯題，是方便自學的起點；依難度調整。</p>${[
 ['「天空放晴後」與「即使不放晴」有何不同？','晴[は]れたら：條件成立後；晴[は]れずとも：即使條件不成立仍繼續。這是全歌態度轉折。'],
 ['誰造成天空混濁？用主語、受詞、動詞回答。','雲[くも]が／空[そら]を／濁[にご]す。相對地，空[そら]が晴[は]れる是自動詞。'],
 ['為何「好像聽到了」不能直接翻成「確實聽到了」？','気[き]がする保留主觀感覺與不確定性。'],
 ['把「希望你來相見」拆成兩段。','逢[あ]いに＝移動目的；来[き]てほしい＝希望對方採取行動。'],
 ['「眼淚→種子→花」是語法事實還是詩意解讀？','語法以名詞並列建立比喻；「悲傷孕育新的希望」是合理解讀，不是唯一客觀答案。'],
 ['請用目的＋願望說「希望朋友來吃飯」。','友達[ともだち]にご飯[はん]を食[た]べに来[き]てほしい。'],
 ['請把「等雨停了去公園」說成新的句子。','雨[あめ]が止[や]んだら、公園[こうえん]へ行[い]こう。'],
 ['末行如何回應第一行？','開頭未充分表達的愛，在結尾變成可贈予的花；を／へ的省略結構再次出現。']
 ].map(x=>`<details><summary>${x[0]}</summary><p class="example">${ruby(x[1])}</p></details>`).join('')}<p>最後用三句自己的話描述：「曾留下的事物」「現在的感覺」「對明天的願望」。每句用一個本頁詞塊；不要依賴原歌詞的順序。</p></section>
<section id="connections"><h2>接回已學過的歌</h2><p>這些是已確認出現在歌曲目錄的連結。舊頁尚未設定本教材的段落錨點，因此連到各歌曲首頁，再以關鍵詞對照。</p><article class="grammar"><h3><a href="http://go.itigre.com/Kimi-Rock" rel="noopener noreferrer">${ruby('君[きみ]はロックを聴[き]かない')}</a></h3><p>${ruby('聴[き]く／聴[き]こえる')}：主動聽與聲音傳入；${ruby('恋[こい]に焦[こ]がれる')}：在兩首歌裡比較渴望的視角。</p><div class="links">${glink('kigasuru')} ${glink('ni')}</div></article><article class="grammar"><h3><a href="http://go.itigre.com/idontlikemornings" rel="noopener noreferrer">${ruby('朝[あさ]が嫌[きら]い')}</a></h3><p>${ruby('いてほしい／来[き]てほしい')}：同樣希望別人行動，一個重陪伴、一個重移動；${ruby('夢[ゆめ]')}在兩首歌如何指向未來？</p><div class="links">${glink('purpose')} ${glink('tekuru')}</div></article><article class="grammar"><h3><a href="http://go.itigre.com/marigold" rel="noopener noreferrer">マリーゴールド</a></h3><p>從花與天空的回憶意象，轉到本歌的種子與新花。找出各自的文字證據，再說共同點；不預設兩首歌講同一段故事。</p><div class="links">${glink('metaphor')} <a href="#m-sky">天空地圖</a></div></article></section>
<section id="sources"><h2>延伸資料與使用說明</h2><ul><li><a href="https://www.aimyong.net/feature/ainohana" rel="noreferrer">AIMYON 官方《愛の花》作品頁</a>：核對作品背景。</li><li><a href="https://www.aimyong.net/news/detail/2127" rel="noreferrer">官方 MV 公告</a>：由官方入口聆聽，對照讀音與句間停頓。</li><li><a href="https://www.nature.com/articles/s41599-024-03983-6" rel="noreferrer">提取與回饋研究（2024）</a>：本教材據此安排先回答、再核對；不宣稱特定節奏對所有人最佳。</li><li><a href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag" rel="noreferrer">Google 禁止索引說明</a>：本頁已在原始 HTML 加入 noindex。這不是登入保護，公開網址與儲存庫仍可被直接存取。</li></ul><p>學習用非官方整理，依使用者提供文字分析。假名以本文語境標示；詩意解讀與語法拆解分開呈現。全頁正文已直接存於 HTML，停用 JavaScript 仍可閱讀與跳轉。</p></section>
</main><footer><a href="https://event.itigre.com/jp50/aimyon/songs/">返回歌曲學習帳</a> · 私人學習整理 · 2026-09-07</footer><script>
const r=document.querySelector('#reading-toggle'),t=document.querySelector('#translation-toggle');
r.addEventListener('click',()=>{const on=document.body.classList.toggle('hidden-reading');r.setAttribute('aria-pressed',on);r.textContent=on?'顯示假名':'隱藏假名'});
t.addEventListener('click',()=>{const on=document.body.classList.toggle('hide-translations');t.setAttribute('aria-pressed',on);t.textContent=on?'顯示逐句中文':'隱藏逐句中文'});
document.querySelector('#q').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let n=0;document.querySelectorAll('.word').forEach(w=>{w.hidden=!w.dataset.search.toLowerCase().includes(q);if(!w.hidden)n++});document.querySelector('#count').textContent='顯示 '+n+' / ${words.length} 個字詞'});
</script></body></html>`;
writeFileSync(out,html.replace('第一次：读','第一次：讀').replace('對谁','對誰').replaceAll('已證实','已證實'),'utf8');
console.log(JSON.stringify({output:out,lines:order.length,unique:units.length,grammar:g.length,words:words.length}));
