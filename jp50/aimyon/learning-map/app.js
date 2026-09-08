(() => {
 'use strict';
 const KEY='aimyon-learning-map-v1', DAY=86400000;
 const cards=[...document.querySelectorAll('.concept')], ids=new Set(cards.map(c=>c.id));
 const labels={retry:'待複習',recognize:'能辨認',explain:'能說明',apply:'能造句'};
 const intervals={retry:1,recognize:2,explain:4,apply:7};
 let state={version:1,records:{},last:''};
 const $=id=>document.getElementById(id);
 const message=text=>{$('message').textContent=text;};
 function validate(data){
  if(!data||data.version!==1||!data.records||typeof data.records!=='object'||Array.isArray(data.records))throw Error('檔案不是支援的學習地圖進度格式。');
  const records={};
  for(const [id,r] of Object.entries(data.records)){
   if(!ids.has(id))continue;
   if(!r||typeof r!=='object'||typeof r.note!=='string'||r.note.length>2000||!Number.isSafeInteger(r.updated)||r.updated<0||r.updated>Date.now()+DAY||!(r.level===''||Object.hasOwn(labels,r.level))||!Number.isSafeInteger(r.reviewed)||r.reviewed<0||r.reviewed>r.updated||!Number.isSafeInteger(r.due)||r.due<0||r.due>r.reviewed+7*DAY||(r.level===''&&(r.reviewed!==0||r.due!==0))||(r.level!==''&&r.due!==r.reviewed+intervals[r.level]*DAY))throw Error('進度內容有無效欄位，未匯入。');
   records[id]={note:r.note,level:r.level,updated:r.updated,reviewed:r.reviewed,due:r.due};
  }
  return {version:1,records,last:ids.has(data.last)?data.last:''};
 }
 try{const saved=localStorage.getItem(KEY);if(saved)state=validate(JSON.parse(saved));}catch{message('無法讀取已存進度；目前可繼續學習並匯出備份。');}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{message('瀏覽器不允許儲存或空間不足。此回合進度仍在，請匯出備份。');return false;}}
 function record(id){return state.records[id]||{note:'',level:'',updated:0,reviewed:0,due:0};}
 function makeLink(id,prefix=''){const a=document.createElement('a');a.href='#'+id;a.textContent=prefix+$(id).querySelector('h3').textContent;return a;}
 function update(){
  const now=Date.now(), due=cards.filter(c=>record(c.id).due&&record(c.id).due<=now);
  for(const card of cards){const r=record(card.id);card.querySelector('[data-status]').textContent=r.level?labels[r.level]:'尚未練習';card.querySelector('[data-schedule]').textContent=r.level?`自評記錄：${new Date(r.reviewed).toLocaleDateString()}；${r.due<=now?'已到複習時間':'建議 '+new Date(r.due).toLocaleDateString()+' 再回想'}。可隨時重練。`:'';card.querySelectorAll('[data-rate]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rate===r.level)));}
  $('progress-summary').textContent=`已自評 ${cards.filter(c=>record(c.id).level).length} / ${cards.length} 個概念；目前 ${due.length} 個待複習。`;
  $('review-list').replaceChildren();
  if(!due.length){const li=document.createElement('li');li.textContent='目前沒有到期項目；可回想上次概念，或選一個新概念。';$('review-list').append(li);}
  due.sort((a,b)=>record(a.id).due-record(b.id).due).forEach(c=>{const li=document.createElement('li');li.append(makeLink(c.id));$('review-list').append(li);});
  const next=due[0]||cards.find(c=>!record(c.id).level)||cards[0];
  $('recommendation').replaceChildren(makeLink(next.id,due.length?'先複習：':'今天可以學：'));
  $('resume').replaceChildren();if(state.last)$('resume').append(makeLink(state.last,'接續上次：'));
 }
 function filter(){const q=$('search').value.trim().toLowerCase(),s=$('song-filter').value;let count=0;for(const c of cards){c.hidden=!(c.textContent.toLowerCase().includes(q)&&(!s||c.dataset.songs.split(' ').includes(s)));if(!c.hidden)count++;}document.querySelectorAll('.route-section').forEach(r=>r.hidden=![...r.querySelectorAll('.concept')].some(c=>!c.hidden));$('filter-count').textContent=`顯示 ${count} / ${cards.length} 個概念${count?'':'；請換個關鍵字或清除篩選。'}`;}
 function clear(){ $('search').value='';$('song-filter').value='';filter();}
 function navigate(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=$(id);if(!target)return;if(ids.has(id)||target.classList.contains('route-section')){clear();if(ids.has(id)){state.last=id;save();update();}target.scrollIntoView();}}
 for(const card of cards){
  const input=card.querySelector('textarea');input.value=record(card.id).note;
  input.addEventListener('input',()=>{state.records[card.id]={...record(card.id),note:input.value,updated:Date.now()};state.last=card.id;save();});
  card.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>{const now=Date.now(),level=b.dataset.rate;state.records[card.id]={...record(card.id),level,reviewed:now,due:now+intervals[level]*DAY,updated:now};state.last=card.id;const stored=save();update();if(stored)message('已記錄自評與下次回想日期。');}));
  card.querySelector('.recall').addEventListener('toggle',e=>{if(e.target.open){card.querySelector('.study').open=false;card.querySelector('.answer').open=false;state.last=card.id;save();update();}});
 }
 $('search').addEventListener('input',filter);$('song-filter').addEventListener('change',filter);$('clear-filter').addEventListener('click',clear);
 $('reading-toggle').addEventListener('change',e=>document.body.classList.toggle('hide-readings',!e.target.checked));
 $('export').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='AIMYON-learning-progress.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);message('已送出進度下載，請保留 JSON 檔以便換裝置匯入。');});
 $('import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>200000)throw Error('檔案過大；請選擇學習地圖匯出的 JSON。');const data=validate(JSON.parse(await file.text()));let count=0;for(const [id,r] of Object.entries(data.records)){if(r.updated>record(id).updated){state.records[id]=r;count++;}}if(!state.last)state.last=data.last;const stored=save();cards.forEach(c=>c.querySelector('textarea').value=record(c.id).note);update();if(stored)message(`已合併 ${count} 個較新的概念紀錄。`);}catch(err){message('匯入失敗：'+err.message);}finally{e.target.value='';}});
 window.addEventListener('hashchange',navigate);
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.hash===location.hash)navigate();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
 document.documentElement.classList.add('enhanced');update();filter();navigate();
})();
