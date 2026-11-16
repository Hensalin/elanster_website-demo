(function(){var p=document.getElementById('pre');if(!p)return;var t0=Date.now(),done=false;function go(){if(done)return;done=true;var w=Math.max(0,1500-(Date.now()-t0));setTimeout(function(){p.classList.add('out');setTimeout(function(){p.classList.add('done');setTimeout(function(){p.remove()},700)},900)},w)}if(document.readyState==='complete')go();else addEventListener('load',go);setTimeout(go,3000)})();
if('scrollRestoration' in history) history.scrollRestoration='manual';
window.scrollTo(0,0);
requestAnimationFrame(()=>requestAnimationFrame(function(){
"use strict";
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(pointer: fine)').matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const C={orange:'#6f6bff',blue:'#9ABFF5',lime:'#E2F8AC',navy:'#171545',pink:'#F5DFE3'};

const LOGO=`<rect width="235" height="68"/><path d="M 5 330 A 230 230 0 0 1 235 100 L 235 170 A 160 160 0 0 0 75 330 Z"/><path d="M 120 330 A 115 115 0 0 1 235 215 L 235 330 Z"/>`;
/* ---------- index2 content + interactions ---------- */
document.documentElement.classList.add('js-on');
const INDUSTRIES=['E-commerce','Healthcare','Faith-Based Organizations','Human Resources','Education','Professional Services'];
const FAQ=[["How fast can you deliver an AI MVP?", "Most AI MVPs ship in 4 to 12 weeks from kickoff to production. Not a prototype, but a deployed product on real infrastructure. Timelines depend on scope, and we give an honest estimate on the strategy call."], ["What happens on the strategy call?", "A 30-minute session with a lead architect. We pressure-test your plan, map the quickest route from concept to production, and send follow-up notes within 24 hours. You leave with a clear first milestone your team can execute."], ["What does production-ready actually mean?", "A deployed product on real infrastructure, built to the same security protocols and code-review standards as every Elanster project. Not a demo or a prototype, and we stay accountable after launch."], ["What if AI isn't the right answer for our problem?", "Then we will say so. AI readiness reviews and architecture audits exist to separate genuine opportunities from hype, and honest trade-offs are one of our values. Sometimes the right first step is strong engineering, not AI."], ["What AI-enabled development services do you offer?", "Full-stack AI products end to end: AI-enabled development, AI integration into existing products, autonomous agents and workflow automation, RAG pipelines, and AI consulting, all backed by eight years of web, mobile and cloud engineering."], ["Which industries do you work with?", "E-commerce, healthcare, faith-based organizations, human resources, education, professional services and retail. Strong engineering fundamentals travel well between domains."], ["What makes you different from other AI development agencies?", "We are an eight-year product engineering company that builds AI properly: architecture first, humans in the loop, production-ready from day one, and accountable long after launch."], ["How do your engagements work?", "We start with a strategy call to understand your goals, constraints and timeline. Then we map the right model, a fixed-scope build, an embedded product team or an ongoing partnership, with two meetings a week and full visibility throughout."], ["Do you work with enterprise clients?", "Yes. Enterprise delivery is our default standard. Security protocols, code-review discipline and compliance-aware architecture apply to every project, whatever its size."], ["Where is Elanster based?", "Chennai, India, serving clients worldwide. We work inside your Slack and repositories, with two meetings a week: Monday planning and Friday sprint review."]];
const PAINS=[{"q": "Too many documents sorted by hand?", "name": "Document intelligence", "tag": "AI agents", "desc": "An AI pipeline that classifies, extracts and routes business documents.", "res": "Less manual review, faster routing.", "before": ["invoice_0412.pdf", "contract_draft.docx", "claim_form.pdf"], "after": [["Invoice", "Finance"], ["Contract", "Legal"], ["Claim form", "Operations"]]}, {"q": "Too many tickets answered one by one?", "name": "Support copilot", "tag": "LLM apps", "desc": "An LLM-powered assistant that resolves customer queries end to end.", "res": "Faster answers, lighter queues.", "before": ["Where is my order?", "How do I reset access?", "Refund status?"], "after": [["Order status", "Answered"], ["Access reset", "Answered"], ["Refund", "Handed to a person"]]}, {"q": "Years of files searched by hand?", "name": "Knowledge search", "tag": "RAG pipelines", "desc": "Search across years of internal documents that answers with its sources.", "res": "Answers with sources, in seconds.", "before": ["Folder: Policies 2019", "Folder: Contracts", "Shared drive: old"], "after": [["Renewal terms", "Source cited"], ["Leave policy", "Source cited"], ["Vendor clause", "Source cited"]]}, {"q": "RFPs written from scratch every time?", "name": "Proposal automation", "tag": "Autonomous agents", "desc": "AI agents that draft bids and RFP responses from past wins.", "res": "Days of turnaround cut to hours.", "before": ["Blank document", "Copy from last bid", "Chase for answers"], "after": [["Sections", "Drafted"], ["Past wins", "Matched"], ["Review", "Ready for you"]]}, {"q": "Too much guesswork in every stock order?", "name": "Demand forecasting", "tag": "Machine learning", "desc": "Machine-learning forecasting wired into retail operations.", "res": "Smarter stock decisions every morning.", "before": ["Last year's sheet", "Gut feel", "Rush orders"], "after": [["Store A", "Forecast ready"], ["Store B", "Forecast ready"], ["Seasonal item", "Flagged"]]}, {"q": "Too many spreadsheets copied by hand?", "name": "Back-office automation", "tag": "Automation", "desc": "AI-driven workflow automation across finance and operations.", "res": "Hours of manual work removed daily.", "before": ["Export to sheet", "Paste into system", "Check totals"], "after": [["Export", "Automated"], ["Entry", "Automated"], ["Totals", "Checked"]]}];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#faqList').innerHTML=FAQ.map((f,i)=>`<details${i===0?' open':''}><summary>${esc(f[0])}<span class="pm" aria-hidden="true"></span></summary><div class="ans"><p>${esc(f[1])}</p></div></details>`).join('');
/* ship board */
(function(){
  const fig=$('#boardFig'),note=$('#boardNote');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){fig.classList.add('in');io.disconnect()}})},{threshold:.25});io.observe(fig)}else fig.classList.add('in');
  $$('.bl button').forEach(b=>{const show=()=>{$$('.bl button').forEach(x=>x.setAttribute('aria-pressed',x===b));note.textContent=b.textContent.trim()+': '+b.getAttribute('data-note')};
    b.setAttribute('aria-pressed','false');['click','focus','mouseenter'].forEach(ev=>b.addEventListener(ev,show))});
})();
/* problems switcher */
(function(){
  const list=$('#pains'),panel=$('#painPanel');
  PAINS.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.id='pain'+i;b.setAttribute('aria-controls','painPanel');b.textContent=p.q;
    b.addEventListener('click',()=>pick(i,true));
    b.addEventListener('keydown',e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();const n=(i+k+PAINS.length)%PAINS.length;pick(n,true);$('#pain'+n).focus()});
    list.appendChild(b)});
  function pick(i,user){const p=PAINS[i];
    $$('#pains button').forEach((b,j)=>{b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});
    panel.setAttribute('aria-labelledby','pain'+i);
    panel.innerHTML=`<span class="sp-tag">${esc(p.tag)}</span><h3 class="sp-title">${esc(p.name)}</h3><p class="sp-desc">${esc(p.desc)}</p>
      <div class="sp-mock"><div class="sp-col"><h4>Today</h4><ul>${p.before.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="sp-col after"><h4>With the build</h4><ul>${p.after.map(x=>`<li>${esc(x[0])}<em>${esc(x[1])}</em></li>`).join('')}</ul></div></div>
      <p class="sp-result">${esc(p.res)}</p><p class="sp-foot">Illustrative example from our practice areas, not a client result.</p>`;
    if(user&&window.elTrack)elTrack('problem_select',{problem:p.name})}
  pick(0,false);
})();


