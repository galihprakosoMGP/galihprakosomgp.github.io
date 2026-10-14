/* Slideshow beranda (data slide ada di config.js) */
let si=0,st;
function slide(n){si=(n+SL.length)%SL.length;document.querySelectorAll('.sl').forEach((e,i)=>e.classList.toggle('on',i===si));document.querySelectorAll('.dots i').forEach((e,i)=>e.classList.toggle('on',i===si))}
function auto(){clearInterval(st);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)st=setInterval(()=>slide(si+1),4500)}
function go(n){slide(n);auto()}
function pick(c){cat=c;shop();$('#chips').scrollIntoView({behavior:'smooth',block:'center'})}
function initSlider(){
const el=$('#sl');
el.innerHTML=SL.map(x=>`<div class="sl" style="background:${x.bg}"><div><h1>${x.t}</h1><p>${x.p}</p><button class="cta" onclick="pick('${x.c}')">Belanja ${x.c==='Semua'?'Sekarang':x.c}</button></div><img class="art" src="${x.img}" alt=""></div>`).join('')+
 `<button class="arr l" aria-label="Sebelumnya" onclick="go(si-1)">‹</button><button class="arr r" aria-label="Berikutnya" onclick="go(si+1)">›</button><div class="dots">${SL.map((_,i)=>`<i onclick="go(${i})"></i>`).join('')}</div>`;
 let x0=null;el.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
 el.addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(si+(d<0?1:-1));x0=null});
 el.addEventListener('mouseenter',()=>clearInterval(st));el.addEventListener('mouseleave',auto);
 slide(0);auto()}
