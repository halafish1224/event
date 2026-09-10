export function extendHarunohi(songs,concepts,c){
 songs.push({id:'harunohi',title:'ハルノヒ',path:'harunohi',color:'#426b59'});
 for(const [id,anchor] of [['state','teiru'],['change-state','teiku'],['self-question','kana'],['noun-modifier','modifier'],['memory-time','toki'],['metaphor','poetic'],['condition','ba'],['crossline','modifier'],['te-hoshii','hoshii'],['casual','nakya'],['invitation','teiku'],['gentle','negative-ok'],['kureru','kureru'],['te-iku','teiku'],['subject','particle'],['kigasuru','feeling'],['evidence','poetic']]){
  const concept=concepts.find(x=>x.id===id);if(!concept)throw Error('Missing concept '+id);
  concept.refs.push(['harunohi','g-'+anchor]);
 }
 concepts.push(
 c('no-need','voice','37｜～ないでいい：不必做也可以','不用著急，等於不准著急嗎？','ないでいい在本曲表示解除必要，近於なくてもいい；ないで是請別做，てはいけない是禁止。先辨溝通目的，再選語氣。','急{いそ}がなくてもいいよ。','不用趕也沒關係喔。','把不用來與不准來的語意分開。','来{こ}なくてもいい是可以不來；来{き}てはいけない是不允許來。免除必要與禁止不同。',[['harunohi','g-negative-ok'],['sketch','g-permission']],[['before','gentle'],['contrast','permission'],['contrast','necessity']]),
 c('necessity','voice','38｜～じゃなきゃダメ：非你不可','非你不可，是要求你做某個動作嗎？','君じゃなきゃダメ還原為君ではなければダメ，否定條件針對人物；歩かなきゃダメ才是否定走路這個行動。なきゃよかった又是後悔。','この鍵{かぎ}じゃなきゃダメだ。','非這把鑰匙不可。','分開君じゃなきゃダメ與君が歩かなきゃダメ。','前者限定人選必須是你；後者要求你必須走。先找否定的是名詞身分還是動作。',[['harunohi','g-nakya'],['rhythm64','g-nakya']],[['before','condition'],['contrast','regret'],['contrast','no-need']]),
 c('excess-formation','perspective','39｜～すぎる：甘い與甘える','甘すぎて與甘えすぎて只差發音嗎？','甘い是い形容詞，去い＋すぎる；甘える是一段動詞，ます形去ます＋すぎる。原歌詞為甘すぎて，不能改教成甘える的活用。','自分{じぶん}に甘{あま}すぎる。人{ひと}に甘{あま}えすぎる。','對自己太寬鬆。過度依賴別人。','還原怯えすぎた，並與甘すぎて比較接法。','怯{おび}える→怯{おび}え＋すぎた，是動詞接法；甘{あま}い→甘{あま}＋すぎて，是形容詞接法。',[['harunohi','g-sugiru'],['aini-ikunoni','g-too']],[['before','noun-modifier'],['next','evidence']])
 );
}
