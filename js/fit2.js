/* Elanster tracking layer: dataLayer events only, no cookies or third-party scripts */
(function(){var d=document,w=window;w.dataLayer=w.dataLayer||[];w.elTrack=function(n,p){var e=Object.assign({event:n,page:location.pathname},p||{});w.dataLayer.push(e);try{d.dispatchEvent(new CustomEvent('elanster:track',{detail:e}))}catch(_){}};
d.addEventListener('click',function(ev){var a=ev.target.closest&&ev.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';if(/meete\.be/.test(h)){var s=a.closest('section,header,footer');elTrack('cta_click',{cta:'strategy_call',location:s?(s.id||s.className.split(' ')[0]):'page'})}else if(/linkedin/.test(h))elTrack('outbound_click',{target:'linkedin'})},true);
d.addEventListener('toggle',function(ev){var t=ev.target;if(t&&t.tagName==='DETAILS'&&t.open&&t.closest('.faq'))elTrack('faq_open',{question:(t.querySelector('summary')||{}).textContent.trim().slice(0,80)})},true)})();
/* Project fit tool: client-side only, no data leaves the browser. Gives an indicative next step, never a quote. */
(function(){
  var f=document.getElementById('fitForm');if(!f)return;
  var out=document.getElementById('fitOut'),err=document.getElementById('fitErr'),started=false;
  var GOAL={
    mvp:['New AI product or MVP','AI-enabled development','Scope a first production release around one core user journey.'],
    integrate:['AI added to an existing product','AI integration','Review your current architecture and pick the one workflow where AI adds the most value.'],
    automate:['Business workflow automation','Autonomous agents and workflow automation','Map the manual steps, then decide where people stay in the loop and where agents draft or route.'],
    rag:['Document search and answers with sources','RAG pipelines','Audit the documents and access rules first, then design retrieval that cites its sources.'],
    unsure:['Direction still open','AI consulting','Start with an AI readiness review to find where AI actually pays off before committing to a build.']};
  var STAGE={idea:'Starting from an idea, the first step is shaping scope.',proto:'With a prototype in hand, the first step is hardening it for production.',live:'With a live product, the first step is a focused integration plan that does not disrupt what works.'};
  var TIME={fast:'You need results within a month, so we would scope a tightly focused first milestone. Our typical range for a deployed AI MVP is 4 to 12 weeks, and we will give an honest estimate on the call.',mid:'One to three months fits our typical 4 to 12 week range for a deployed AI MVP, depending on scope.',long:'A longer horizon leaves room for phased delivery, with a working release at each stage.'};
  var TEAM={none:'We would run delivery end to end with two meetings a week: Monday planning and Friday sprint review.',small:'We would embed alongside your team, in your Slack and repositories, with two meetings a week.',large:'We would work inside your existing review and release process, with the same security and code-review standards.'};
  function val(n){var c=f.querySelector('input[name="'+n+'"]:checked');return c?c.value:null}
  f.addEventListener('change',function(){if(!started){started=true;window.elTrack&&elTrack('fit_start')}err.hidden=true});
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var g=val('goal'),s=val('stage'),t=val('time'),m=val('team');
    if(!(g&&s&&t&&m)){err.hidden=false;var first=f.querySelector('fieldset:has(input:not(:checked))');return}
    var G=GOAL[g];
    var summary='Project: '+G[0]+'\nSuggested service area: '+G[1]+'\nStage: '+f.querySelector('input[name="stage"]:checked+span').textContent+'\nTimeline: '+f.querySelector('input[name="time"]:checked+span').textContent+'\nTeam: '+f.querySelector('input[name="team"]:checked+span').textContent;
    out.innerHTML='<h3>Suggested first step</h3><p class="est-svc">'+G[1]+'</p><p>'+G[2]+'</p><ul><li>'+STAGE[s]+'</li><li>'+TIME[t]+'</li><li>'+TEAM[m]+'</li></ul><p class="est-note">This is an indicative starting point based on your answers, not a quotation. Scope, timeline and cost are confirmed on the strategy call.</p><div class="est-cta"><a class="pill pill-w" href="https://meete.be" target="_blank" rel="noopener"><span>Book a Strategy Call</span> <span aria-hidden="true">→</span></a><button class="pill pill-o" type="button" id="fitCopy"><span>Copy my project summary</span></button></div><pre class="est-sum" id="fitSum"></pre>';
    out.querySelector('#fitSum').textContent=summary;out.hidden=false;
    out.querySelector('#fitCopy').addEventListener('click',function(ev){
      var b=ev.currentTarget,txt=summary;
      (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(function(){b.firstChild.textContent='Copied'}).catch(function(){var r=document.createRange();r.selectNodeContents(out.querySelector('#fitSum'));var sel=getSelection();sel.removeAllRanges();sel.addRange(r);b.firstChild.textContent='Selected - press Ctrl+C'});
      window.elTrack&&elTrack('fit_copy');
    });
    window.elTrack&&elTrack('fit_complete',{goal:g,stage:s,timeline:t,team:m});
    out.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'nearest'});
  });
})();