$('#bands').innerHTML=[[34,'0%',C.orange],[22,'18%',C.orange],[46,'6%','#ff7a52'],[16,'30%',C.pink],[58,'2%',C.orange],[26,'14%','#c74a2a'],[40,'8%',C.orange],[14,'26%',C.blue],[30,'12%',C.orange]].map(([h,x,c])=>`<i style="--h:${h}px;--x:${x};--c:${c}"></i>`).join('');
$('#ind').innerHTML=INDUSTRIES.map(n=>`<div><span>${n}</span></div>`).join('');
(function(){const el=document.getElementById('ist');if(!el)return;const t=()=>{el.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date())};t();setInterval(t,30000)})();
$$('.reveal-words').forEach(el=>{el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ')});
$$('.hero h1 .split').forEach(el=>{el.innerHTML=el.textContent.split(' ').map(w=>`<span style="display:inline-block;white-space:nowrap">${[...w].map(c=>`<span class="ch">${c}</span>`).join('')}</span>`).join(' ')});
$('#wordmark').innerHTML=[...'Elanster'].map(c=>`<span>${c}</span>`).join('');
/* ---------- nav ---------- */

/* ============ 3D (metallic logo) ============ */
function webglOK(){try{const c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')))}catch(e){return false}}
function buildStage(){
  if(!window.THREE||!webglOK()) return null;
  const canvas=$('#stage'),mobile=matchMedia('(max-width: 899px)').matches||matchMedia('(pointer: coarse)').matches;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,antialias:!mobile,alpha:true,powerPreference:'high-performance'})}catch(e){return null}
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.5:2));
  renderer.setClearColor(0x000000,0);
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,9.5);
  // neutral studio: white softboxes give clean chrome; faint brand tint at the edges
  const pm=new THREE.PMREMGenerator(renderer),env=new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:new THREE.Color(.02,.02,.03),side:THREE.BackSide})));
  const soft=(col,w,h,p)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide}));m.position.set(...p);m.lookAt(0,0,0);env.add(m)};
  soft(new THREE.Color(7,7,7.4),14,2,[0,9,3]);
  soft(new THREE.Color(4,4,4.2),3,12,[9,0,2]);
  soft(new THREE.Color(3,3,3.2),3,12,[-9,0,2]);
  soft(new THREE.Color(2.2,2.2,2.4),10,1.6,[0,-8,5]);
  soft(new THREE.Color(3.2,3.2,3.4),16,5,[-2,5,12]);
  soft(new THREE.Color(.9,.9,1),16,5,[2,-3,12]);
  soft(new THREE.Color(1.6,.8,.5),2,8,[6,-2,-6]);
  soft(new THREE.Color(1.6,.5,.4),2,8,[-6,-2,-6]);
  scene.environment=pm.fromScene(env,.02).texture;pm.dispose();
  const key=new THREE.DirectionalLight(0xffb59e,.25);key.position.set(-4,5,6);scene.add(key);
  const SEG=mobile?24:44;
  const bar=()=>{const s=new THREE.Shape();s.moveTo(0,262);s.lineTo(235,262);s.lineTo(235,330);s.lineTo(0,330);s.closePath();return s};
  const ring=()=>{const s=new THREE.Shape();s.moveTo(5,0);s.absarc(235,0,230,Math.PI,Math.PI/2,true);s.lineTo(235,170);s.absarc(235,0,160,Math.PI/2,Math.PI,false);s.closePath();return s};
  const disc=()=>{const s=new THREE.Shape();s.moveTo(120,0);s.absarc(235,0,115,Math.PI,Math.PI/2,true);s.lineTo(235,0);s.closePath();return s};
  const ex={depth:58,bevelEnabled:true,bevelThickness:7,bevelSize:4,bevelSegments:mobile?3:6,curveSegments:SEG};
  const mat=new THREE.MeshPhysicalMaterial({color:0x8a2418,metalness:.85,roughness:.55,clearcoat:.15,clearcoatRoughness:.5,envMapIntensity:.18});
  const logo=new THREE.Group();
  const parts=[];
  [bar(),ring(),disc()].forEach(sh=>{const g=new THREE.ExtrudeGeometry(sh,ex);g.translate(-117.5,-165,-29);const m=new THREE.Mesh(g,mat);logo.add(m);parts.push(m)});
  /* brand-coloured lights orbit the metal so it picks up orange, blue, lime and pink */
  const lights=[['#ff6a45',2.2],['#d9482a',1.8],['#7fa6e8',1.0],['#ff8a5c',1.2]].map(([c,i],n)=>{const l=new THREE.PointLight(new THREE.Color(c),i*3.5,16,2);scene.add(l);return l});
  logo.scale.setScalar(.01);
  const root=new THREE.Group();root.add(logo);scene.add(root);
  const animate=!REDUCED&&!!window.gsap,intro={s:animate?0:1};
  let W=1,H=1,narrow=false;
  function resize(){W=innerWidth;H=innerHeight;narrow=W<900||W/H<.85;renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix();if(!animate)render(0)}
  const ptr={x:0,y:0,tx:0,ty:0};
  function onMove(e){ptr.tx=(e.clientX/W-.5)*2;ptr.ty=(e.clientY/H-.5)*2}
  if(FINE&&!REDUCED)addEventListener('pointermove',onMove,{passive:true});
  const ease=t=>1-Math.pow(1-t,3);
  function render(time){
    const t=(time||0)/1000,k=ease(Math.min(1,intro.s));
    const a=W/H,off=narrow?0:Math.min(3.1,1.2*a+.35);
    root.position.set(off,narrow?1.45:.05,0);
    root.scale.setScalar((narrow?.6:.88)*(.01+.99*k));
    ptr.x+=(ptr.tx-ptr.x)*.05;ptr.y+=(ptr.ty-ptr.y)*.05;
    root.rotation.y=-.42+(1-k)*-1.6+(intro.spin||0)*1.2+ptr.x*.28+(REDUCED?0:Math.sin(t*.4)*.08);
    root.rotation.x=.06+ptr.y*.14+(REDUCED?0:Math.cos(t*.5)*.03);
    root.position.y+=REDUCED?0:Math.sin(t*.8)*.06;
    lights.forEach((l,n)=>{const a2=t*.55+n*Math.PI/2;l.position.set(root.position.x+Math.cos(a2)*4.2,Math.sin(a2*1.3+n)*2.6,2.6+Math.sin(a2)*2)});
    const offs=[[-5,3,0],[6,0,-2],[0,-5,3]];
    parts.forEach((m,n)=>{const q=Math.min(1,Math.max(0,(k*1.35)-n*.12)),e2=1-Math.pow(1-q,3);m.position.set(offs[n][0]*(1-e2),offs[n][1]*(1-e2),offs[n][2]*(1-e2));m.rotation.z=(1-e2)*(n-1)*.9});
    renderer.render(scene,camera);
  }
  let visible=true,raf=0;
  function loop(t){raf=requestAnimationFrame(loop);if(visible)render(t)}
  addEventListener('resize',resize);resize();
  if(animate)raf=requestAnimationFrame(loop);else render(0);
  const io=new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);canvas.style.visibility=visible?'visible':'hidden';if(!animate&&visible)render(0)},{rootMargin:'10% 0px'});
  io.observe($('#top'));
  return {intro,dispose(){cancelAnimationFrame(raf);io.disconnect();removeEventListener('resize',resize);removeEventListener('pointermove',onMove);scene.traverse(o=>{o.geometry&&o.geometry.dispose()});mat.dispose();renderer.dispose()}};
}
let stage=null;try{stage=buildStage()}catch(err){console.warn('3D stage failed',err);stage=null}
if(!stage)document.documentElement.classList.add('no-webgl');
addEventListener('pagehide',()=>stage&&stage.dispose());

