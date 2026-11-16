/* Sample dashboards. All figures are illustrative, not client results. */
(function(){
var root=document.getElementById('dash');if(!root)return;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var D=[
 {id:'docs',name:'Document intelligence',kpis:[['Documents read','1,284',''],['Routed automatically','1,096',''],['Sent to a person','188',''],['Avg. time per document','4 s','']],
  chart:{t:'Documents per day',a:[40,52,48,66,71,64,88,95,90,112,120,131],b:[30,38,36,50,57,51,72,80,77,96,104,115],la:'Received',lb:'Routed automatically'},
  bars:[['Invoices',86],['Contracts',64],['Claims',52],['Forms',41]],bt:'By document type',
  feed:[['Invoice routed','Finance'],['Contract flagged','Legal'],['Claim extracted','Claims'],['Form routed','Ops'],['Invoice routed','Finance'],['Signature found','Legal']],ft:'Latest documents'},
 {id:'support',name:'Support copilot',kpis:[['Questions today','842',''],['Answered end to end','611',''],['Handed to a person','231',''],['First reply','9 s','']],
  chart:{t:'Questions per hour',a:[20,26,34,45,52,60,58,66,72,64,55,48],b:[14,19,25,33,39,46,43,50,55,48,41,36],la:'Received',lb:'Answered end to end'},
  bars:[['Order status',90],['Returns',58],['Billing',37],['Product info',49]],bt:'By topic',
  feed:[['Order status answered','Chat'],['Return started','Email'],['Handed to agent','Chat'],['Billing answered','Chat'],['Order status answered','Email'],['Return started','Chat']],ft:'Latest conversations'},
 {id:'know',name:'Knowledge search',kpis:[['Questions asked','356',''],['Answers with sources','341',''],['Documents indexed','12,480',''],['Avg. answer time','3 s','']],
  chart:{t:'Searches per day',a:[18,22,30,28,39,44,41,52,58,55,63,70],b:[16,20,28,26,36,41,38,49,54,52,60,66],la:'Searches',lb:'Answered with sources'},
  bars:[['Policies',72],['Contracts',55],['Manuals',63],['Past proposals',34]],bt:'By source',
  feed:[['Leave policy found','HR'],['Renewal terms found','Legal'],['Setup guide found','Support'],['Vendor clause found','Procurement'],['Leave policy found','HR'],['Past proposal found','Sales']],ft:'Latest searches'}
];
var tabs=root.querySelector('.dash-tabs'),body=root.querySelector('.dash-body'),cur=0,timer=null,played=false;
tabs.innerHTML=D.map(function(d,i){return '<button type="button" role="tab" id="dt'+i+'" aria-selected="'+(i===0)+'" aria-controls="dpanel" tabindex="'+(i===0?0:-1)+'">'+d.name+'</button>'}).join('');
function path(v,w,h,max){var n=v.length;return v.map(function(y,i){return (i?'L':'M')+(i*w/(n-1)).toFixed(1)+' '+(h-y/max*h).toFixed(1)}).join(' ')}
function count(el,txt){var m=txt.match(/^([\d,]+)(.*)$/);if(!m||reduce){el.textContent=txt;return}var end=+m[1].replace(/,/g,''),t0=null,suf=m[2];function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/1000),e=1-Math.pow(1-p,3);el.textContent=Math.round(end*e).toLocaleString('en-US')+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function render(i){
 var d=D[i],W=640,H=200,max=Math.max.apply(null,d.chart.a)*1.1;
 var spark=function(v){return '<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="'+path(v,100,36,Math.max.apply(null,v))+'" fill="none" stroke="#9ABFF5" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>'};
 body.innerHTML=
 '<div class="dash-kpis">'+d.kpis.map(function(k,j){return '<div class="kpi"><small>'+k[0]+'</small><b data-v="'+k[1]+'">0</b>'+spark(d.chart.a.map(function(y,x){return y*(1+((x*(j+3))%5)/9)}))+'</div>'}).join('')+'</div>'+
 '<div class="dash-grid"><div class="card"><h3>'+d.chart.t+'</h3>'+
 '<svg class="chart" viewBox="0 0 '+W+' '+(H+22)+'" role="img" aria-label="Sample line chart: '+d.chart.t+'"><title>'+d.chart.t+' (sample data)</title><desc>Illustrative sample data, not client results.</desc><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b46e0" stop-opacity=".5"/><stop offset="1" stop-color="#4b46e0" stop-opacity="0"/></linearGradient></defs>'+
 [0,1,2,3].map(function(g){return '<line class="grid" x1="0" x2="'+W+'" y1="'+(g*H/3)+'" y2="'+(g*H/3)+'"/>'}).join('')+
 '<path class="area" d="'+path(d.chart.a,W,H,max)+' L'+W+' '+H+' L0 '+H+'Z" style="opacity:0;transition:opacity 1s .6s" />'+
 '<path class="ln2" d="'+path(d.chart.b,W,H,max)+'"/>'+
 '<path class="ln" id="mainln" d="'+path(d.chart.a,W,H,max)+'"/>'+
 '<circle class="pt" r="5" cx="'+W+'" cy="'+(H-d.chart.a[d.chart.a.length-1]/max*H).toFixed(1)+'" style="opacity:0;transition:opacity .4s 1.3s"/>'+
 '<text x="0" y="'+(H+16)+'">Day 1</text><text x="'+W+'" y="'+(H+16)+'" text-anchor="end">Day 12</text></svg>'+
 '<div class="legend"><span><i></i>'+d.chart.la+'</span><span><i class="l"></i>'+d.chart.lb+'</span></div></div>'+
 '<div class="card"><h3>'+d.bt+'</h3><div class="bars">'+d.bars.map(function(b){return '<div><span>'+b[0]+'</span><span class="t"><i data-w="'+b[1]+'"></i></span><b>'+b[1]+'</b></div>'}).join('')+'</div>'+
 '<h3 style="margin-top:22px">'+d.ft+'</h3><ul class="feed" id="feed"></ul></div></div>';
 body.setAttribute('aria-labelledby','dt'+i);
 body.querySelectorAll('.kpi b').forEach(function(b){count(b,b.getAttribute('data-v'))});
 var ln=body.querySelector('#mainln');
 if(ln&&!reduce){var L=ln.getTotalLength();ln.style.strokeDasharray=L;ln.style.strokeDashoffset=L;ln.getBoundingClientRect();ln.style.transition='stroke-dashoffset 1.5s cubic-bezier(.2,.8,.2,1)';ln.style.strokeDashoffset=0}
 setTimeout(function(){var a=body.querySelector('.area'),p=body.querySelector('.pt');if(a)a.style.opacity=1;if(p)p.style.opacity=1;body.querySelectorAll('.bars i').forEach(function(x){x.style.width=x.getAttribute('data-w')+'%'})},60);
 var ul=body.querySelector('#feed'),k=0;
 function add(){var f=d.feed[k++%d.feed.length];var li=document.createElement('li');li.innerHTML='<span>'+f[0]+'</span><span>'+f[1]+'</span>';ul.insertBefore(li,ul.firstChild);while(ul.children.length>5)ul.removeChild(ul.lastChild)}
 for(var n=0;n<4;n++)add();
 clearInterval(timer);if(!reduce)timer=setInterval(add,2200);
}
function pick(i,focus){cur=i;tabs.querySelectorAll('button').forEach(function(b,j){b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});render(i);if(focus)tabs.children[i].focus()}
tabs.addEventListener('click',function(e){var b=e.target.closest('button');if(b)pick([].indexOf.call(tabs.children,b))});
tabs.addEventListener('keydown',function(e){var n=D.length;if(e.key==='ArrowRight')pick((cur+1)%n,1);else if(e.key==='ArrowLeft')pick((cur+n-1)%n,1);else return;e.preventDefault()});
body.id='dpanel';body.setAttribute('role','tabpanel');
render(0);
if('IntersectionObserver' in window){new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){if(!played){played=true}else render(cur);o.disconnect()}})},{threshold:.35}).observe(root)}
})();
