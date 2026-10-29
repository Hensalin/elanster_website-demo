(function(){
var d=document;d.documentElement.classList.add('js');
var b=d.getElementById('burger'),l=d.getElementById('links');
if(b)b.addEventListener('click',function(){var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var els=[].slice.call(d.querySelectorAll('.rv'));
els.forEach(function(e,i){e.style.setProperty('--d',((i%3)*0.08)+'s')});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
// filters + search
var f=d.querySelector('.filters');
if(f){var grid=d.querySelector(f.getAttribute('data-filter')),tag='all',q=d.getElementById('q'),em=d.getElementById('empty');
function run(){var n=0,t=(q&&q.value||'').toLowerCase();[].forEach.call(grid.children,function(c){var ok=(tag==='all'||c.getAttribute('data-tag')===tag)&&(!t||c.textContent.toLowerCase().indexOf(t)>-1);c.classList.toggle('hidden',!ok);if(ok){n++;c.classList.add('in')}});if(em)em.hidden=n>0}
f.addEventListener('click',function(e){var x=e.target.closest('button');if(!x)return;[].forEach.call(f.children,function(y){y.classList.remove('on')});x.classList.add('on');tag=x.getAttribute('data-f');run()});
if(q)q.addEventListener('input',run)}
})();
