/* Photon app chrome. Same page API as the site (PhotonChrome.init({here, walk, onEnd}))
   minus navigation, which the native shell owns, plus the PhotonApp bridge.
   Outside the app (a plain browser) every bridge call is a silent no-op. */
(function(){
  "use strict";

  const port = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.photon;
  function send(msg){ try{ if(port) port.postMessage(msg); }catch(e){} (window.__photonLog=window.__photonLog||[]).push(msg); }
  let holding=false;
  window.PhotonApp={
    inApp: !!port,
    /* k: 'reveal' at the moment the percept appears or breaks; 'tick' for a detent. */
    haptic(k){ send({t:'haptic',k:k==='tick'?'tick':'reveal'}); },
    /* keep the screen awake while the viewer must fixate; always release. */
    hold(on){ on=!!on; if(on===holding) return; holding=on; send({t:'hold',on:on}); }
  };
  window.addEventListener('pagehide',()=>window.PhotonApp.hold(false));

  /* The figure box. A full-bleed canvas may not run under words: size the canvas to the
     viewport minus the text bands (every .chrome block in the top half sets the top edge,
     every one in the bottom half sets the bottom edge) and return its size. The piece then
     draws into W,H exactly as before, only smaller. Call from resize(). The text can move
     after the page script runs (iOS applies the safe-area inset late, fonts settle), and no
     resize event announces that, so a watcher re-fits whenever the bands move. */
  let reserveGuide=false;
  function measureBox(){
    const vw=innerWidth, vh=innerHeight, gap=14;
    let top=0, bottom=vh;
    document.querySelectorAll('.chrome').forEach(el=>{
      const r=el.getBoundingClientRect(); if(r.height<1) return;
      if(r.top+r.height/2 < vh/2) top=Math.max(top,r.bottom+gap); else bottom=Math.min(bottom,r.top-gap);
    });
    if(reserveGuide){                      // keep the open guide card off the figure (its height is constant, see init)
      const w=document.getElementById('walk');
      if(w){ const wb=parseFloat(getComputedStyle(w).bottom)||0; bottom=Math.min(bottom, vh-wb-w.offsetHeight-gap); }
    }
    if(bottom-top<160){ top=Math.min(top,vh*0.35); bottom=Math.max(bottom,vh*0.65); }   // never collapse
    return {x:0,y:Math.round(top),w:vw,h:Math.round(bottom)-Math.round(top)};
  }
  let watching=false, lastKey='';
  function ensureWatch(){
    if(watching) return; watching=true;
    (function tick(){
      const m=measureBox();
      if(m.y+'|'+m.h+'|'+m.w!==lastKey) window.dispatchEvent(new Event('resize'));   // the piece's resize() measures again
      requestAnimationFrame(tick);
    })();
  }
  window.PhotonApp.fit=function(cv,opts){
    reserveGuide=!!(opts&&opts.reserveGuide);
    const b=measureBox();
    cv.style.left='0px'; cv.style.top=b.y+'px'; cv.style.width=b.w+'px'; cv.style.height=b.h+'px';
    lastKey=b.y+'|'+b.h+'|'+b.w; ensureWatch();
    return b;
  };
  /* For a figure that stays full-viewport: the clear band, so it can clip its drawing to it. */
  window.PhotonApp.bands=function(opts){
    reserveGuide=!!(opts&&opts.reserveGuide);
    const b=measureBox(); lastKey=b.y+'|'+b.h+'|'+b.w; ensureWatch();
    return {top:b.y, bottom:b.y+b.h};
  };

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const host=document.createElement('div');
  host.innerHTML=
    '<div id="walk">'+
      '<button class="wclose" id="wclose" aria-label="close guide">&#10005;</button>'+
      '<div class="wk">guided walk-through</div>'+
      '<div class="wt" id="wt" aria-live="polite"></div>'+
      '<div class="wb"><button class="wskip" id="wskip">explore freely</button><div class="dots" id="wdots"></div><button class="wnext" id="wnext">next &#8594;</button></div>'+
    '</div>'+
    '<button id="replay">&#8635; guide me again</button>';
  while(host.firstChild) document.body.appendChild(host.firstChild);

  const walk=document.getElementById('walk'), wt=document.getElementById('wt'),
        wdots=document.getElementById('wdots'), wnext=document.getElementById('wnext'),
        replay=document.getElementById('replay');

  let WALK=[], onEnd=null, wstep=-1, autoT=null, introDone=false, voiceOn=false, userDriven=false;
  const HERE=location.pathname.split('/').pop().replace(/\.html.*$/,'');

  /* Narration. The page says what the guide card says; the native shell speaks it unless muted and
     tells the page when a line has finished. The guide waits for the voice, then moves on. */
  function plain(h){ const d=document.createElement('div'); d.innerHTML=h; return (d.textContent||'').replace(/\s+/g,' ').trim(); }
  function say(id,text){ send({t:'say',id:id,text:text}); }
  function stopSay(){ send({t:'stopsay'}); }
  function stepId(i){ return HERE+'-'+i; }
  function speakStep(){ if(wstep>=0 && WALK[wstep]) say(stepId(wstep), plain(WALK[wstep].t)); }
  function speakIntro(){ const p=document.querySelector('p.instruction'); if(p) say(HERE+'-intro', plain(p.innerHTML)); }

  function showStep(i){
    wstep=i; wt.innerHTML=WALK[i].t;
    if(typeof WALK[i].act==='function') WALK[i].act();
    [...wdots.children].forEach((d,k)=>d.classList.toggle('on',k===i));
    wnext.textContent = i===WALK.length-1 ? 'done' : 'next →';
    if(voiceOn) speakStep();
  }
  function clearAuto(){ if(autoT){ clearTimeout(autoT); autoT=null; } }
  function scheduleAuto(){
    clearAuto();
    if(reduceMotion) return;
    if(wstep >= WALK.length-1) return;
    // with a voice, the voice sets the pace (see _done); this only rescues a stalled one
    autoT=setTimeout(()=>{ showStep(wstep+1); scheduleAuto(); }, voiceOn ? 45000 : 5400);
  }
  function startIntro(){
    if(!WALK.length) return;
    document.body.classList.add('guiding');
    replay.classList.remove('on'); walk.classList.add('on');
    userDriven=false; showStep(0); scheduleAuto();
  }
  function endIntro(){
    stopSay(); clearAuto(); document.body.classList.remove('guiding');
    walk.classList.remove('on'); replay.classList.add('on');
    if(!introDone){
      introDone=true;
      const th=document.getElementById('thesis');
      if(th) setTimeout(()=>{ th.style.opacity='1'; },500);
    }
    if(typeof onEnd==='function') onEnd();
  }
  wnext.addEventListener('click',()=>{ clearAuto(); if(wstep>=WALK.length-1) endIntro(); else showStep(wstep+1); });
  document.getElementById('wskip').addEventListener('click',endIntro);
  document.getElementById('wclose').addEventListener('click',endIntro);
  replay.addEventListener('click',startIntro);

  window.PhotonApp._voice=function(on){          // native: narration turned on or off (also sent once the page has loaded)
    voiceOn=!!on;
    if(walk.classList.contains('on')){ clearAuto(); if(voiceOn) speakStep(); else stopSay(); if(!userDriven) scheduleAuto(); }
    else if(!WALK.length){ if(voiceOn) speakIntro(); else stopSay(); }       // a page with no guide reads its introduction
    else if(!voiceOn) stopSay();
  };
  window.PhotonApp._done=function(id){           // native: the line for this step has been spoken
    if(!voiceOn||userDriven||reduceMotion||!walk.classList.contains('on')||id!==stepId(wstep)||wstep>=WALK.length-1) return;
    clearAuto(); autoT=setTimeout(()=>{ showStep(wstep+1); scheduleAuto(); },700);
  };
  window.addEventListener('pagehide',stopSay);

  window.PhotonChrome={
    init(cfg){
      WALK=cfg.walk||[]; onEnd=cfg.onEnd||null;
      WALK.forEach(()=>{ const d=document.createElement('span'); d.className='dot'; wdots.appendChild(d); });
      if(WALK.length){          // one card height for every step: no jump between steps, and a figure can reserve it
        const keep=wt.innerHTML; let tall=0;
        WALK.forEach(st=>{ wt.innerHTML=st.t; tall=Math.max(tall,walk.offsetHeight); });
        wt.innerHTML=keep; walk.style.minHeight=tall+'px';
      }
      const cv=document.querySelector('canvas');
      if(cv){
        cv.addEventListener('pointerdown',()=>{ if(walk.classList.contains('on')){ userDriven=true; clearAuto(); } },{passive:true});
        cv.addEventListener('touchstart',()=>{ if(walk.classList.contains('on')){ userDriven=true; clearAuto(); } },{passive:true});
      }
      setTimeout(startIntro, 1100);
    }
  };
})();
