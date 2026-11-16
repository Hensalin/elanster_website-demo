(function(){
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
/* 1. cards: pointer-follow glow + gentle tilt + lift */
if(fine){
 $$('.pcard,.hb-card,.fact,.tcards li,.ppanel,.est-form fieldset').forEach(function(c){
  c.classList.add('fx-on');var g=document.createElement('span');g.className='fx-glow';g.setAttribute('aria-hidden','true');c.appendChild(g);
  c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
   c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%');
   var dx=x-.5,dy=y-.5,m=Math.min(1,Math.hypot(dx,dy)*2);c.style.rotate=(-dy).toFixed(3)+' '+dx.toFixed(3)+' 0 '+(m*3.2).toFixed(2)+'deg'});
  c.addEventListener('pointerleave',function(){c.style.rotate='none'});
 });
 /* 2. cursor: dot + trailing ring that grows over links and buttons */
 var ring=document.createElement('div'),dot=document.createElement('div');ring.className='fx-ring';dot.className='fx-dot';ring.setAttribute('aria-hidden','true');dot.setAttribute('aria-hidden','true');
 document.body.appendChild(ring);document.body.appendChild(dot);
 var tx=0,ty=0,rx=0,ry=0,seen=false;
 addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;dot.style.transform='translate('+tx+'px,'+ty+'px)';if(!seen){seen=true;rx=tx;ry=ty;ring.classList.add('on');dot.classList.add('on')}
  ring.classList.toggle('big',!!e.target.closest('a,button,summary,[role=tab],label,.pcard'))});
 document.addEventListener('pointerleave',function(){ring.classList.remove('on');dot.classList.remove('on');seen=false});
 (function loop(){rx+=(tx-rx)*.16;ry+=(ty-ry)*.16;ring.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
}
/* 3. scroll-velocity skew on headings and slow parallax on glows */
if(window.gsap&&window.ScrollTrigger){
 var heads=$$('.d2');heads.forEach(function(h){h.classList.add('fx-skew')});
 var setters=heads.map(function(h){return gsap.quickTo(h,'skewY',{duration:.6,ease:'power3.out'})});
 ScrollTrigger.create({onUpdate:function(self){var s=gsap.utils.clamp(-1.6,1.6,self.getVelocity()/-700);setters.forEach(function(q){q(s)})}});
 $$('.svc-glow,.planet,.wordmark').forEach(function(el){gsap.to(el,{yPercent:-12,ease:'none',scrollTrigger:{trigger:el.parentElement||el,start:'top bottom',end:'bottom top',scrub:true}})});
 /* 4. work and service cards: staggered depth entrance for anything the page does not already animate */
 $$('.hb-card,.fact').forEach(function(el,i){gsap.fromTo(el,{y:46,opacity:0,scale:.97},{y:0,opacity:1,scale:1,duration:1,ease:'expo.out',delay:(i%3)*.08,scrollTrigger:{trigger:el,start:'top 92%',once:true}})});
}
})();
