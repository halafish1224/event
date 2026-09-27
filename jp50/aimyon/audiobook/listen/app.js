(()=>{
  const KEY='aimyon-audiobook-completed-v1';
  const FONT_KEY='aimyon-audiobook-font-v1';
  const getDone=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const saveDone=(items)=>localStorage.setItem(KEY,JSON.stringify([...new Set(items)]));
  const applyProgress=()=>{
    const done=getDone();
    document.querySelectorAll('[data-track-card]').forEach(card=>{
      if(done.includes(card.dataset.trackCard)) card.classList.add('done');
    });
    const bar=document.querySelector('[data-progress-bar]');
    const copy=document.querySelector('[data-progress-copy]');
    if(bar||copy){
      const total=6;
      const count=['L01','L02','L03','L04','L05','UR1'].filter(id=>done.includes(id)).length;
      if(bar) bar.style.width=`${count/total*100}%`;
      if(copy) copy.textContent=`Unit 1：已完成 ${count} / ${total}`;
    }
  };
  const setFont=(mode)=>{
    document.body.classList.remove('large-text','compact-text');
    if(mode==='large') document.body.classList.add('large-text');
    if(mode==='compact') document.body.classList.add('compact-text');
    localStorage.setItem(FONT_KEY,mode);
  };
  setFont(localStorage.getItem(FONT_KEY)||'normal');
  applyProgress();

  document.querySelectorAll('[data-font]').forEach(btn=>btn.addEventListener('click',()=>setFont(btn.dataset.font)));

  const recallBtn=document.querySelector('[data-action="toggle-recall"]');
  if(recallBtn){
    recallBtn.addEventListener('click',()=>{
      document.body.classList.toggle('recall-mode');
      const on=document.body.classList.contains('recall-mode');
      recallBtn.classList.toggle('active',on);
      recallBtn.textContent=on?'回想模式：開':'回想模式：關';
      document.querySelectorAll('.answer-content').forEach(el=>el.classList.remove('revealed'));
    });
  }
  document.querySelectorAll('.answer-content').forEach(el=>{
    el.addEventListener('click',()=>{
      if(document.body.classList.contains('recall-mode')) el.classList.toggle('revealed');
    });
  });

  const completeBtn=document.querySelector('[data-complete-track]');
  if(completeBtn){
    const id=completeBtn.dataset.completeTrack;
    const sync=()=>{
      const done=getDone().includes(id);
      completeBtn.textContent=done?'✓ 已完成｜點此取消':'標記本課完成';
      completeBtn.classList.toggle('active',done);
    };
    sync();
    completeBtn.addEventListener('click',()=>{
      let done=getDone();
      if(done.includes(id)) done=done.filter(x=>x!==id); else done.push(id);
      saveDone(done);sync();applyProgress();
    });
  }
})();
