(function(){var p=document.getElementById('pre');if(!p)return;var t0=Date.now(),done=false;function go(){if(done)return;done=true;var w=Math.max(0,1500-(Date.now()-t0));setTimeout(function(){p.classList.add('out');setTimeout(function(){p.classList.add('done');setTimeout(function(){p.remove()},700)},900)},w)}if(document.readyState==='complete')go();else addEventListener('load',go);setTimeout(go,3000)})();
if('scrollRestoration' in history) history.scrollRestoration='manual';
window.scrollTo(0,0);
requestAnimationFrame(()=>requestAnimationFrame(function(){
"use strict";
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(pointer: fine)').matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const C={orange:'#6f6bff',blue:'#9ABFF5',lime:'#E2F8AC',navy:'#171545',pink:'#F5DFE3'};

/* ============ CONTENT — verified copy from elanster.com ============ */
// films: [title, description, result, practice, palette, kinetic opener, cascade word, question, mock]
const FILMS=[["Document Intelligence", "Classifies, extracts and routes the documents your team sorts by hand.", "Less manual review, faster routing.", "AI Agents", {"c1": "#4b46e0", "c2": "#7f86ff", "cell": "#9ABFF5", "acc": "#9ABFF5"}, "Too many", "documents", "sorted by hand?", "doc"], ["Support Copilot", "Answers customer questions end to end and hands the hard ones to a person.", "Faster answers, lighter queues.", "LLM Apps", {"c1": "#3557c9", "c2": "#9ABFF5", "cell": "#b9d3ff", "acc": "#9ABFF5"}, "Too many", "tickets", "answered one by one?", "chat"], ["Knowledge Search", "Finds the answer across years of internal files and shows its source.", "Answers with sources, in seconds.", "RAG Pipelines", {"c1": "#5f8a24", "c2": "#cfe98f", "cell": "#E2F8AC", "acc": "#E2F8AC"}, "Years of", "files", "searched by hand?", "search"], ["Proposal Automation", "Drafts bids and RFP responses from your past wins, ready for a person to review.", "Days of turnaround cut to hours.", "Autonomous Agents", {"c1": "#2b2790", "c2": "#F5DFE3", "cell": "#cfe0ff", "acc": "#b9d3ff"}, "Days on", "RFPs", "written from scratch?", "prop"], ["Demand Forecasting", "Forecasts demand and feeds it into the stock decisions your team already makes.", "Smarter stock decisions every morning.", "Machine Learning", {"c1": "#2b2790", "c2": "#9ABFF5", "cell": "#9ABFF5", "acc": "#9ABFF5"}, "Too much", "guesswork", "in every stock order?", "fc"], ["Back-Office Automation", "Moves finance and operations work between systems without copy and paste.", "Hours of manual work removed daily.", "Automation", {"c1": "#171545", "c2": "#4b46e0", "cell": "#cfe0ff", "acc": "#E2F8AC"}, "Too many", "spreadsheets", "copied by hand?", "wf"]];
const SERVICES=[["Launch fast", "AI-enabled development", "Turn an idea into a deployed AI product in 4 to 12 weeks, validated with real users on real infrastructure instead of stalling at the demo."], ["Smart solutions", "AI integration", "Add LLMs, RAG and machine learning to the product and workflows you already run, starting with the one use case that pays off most."], ["Autonomous workflows", "AI agents & automation", "Agents that draft, classify, route and resolve repetitive work, with a person deciding where it matters."], ["End to end", "Full-stack app development", "Web, mobile and cloud products on eight years of engineering craft, the foundation every AI feature needs."], ["Expert guidance", "AI consulting", "Readiness reviews, architecture audits and roadmaps that tell you honestly what is worth building, and what is not yet."]];
const WHY=[["We started as engineers", "Eight years of web, mobile and cloud delivery come first. We are not an AI shop that learned engineering last year.", C.orange, 0], ["Senior engineers, amplified by AI", "Human-in-the-loop workflows pair senior engineers with production-grade LLMs, so roadmaps compress into sprint-length delivery.", C.blue, 1], ["Weeks, not quarters", "AI MVPs in 4 to 12 weeks, deployed and production-ready, not prototyped.", C.lime, 2], ["Standards on every project", "The same security protocols and code-review discipline apply to every engagement, whatever its size.", C.orange, 3], ["Accountable after launch", "The people who design and build your product stay accountable for it long after it ships.", C.lime, 4]];
const VALUES=[["Excellence", "A high bar in code, in design and in every conversation with a client.", C.orange], ["Integrity", "Honest estimates, honest trade-offs, honest outcomes.", C.blue], ["Continuous learning", "Every engineer invests in learning as part of the job, not after it.", C.lime], ["Ownership", "The people who design and build your product stay accountable for it.", C.orange], ["Collaboration", "Shared tools, shared rituals, a shared definition of done.", C.blue]];
const FAQ=[["How fast can you deliver an AI MVP?", "Most AI MVPs ship in 4 to 12 weeks from kickoff to production. Not a prototype, but a deployed product on real infrastructure. Timelines depend on scope, and we give an honest estimate on the strategy call."], ["What happens on the strategy call?", "A 30-minute session with a lead architect. We pressure-test your plan, map the quickest route from concept to production, and send follow-up notes within 24 hours. You leave with a clear first milestone your team can execute."], ["What does production-ready actually mean?", "A deployed product on real infrastructure, built to the same security protocols and code-review standards as every Elanster project. Not a demo or a prototype, and we stay accountable after launch."], ["What if AI isn't the right answer for our problem?", "Then we will say so. AI readiness reviews and architecture audits exist to separate genuine opportunities from hype, and honest trade-offs are one of our values. Sometimes the right first step is strong engineering, not AI."], ["What AI-enabled development services do you offer?", "Full-stack AI products end to end: AI-enabled development, AI integration into existing products, autonomous agents and workflow automation, RAG pipelines, and AI consulting, all backed by eight years of web, mobile and cloud engineering."], ["Which industries do you work with?", "E-commerce, healthcare, faith-based organizations, human resources, education, professional services and retail. Strong engineering fundamentals travel well between domains."], ["What makes you different from other AI development agencies?", "We are an eight-year product engineering company that builds AI properly: architecture first, humans in the loop, production-ready from day one, and accountable long after launch."], ["How do your engagements work?", "We start with a strategy call to understand your goals, constraints and timeline. Then we map the right model, a fixed-scope build, an embedded product team or an ongoing partnership, with two meetings a week and full visibility throughout."], ["Do you work with enterprise clients?", "Yes. Enterprise delivery is our default standard. Security protocols, code-review discipline and compliance-aware architecture apply to every project, whatever its size."], ["Where is Elanster based?", "Chennai, India, serving clients worldwide. We work inside your Slack and repositories, with two meetings a week: Monday planning and Friday sprint review."]];
const INDUSTRIES=['E-commerce','Healthcare','Faith-Based Organizations','Human Resources','Education','Professional Services'];

function form(type,rot,fill,uid){
  const d= type===0 ? 'M0 100A100 100 0 0 1 100 0L100 100Z'
        : type===1 ? 'M0 100A100 100 0 0 1 100 0L100 48A52 52 0 0 0 48 100Z'
        : 'M0 0H100V29H0Z';
  const r=`transform="rotate(${rot*90} 50 50)"`;
  const depth=[7,6,5,4,3,2,1].map(k=>`<g transform="translate(${-k*.9} ${k*.9})"><path ${r} d="${d}" fill="${fill}" style="filter:brightness(${.22+k*.04})"/></g>`).join('');
  return `<defs>
    <linearGradient id="gr${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="${fill}"/><stop offset="1" stop-color="${fill}" stop-opacity=".55"/></linearGradient>
    <linearGradient id="ed${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="gn${uid}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="${uid+3}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -.55"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  </defs>${depth}
  <path ${r} d="${d}" fill="url(#gr${uid})"/>
  <path ${r} d="${d}" fill="#000" filter="url(#gn${uid})" opacity=".55"/>
  <path ${r} d="${d}" fill="none" stroke="url(#ed${uid})" stroke-width="1.2"/>`;
}
const LOGO=`<rect width="235" height="68"/><path d="M 5 330 A 230 230 0 0 1 235 100 L 235 170 A 160 160 0 0 0 75 330 Z"/><path d="M 120 330 A 115 115 0 0 1 235 215 L 235 330 Z"/>`;

/* ---------- illustrative product mockups ---------- */
const docRow=(n,w)=>`<div class="doc"><span class="ic"></span><div style="flex:1;min-width:0;display:grid;gap:5px"><span class="t">${n}</span><span class="sk" style="width:${w}%"></span></div></div>`;
const MOCK={
 doc:()=>`<div class="mk mk-doc"><div class="inbox"><h6>Incoming</h6>${['scan_0412.pdf','agreement_v3.pdf','claim_form.png','inv_88213.pdf','onboarding.docx'].map((n,i)=>docRow(n,50+i*8)).join('')}</div>
  <div class="lanes">${['Invoices','Contracts','Forms'].map((l,i)=>`<div class="lane"><h6>${l}</h6>${[0,1].map(j=>`<div class="doc ld"><span class="ic"></span><span class="sk" style="flex:1;width:${60+j*15}%"></span></div>`).join('')}</div>`).join('')}</div>
  <div class="fields">${['Vendor','Amount','Due date','Party','Policy no.','Signature'].map(f=>`<span class="chip"><i></i>${f}</span>`).join('')}</div></div>`,
 chat:()=>`<div class="mk mk-chat"><div class="thread">
   <div class="bub u">Hi — my order shows delivered but I haven't received it. Can you help?</div>
   <div class="typing"><i></i><i></i><i></i></div>
   <div class="bub a">I've checked the courier scan: it was left at the building reception at 14:02. I've also flagged it for a trace — you'll get an update by email.</div>
   <div class="resolved">✓ Resolved by assistant</div></div>
   <div class="queue"><h6>Queue</h6>${[92,78,64,48,30].map(w=>`<div class="qrow"><span class="sk" style="width:${w}%"></span></div>`).join('')}</div></div>`,
 search:()=>`<div class="mk mk-search"><div class="q"><span style="opacity:.6">⌕</span><span class="typed">What does our standard contract say about renewals?</span><span class="caret"></span></div>
   <div class="ans">${[96,88,92,60].map(w=>`<span class="sk" style="width:${w}%;transform-origin:left"></span>`).join('')}</div>
   <div class="srcs">${['contract_template.docx · p4','renewal_policy.pdf · p2','legal_faq.md'].map(s=>`<span class="chip"><i></i>${s}</span>`).join('')}</div></div>`,
 prop:()=>`<div class="mk mk-prop"><div class="lib"><h6>Past wins</h6>${['proposal_retail.pdf','rfp_response_2024.pdf','case_study_health.pdf','pricing_model.xlsx'].map((n,i)=>docRow(n,55+i*9).replace('class="doc"',`class="doc${i%2?'':' hlc'}"`)).join('')}</div>
   <div class="draft"><h6>Draft response</h6>${[['Executive summary',[94,88,70]],['Approach',[96,90,84,52]],['Timeline',[80,64]]].map(([h,ls])=>`<b>${h}</b>${ls.map(w=>`<span class="sk" style="width:${w}%"></span>`).join('')}`).join('')}</div></div>`,
 fc:()=>`<div class="mk mk-fc"><svg viewBox="0 0 600 240" aria-hidden="true">
   ${[40,90,140,190].map(y=>`<line x1="0" x2="600" y1="${y}" y2="${y}" stroke="rgba(255,255,255,.07)"/>`).join('')}
   <path class="band" d="M360 120 C 420 95, 480 120, 600 70 L 600 150 C 480 170, 420 160, 360 140 Z" fill="rgba(86,92,240,.18)"/>
   <path class="act" pathLength="1" d="M0 170 C 40 150, 70 180, 110 150 S 180 110, 220 140 S 300 90, 360 130" fill="none" stroke="#F0F0F9" stroke-width="2.5"/>
   <path class="pred" d="M360 130 C 420 110, 480 140, 600 110" fill="none" stroke="#9ABFF5" stroke-width="2.5" stroke-dasharray="7 6"/>
   <line class="today" x1="360" x2="360" y1="20" y2="220" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 4"/>
   <text x="366" y="32" fill="rgba(255,255,255,.6)" font-family="Geist Mono, monospace" font-size="11">today</text>
   <circle class="dot" cx="600" cy="110" r="5" fill="#9ABFF5"/></svg>
   <div class="legend"><span style="--l:#F0F0F9">Actual sales</span><span style="--l:#9ABFF5">Forecast</span><span style="--l:rgba(86,92,240,.5)">Range</span></div></div>`,
 wf:()=>`<div class="mk mk-wf"><div class="rail"><i></i></div><span class="pulse"></span><div class="nodes">${['Invoice received','Extract fields','Match to PO','Approve','Post to ledger'].map(n=>`<div class="node"><div class="ic"></div>${n}</div>`).join('')}</div>
   <div class="done"><span>Run complete</span><b>No manual steps</b></div></div>`
};
const TITLES={doc:'Document pipeline',chat:'Support assistant',search:'Knowledge search',prop:'Proposal drafting',fc:'Demand forecast',wf:'Workflow automation'};

/* ---------- render ---------- */
$('#bands').innerHTML=[[34,'0%',C.orange],[22,'18%',C.orange],[46,'6%','#ff7a52'],[16,'30%',C.pink],[58,'2%',C.orange],[26,'14%','#c74a2a'],[40,'8%',C.orange],[14,'26%',C.blue],[30,'12%',C.orange]].map(([h,x,c])=>`<i style="--h:${h}px;--x:${x};--c:${c}"></i>`).join('');
$('#ind').innerHTML=INDUSTRIES.map(n=>`<div><span>${n}</span></div>`).join('');
$('#films').innerHTML=FILMS.map((f,i)=>{const p=f[4];
  return `<article class="pcard" style="--c1:${p.c1};--c2:${p.c2};--acc:${p.acc}">
  <div class="pc-top"><span>${String(i+1).padStart(2,'0')}</span><span class="pc-tag">${f[3]}</span></div>
  <div class="pc-win"><div class="win-bar"><i></i><i></i><i></i><b>${TITLES[f[8]]}</b><em>Illustrative</em></div><div class="win-body">${MOCK[f[8]]()}</div></div>
  <h3 class="h4">${f[0]}</h3><p>${f[1]}</p><p class="pc-res">${f[2]}</p></article>`}).join('');
const svcCell=s=>`<div class="cell svc"><span class="k">${s[0]}</span><div style="display:grid;gap:10px"><h3>${s[1]}</h3><p>${s[2]}</p></div></div>`;
(function(){
  window.__LOGO=LOGO;{const rs=document.querySelector('.svc-radar .rc svg');if(rs)rs.innerHTML=LOGO}
  const ICO=["<path d='M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12'/>", "<circle cx='6' cy='12' r='2.5'/><circle cx='18' cy='6' r='2.5'/><circle cx='18' cy='18' r='2.5'/><path d='M8.2 11l7.6-4M8.2 13l7.6 4'/>", "<rect x='4' y='8' width='16' height='11' rx='3'/><path d='M12 4v4M9 13h.01M15 13h.01M9 16h6'/>", "<rect x='3' y='4' width='18' height='13' rx='2'/><path d='M8 21h8M12 17v4'/>", "<circle cx='12' cy='12' r='8'/><path d='M12 7v5l3 2'/>"];
  $('#svcGrid').innerHTML=`<div class="sf-grid">`+SERVICES.map((s,i)=>`<article class="sf" style="--c:${[C.blue,C.lime,C.pink,C.blue,C.lime][i]}"><svg class="sf-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[i]}</svg><h3>${s[1]}</h3><small>${s[0]}</small><p>${s[2]}</p></article>`).join('')+`</div>`;
})();
$('#stack').innerHTML=`<div class="radar wy-orb hub-c" aria-hidden="true"><span class="hub-core"><svg viewBox="0 0 235 330">${LOGO}</svg><span class="orbit o1"><b><u></u></b></span><span class="orbit o2"><b><u></u></b></span><span class="orbit o3"><b><u></u></b></span></span></div>`+WHY.map((w,i)=>`<article class="wcard w${i+1}" style="--c:${w[2]}"><div class="wc-top"><b>${w[0]}</b><span>${String(i+1).padStart(2,'0')}</span></div><p>${w[1]}</p></article>`).join('');
(function(){const el=document.getElementById('ist');if(!el)return;const t=()=>{el.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date())};t();setInterval(t,30000)})();
$('#values').innerHTML=VALUES.map((v,i)=>`<div style="--c:${v[2]}"><svg viewBox="0 0 100 100" width="28" height="28" aria-hidden="true">${form(i%3,i%4,v[2],i+10)}</svg><h3 class="h4">${v[0]}</h3><p>${v[1]}</p></div>`).join('');
$('#faqList').innerHTML=FAQ.map((f,i)=>`<details${i===0?' open':''}><summary>${f[0]}<span class="pm" aria-hidden="true"></span></summary><div class="ans"><p>${f[1]}</p></div></details>`).join('');
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

$$('.pcard').forEach(c=>gsap.from(c,{y:60,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%'}}));

/* ---------- why cards: glow when they enter view ---------- */


/* ---------- manifesto: outline text fills with copper as you scroll, lines drift apart ---------- */
(function(){
  if(REDUCED){$$('.mf-t').forEach(t=>t.style.setProperty('--p',100));return}
  $$('.mf-t').forEach(t=>gsap.to(t,{'--p':100,ease:'none',scrollTrigger:{trigger:t,start:'top 88%',end:'top 38%',scrub:true}}));
  if(matchMedia('(min-width: 701px)').matches){
  }
  gsap.fromTo('.mf-glow',{scale:.5,opacity:.2},{scale:1.15,opacity:1,ease:'none',scrollTrigger:{trigger:'#manifesto',start:'top bottom',end:'bottom top',scrub:true}});
})();

/* ---------- cursor ring that swells over links and buttons ---------- */
(function(){
  const c=$('#cur'); if(!c||!FINE) return;
  const mx=gsap.quickTo(c,'x',{duration:.25,ease:'power3'}),my=gsap.quickTo(c,'y',{duration:.25,ease:'power3'});
  addEventListener('pointermove',e=>{mx(e.clientX);my(e.clientY);c.style.opacity=1},{passive:true});
  document.addEventListener('pointerover',e=>c.classList.toggle('big',!!e.target.closest('a,button,summary,.pill')));
  document.addEventListener('pointerleave',()=>c.style.opacity=0);
})();

/* ---------- about: stage timeline (callouts land, ring turns, scan line sweeps, progress fills) ---------- */
(function(){
  if(!$('#apin')) return;
  $$('.ap-hd .split').forEach(el=>{el.innerHTML=el.textContent.split(' ').map(w=>`<span style="display:inline-block;white-space:nowrap">${[...w].map(c=>`<span class="ch" style="display:inline-block">${c}</span>`).join('')}</span>`).join(' ')});
  if(REDUCED) return;
  const dots=$('#apDots');
  if(dots) dots.innerHTML=Array.from({length:16},(_,i)=>`<i class="ap-dot" style="left:${(6+Math.random()*88).toFixed(1)}%;top:${(18+Math.random()*72).toFixed(1)}%;--d:${(7+Math.random()*7).toFixed(1)}s;--dl:${(-Math.random()*9).toFixed(1)}s"></i>`).join('');
  const headIn=h=>{
    const t=gsap.timeline();
    t.from(h.querySelectorAll('.ch'),{yPercent:110,opacity:0,filter:'blur(6px)',duration:.9,ease:'expo.out',stagger:.025})
     .from(h.querySelectorAll('.dash'),{scaleX:0,duration:.8,ease:'expo.out'},.15);
    return t;
  };
  const AT=gsap.timeline({scrollTrigger:{trigger:'#about',start:'top top',end:'bottom bottom',scrub:.3}});
  AT.from('.abg',{opacity:.4,duration:.4},0)
    .fromTo('.ap-arcs',{y:70,opacity:0,rotate:-6},{y:-40,opacity:1,rotate:3,duration:1.8,ease:'none'},0);
  $$('.ap-co').forEach((co,i)=>{
    const num=co.querySelector('.num'),end=+num.dataset.count,suf=num.dataset.suffix,o={v:0};
    AT.from(co.querySelector('.br'),{scaleY:0,duration:.25},.3+i*.35)
      .from(co.querySelectorAll('b,p'),{x:-16,opacity:0,duration:.25,stagger:.05},.38+i*.35)
      .fromTo(o,{v:0},{v:end,duration:.3,onUpdate:()=>{num.textContent=Math.round(o.v)+suf}},.38+i*.35)
      .from(num,{opacity:0,duration:.1},.38+i*.35)
      .to(co,{y:[-34,26,-46][i]||0,duration:1.8,ease:'none'},0);
  });
  AT.add(headIn($('#about-h')),.2).from('.ap-chip',{clipPath:'inset(0 100% 0 0)',duration:.3},.1).to({},{duration:.4});
})();

/* ---------- services + capabilities: extra scroll motion ---------- */
(function(){
  if(REDUCED) return;
  // capabilities cards: spotlight follows the pointer, top line draws in, cards rise in turn
  $$('.tcards li').forEach(li=>{
    const tl=document.createElement('i'); tl.className='tl'; tl.setAttribute('aria-hidden','true'); li.appendChild(tl);
    li.addEventListener('pointermove',e=>{const r=li.getBoundingClientRect();li.style.setProperty('--mx',(e.clientX-r.left)+'px');li.style.setProperty('--my',(e.clientY-r.top)+'px')});
  });
  if($('.tcards')){
    const st={trigger:'.tcards',start:'top 88%'};
    gsap.fromTo('.tcards .tl',{'--p':0},{'--p':1,duration:1.4,ease:'power3.out',stagger:.12,scrollTrigger:st});
    gsap.from('.tcards b',{opacity:0,x:-14,duration:.9,ease:'expo.out',stagger:.12,scrollTrigger:st});
  }
  // services: kinetic labels + slow parallax on the grid's centre cell
  if($('#svcGrid')){
    
  }
})();

/* ---------- capabilities: marquee that speeds up with scroll, card reveal ---------- */
(function(){
  const WORDS=['AI Agents','LLM Apps','RAG Pipelines','Autonomous Agents','Machine Learning','Automation','AI Integration','AI Consulting','Full-Stack Apps','Web','Mobile','Cloud'];
  $$('#tech .mq-row').forEach((row,ri)=>{
    const inn=$('.mq-in',row),list=ri?[...WORDS].reverse():WORDS;
    const html=list.map(w=>`<span>${w}</span>`).join('');
    inn.innerHTML=html; row.appendChild(inn.cloneNode(true));            // two identical halves = seamless loop
    const parts=$$('.mq-in',row),dir=+row.dataset.dir;
    if(REDUCED) return;
    let boost=1,x=dir<0?0:-1;
    const w=()=>parts[0].offsetWidth+14;
    gsap.ticker.add(()=>{
      boost+=(1-boost)*.06;
      x+=dir*(.6*boost);
      const W=w(); if(x<=-W) x+=W; if(x>0) x-=W;
      parts.forEach(p=>p.style.transform=`translate3d(${x}px,0,0)`);
    });
    ScrollTrigger.create({trigger:'#tech',start:'top bottom',end:'bottom top',onUpdate:s=>{boost=1+Math.min(Math.abs(s.getVelocity())/260,7)}});
  });
  gsap.from('#tech .mq-row',{opacity:0,y:40,duration:1.1,ease:'expo.out',stagger:.15,scrollTrigger:{trigger:'#tech .mq',start:'top 88%'}});
  gsap.from('#tech .tcards li',{y:60,opacity:0,duration:1.1,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:'#tech .tcards',start:'top 90%'}});
  gsap.from('#tech-h',{y:50,opacity:0,filter:'blur(10px)',duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'#tech-h',start:'top 90%'}});
})();

/* ---------- v12 motion: fabric bands, flow, orbit, counters, tilt ---------- */
(function(){
  gsap.to('.glow .bands i',{x:()=>gsap.utils.random(-50,50),duration:()=>gsap.utils.random(4,7),repeat:-1,yoyo:true,ease:'sine.inOut',stagger:{each:.3,from:'random'}});
  gsap.to('.glow .arcs',{rotate:6,duration:9,repeat:-1,yoyo:true,ease:'sine.inOut',transformOrigin:'100% 100%'});
  gsap.to('.glow',{yPercent:22,ease:'none',scrollTrigger:{trigger:'#top',start:'top top',end:'bottom top',scrub:true}});

  // why: cards take turns lighting up with the orbiting dots
  const wc=$$('.wcard');let wi=0;
  if(wc.length){const step=()=>{wc.forEach((c,i)=>c.classList.toggle('hot',i===wi));wi=(wi+1)%wc.length};}

  // process: pills take turns lighting up, a dot travels the dashed path between them
  (function(){
    const pp=$('.pp-pills'),pills=$$('.ppill'),fl=$('.pp-flow');if(!pp||!pills.length)return;
    let k=0;const step=()=>{pills.forEach((p,i)=>p.classList.toggle('on',i===k));k=(k+1)%pills.length};step();setInterval(step,2000);
    let tw=null;
    function drawFlow(){
      const r=pp.getBoundingClientRect();fl.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);
      const bx=pills.map(p=>p.getBoundingClientRect());let d='';
      for(let i=0;i<bx.length-1;i++){const a=bx[i],b=bx[i+1],x1=a.left-r.left+a.width*.3,y1=a.bottom-r.top,x2=b.left-r.left+b.width*.18,y2=b.top-r.top+b.height/2;d+=`M${x1} ${y1} C ${x1} ${y2}, ${x1+20} ${y2}, ${x2} ${y2} `}
      fl.innerHTML=`<path class="fl" d="${d}"/><circle class="tr" r="4.5"/>`;
      const path=$('.fl',fl),dot=$('.tr',fl),L=path.getTotalLength(),o={t:0};
      tw&&tw.kill();tw=gsap.to(o,{t:1,duration:5,ease:'none',repeat:-1,onUpdate:()=>{const pt=path.getPointAtLength(o.t*L);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y)}});
    }
    drawFlow();addEventListener('resize',drawFlow);addEventListener('load',drawFlow);setTimeout(drawFlow,500);
    gsap.from(pills,{y:30,opacity:0,duration:1,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:'.pp-pills',start:'top 85%'}});
  })();

  // stat counters
  $$('.a2-stats b[data-n]').forEach(b=>{const end=+b.dataset.n,s=b.dataset.s||'',o={v:0};
    b.textContent='0'+s;
    ScrollTrigger.create({trigger:b,start:'top 90%',once:true,onEnter:()=>gsap.to(o,{v:end,duration:1.6,ease:'power2.out',onUpdate:()=>b.textContent=Math.round(o.v)+s})})});

  // headings rise in
  $$('.pp-h,#svc-h,.pp-chip').forEach(el=>gsap.from(el,{y:36,opacity:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
  // dividers draw across
  $$('section.solid').forEach(s=>{const l=document.createElement('i');l.className='sec-line';l.setAttribute('aria-hidden','true');s.prepend(l);gsap.fromTo(l,{scaleX:0},{scaleX:1,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 85%',once:true}})});

  // card tilt
  if(FINE)$$('.pcard,.wcard').forEach(c=>{const rx=gsap.quickTo(c,'rotationX',{duration:.6,ease:'power3'}),ry=gsap.quickTo(c,'rotationY',{duration:.6,ease:'power3'}),yy=gsap.quickTo(c,'y',{duration:.5,ease:'power3'});
    gsap.set(c,{transformPerspective:900});
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*8);rx(-((e.clientY-r.top)/r.height-.5)*8);yy(-4)});
    c.addEventListener('pointerleave',()=>{rx(0);ry(0);yy(0)})});
})();

ScrollTrigger.refresh();
/* v16 extra motion: staggered reveals + scroll-linked drift */
(function(){
  const rv=(sel,vars,trig)=>$$(sel).length&&gsap.from(sel,Object.assign({opacity:0,duration:1.1,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:trig||sel,start:'top 85%'}},vars));
  gsap.from('.radar',{scale:.6,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'#stack',start:'top 85%'}});
  $$('.ppanel').forEach(p=>gsap.to(p,{backgroundPositionY:'30%',ease:'none',scrollTrigger:{trigger:p,scrub:true}}));
})();

/* v18: 3D tilt everywhere, spotlight, palette orbs, depth reveals */
(function(){
  const fine=matchMedia('(pointer:fine)').matches;
  /* orbs drift with scroll */
  [['#about',['#9ABFF5','#E2F8AC'],[-8,60]],['#contact',['#9ABFF5','#F5DFE3'],[10,30]],['#faq',['#E2F8AC','#9ABFF5'],[-6,40]]].forEach(([sel,cols,pos],n)=>{
    const s=$(sel);if(!s)return;
    cols.forEach((c,i)=>{const o=document.createElement('i');o.className='orb';const sz=260+i*120;o.style.cssText=`width:${sz}px;height:${sz}px;background:${c};${i?'right':'left'}:${i?pos[0]:pos[0]+4}%;top:${i?55:pos[1]-30}%`;s.prepend(o);
      })});
  /* depth reveals */
  const depth=(sel,trig)=>{if(!$$(sel).length)return;gsap.from(sel,{opacity:0,y:60,rotateX:-18,transformPerspective:900,transformOrigin:'50% 100%',duration:1.2,ease:'expo.out',stagger:.1,clearProps:'transform',scrollTrigger:{trigger:trig||sel,start:'top 88%'}})};
  depth('.f-cta');gsap.from('.a2-stats>div',{opacity:0,y:28,duration:.9,ease:'power3.out',stagger:.12,clearProps:'transform,opacity',scrollTrigger:{trigger:'.a2-stats',start:'top 92%'}});depth('.foot>div','.foot');
  /* tilt + spotlight */
  if(fine)$$('.a2-split .ind>div:not(.lab),.a2-stats>div,.fact,.cta-panel,.f-cta,.tcards>*,.hn,.ppill').forEach(c=>{
    c.classList.add('glint');
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
  });
  if(fine)$$('.a2-split .ind>div:not(.lab),.a2-stats>div,.fact,.tcards>*').forEach(c=>{
    const rx=gsap.quickTo(c,'rotationX',{duration:.5,ease:'power3'}),ry=gsap.quickTo(c,'rotationY',{duration:.5,ease:'power3'});gsap.set(c,{transformPerspective:800});
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*14);rx(-((e.clientY-r.top)/r.height-.5)*14)});
    c.addEventListener('pointerleave',()=>{rx(0);ry(0)})});
  /* big statement parallax + section headings scale */
  $$('.d2,.a2-statement').forEach(h=>gsap.fromTo(h,{y:30},{y:-30,ease:'none',scrollTrigger:{trigger:h,scrub:.8,start:'top bottom',end:'bottom top'}}));
  /* footer wordmark letters wave */
  /* logo in hero spins a little with scroll */
  if(stage&&stage.intro)gsap.to(stage.intro,{spin:1,ease:'none',scrollTrigger:{trigger:'#top',start:'top top',end:'bottom top',scrub:.6}});
})();

