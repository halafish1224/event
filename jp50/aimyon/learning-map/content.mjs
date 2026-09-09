// Curated concepts: keep lesson content and links separate from learner progress.
export const songs = [
  ['kimi-rock','君はロックを聴かない','KimiWaRokkuWoKikanai','#f39c12'],
  ['morning','朝が嫌い','idontlikemornings','#3498db'],
  ['marigold','マリーゴールド','marigold','#e67e22'],
  ['ai-no-hana','愛の花','ai-no-hana','#225c48'],
  ['ichi-ni-tsuite','いちについて','ichi-ni-tsuite','#d94a36'],
  ['ring-ding','RING DING','ring-ding','#5546a3'],
  ['rhythm64','リズム64','rhythm64','#146c75'],
  ['3636','3636','3636','#865026'],
  ['miniskirt-highlight','ミニスカートとハイライト','miniskirt-highlight','#96344f'],
  ['hikarimono','ひかりもの','hikarimono','#9a4b1d'],
  ['sketch','スケッチ','sketch','#276c82'],
  ['hadaka-no-kokoro','裸の心','hadaka-no-kokoro','#8c465b']
].map(([id,title,path,color])=>({id,title,path,color}));
export const routes = [
  ['daily','日常與心情','從每天的生活，說出狀態與變化。'],
  ['scenery','景色與回憶','讀懂景物，辨認回憶與比喻。'],
  ['wishes','願望與靠近','分清誰想做、希望誰做，以及尚未實現的願望。'],
  ['voice','邀請與說話分寸','理解口語，也練習照顧聽者感受的表達。'],
  ['change','選擇與持續改變','沿著時間方向，找出動作與感受的變化。'],
  ['perspective','言外之意與視角','分開文本事實、說話者推測與自己的解讀。']
].map(([id,title,description])=>({id,title,description}));
const c=(id,route,title,question,explanation,example,translation,task,answer,refs,links)=>({id,route,title,question,explanation,example,translation,task,answer,refs,links});
// Japanese readings use 漢字{かな}; build converts these to native ruby.
export const concepts = [
 c('state','daily','01｜～ている：動作還是狀態？','「正在做」能翻譯所有的～ている嗎？','～ている可以表示進行中的動作，也可以表示變化後留下的狀態；要搭配動詞與上下文判讀。先熟悉て形，再觀察動作是否仍持續。','扉{とびら}が閉{し}まっている。','門關著。','用「門關著」說明：此刻一定有人正在關門嗎？','不一定。這裡描述關門後的結果狀態，不是關門動作仍在進行。',[['3636','g-teiru'],['ichi-ni-tsuite','g-state']],[['contrast','change-state'],['next','te-shimau']]),
 c('change-state','daily','02｜～になる：變成某種狀態','「很開心」和「變開心了」差在哪裡？','い形容詞去い加くなる；な形容詞與名詞加になる。嫌になる描述變得厭煩，並不是原本就討厭的唯一說法。','楽{たの}しくなる。静{しず}かになる。','變得開心。變得安靜。','把「寒い」改成「變冷了」。','寒{さむ}くなった。い形容詞去い，加くなった。',[['3636','g-change'],['ring-ding','g-change']],[['before','state'],['contrast','te-shimau']]),
 c('te-shimau','daily','03｜～てしまう：完成與遺憾','～てしまう一定表示後悔嗎？','它可表示做完，也可帶有遺憾或非預期的感受。歌詞的情緒須從上下文判斷，不能看到句型就一律翻成「不小心」。','忘{わす}れてしまった。','忘掉了；是否帶遺憾要看情境。','把「寝てしまう」換成常見口語，並說明縮約關係。','寝{ね}ちゃう。～てしまう常縮成～ちゃう；～でしまう則是～じゃう。',[['3636','g-shimau'],['ring-ding','g-chau']],[['before','state'],['same','casual']]),
 c('self-question','daily','04｜～の？／～かな：問你，也問自己','句尾是問號，就一定在向對方求答案嗎？','～の？可要求說明；～かな常帶自問與不確定。歌詞裡反覆提問，可能呈現說話者的焦慮，不等於對方已承認那些理由。','嫌{いや}になったのかな。','是不是變得厭煩了呢。','「他一定厭煩了」可以當作這句的確定事實嗎？','不可以。～かな保留疑問；這是說話者猜想，不是對方的證詞。',[['3636','g-question'],['morning','words']],[['next','rashii'],['contrast','evidence']]),
 c('noun-modifier','scenery','05｜修飾名詞：先找到中心詞','遇到很長的日文名詞片語，你先找哪一部分？','先找最後的中心名詞，再往前讀修飾內容。普通形子句可以直接修飾名詞，通常不需另加の。','昨日{きのう}見{み}た花{はな}。','昨天看見的花。','這個片語的中心是「昨天」、 「看見」，還是「花」？','中心是花{はな}。昨日{きのう}見{み}た描述是哪一朵／哪些花。',[['ai-no-hana','g-modifier'],['miniskirt-highlight','g-modifier']],[['next','metaphor'],['same','subject']]),
 c('memory-time','scenery','06｜過去與回憶：～た／～ていた','「做了」與「當時正在做／處於某狀態」如何區別？','～た定位過去事件；～ていた可描述過去進行或當時持續的狀態。回憶的時間框架要連同前後句閱讀。','花{はな}が揺{ゆ}れていた。','花當時搖曳著。','把例句改成描述現在的搖曳。','花{はな}が揺{ゆ}れている。變更的是時間框架，不必把每個～ていた都解釋成習慣。',[['marigold','vocabulary'],['3636','g-past']],[['before','state'],['next','te-kita']]),
 c('metaphor','scenery','07｜比喻：相似不等於相同','歌裡把眼淚連向花的種子，能直接當成字面事實嗎？','比喻把某個特徵借給另一事物。先指出字面詞語，再提出有文本依據的解讀；同一意象可以有多種合理讀法。','涙{なみだ}と種{たね}。','眼淚與種子：留意兩者被如何連結。','用一句話說明這組意象，再指出這是解讀還是事實。','例如：悲傷可能成為未來新生的起點。這是由「種子」提出的意象解讀，不是歌詞唯一標準答案。',[['ai-no-hana','g-metaphor'],['marigold','vocabulary']],[['before','noun-modifier'],['image','box-image']]),
 c('condition','scenery','08｜～たら／～ても：條件與讓步','「放晴的話」與「即使不放晴」承諾相同嗎？','～たら提出條件；～ても表示即使某情況成立，後項仍成立。先辨認前後項的邏輯，再翻譯情緒。','晴{は}れたら。晴{は}れなくても。','如果放晴。即使不放晴。','哪一種說法表示下雨也不改變後面的安排？','晴{は}れなくても。它容許「不放晴」成立，安排仍然有效。',[['ai-no-hana','g-tara'],['ring-ding','g-weather']],[['next','wish'],['contrast','noni']]),
 c('tai','wishes','09｜～たい：自己想做','誰是「想碰觸」的人？','動詞ます形去ます，加たい，表示想做某動作。直接陳述願望時通常以說話者為中心；描述他人的內心需要相應語境。','触{ふ}れたい。','想碰觸。','用「聴く」表達「想聽」。','聴{き}きたい。先變成聴{き}きます，再以たい取代ます。',[['miniskirt-highlight','g-want'],['ichi-ni-tsuite','g-takute']],[['next','te-hoshii'],['contrast','wish']]),
 c('te-hoshii','wishes','10｜～てほしい：希望別人做','「想去」和「希望你來」的行動者相同嗎？','Vてほしい表達希望某人做某動作。需要明示對象時，常用「人に」。跟表達自身行動願望的Vたい分開。','逢{あ}いに来{き}てほしい。','希望你來相見。','請說明「話したい」與「話してほしい」的差別。','話{はな}したい：我想說。話{はな}してほしい：希望對方說；省略的人物需依上下文補足。',[['ai-no-hana','g-purpose'],['kimi-rock','words']],[['before','tai'],['next','let-me']]),
 c('let-me','wishes','11｜使役＋てほしい：請讓我做','言ってほしい與言わせてほしい，是同一個人說話嗎？','使役形加てほしい，在此可表達希望對方允許自己做。不要漏讀わせ：言う→言わせる→言わせてほしい。','言{い}わせてほしい。','希望你讓我說。','把「希望你說」和「希望你讓我說」分別說出來。','言{い}ってほしい／言{い}わせてほしい。後者加入了「讓／允許」的角色關係。',[['ring-ding','g-let'],['ai-no-hana','g-purpose']],[['before','te-hoshii'],['contrast','gentle']]),
 c('wish','wishes','12｜～だったらいいのに：要是……就好了','希望自己是某人的戀人，能證明現實已經如此嗎？','名詞＋だったらいいのに，常表達與現狀有落差的願望。這裡的のに含未如願的感嘆，不需硬補完整後半句。','俺{おれ}だったらいいのに。','要是是我就好了。','將「願望」改成「已確認的事實」，是否仍能保留だったらいいのに？','不能當作相同意思。這個句型將內容放在假設願望中，並未確認其為現實。',[['miniskirt-highlight','g-wish'],['ai-no-hana','g-tara']],[['before','condition'],['contrast','rashii']]),
 c('casual','voice','13｜口語縮約：先還原再理解','～てる和～ちゃう還原後相同嗎？','～てる常來自～ている；～ちゃう來自～てしまう。先還原，再判斷時間、狀態與情緒。縮約本身不等於粗魯。','寝{ね}ちゃう。見{み}てる。','睡了／睡掉了。正在看／看著。','將兩個例子還原成未縮約的形式。','寝{ね}てしまう。見{み}ている。兩者來自不同結構，不能只把它們都當作現在式。',[['ring-ding','g-chau'],['3636','g-short']],[['before','te-shimau'],['same','state']]),
 c('invitation','voice','14｜意向形：一起做吧','～しよう與～しろ，聽起來一樣嗎？','意向形可表決心或邀請；在對話中常用來提出一起行動。命令形則直接要求對方做，兩者關係與語氣不同。','話{はなし}をしよう。','一起聊聊吧。','把命令「行け」改成一起行動的邀請。','一緒{いっしょ}に行{い}こう。行{い}こう是意向形；要更禮貌可說行{い}きませんか。',[['ichi-ni-tsuite','g-invitation'],['ring-ding','g-choice']],[['next','gentle'],['same','te-iku']]),
 c('gentle','voice','15｜語氣轉換：理解不等於照搬','歌詞裡親密的直話，適合對任何人說嗎？','先辨認關係與語境，再選適合自己的表達。命令、責備或威嚇式玩笑不是普遍適用的安慰方式；可以保留關心，改成邀請與選擇。','話{はな}したくなったら、聞{き}くよ。','等你想說時，我願意聽。','想關心朋友，又不逼他立刻說明，可以怎麼說？','可用例句，或「無理{むり}に話{はな}さなくてもいいよ」。提供選擇，不把對方的沉默當作錯誤。',[['ring-ding','tone'],['kimi-rock','words']],[['before','invitation'],['contrast','let-me']]),
 c('noni','voice','16｜～のに／～くせに：落差與責備','「明明……卻……」都一樣溫和嗎？','～のに常呈現與預期不同的結果；～くせに通常更帶責備或揶揄。仍須看語境，不能把兩者視為可任意互換。','知{し}っているのに。','明明知道，卻……','若不想指責朋友，可以直接把のに改成くせに嗎？','不建議。くせに往往加重責備；可改述自己的感受，或提出不帶預設的問題。',[['rhythm64','g-noni'],['ring-ding','g-kuseni']],[['before','condition'],['contrast','gentle']]),
 c('te-kita','change','17｜～てきた：一路到現在','選擇一路累積至今，要往哪個時間方向看？','～てきた可表示過去至今的歷程，也可表示做完某事再來／留下某物而來。不能把所有例子都套成「一直」。','選{えら}んできた。','一路選擇走來。','為什麼不能把「置いてきた」機械地翻成「一直放著」？','置{お}いてきた可表示把東西留在某處後來到此處；需要依動詞與情境判斷移動或時間用法。',[['rhythm64','g-tekita'],['ai-no-hana','g-tekuru']],[['before','memory-time'],['contrast','te-iku']]),
 c('te-iku','change','18｜～ていく：往後與離開','ていく一定表示走路離開嗎？','可表示空間上遠離，也可表示從現在往後延續或變化。歌詞中的～てく有時是～ていく的縮約，須還原判斷。','生{い}きていく。','繼續活下去。','將這句和「生きてきた」作時間方向比較。','生{い}きていく看向往後；生{い}きてきた回看至今的歷程。不是只差禮貌程度。',[['ichi-ni-tsuite','g-teiku'],['rhythm64','g-teiku']],[['before','state'],['contrast','te-kita']]),
 c('passive','change','19｜被動：誰受到動作？','言われて裡面，誰說、誰聽到？','被動形讓受到動作的人或事物成為描述中心。找出被省略的主體與動作者；被動不必然表示受害，情緒由語境決定。','友達{ともだち}に言{い}われた。','被朋友這樣說了。','例句中朋友是說話者，還是被說的人？','朋友是動作者；被說的人在這句省略，常需從上下文補足。',[['rhythm64','g-passive'],['ichi-ni-tsuite','g-passive']],[['next','subject'],['contrast','let-me']]),
 c('subject','change','20｜找主體：誰改變了什麼？','看到が與を，你能圈出動作者和對象嗎？','先找述語，再找主體與受詞。自動詞描述事物發生變化；他動詞描述對某物施加動作。省略主語時不要憑感覺一律補「我」。','扉{とびら}が開{あ}く。扉{とびら}を開{あ}ける。','門開了。把門打開。','「開かない」能直接等同「開けられない」嗎？','不能。開{あ}かない表示門不開；開{あ}けられない表示某人無法打開。結果可能相近，句構與視角不同。',[['3636','g-open'],['ai-no-hana','g-transitive']],[['before','noun-modifier'],['next','box-image']]),
 c('rashii','perspective','21｜～らしい：推測與典型性','らしい每次都表示「聽說」嗎？','句尾的～らしい可根據消息或跡象推測；名詞＋らしい也能表示典型特徵。人間らしさ的らしさ是名詞化，重點在人性特質。','彼{かれ}は来{こ}ないらしい。','他似乎不來。','這句可以當作已由本人確認的事實嗎？','不能只靠らしい確認。需進一步知道消息來源；說話者是在表達間接判斷。',[['miniskirt-highlight','g-rashii'],['3636','g-rashii']],[['contrast','wish'],['next','evidence']]),
 c('kigasuru','perspective','22｜～気がする：主觀感覺','覺得聽見聲音，就一定真的有人說話嗎？','普通形＋気がする表達主觀感覺或不確定判斷。聴こえる描述聲音可被感知，與有意去聽的聴く不同。','声{こえ}が聴{き}こえた気{き}がする。','感覺好像聽見了聲音。','哪一部分讓這個敘述保留不確定性？','気{き}がする。它把前面的內容框為主觀感覺，不能移除後仍宣稱語意完全相同。',[['ai-no-hana','g-kigasuru'],['miniskirt-highlight','g-rashii']],[['same','rashii'],['next','evidence']]),
 c('box-image','perspective','23｜意象對讀：房間、盒子與心','同樣是「關起來」，歌中關的是哪一種東西？','先辨認字面容器、被封存的內容，以及關閉者。再比較門與心的映照。不同歌曲的房間意象可以聯想，但不代表作者在寫同一個故事。','扉{とびら}と心{こころ}。','門與心：比較字面動作與情感解讀。','解讀「心關起來」時，應列出什麼依據？','指出實際詞語、誰關閉、所指對象，再提出情感解讀。不能僅憑同一個「房間」就認定人物相同。',[['3636','map'],['morning','words']],[['before','subject'],['image','metaphor']]),
 c('evidence','perspective','24｜整合：事實、推測、我的解讀','你能將一句心得分成三種證據層次嗎？','第一層是文本明示；第二層是角色的推測與願望；第三層是讀者的意象解讀。文學閱讀容許多義，但語法辨識仍需依句構。','大丈夫{だいじょうぶ}だって。','說著／表示「沒問題」：要辨認引用內容與上下文。','角色表達沒問題，就能推論整段毫無矛盾或不安嗎？','不能。先確認引用的是誰的聲音，再比對前後段的變化。角色表達與整體文本解讀應分開。',[['rhythm64','g-quote'],['miniskirt-highlight','g-wish']],[['before','rashii'],['same','kigasuru']])
];
// Stable existing IDs preserve all previous learner records when songs expand.
for (const [id,anchor] of [['te-kita','g-tekita'],['condition','g-nara'],['tai','g-shimau'],['noun-modifier','g-modifier'],['metaphor','compare'],['gentle','g-request'],['passive','g-passive'],['self-question','g-kana']]) {
 concepts.find(c=>c.id===id).refs.push(['hikarimono',anchor]);
}
concepts.push(
 c('zuni','voice','25｜～ずに：不做／未做某事','知らずに和晴れずとも都只有「不」的意思嗎？','～ずに連接未做前項的情況；～ずとも表即使不做的讓步。知らずに可是不知情，不一定是故意不理會。','理由{りゆう}を知{し}らずに話{はな}した。','在不知道理由的情況下說了。','將知らずに換成ないで；再說明ずとも多了什麼關係。','知{し}らないで。ずとも多了「即使如此，後項仍成立」的讓步關係。',[['hikarimono','g-zuni'],['ai-no-hana','g-zutomo']],[['before','condition'],['contrast','gentle']]),
 c('sou-evidence','perspective','26｜～そう：樣態還是傳聞？','泣きそう和泣くそうだ，資訊來源一樣嗎？','ます形去ます＋そう表樣態或快要發生；普通形＋そうだ表傳聞。なれそう還包含可能形，需先還原なれる。','泣{な}きそうだ。泣{な}くそうだ。','快哭了。聽說會哭。','宣告不哭，後來又快哭了，能直接判斷角色說謊嗎？','不能。決心與當下感受不同；先辨識句型，再依前後文解讀，不能僅以情緒變化斷定說謊。',[['hikarimono','g-sou'],['miniskirt-highlight','g-sou']],[['before','rashii'],['next','evidence']])
);
for(const [id,anchor] of [['kigasuru','g-feeling'],['casual','g-chau'],['passive','g-passive'],['noun-modifier','g-modifier'],['condition','g-tara'],['metaphor','compare']])concepts.find(c=>c.id===id).refs.push(['sketch',anchor]);
concepts.push(
 c('kureru','voice','27｜～てくれる：誰讓我受惠？','陪伴的行動是誰做的？','てくれる將他人的行動呈現為說話者或其所關心者受惠；てあげる常從給予方描述。先找主體與受惠者，再翻譯。','友達{ともだち}が待{ま}っていてくれた。','朋友等著我。','這句是我等朋友，還是朋友等我？','朋友等我；友達が標行動者，くれる呈現我受到這份好意。',[['sketch','g-kureru'],['ring-ding','g-ageru']],[['before','state'],['contrast','te-hoshii']]),
 c('permission','wishes','28｜～てもいい：願望還是許可？','想說與可以說是同一件事嗎？','てもいい詢問或給予許可；たい表願望，てほしい希望對方行動。即使很想，也不代表已獲允許。','ここで話{はな}してもいいですか。','可以在這裡說嗎？','把「我想說」和「我可以說嗎」分別說出來。','話{はな}したい。話{はな}してもいいですか。願望與許可是不同訊息。',[['sketch','g-permission'],['miniskirt-highlight','g-want']],[['before','tai'],['contrast','te-hoshii']])
);
for(const [id,anchor] of [['let-me','g-causative'],['te-kita','g-tekita'],['state','g-state'],['metaphor','compare'],['tai','g-request'],['rashii','g-mitai']])concepts.find(c=>c.id===id).refs.push(['hadaka-no-kokoro',anchor]);
concepts.push(
 c('prayer','wishes','29｜～ますように：祈願','祈願代表結果確定嗎？','ますように表示祈願，不是未來預測；與希望對方做事的てほしい分開。','実{みの}りますように。','願能有成果。','改成願明天放晴，並說明是否保證天氣。','明日{あした}は晴{は}れますように。這是希望，不是保證。',[['hadaka-no-kokoro','g-prayer'],['ai-no-hana','g-purpose']],[['before','wish'],['contrast','te-hoshii']]),
 c('regret','change','30｜～なきゃよかった：後悔','しなきゃ每次都是必須做嗎？','なきゃよかった還原為なければよかった，表早知道不做就好了；なきゃ（いけない）才常表示義務。必須讀到後項。','急{いそ}がなければよかった。','早知道別著急就好了。','用自己的話區別しなきゃよかった與しなきゃ（いけない）。','前者後悔已做；後者表必須做。不能只背なきゃ的單一中文。',[['hadaka-no-kokoro','g-regret'],['rhythm64','g-nakya']],[['before','condition'],['contrast','evidence']])
);
// September screenshot collection; stable IDs keep existing progress.
songs.push({"id":"sora-no-aosa","title":"空の青さを知る人よ","color":"#295e86","lead":"曾經不喜歡的事，如今成為尋找對方的線索。","path":"sora-no-aosa"},{"id":"konya-konomama","title":"今夜このまま","color":"#814c39","lead":"說不出口的心意，在夜裡尋找暫停的地方。","path":"konya-konomama"},{"id":"futaba","title":"双葉","color":"#3f704b","lead":"在成長與告別之間，把祝福留給未來的你。","path":"futaba"},{"id":"aini-ikunoni","title":"会いに行くのに","color":"#755789","lead":"未交出的物件，與仍想前往的心。","path":"aini-ikunoni"},{"id":"yakou-bus","title":"夜行バス","color":"#806338","lead":"漫長車程裡，帶著害怕仍然追夢。","path":"yakou-bus"},{"id":"sakura-ga-furu-yoru-wa","title":"桜が降る夜は","color":"#92516e","lead":"花落的夜裡，想見你，卻仍在想該不該說。","path":"sakura-ga-furu-yoru-wa"});

