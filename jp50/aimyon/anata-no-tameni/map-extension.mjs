export function extendAnataNoTameni(songs,concepts,c){
 songs.push({id:'anata-no-tameni',title:'あなたのために',path:'anata-no-tameni',color:'#8a5b68',lead:'ために、過去修飾、口語縮約、意向、讓步與視角轉換。'});
 for(const [id,anchor] of [
  ['noun-modifier','g-noun-modifier'],
  ['memory-time','g-teta'],
  ['casual','g-teta'],
  ['condition','g-temo'],
  ['te-shimau','g-shimau'],
  ['passive','g-passive'],
  ['tai','g-narerutai'],
  ['metaphor','g-mitai'],
  ['noni','g-noni'],
  ['evidence','g-perspective']
 ]){
  const concept=concepts.find(x=>x.id===id);if(!concept)throw Error('Missing concept '+id);
  if(!concept.refs.some(r=>r[0]==='anata-no-tameni'&&r[1]===anchor)) concept.refs.push(['anata-no-tameni',anchor]);
 }
 concepts.push(
  c('tame-ni','daily','40｜Nのために：到底是為了誰？','ために一定只表示目的嗎？','Nのために可表受益者、目的或原因。先找「誰／什麼」是ため前面的名詞，再看後項行動由誰執行。當受益者從他人切換到自己時，敘事視角也會跟著改變。','自分{じぶん}のために休{やす}む。','為了自己休息。','用家族與自分各造一句 Nのために，說明兩句受益者如何不同。','家族{かぞく}のために作{つく}る／自分{じぶん}のために休{やす}む。ため前面的名詞不同，受益視角也不同。',[['anata-no-tameni','g-tameni'],['ai-no-hana','g-purpose']],[['before','noun-modifier'],['next','evidence']]),
  c('tabini','change','41｜Vるたびに：每次都再次發生','たびに是在說一次性的事件嗎？','辭書形＋たびに表示每當前項發生，後項就反覆出現。和「～とき」相比，たびに更強調重複觸發。','この曲{きょく}を聴{き}くたびに思{おも}い出{だ}す。','每次聽這首歌都會想起。','把「每次下雨都會想喝熱茶」說成日文骨架。','雨{あめ}が降{ふ}るたびに、温{あたた}かいお茶{ちゃ}が飲{の}みたくなる。',[['anata-no-tameni','g-tabini'],['harunohi','g-toki']],[['before','memory-time'],['next','state']]),
  c('volitional-think','wishes','42｜意向形＋と思う：正在形成的打算','「～たい」和「～ようと思う」都能直接當成同一種願望嗎？','たい表想做；意向形＋と思う更像「我打算／我想要決定去做」。五段動詞把う段改成お段＋う；一段動詞去る＋よう。','週末{しゅうまつ}は早{はや}く寝{ね}ようと思{おも}う。','週末打算早點睡。','把「切る」與「行く」變成意向形＋と思う。','切{き}ろうと思{おも}う／行{い}こうと思{おも}う。',[['anata-no-tameni','g-volitional-think'],['ichi-ni-tsuite','g-invitation']],[['before','tai'],['contrast','invitation']]),
  c('shika-nai','perspective','43｜しか～ない：只剩這個選項','しか可以單獨和肯定句搭配嗎？','しか必須和否定形式呼應，表示「除了……之外沒有／只有……」。如果前面是引用內容，仍要先判斷と的引用範圍，再看しか～ない。','一{ひと}つしか残{のこ}っていない。','只剩一個。','把「只有星期日有空」改成しか～ない。','日曜日{にちようび}しか空{あ}いていない。',[['anata-no-tameni','g-shika-nai'],['3636','g-question']],[['before','noni'],['next','evidence']])
 );
}