/* v19: scroll film (one pinned, video-like sequence) */
(function(){
  const stage=$('#filmStage');if(!stage)return;
  const N=FILMS.length,hd=$('#filmH b'),card=$('#filmCard'),num=$('#filmN'),bar=$('#filmBar'),bands=$$('.fb i'),fq=$('.fq');
  let cur=-1;
  function set(i,first){
    if(i===cur)return;cur=i;const f=FILMS[i],pal=f[4];
    stage.style.setProperty('--c1',pal.c1);stage.style.setProperty('--c2',pal.c2);stage.style.setProperty('--acc',pal.acc);
    num.textContent=String(i+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
    const apply=()=>{hd.textContent=f[0]+'.';$('em',card).textContent=f[3];$('p',card).textContent=f[1];$('strong',card).textContent=f[2]};
    if(first||REDUCED){apply();return}
    gsap.timeline().to([hd,card],{yPercent:-40,opacity:0,duration:.25,ease:'power2.in',onComplete:apply}).fromTo([hd,card],{yPercent:60,opacity:0},{yPercent:0,opacity:1,duration:.6,ease:'expo.out',stagger:.08});
  }
  set(0,true);
  if(REDUCED)return;
  ScrollTrigger.create({trigger:stage,start:'top top',end:'+='+(N*55)+'%',pin:true,scrub:true,
    onUpdate:s=>{set(Math.min(N-1,Math.floor(s.progress*N)));gsap.set(bar,{scaleX:s.progress});
      gsap.set(fq,{rotationY:s.progress*540,rotationX:Math.sin(s.progress*6)*14,transformPerspective:900});}});
})();

/* v20: hub centre orbits, node cycling, work-card scan */
(function(){
  const core=$('.hub-core');if(core&&!$('.orbit',core)){
    ['o1','o2','o3'].forEach((c,i)=>{const o=document.createElement('span');o.className='orbit '+c;o.innerHTML='<b><u></u></b>';core.appendChild(o)})}
  const nodes=$$('#svcGrid .sf');let k=0;
  setInterval(()=>{nodes.forEach(n=>n.classList.remove('ping'));const n=nodes[k%nodes.length];n.classList.add('ping');core&&core.classList.add('beat');setTimeout(()=>core&&core.classList.remove('beat'),700);k++},1600);
  /* about cells light up one after another */
  const cells=$$('.a2-split .ind>div:not(.lab)');let a=0;
  setInterval(()=>{cells.forEach(c=>c.classList.remove('lit'));cells[a%cells.length].classList.add('lit');a++},1400);
  if(window.gsap&&cells.length)gsap.from(cells,{opacity:0,rotateX:-70,y:30,transformOrigin:'50% 0',transformPerspective:700,duration:1,ease:'expo.out',stagger:.09,clearProps:'transform,opacity',scrollTrigger:{trigger:'#ind',start:'top 88%'}});
})();

/* v21: fabric banner motion + side nav tracking */
(function(){
  const bands=$$('.fab i');
  if(bands.length&&window.gsap&&!REDUCED){
  }
  const links=$$('#sidenav a');
  links.forEach(a=>{const t=$(a.getAttribute('href'));if(!t)return;ScrollTrigger.create({trigger:t,start:'top 55%',end:'bottom 55%',onToggle:s=>{if(s.isActive){links.forEach(l=>l.classList.toggle('on',l===a))}}})});
})();

/* v22: Work cards stack, previous cards recede */
(function(){
  const cards=$$('#films .pcard');if(!cards.length)return;
  cards.forEach((c,i)=>{c.style.setProperty('--i',i);
    return;
    const nxt=cards[i+1];if(!nxt)return;
    gsap.to(c,{scale:.93,filter:'brightness(.55)',ease:'none',scrollTrigger:{trigger:nxt,start:'top 85%',end:'top 20%',scrub:true}});
    gsap.fromTo($('.pc-win',c),{rotateY:-8},{rotateY:8,ease:'none',transformPerspective:900,scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}});
  });
})();
addEventListener('load',()=>ScrollTrigger.refresh());
}));

