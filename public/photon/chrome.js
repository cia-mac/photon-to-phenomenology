/* Photon to Phenomenology - shared chrome: glass nav + guided intro engine.
   One copy for all instruments. Pages call PhotonChrome.init({here, walk, onEnd}). */
(function(){
  "use strict";

  const NAV=[
    {g:'Gallery',n:'Illusory contours',h:'/photon/kanizsa.html',slug:'kanizsa'},
    {g:'Gallery',n:'The motion aftereffect',h:'/photon/motion-aftereffect.html',slug:'motion-aftereffect'},
    {g:'Gallery',n:'The negative afterimage',h:'/photon/afterimage.html',slug:'afterimage'},
    {g:'Gallery',n:'The scintillating grid',h:'/photon/scintillating-grid.html',slug:'scintillating-grid'},
    {g:'Gallery',n:'The Ebbinghaus circles',h:'/photon/ebbinghaus.html',slug:'ebbinghaus'},
    {g:'Gallery',n:'The Cornsweet edge',h:'/photon/cornsweet.html',slug:'cornsweet'},
    {g:'Gallery',n:'The café wall',h:'/photon/cafe-wall.html',slug:'cafe-wall'},
    {g:'Gallery',n:'The Ponzo illusion',h:'/photon/ponzo.html',slug:'ponzo'},
    {g:'Gallery',n:'The Müller-Lyer lines',h:'/photon/muller-lyer.html',slug:'muller-lyer'},
    {g:'Book',n:'The inverse problem',h:'/photon/book/inverse-problem.html',slug:'inverse-problem'},
    {g:'Book',n:'The checker-shadow',h:'/photon/book/checker-shadow.html',slug:'checker-shadow'},
    {g:'Book',n:'The aperture problem',h:'/photon/book/aperture-problem.html',slug:'aperture-problem'},
    {g:'Book',n:'Apparent motion',h:'/photon/book/apparent-motion.html',slug:'apparent-motion'},
    {g:'Book',n:'Troxler fading',h:'/photon/book/troxler-fading.html',slug:'troxler-fading'},
    {g:'Book',n:'Motion-induced blindness',h:'/photon/book/motion-induced-blindness.html',slug:'motion-induced-blindness'},
    {g:'Book',n:'Change blindness',h:'/photon/book/change-blindness.html',slug:'change-blindness'},
  ];

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- inject the chrome DOM (menu pill, labeled arrows, index overlay, guide card, replay pill) ----
  const host=document.createElement('div');
  host.innerHTML=
    '<button id="menubtn">&#9638; all phenomena</button>'+
    '<div class="nav prev"><a class="arrow" id="navprev">&#8249;</a><span class="alabel" id="navprevlbl"></span></div>'+
    '<div class="nav next"><a class="arrow" id="navnext">&#8250;</a><span class="alabel" id="navnextlbl"></span></div>'+
    '<div id="overlay" role="dialog" aria-modal="true" aria-label="All phenomena">'+
      '<button class="oclose" id="oclose">close &#10005;</button>'+
      '<div class="ohead">Photon to Phenomenology</div>'+
      '<div class="cols">'+
        '<div class="col"><div class="gh">Gallery</div><div id="colGallery"></div></div>'+
        '<div class="col"><div class="gh">The Book</div><div id="colBook"></div></div>'+
      '</div>'+
    '</div>'+
    '<div id="walk">'+
      '<button class="wclose" id="wclose" aria-label="close guide" title="close">&#10005;</button>'+
      '<div class="wk">guided walk-through</div>'+
      '<div class="wt" id="wt" aria-live="polite"></div>'+
      '<div class="wb"><button class="wskip" id="wskip">explore freely</button><div class="dots" id="wdots"></div><button class="wnext" id="wnext">next &#8594;</button></div>'+
    '</div>'+
    '<button id="replay">&#8635; guide me again</button>';
  while(host.firstChild) document.body.appendChild(host.firstChild);

  const overlay=document.getElementById('overlay'), menubtn=document.getElementById('menubtn'),
        walk=document.getElementById('walk'), wt=document.getElementById('wt'),
        wdots=document.getElementById('wdots'), wnext=document.getElementById('wnext'),
        replay=document.getElementById('replay');

  // ---- overlay open/close with focus management ----
  let lastFocus=null;
  function openOverlay(){
    lastFocus=document.activeElement;
    overlay.classList.add('open');
    const f=overlay.querySelector('a.mi.here')||overlay.querySelector('a.mi');
    if(f) f.focus();
  }
  function closeOverlay(){
    overlay.classList.remove('open');
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  menubtn.addEventListener('click',openOverlay);
  document.getElementById('oclose').addEventListener('click',closeOverlay);
  overlay.addEventListener('click',e=>{ if(e.target===overlay) closeOverlay(); });
  overlay.addEventListener('keydown',e=>{           // focus trap
    if(e.key!=='Tab') return;
    const items=[...overlay.querySelectorAll('button,a[href]')].filter(el=>el.offsetParent!==null);
    if(items.length===0) return;
    const first=items[0], last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
  });

  // ---- guided-intro engine (per-page WALK supplied via init) ----
  let WALK=[], onEnd=null, wstep=-1, autoT=null, introDone=false, thesisRevealed=false;

  function showStep(i){
    wstep=i; wt.innerHTML=WALK[i].t;
    if(typeof WALK[i].act==='function') WALK[i].act();
    [...wdots.children].forEach((d,k)=>d.classList.toggle('on',k===i));
    wnext.textContent = i===WALK.length-1 ? 'done' : 'next →';
  }
  function clearAuto(){ if(autoT){ clearTimeout(autoT); autoT=null; } }
  function scheduleAuto(){
    clearAuto();
    if(reduceMotion) return;                        // no auto-advance for reduced-motion users
    if(wstep < WALK.length-1) autoT=setTimeout(()=>{ showStep(wstep+1); scheduleAuto(); }, 5400);
    // on the final step the guide stays put until the viewer closes it
  }
  function startIntro(){
    document.body.classList.add('guiding');
    replay.classList.remove('on'); walk.classList.add('on');
    showStep(0); scheduleAuto();
  }
  function endIntro(){
    clearAuto(); document.body.classList.remove('guiding');
    walk.classList.remove('on'); replay.classList.add('on');
    if(!introDone){
      introDone=true;
      if(!thesisRevealed){
        thesisRevealed=true;
        const th=document.getElementById('thesis');
        if(th) setTimeout(()=>{ th.style.opacity='1'; },500);
      }
    }
    if(typeof onEnd==='function') onEnd();
  }
  wnext.addEventListener('click',()=>{ clearAuto(); if(wstep>=WALK.length-1) endIntro(); else showStep(wstep+1); });
  document.getElementById('wskip').addEventListener('click',endIntro);
  document.getElementById('wclose').addEventListener('click',endIntro);
  replay.addEventListener('click',startIntro);

  // ---- keyboard: Esc closes the index; arrows step the guide, else change page ----
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ if(overlay.classList.contains('open')) closeOverlay(); return; }
    if(walk.classList.contains('on')){
      if(e.key==='ArrowRight'){ clearAuto(); if(wstep>=WALK.length-1) endIntro(); else showStep(wstep+1); }
      else if(e.key==='ArrowLeft'){ clearAuto(); showStep(Math.max(0,wstep-1)); }
      return;
    }
    if(e.key==='ArrowLeft') location.href=document.getElementById('navprev').href;
    else if(e.key==='ArrowRight') location.href=document.getElementById('navnext').href;
  });

  window.PhotonChrome={
    init(cfg){
      const HERE=cfg.here; WALK=cfg.walk||[]; onEnd=cfg.onEnd||null;

      // build the index + prev/next wiring
      const cg=document.getElementById('colGallery'), cb=document.getElementById('colBook');
      let gi=0, bi=0;
      NAV.forEach(it=>{
        const a=document.createElement('a'); a.href=it.h; a.className='mi'+(it.slug===HERE?' here':'');
        const num=(it.g==='Gallery')?(++gi):(++bi);
        a.innerHTML='<span class="n">'+String(num).padStart(2,'0')+'</span>'+it.n;
        (it.g==='Gallery'?cg:cb).appendChild(a);
      });
      const idx=NAV.findIndex(x=>x.slug===HERE);
      const prev=NAV[(idx-1+NAV.length)%NAV.length], next=NAV[(idx+1)%NAV.length];
      const pe=document.getElementById('navprev'), ne=document.getElementById('navnext');
      const strip=s=>s.replace(/^the\s+/i,'');
      pe.href=prev.h; pe.title=prev.n; pe.setAttribute('aria-label','Previous: '+prev.n);
      ne.href=next.h; ne.title=next.n; ne.setAttribute('aria-label','Next: '+next.n);
      document.getElementById('navprevlbl').textContent=strip(prev.n);
      document.getElementById('navnextlbl').textContent=strip(next.n);

      // step dots
      WALK.forEach(()=>{ const d=document.createElement('span'); d.className='dot'; wdots.appendChild(d); });

      // interacting stops the auto-advance but leaves the guide on screen
      const cv=document.querySelector('canvas');
      if(cv){
        cv.addEventListener('mousedown',()=>{ if(walk.classList.contains('on')) clearAuto(); });
        cv.addEventListener('touchstart',()=>{ if(walk.classList.contains('on')) clearAuto(); },{passive:true});
      }

      setTimeout(startIntro, 1100);   // the guide introduces the page shortly after load
    }
  };
})();