/* ============ MOTION ============ */
const films=[];
if(!window.gsap||REDUCED){
  films.forEach(f=>f.classList.add('static'));
  $$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{}));
  return;
}
gsap.registerPlugin(ScrollTrigger);

/* smooth scroll (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync */
let lenis=null;
function killLenis(){
  if(!lenis) return;
  try{lenis.destroy()}catch(e){}
  lenis=null;
  document.documentElement.classList.remove('lenis','lenis-smooth','lenis-scrolling','lenis-stopped');
  document.documentElement.style.overflow='';document.body.style.overflow='';
  ScrollTrigger.update();
}
if(window.Lenis&&FINE_OR_ANY()){
  try{
    lenis=new Lenis({lerp:.12,smoothWheel:true,wheelMultiplier:1,touchMultiplier:1.4,syncTouch:false,autoRaf:false});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>{ if(lenis) lenis.raf(t*1000) });
    gsap.ticker.lagSmoothing(0);
    /* safety net: if a mouse wheel is turned but the page does not move, drop Lenis and use native scrolling */
    let wTimer=0;
    addEventListener('wheel',e=>{
      if(!lenis||e.ctrlKey) return;
      const y0=window.scrollY, dir=Math.sign(e.deltaY);
      clearTimeout(wTimer);
      wTimer=setTimeout(()=>{
        if(!lenis) return;
        const max=document.documentElement.scrollHeight-innerHeight;
        const atEdge=(dir>0&&y0>=max-2)||(dir<0&&y0<=2);
        if(!atEdge&&Math.abs(window.scrollY-y0)<1) killLenis();
      },350);
    },{passive:true});
  }catch(err){ console.warn('Lenis failed, using native scroll',err); killLenis(); }
}
function FINE_OR_ANY(){return true}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]'); if(!a) return;
  const id=a.getAttribute('href'); if(id.length<2) return;
  const t=document.querySelector(id); if(!t) return;
  e.preventDefault();
  lenis?lenis.scrollTo(t,{duration:1.1}):t.scrollIntoView({behavior:'smooth'});
});