/* v25: Why cards fly in from the sides, ring spins with scroll, manifesto marquee */
(function(){
  if(typeof gsap==='undefined'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const cards=gsap.utils.toArray('.wcard');
  cards.forEach((c,i)=>gsap.fromTo(c,{clipPath:'inset(0 100% 0 0)',opacity:.2},{clipPath:'inset(0 0% 0 0)',opacity:1,duration:1.1,ease:'power4.inOut',delay:i*.15,clearProps:'clipPath',scrollTrigger:{trigger:'.wpanel',start:'top 65%'}}));
  gsap.to('.wpanel .pp-lines i',{xPercent:(i)=>(i%2?-1:1)*40,ease:'none',scrollTrigger:{trigger:'.wpanel',scrub:1}});
})();

/* v30: services features reveal */
(function(){if(typeof gsap==='undefined'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  gsap.from('.sf',{opacity:0,y:36,duration:1,ease:'expo.out',stagger:.1,clearProps:'transform,opacity',scrollTrigger:{trigger:'.sf-grid',start:'top 85%'}});
  gsap.from('.svc-radar',{opacity:0,scale:.8,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'#services',start:'top 70%'}});
  gsap.to('.svc-glow .gl',{xPercent:(i)=>i?-8:8,duration:6,ease:'sine.inOut',repeat:-1,yoyo:true})})();


/* v32: Work cards get animated illustrations (orbit, hub, panels, flow) */
(function(){
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const I={lock:"<rect x='5' y='11' width='14' height='9' rx='2'/><path d='M8 11V8a4 4 0 0 1 8 0v3'/>",doc:"<path d='M7 3h7l4 4v14H7z'/><path d='M14 3v4h4M10 12h5M10 16h5'/>",shield:"<path d='M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z'/><path d='M9 12l2 2 4-4'/>",bolt:"<path d='M13 3L5 14h6l-1 7 8-11h-6z'/>",chat:"<path d='M4 5h16v11H9l-5 4z'/>",db:"<ellipse cx='12' cy='6' rx='7' ry='3'/><path d='M5 6v6c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3 3 7 3s7-1.3 7-3v-6'/>",user:"<circle cx='12' cy='8' r='4'/><path d='M4 21c1-4 4-6 8-6s7 2 8 6'/>",cube:"<path d='M12 3l8 4.5v9L12 21l-8-4.5v-9z'/><path d='M12 12l8-4.5M12 12v9M12 12L4 7.5'/>"};
  const ic=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg>`;
  const logo=()=>{const s=$('.svc-radar .rc svg');return `<svg viewBox="0 0 235 330" fill="currentColor">${window.__LOGO||(s?s.innerHTML:'')}</svg>`};
  const V={
    orbit:t=>`<div class="rings"><i></i><i></i><i></i></div><div class="orb-c"><div class="sphere">${logo()}</div></div><div class="spin s1"><span class="bd">${ic('lock')}</span></div><div class="spin s2"><span class="bd">${ic('doc')}</span></div><div class="spin s3"><span class="bd">${ic('shield')}</span></div>`,
    hub:t=>`<svg class="hl" viewBox="0 0 300 200" preserveAspectRatio="none"><path d="M150 150 L55 82"/><path d="M150 150 L108 40"/><path d="M150 150 L204 40"/><path d="M150 150 L250 82"/></svg><span class="av a1">${ic('user')}</span><span class="av a2">${ic('chat')}</span><span class="av a3">${ic('db')}</span><span class="av a4">${ic('bolt')}</span><span class="pill-c">${t}</span>`,
    panel:t=>`<div class="pn back"><div class="tabs"><b>Design</b><b>Animate</b></div><div class="rows"><i></i><i></i><i></i><i></i></div></div><div class="pn front"><div class="tabs"><b>Layers</b><b>Items</b></div><div class="lay on">${ic('cube')}Scene</div><div class="lay">${ic('doc')}Rectangle</div><div class="lay">${ic('chat')}Interface</div></div><span class="cur"></span>`,
    flow:t=>`<span class="sq q1">${ic('doc')}</span><span class="ln l1"><u></u></span><span class="ctr">${logo()}</span><span class="ln l2"><u></u></span><span class="sq q2">${ic('db')}</span>`
,
    doc:t=>`<div class="dg"><span class="pg p1"></span><span class="pg p2"></span><span class="pg p3"></span></div><div class="scanln"></div><div class="fields"><b style="--d:0s">Vendor</b><b style="--d:.5s">Amount</b><b style="--d:1s">Due date</b><b style="--d:1.5s">Signature</b></div>`,
    chat:t=>`<div class="bub u">Where is my order?</div><div class="bub dots"><i></i><i></i><i></i></div><div class="bub b">Delivered at 14:02 — I've opened a trace for you.</div><div class="ok">✓ Resolved</div>`,
    search:t=>`<div class="sbar"><span class="q">What does our contract say about renewals?</span></div><div class="res r1"><i></i><i></i><em>contract_v3.pdf · p4</em></div><div class="res r2"><i></i><i></i><em>policy.docx · p2</em></div><div class="res r3"><i></i><i></i><em>msa.pdf · p9</em></div>`,
    draft:t=>`<div class="paper"><b></b><i style="--w:80%;--d:0s"></i><i style="--w:92%;--d:.7s"></i><i style="--w:66%;--d:1.4s"></i><i style="--w:86%;--d:2.1s"></i><i style="--w:54%;--d:2.8s"></i></div><div class="agent">${ic('bolt')}Agent drafting…</div><div class="prog"><u></u></div>`,
    chart:t=>`<svg class="ch" viewBox="0 0 300 160" preserveAspectRatio="none"><g class="bars">${[30,48,40,66,58,82,74].map((h,i)=>`<rect x="${14+i*40}" y="${150-h}" width="22" height="${h}" rx="4" style="--d:${i*.12}s"/>`).join('')}</g><path class="ln1" d="M20 110 C60 90 90 100 120 70 S180 60 200 50"/><path class="ln2" d="M200 50 C230 40 260 30 290 18"/><circle class="dot" cx="200" cy="50" r="5"/></svg><span class="tagc">Forecast</span>`,
    flow2:t=>`<div class="wf"><span class="nd n1">${ic('doc')}</span><span class="cn c1"><u></u></span><span class="nd n2">${ic('bolt')}</span><span class="cn c2"><u></u></span><span class="nd n3">${ic('shield')}</span></div><div class="wfl"><b>Invoice received</b><b>Matched to PO</b><b>Approved & posted</b></div>`
  };
  const order=['doc','chat','search','draft','chart','flow2'];
  const apply=()=>$$('#films .pcard').forEach((c,i)=>{const w=$('.pc-win',c);if(!w)return;const t=($('.pc-tag',c)||{textContent:'Elanster'}).textContent;
    const v=document.createElement('div');v.className='pc-viz v-'+order[i%6];v.setAttribute('aria-hidden','true');v.innerHTML=V[order[i%6]](t);w.replaceWith(v)});
  apply();const f=$('#films');if(f)new MutationObserver(apply).observe(f,{childList:true,subtree:true});
})();
