(function(){
'use strict';
var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
window.dataLayer=window.dataLayer||[];
function track(n,p){var e=Object.assign({event:n,page:location.pathname},p||{});window.dataLayer.push(e);try{d.dispatchEvent(new CustomEvent('elanster:track',{detail:e}))}catch(_){}}
/* mobile menu */
var mb=$('#menuBtn'),nav=$('#nav');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
$$('a',nav).forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.focus()}});
/* ship board */
var note=$('#boardNote');
$$('.lane button').forEach(function(b){
  function show(){$$('.lane button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});note.textContent=b.textContent.trim()+': '+b.getAttribute('data-note')}
  b.setAttribute('aria-pressed','false');b.addEventListener('click',show);b.addEventListener('focus',show);b.addEventListener('mouseenter',show);
});
/* problems switcher (illustrative builds) */
var PAINS=[
 {q:'Too many documents sorted by hand?',name:'Document intelligence',tag:'AI agents',desc:'An AI pipeline that classifies, extracts and routes business documents.',res:'Less manual review, faster routing.',before:['invoice_0412.pdf','contract_draft.docx','claim_form.pdf'],after:[['Invoice','Finance'],['Contract','Legal'],['Claim form','Operations']]},
 {q:'Too many tickets answered one by one?',name:'Support copilot',tag:'LLM apps',desc:'An LLM-powered assistant that resolves customer queries end to end.',res:'Faster answers, lighter queues.',before:['Where is my order?','How do I reset access?','Refund status?'],after:[['Order status','Answered'],['Access reset','Answered'],['Refund','Handed to a person']]},
 {q:'Years of files searched by hand?',name:'Knowledge search',tag:'RAG pipelines',desc:'Search across years of internal documents that answers with its sources.',res:'Answers with sources, in seconds.',before:['Folder: Policies 2019','Folder: Contracts','Shared drive: old'],after:[['Renewal terms','Source cited'],['Leave policy','Source cited'],['Vendor clause','Source cited']]},
 {q:'RFPs written from scratch every time?',name:'Proposal automation',tag:'Autonomous agents',desc:'AI agents that draft bids and RFP responses from past wins.',res:'Days of turnaround cut to hours.',before:['Blank document','Copy from last bid','Chase for answers'],after:[['Sections','Drafted'],['Past wins','Matched'],['Review','Ready for you']]},
 {q:'Too much guesswork in every stock order?',name:'Demand forecasting',tag:'Machine learning',desc:'Machine-learning forecasting wired into retail operations.',res:'Smarter stock decisions every morning.',before:['Last year\'s sheet','Gut feel','Rush orders'],after:[['Store A','Forecast ready'],['Store B','Forecast ready'],['Seasonal item','Flagged']]},
 {q:'Too many spreadsheets copied by hand?',name:'Back-office automation',tag:'Automation',desc:'AI-driven workflow automation across finance and operations.',res:'Hours of manual work removed daily.',before:['Export to sheet','Paste into system','Check totals'],after:[['Export','Automated'],['Entry','Automated'],['Totals','Checked']]}
];
var list=$('#pains'),panel=$('#painPanel');
PAINS.forEach(function(p,i){
  var b=d.createElement('button');b.type='button';b.setAttribute('role','tab');b.id='pain'+i;b.setAttribute('aria-controls','painPanel');b.textContent=p.q;
  b.addEventListener('click',function(){pick(i,true)});
  b.addEventListener('keydown',function(e){var k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();var n=(i+k+PAINS.length)%PAINS.length;pick(n,true);$('#pain'+n).focus()});
  list.appendChild(b);
});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pick(i,user){
  var p=PAINS[i];
  $$('#pains button').forEach(function(b,j){b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});
  panel.setAttribute('aria-labelledby','pain'+i);
  panel.innerHTML='<span class="sp-tag">'+esc(p.tag)+'</span><h3 class="sp-title">'+esc(p.name)+'</h3><p class="sp-desc">'+esc(p.desc)+'</p>'+
   '<div class="sp-mock"><div class="sp-col"><h4>Today</h4><ul>'+p.before.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul></div>'+
   '<div class="sp-col after"><h4>With the build</h4><ul>'+p.after.map(function(x){return'<li>'+esc(x[0])+'<em>'+esc(x[1])+'</em></li>'}).join('')+'</ul></div></div>'+
   '<p class="sp-result">'+esc(p.res)+'</p><p class="sp-foot">Illustrative example from our practice areas, not a client result.</p>';
  if(user)track('problem_select',{problem:p.name});
}
pick(0,false);
/* FAQ */
var FAQ=[
['How fast can you deliver an AI MVP?','Most AI MVPs ship in 4 to 12 weeks from kickoff to production. Not a prototype, but a deployed product on real infrastructure. Timelines depend on scope, and we give an honest estimate on the strategy call.'],
['What happens on the strategy call?','A 30-minute session with a lead architect. We pressure-test your plan, map the quickest route from concept to production, and send follow-up notes within 24 hours. You leave with a clear first milestone your team can execute.'],
['What does "production-ready" actually mean?','A deployed product on real infrastructure, built to the same security protocols and code-review standards as every Elanster project. Not a demo or a prototype, and we stay accountable after launch.'],
['What if AI isn\'t the right answer for our problem?','Then we will say so. AI readiness reviews and architecture audits exist to separate genuine opportunities from hype, and honest trade-offs are one of our values. Sometimes the right first step is strong engineering, not AI.'],
['What AI-enabled development services do you offer?','Full-stack AI products end to end: AI-enabled development, AI integration into existing products, autonomous agents and workflow automation, RAG pipelines, and AI consulting, all backed by eight years of web, mobile and cloud engineering.'],
['Which industries do you work with?','E-commerce, healthcare, faith-based organizations, human resources, education, professional services and retail. Strong engineering fundamentals travel well between domains.'],
['What makes you different from other AI development agencies?','We are an eight-year product engineering company that builds AI properly: architecture first, humans in the loop, production-ready from day one, and accountable long after launch.'],
['How do your engagements work?','We start with a strategy call to understand your goals, constraints and timeline. Then we map the right model, a fixed-scope build, an embedded product team or an ongoing partnership, with two meetings a week and full visibility throughout.'],
['Do you work with enterprise clients?','Yes. Enterprise delivery is our default standard. Security protocols, code-review discipline and compliance-aware architecture apply to every project, whatever its size.'],
['Where is Elanster based?','Chennai, India, serving clients worldwide. We work inside your Slack and repositories, with two meetings a week: Monday planning and Friday sprint review.']
];
$('#faqList').innerHTML=FAQ.map(function(f,i){return'<details'+(i===0?' open':'')+'><summary>'+esc(f[0])+'</summary><p>'+esc(f[1])+'</p></details>'}).join('');
$$('#faqList details').forEach(function(x){x.addEventListener('toggle',function(){if(x.open)track('faq_open',{question:$('summary',x).textContent})})});
/* project fit */
var f=$('#fitForm'),out=$('#fitOut'),err=$('#fitErr'),started=false;
var GOAL={mvp:['New AI product or MVP','AI-enabled development','Scope a first production release around one core user journey.'],integrate:['AI added to an existing product','AI integration','Review your current architecture and pick the one workflow where AI adds the most value.'],automate:['Business workflow automation','AI agents and automation','Map the manual steps, then decide where people stay in the loop and where agents draft or route.'],rag:['Document search with sources','RAG pipelines','Audit the documents and access rules first, then design retrieval that cites its sources.'],unsure:['Direction still open','AI consulting','Start with an AI readiness review to find where AI pays off before committing to a build.']};
var STAGE={idea:'Starting from an idea, the first step is shaping scope.',proto:'With a prototype in hand, the first step is hardening it for production.',live:'With a live product, the first step is a focused integration plan that does not disrupt what works.'};
var TIME={fast:'You need results within a month, so we would scope a tightly focused first milestone. Our typical range for a deployed AI MVP is 4 to 12 weeks, and we will give an honest estimate on the call.',mid:'One to three months fits our typical 4 to 12 week range for a deployed AI MVP, depending on scope.',long:'A longer horizon leaves room for phased delivery, with a working release at each stage.'};
var TEAM={none:'We would run delivery end to end, with Monday planning and Friday review.',small:'We would embed alongside your team, in your Slack and repositories, with two meetings a week.',large:'We would work inside your existing review and release process, to the same security and code-review standards.'};
function val(n){var c=$('input[name="'+n+'"]:checked',f);return c?c.value:null}
f.addEventListener('change',function(){if(!started){started=true;track('fit_start')}err.hidden=true});
f.addEventListener('submit',function(e){
  e.preventDefault();
  var g=val('goal'),s=val('stage'),t=val('time'),m=val('team');
  if(!(g&&s&&t&&m)){err.hidden=false;return}
  var G=GOAL[g];
  function lbl(n){return $('input[name="'+n+'"]:checked+span',f).textContent}
  var sum='Project: '+G[0]+'\nSuggested service area: '+G[1]+'\nStage: '+lbl('stage')+'\nTimeline: '+lbl('time')+'\nTeam: '+lbl('team');
  out.innerHTML='<h3>Suggested first step</h3><p class="fo-svc">'+esc(G[1])+'</p><p>'+esc(G[2])+'</p><ul><li>'+esc(STAGE[s])+'</li><li>'+esc(TIME[t])+'</li><li>'+esc(TEAM[m])+'</li></ul><p class="fo-note">This is an indicative starting point based on your answers, not a quotation. Scope, timeline and cost are confirmed on the strategy call.</p><div class="fo-cta"><a class="btn btn-lime" href="https://meete.be" target="_blank" rel="noopener">Book a strategy call</a><button class="btn btn-line" type="button" id="fitCopy">Copy my project summary</button></div><pre class="fo-sum" id="fitSum"></pre>';
  $('#fitSum',out).textContent=sum;out.hidden=false;
  $('#fitCopy',out).addEventListener('click',function(ev){var b=ev.currentTarget;
    (navigator.clipboard?navigator.clipboard.writeText(sum):Promise.reject()).then(function(){b.textContent='Copied'}).catch(function(){var r=d.createRange();r.selectNodeContents($('#fitSum',out));var se=getSelection();se.removeAllRanges();se.addRange(r);b.textContent='Selected. Press Ctrl+C'});track('fit_copy')});
  track('fit_complete',{goal:g,stage:s,timeline:t,team:m});
  out.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'nearest'});
});
/* CTA tracking */
d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
  if(/meete\.be/.test(h)){var s=a.closest('section,header,footer');track('cta_click',{cta:'strategy_call',location:s?(s.id||s.className.split(' ')[0]):'page'})}
  else if(/linkedin/.test(h))track('outbound_click',{target:'linkedin'})},true);
/* IST clock */
var ist=$('#ist');function tick(){try{ist.textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})}catch(_){}}tick();setInterval(tick,30000);
})();
