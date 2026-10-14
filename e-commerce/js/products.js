/* Katalog produk: ikon/gambar, daftar, tambah cepat ke keranjang */
const ic=p=>p.icon||(/dress|gamis|rok|blouse|terusan/i.test(p.name)?'dress':/celana|jeans/i.test(p.name)?'pants':/hoodie|jaket|sweater/i.test(p.name)?'hoodie':'shirt');
const art=p=>`<img class="pi" src="assets/icons/${ic(p)}-${TONE[p.cat]||'blue'}.svg" alt="">`;
const pic=p=>p.img?`style="background-image:url(${p.img})"`:`style="background:${COL[p.cat]||'#e3e6ea'}"`;
function shop(){
 $('#chips').innerHTML=['Semua',...CATS].map(c=>`<button class="chip ${c===cat?'on':''}" onclick="cat='${c}';shop()">${c}</button>`).join('');
 const l=P.filter(p=>(cat==='Semua'||p.cat===cat)&&p.name.toLowerCase().includes(q.toLowerCase()));
 $('#grid').innerHTML=l.length?l.map(p=>`<div class="card"><div class="pic" onclick="openDetail(${p.id})" ${pic(p)}>${p.img?'':art(p)}</div><div class="cb"><span class="tag">${esc(p.cat)}</span><b class="nm" onclick="openDetail(${p.id})">${esc(p.name)}</b><span class="price">${rp(p.price)}</span><span class="mut">Stok: ${p.stock}</span>
 <select id="sz${p.id}">${p.sizes.split(',').map(s=>`<option>${esc(s.trim())}</option>`).join('')}</select>
 <button class="pri" ${p.stock<1?'disabled':''} onclick="add(${p.id})">${p.stock<1?'Stok habis':'+ Keranjang'}</button></div></div>`).join(''):'<p class="mut">Produk tidak ditemukan.</p>';
 $('#cc').textContent=C.reduce((a,i)=>a+i.qty,0);
}
function add(id){const p=P.find(x=>x.id===id),size=$('#sz'+id).value,it=C.find(i=>i.id===id&&i.size===size);
 const have=C.filter(i=>i.id===id).reduce((a,i)=>a+i.qty,0);if(have>=p.stock){alert('Stok tidak cukup');return}
 it?it.qty++:C.push({id,size,qty:1});save();shop()}