/* scroll progress + cursor spotlight */
gsap.to('#scrollbar',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:.3}});
if(FINE){
  const spot=$('#spot')||document.createElement('i'),sx=gsap.quickTo(spot,'x',{duration:.6,ease:'power3'}),sy=gsap.quickTo(spot,'y',{duration:.6,ease:'power3'});
  addEventListener('pointermove',e=>{sx(e.clientX);sy(e.clientY);spot.style.opacity=1},{passive:true});
  /* magnetic buttons */
  $$('.mag').forEach(b=>{const xT=gsap.quickTo(b,'x',{duration:.5,ease:'power3'}),yT=gsap.quickTo(b,'y',{duration:.5,ease:'power3'});
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();xT((e.clientX-r.left-r.width/2)*.22);yT((e.clientY-r.top-r.height/2)*.32)});
    b.addEventListener('pointerleave',()=>{xT(0);yT(0)})});
  /* tilt cards */
  $$('.values>div').forEach(c=>{const rx=gsap.quickTo(c,'rotationX',{duration:.6,ease:'power3'}),ry=gsap.quickTo(c,'rotationY',{duration:.6,ease:'power3'});
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*14);rx(-((e.clientY-r.top)/r.height-.5)*14)});
    c.addEventListener('pointerleave',()=>{rx(0);ry(0)})});
}
/* scramble-decode for the "/ LABEL" markers */
const GLY='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>';
function scramble(el){const fin=el.textContent,o={p:0};gsap.to(o,{p:1,duration:.9,ease:'power2.out',onUpdate:()=>{const n=Math.floor(o.p*fin.length);el.textContent=fin.slice(0,n)+[...fin.slice(n)].map(c=>c===' '?' ':GLY[(Math.random()*GLY.length)|0]).join('')},onComplete:()=>el.textContent=fin})}
$$('.scr').forEach(el=>{ if(el.closest('.hero')) return; ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>scramble(el)})});

