(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap=window.gsap&&window.ScrollTrigger;
  if(hasGsap)gsap.registerPlugin(ScrollTrigger);

  /* Showcase parallax + hover tilt */
  var stage=document.querySelector('.rs-stage');
  if(stage&&hasGsap&&!reduce){
    var f=function(s){return stage.querySelector(s)};
    gsap.from(f('.rs-frame--c'),{y:90,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:stage,start:'top 85%'}});
    gsap.from(f('.rs-frame--l'),{y:60,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:stage,start:'top 80%'}});
    gsap.from(f('.rs-frame--r'),{y:60,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:stage,start:'top 80%'}});
    stage.querySelectorAll('.rs-chip').forEach(function(c,i){gsap.from(c,{y:30,opacity:0,duration:.8,delay:.2+i*.12,ease:'power3.out',scrollTrigger:{trigger:stage,start:'top 70%'}})});
  }

  /* Pinned story */
  var story=document.querySelector('.story');
  if(story){
    var steps=[].slice.call(story.querySelectorAll('.story__steps li')),
        panels=[].slice.call(story.querySelectorAll('.sp')),
        bar=story.querySelector('.story__bar i'),cur=-1;
    var set=function(i){
      if(i===cur)return;cur=i;
      steps.forEach(function(s,k){s.classList.toggle('is-on',k===i)});
      panels.forEach(function(p,k){p.classList.toggle('is-on',k===i)});
    };
    set(0);
    if(hasGsap&&!reduce&&window.matchMedia('(min-width:901px)').matches){
      ScrollTrigger.create({trigger:story.querySelector('.story__pin'),start:'top top',end:'+=200%',pin:true,
        onUpdate:function(s){var i=Math.min(steps.length-1,Math.floor(s.progress*steps.length));set(i);if(bar)bar.style.width=(s.progress*100)+'%'}});
    }else{
      steps.forEach(function(s,k){s.addEventListener('click',function(){set(k)})});
    }
  }

  /* Proof slider */
  var pv=document.querySelector('.proof__view');
  if(pv){
    var tr=pv.querySelector('.proof__track'),n=tr.children.length,i=0,t;
    var dots=document.querySelector('.proof__dots');
    for(var k=0;k<n;k++){var d=document.createElement('i');d.dataset.k=k;dots.appendChild(d)}
    var go=function(x){i=(x+n)%n;tr.style.transform='translateX(-'+i*100+'%)';[].forEach.call(dots.children,function(d,k){d.classList.toggle('is-on',k===i)})};
    var auto=function(){clearInterval(t);if(!reduce)t=setInterval(function(){go(i+1)},6000)};
    document.querySelector('.proof__prev').onclick=function(){go(i-1);auto()};
    document.querySelector('.proof__next').onclick=function(){go(i+1);auto()};
    dots.onclick=function(e){if(e.target.dataset.k){go(+e.target.dataset.k);auto()}};
    go(0);auto();
  }
})();

/* animated product showcase */
(function(){
  var root=document.querySelector('.rsx');if(!root)return;
  var tabs=[].slice.call(root.querySelectorAll('.rsx__tab')),shots=[].slice.call(root.querySelectorAll('.rsx__shot')),
      url=root.querySelector('.rsx__url'),cur=0,t,dur=5000,paused=false,
      reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hosts=['indzara.com','people.indzara.com','projects.indzara.com','business.indzara.com','shrtsermons.com','talkback.bckofiz.com'];
  root.style.setProperty('--dur',dur+'ms');
  function show(i){
    cur=i;
    tabs.forEach(function(el,k){var on=k===i;el.classList.remove('is-on');if(on){void el.offsetWidth;el.classList.add('is-on')}});
    shots.forEach(function(el,k){el.classList.toggle('is-on',k===i)});
    if(url)url.textContent=hosts[i]||'';
  }
  function loop(){clearTimeout(t);if(reduce||paused)return;t=setTimeout(function(){show((cur+1)%tabs.length);loop()},dur)}
  tabs.forEach(function(el,k){el.querySelector('button').addEventListener('click',function(){show(k);loop()})});
  root.addEventListener('mouseenter',function(){paused=true;clearTimeout(t);root.classList.add('is-paused')});
  root.addEventListener('mouseleave',function(){paused=false;show(cur);loop()});
  show(0);loop();
})();

/* CTA product deck */
(function(){
  var deck=document.querySelector('.cta__deck');if(!deck)return;
  var cards=[].slice.call(deck.querySelectorAll('.dk')),dots=[].slice.call(deck.querySelectorAll('.dk-dots i')),n=cards.length,cur=0,t;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function render(){
    cards.forEach(function(c,i){
      var d=((i-cur)%n+n)%n;if(d>n/2)d-=n;
      c.setAttribute('data-pos',Math.abs(d)>1?'x':d);
    });
    dots.forEach(function(d,i){d.classList.toggle('is-on',i===cur)});
  }
  function go(i){cur=((i%n)+n)%n;render()}
  function start(){if(reduce)return;stop();t=setInterval(function(){go(cur+1)},3200)}
  function stop(){clearInterval(t)}
  cards.forEach(function(c,i){c.addEventListener('click',function(e){var p=c.getAttribute('data-pos');if(p!=='0'){e.preventDefault();go(i);start()}})});
  dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);start()})});
  deck.addEventListener('mouseenter',stop);deck.addEventListener('mouseleave',start);
  render();start();
})();

/* sub pages: duplicate card rows so they loop seamlessly */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  [].forEach.call(document.querySelectorAll('.pg-marq__track'),function(t){
    t.innerHTML+=t.innerHTML;
    [].forEach.call(t.querySelectorAll('.reveal'),function(e){e.classList.add('is-visible')});
  });
})();