for(const [id,refs] of [
 ['noni',[['sora-no-aosa','g-contrast'],['aini-ikunoni','g-contrast']]],
 ['passive',[['sora-no-aosa','g-passive'],['konya-konomama','g-passive'],['sakura-ga-furu-yoru-wa','g-passive']]],
 ['condition',[['futaba','g-condition'],['aini-ikunoni','g-condition']]],
 ['gentle',[['futaba','g-request']]],
 ['state',[['yakou-bus','g-state']]],
 ['metaphor',[['konya-konomama','g-metaphor'],['sakura-ga-furu-yoru-wa','g-metaphor']]],
 ['te-iku',[['sora-no-aosa','g-teiku'],['konya-konomama','g-teiku']]]
])concepts.find(c=>c.id===id).refs.push(...refs);
concepts.push(
 c('missed-chance','change','31｜～そびれる：沒做成的事','沒交出，就一定是忘記嗎？','ます形去ます＋そびれる常表示錯過機會；損ねる可失敗或沒做成，忘れる則是忘記。','渡{わた}しそびれた。','沒能交出去。','比較渡しそびれた與渡し忘れた。','前者錯過機會；後者忘記。不應自動互換原因。',[['aini-ikunoni','g-failure'],['sketch','g-compound']],[['before','memory-time'],['contrast','te-shimau']]),
 c('mama','daily','32｜～まま：狀態沒有改變','維持原狀一定是故意嗎？','た形＋まま描述某狀態持續；このまま是照現在這樣。意圖需另外判斷。','濡{ぬ}れたまま。','仍然濕著。','如果衣服仍濕著，能否直接斷言故意不換？','不能，まま只提供狀態，未提供動機。',[['aini-ikunoni','g-mama'],['konya-konomama','g-mama']],[['before','state'],['contrast','change-state']]),
 c('beki','perspective','33｜～べきなのか：應不應該','問該不該，代表已經決定嗎？','べき表應然；なのか表示正在判斷，不等於直接下命令。與てもいい的許可分開。','今{いま}話{はな}すべきなのか。','現在該說嗎？','用中文分開應該說與可以說。','前者判斷適當性，後者詢問許可。',[['sakura-ga-furu-yoru-wa','g-beki'],['sketch','g-permission']],[['before','permission'],['contrast','wish']]),
 c('benefit-direction','voice','34｜てあげる／てくれる：交換視角','同樣是幫助，誰在看這個行動？','てあげる從給予方描述，てくれる從受惠一方描述。先圈行動者再說受惠者。','友達{ともだち}が聞{き}いてくれた。','朋友聽我說。','這句是我聽朋友，還是朋友聽我？','朋友是行動者，我是受惠者。',[['futaba','g-kureru'],['konya-konomama','g-kureru']],[['before','kureru'],['contrast','te-hoshii']]),
 c('time-negative','daily','35｜まだ…ない：還沒有','還沒一小時，是永遠不會過一小時嗎？','まだ…ない以目前為止為時間框架；之後可能改變。注意量詞讀音與單程／來回差異。','まだ着{つ}いていない。','還沒到。','將「還沒到」和「不打算去」分開說明。','前者目前狀態，後者意圖；不能混為一談。',[['yakou-bus','g-time'],['sakura-ga-furu-yoru-wa','g-time']],[['before','state'],['next','memory-time']]),
 c('crossline','scenery','36｜跨行的修飾：接到中心詞','換行就表示句子結束嗎？','の、が、を或連用形常跨行接續。先讀述語與中心名詞，再安排中文語序。','君{きみ}が知{し}っている空{そら}。','你所知道的天空。','中心名詞是君還是空？','空是中心；君が知っている是修飾子句。',[['sora-no-aosa','g-modifier'],['yakou-bus','g-nominal']],[['before','noun-modifier'],['next','evidence']])
);
