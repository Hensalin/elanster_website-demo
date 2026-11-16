(function(){
var d=document,w=window;
var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion:reduce)').matches;
var fine=w.matchMedia&&w.matchMedia('(hover:hover) and (pointer:fine)').matches;
function ready(f){d.readyState!=='loading'?f():d.addEventListener('DOMContentLoaded',f)}
ready(function(){
 /* headline word-by-word reveal (text preserved) */
 if(!rm){
  d.querySelectorAll('.ph h1,.bh h1,.wk-l h1,.art-pg h1').forEach(function(h){
   if(h.children.length)return;
   var t=h.textContent.trim();h.setAttribute('aria-label',t);
   h.innerHTML=t.split(/\s+/).map(function(x,i){return '<span class="sw" aria-hidden="true" style="--i:'+i+'"><i>'+x+'</i></span>'}).join(' ');
   requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.add('sw-on')})});
  });
 }
 /* stagger siblings of reveal elements */
 var groups=new Map();
 d.querySelectorAll('.rv').forEach(function(e){var p=e.parentElement;var n=groups.get(p)||0;e.style.setProperty('--d',Math.min(n,6)*80+'ms');groups.set(p,n+1)});
 /* auto-reveal cards that lack .rv */
 var io=('IntersectionObserver' in w)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
 d.querySelectorAll('.srow,.fc,.post,.job,.lr,.steps li,.faq details,.inds span,.hero-art,.body p,.body h2').forEach(function(e,i){
  if(e.classList.contains('rv')||!io)return;
  e.classList.add('rv');e.style.setProperty('--d',(i%4)*70+'ms');io.observe(e);
 });
 /* timeline draw */
 var st=d.querySelector('.steps');
 if(st){
  var tick=function(){var r=st.getBoundingClientRect(),vh=w.innerHeight;
   var p=(vh*.6-r.top)/r.height;p=Math.max(0,Math.min(1,p));st.style.setProperty('--tl',rm?1:p.toFixed(3))};
  tick();w.addEventListener('scroll',tick,{passive:true});w.addEventListener('resize',tick);
 }
 if(rm||!fine)return;
 /* 3D tilt on cards */
 d.querySelectorAll('.fc,.post,.srow,.job').forEach(function(c){
  c.classList.add('tilt');
  c.addEventListener('mousemove',function(e){
   var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   c.style.transform='perspective(900px) rotateX('+(-y*5).toFixed(2)+'deg) rotateY('+(x*6).toFixed(2)+'deg) translateY(-4px)';
  });
  c.addEventListener('mouseleave',function(){c.style.transform=''});
 });
 /* magnetic buttons */
 d.querySelectorAll('.ph .btn,.talk .btn,.fb2 .btn,.wk-l .btn').forEach(function(b){
  b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();
   b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+'px)'});
  b.addEventListener('mouseleave',function(){b.style.transform=''});
 });
 /* hero orb parallax */
 var hero=d.querySelector('.ph,.bh');
 if(hero){w.addEventListener('scroll',function(){hero.style.setProperty('--sy',Math.min(w.scrollY,600)+'px')},{passive:true});
  hero.addEventListener('mousemove',function(e){var x=(e.clientX/w.innerWidth-.5)*30,y=(e.clientY/w.innerHeight-.5)*30;hero.style.setProperty('--ox',x+'px');hero.style.setProperty('--oy',y+'px')});}
});
})();