/* ---------- hero opening ---------- */
const tl=gsap.timeline({defaults:{ease:'expo.out'},delay:1.1});
if(stage)tl.to(stage.intro,{s:1,duration:2.2,ease:'power2.inOut'},0);else tl.from('.hero-logo',{y:30,opacity:0,duration:1.6,ease:'power3.out'},0);
if(stage)gsap.to('#stage',{y:()=>-innerHeight,ease:'none',scrollTrigger:{trigger:'#top',start:'top top',end:'bottom top',scrub:true}});
tl.from('.glow .arcs',{scale:.5,opacity:0,rotate:-12,transformOrigin:'100% 100%',duration:2,ease:'power3.out'},0).from('.glow .bands i',{xPercent:50,opacity:0,duration:1.5,stagger:.05,ease:'power3.out'},.1);
tl.from('.hero h1 .ch',{yPercent:110,rotate:6,filter:'blur(8px)',opacity:0,duration:1.1,stagger:.022},.25)
  .add(()=>scramble($('.hero .label')),.3)
  .from('[data-in]',{y:18,opacity:0,duration:1,stagger:.07,ease:'power3.out'},.75);

gsap.to('.glow',{yPercent:22,ease:'none',scrollTrigger:{trigger:'#top',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero .wrap',{yPercent:-12,opacity:.15,filter:'blur(4px)',ease:'none',scrollTrigger:{trigger:'#top',start:'35% top',end:'bottom top',scrub:true}});

/* ---------- read-through headings, counters, grids ---------- */
$$('.reveal-words').forEach(el=>gsap.to(el.querySelectorAll('.w'),{color:'#F0F0F9',stagger:.05,ease:'none',scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 55%',scrub:true}}));
$$('.stat .num').forEach(el=>{const end=+el.dataset.count,suf=el.dataset.suffix||'',o={v:0};
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v:end,duration:1.6,ease:'power2.out',onUpdate:()=>el.innerHTML=Math.round(o.v)+(suf?`<em>${suf}</em>`:'')})})});
gsap.from('.ind>div',{y:40,clipPath:'inset(100% 0 0 0)',duration:1.1,ease:'expo.out',stagger:.05,scrollTrigger:{trigger:'#ind',start:'top 88%'}});
gsap.from('.values>div',{y:70,rotationX:-25,opacity:0,transformOrigin:'50% 100%',duration:1.2,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:'#values',start:'top 88%'}});
gsap.from('.contact .cta-panel',{y:60,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.cta-panel',start:'top 94%'}});
gsap.from('.contact .facts>*, .contact .checks li, .contact .cta-btn',{y:24,opacity:0,duration:1,ease:'expo.out',stagger:.07,delay:.15,scrollTrigger:{trigger:'.cta-panel',start:'top 90%'}});
gsap.fromTo('.glow2 .planet',{yPercent:22},{yPercent:0,ease:'none',scrollTrigger:{trigger:'#contact',start:'top bottom',end:'bottom bottom',scrub:true}});
gsap.from('#wordmark span',{yPercent:110,duration:1.2,ease:'expo.out',stagger:.05,scrollTrigger:{trigger:'#wordmark',start:'top 95%'}});

/* ---------- FAQ: animated open/close ---------- */
$$('.faq details').forEach(d=>{
  const s=d.querySelector('summary'),a=d.querySelector('.ans');
  s.addEventListener('click',e=>{e.preventDefault();
    if(d.open){gsap.to(a,{height:0,opacity:0,duration:.45,ease:'power3.inOut',onComplete:()=>{d.open=false;gsap.set(a,{clearProps:'all'})}})}
    else{d.open=true;gsap.from(a,{height:0,opacity:0,duration:.55,ease:'power3.out',clearProps:'all'})}
  });
});
/* ---------- manifesto: outline text fills with copper as you scroll, lines drift apart ---------- */
(function(){
  if(REDUCED){$$('.mf-t').forEach(t=>t.style.setProperty('--p',100));return}
  $$('.mf-t').forEach(t=>gsap.to(t,{'--p':100,ease:'none',scrollTrigger:{trigger:t,start:'top 88%',end:'top 38%',scrub:true}}));
  if(matchMedia('(min-width: 701px)').matches){
  }
  gsap.fromTo('.mf-glow',{scale:.5,opacity:.2},{scale:1.15,opacity:1,ease:'none',scrollTrigger:{trigger:'#manifesto',start:'top bottom',end:'bottom top',scrub:true}});
})();
(function(){
  const bands=$$('.fab i');
  if(bands.length&&window.gsap&&!REDUCED){
  }
  const links=$$('#sidenav a');
  links.forEach(a=>{const t=$(a.getAttribute('href'));if(!t)return;ScrollTrigger.create({trigger:t,start:'top 55%',end:'bottom 55%',onToggle:s=>{if(s.isActive){links.forEach(l=>l.classList.toggle('on',l===a))}}})});
})();
}));
