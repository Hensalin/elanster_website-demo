/* dynamic.js: interactive layer shared by every page. No dependencies; every effect is skipped under reduced motion. */
(function(){
var d=document,w=window;
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var $$=function(s,r){return [].slice.call((r||d).querySelectorAll(s))};

/* 1. home: menu for phones and tablets */
var hb=d.getElementById('hburger'),hm=d.getElementById('hmenu');
function menu(open){if(!hb||!hm)return;hm.classList.toggle('open',open);hb.setAttribute('aria-expanded',open?'true':'false');hb.setAttribute('aria-label',open?'Close menu':'Open menu')}
if(hb&&hm){
  hb.addEventListener('click',function(e){e.stopPropagation();menu(!hm.classList.contains('open'))});
  hm.addEventListener('click',function(e){if(e.target.closest('a'))menu(false)});
  d.addEventListener('click',function(e){if(!hm.contains(e.target)&&e.target!==hb)menu(false)});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&hm.classList.contains('open')){menu(false);hb.focus()}});
  addEventListener('resize',function(){if(innerWidth>=1000)menu(false)});
}

/* 2. header hides while scrolling down, comes back on scroll up */
var nav=d.querySelector('header.nav');
if(nav&&!rm){
  var ly=scrollY,busy=false;
  addEventListener('scroll',function(){
    if(busy)return;busy=true;
    requestAnimationFrame(function(){
      var y=scrollY,dy=y-ly,open=(hm&&hm.classList.contains('open'))||d.querySelector('.links.open');
      if(open||y<140||dy<-6)nav.classList.remove('nav-hide');else if(dy>8)nav.classList.add('nav-hide');
      ly=y;busy=false;
    });
  },{passive:true});
}

/* 3. touch screens: the work hint should not talk about hovering */
if(matchMedia('(hover:none)').matches){var h=d.querySelector('.hint');if(h)h.textContent='Six example projects. Scroll through to explore each one.'}

/* 4. sub-pages: pointer glow on cards (desktop only) */
if(fine&&!rm){
  $$('.wi,.post,.pg>*,.flat3>*').forEach(function(c){
    c.classList.add('dyn');
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
  });
}

/* 5. work page: artwork drifts as each card crosses the screen */
var arts=$$('.wi .art');
if(arts.length&&!rm){
  var vis=new Set(),io=new IntersectionObserver(function(es){es.forEach(function(x){x.isIntersecting?vis.add(x.target):vis.delete(x.target)})},{rootMargin:'10% 0px'});
  arts.forEach(function(a){io.observe(a)});
  var t=false;function par(){t=false;var vh=innerHeight;vis.forEach(function(a){var r=a.getBoundingClientRect();a.style.setProperty('--p',Math.max(0,Math.min(1,(r.top+r.height/2)/vh)).toFixed(3))})}
  addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(par)}},{passive:true});par();
}

/* 6. blog posts: reading progress bar */
if(/blog-[^/]+\.html$/.test(location.pathname)&&!rm){
  var bar=d.createElement('div');bar.className='read-prog';bar.setAttribute('aria-hidden','true');d.body.appendChild(bar);
  var bt=false;function rp(){bt=false;var m=d.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'}
  addEventListener('scroll',function(){if(!bt){bt=true;requestAnimationFrame(rp)}},{passive:true});rp();
}

/* 7. plain whole numbers (8, 5 ...) count up when they scroll into view; "01" style step numbers are left alone */
if(!rm&&!w.gsap&&'IntersectionObserver' in w){
  var nums=$$('main *').filter(function(el){return !el.children.length&&/^[1-9]\d{0,2}$/.test(el.textContent.trim())&&!el.closest('.steps,.srow,.pg,.wcards,#svcGrid')});
  var cio=new IntersectionObserver(function(es){es.forEach(function(x){
    if(!x.isIntersecting)return;cio.unobserve(x.target);
    var el=x.target,end=+el.textContent.trim(),t0=performance.now(),dur=1100;
    (function tick(n){var p=Math.min(1,(n-t0)/dur);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);else el.textContent=end})(t0);
  })},{threshold:.6});
  nums.forEach(function(el){cio.observe(el)});
}
})();
