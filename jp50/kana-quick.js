(()=>{
'use strict';
const s=document.currentScript;
const base=s&&s.src?new URL('./',s.src):new URL('/jp50/',location.origin);
if(!document.querySelector('[data-kana-quick-style]')){
  const l=document.createElement('link');
  l.rel='stylesheet';l.href=new URL('kana-quick.css',base).href;l.dataset.kanaQuickStyle='1';document.head.appendChild(l);
}
const rows=[
['あ行','あ ア a|い イ i|う ウ u|え エ e|お オ o'],
['か行','か カ ka|き キ ki|く ク ku|け ケ ke|こ コ ko'],
['さ行','さ サ sa|し シ shi|す ス su|せ セ se|そ ソ so'],
['た行','た タ ta|ち チ chi|つ ツ tsu|て テ te|と ト to'],
['な行','な ナ na|に ニ ni|ぬ ヌ nu|ね ネ ne|の ノ no'],
['は行','は ハ ha|ひ ヒ hi|ふ フ fu|へ ヘ he|ほ ホ ho'],
['ま行','ま マ ma|み ミ mi|む ム mu|め メ me|も モ mo'],
['や行','や ヤ ya| |ゆ ユ yu| |よ ヨ yo'],
['ら行','ら ラ ra|り リ ri|る ル ru|れ レ re|ろ ロ ro'],
['わ行','わ ワ wa| |を ヲ wo| |ん ン n']
];
const focus={
'lesson-01.html':'こ,ろ,き,も,お,う,つ,た',
'lesson-02.html':'す,き,こ,い,あ,れ',
'lesson-03.html':'み,え,ら,れ,つ,め',
'lesson-04.html':'き,こ,え,い,つ,た',
'lesson-05.html':'こ,ろ,き,も,み,え,つ,た',
'lesson_01':'こ,ろ,き,も,お,う,つ,た',
'lesson_02':'す,き,こ,い,あ,れ',
'lesson_03':'み,え,ら,れ,つ,め',
'lesson_04':'き,こ,え,い,つ,た',
'lesson_05':'こ,ろ,き,も,み,え,つ,た'
};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function table(){return '<div class="kq-table-wrap"><table><tbody>'+rows.map(r=>'<tr><th>'+r[0]+'</th>'+r[1].split('|').map(c=>{if(!c.trim())return '<td></td>';const p=c.trim().split(' ');return '<td><span class="kq-kana">'+p[0]+' / '+p[1]+'</span><span class="kq-romaji">'+p[2]+'</span></td>';}).join('')+'</tr>').join('')+'</tbody></table></div>'}
function compact(){return '<div class="kq-compact"><span>あ・ア<small>a</small></span><span>い・イ<small>i</small></span><span>う・ウ<small>u</small></span><span>え・エ<small>e</small></span><span>お・オ<small>o</small></span></div>'}
function build(mode,items,open){
 const el=document.createElement('section');el.className='jp50-kana-quick';el.dataset.kanaReady='1';
 let body='';
 if(mode==='full') body='<p class="kq-intro">平假名／片假名成對看，先認聲音，再認字形。手機可左右捲動完整表。</p>'+table();
 else if(mode==='focus') body='<p class="kq-intro">先快速叫出本頁常出現的假名；卡住再回完整表。</p><p class="kq-label">本頁高頻假名</p><div class="kq-focus">'+items.map(x=>'<span lang="ja">'+esc(x)+'</span>').join('')+'</div>'+compact();
 else if(mode==='confusion') body='<p class="kq-intro">Review 時先用聲音辨認，再用筆畫方向確認易混字形。</p><div class="kq-confusions"><div class="kq-confusion"><strong>シ／ツ</strong><small>注意兩點的方向。</small></div><div class="kq-confusion"><strong>ソ／ン</strong><small>注意短筆與長筆的起點。</small></div><div class="kq-confusion"><strong>ぬ／め／ね</strong><small>比較右側收筆與圈形。</small></div><div class="kq-confusion"><strong>れ／わ</strong><small>用後半輪廓與語境一起辨認。</small></div></div>'+compact();
 else body='<p class="kq-intro">先用五個母音定位；需要時再回完整 50 音。</p>'+compact();
 el.innerHTML='<details'+(open?' open':'')+'><summary><span>50 音速讀對照</span><small>卡住時快速回查</small></summary><div class="kq-body">'+body+'<div class="kq-actions"><a href="'+new URL('learn.html',base).href+'">完整 50 音字卡 →</a><a href="'+new URL('Map/',base).href+'">記憶地圖 →</a><a href="'+new URL('exam.html',base).href+'">假名測驗 →</a></div></div></details>';
 return el;
}
function init(){
 if(document.querySelector('.jp50-kana-quick[data-kana-ready]'))return;
 const p=location.pathname,f=p.split('/').filter(Boolean).pop()||'';
 let mode='mini',items=[],open=false,anchor='header';
 if(p.endsWith('/jp50/')||p.endsWith('/jp50/index.html')){mode='full';open=true;anchor='#basic';}
 if(p.endsWith('/audiobook/listen/')){open=true;anchor='.hero';}
 if(focus[f]){mode='focus';items=focus[f].split(',');anchor='.reader-tools';}
 const nextLessonKey=Object.keys(focus).find(key=>p.includes('/aimyon-japanese/learn/'+key+'/'));
 if(nextLessonKey){mode='focus';items=focus[nextLessonKey].split(',');anchor='.site-header';}
 if(f==='unit-review-01.html'){mode='confusion';anchor='.reader-tools';}
 if(p.includes('/aimyon-japanese/review/')){mode='confusion';anchor='.site-header';}
 if(p.includes('/aimyon/songs/'))anchor='.learning-map-entry';
 if(p.includes('/aimyon/learning-map/'))anchor='header';
 if(p.endsWith('/jp50/exam.html')){mode='confusion';anchor='.container';}
 const w=build(mode,items,open);
 const a=document.querySelector(anchor);
 if(a)a.after(w);else if(document.querySelector('main'))document.querySelector('main').prepend(w);else document.body.prepend(w);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();