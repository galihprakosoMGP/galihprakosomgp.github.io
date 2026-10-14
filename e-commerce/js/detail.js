/* Halaman detail produk (masukkan keranjang & beli langsung) */
function openDetail(id){const p=P.find(x=>x.id===id);if(!p)return;D={id,size:p.sizes.split(',')[0].trim(),qty:1};renderD()}
function renderD(){const p=P.find(x=>x.id===D.id);if(!p)return closeM();const out=p.stock<1;
 openM(`<div style="text-align:right;margin-bottom:8px"><button class="gry" onclick="closeM()">✕ Tutup</button></div><div class="dt"><div class="dpic" ${pic(p)}>${p.img?'':art(p)}</div><div class="dinfo"><span class="tag">${esc(p.cat)}</span><h2>${esc(p.name)}</h2><div class="price big">${rp(p.price)}</div><p class="mut">${esc(p.desc||DESC[p.cat]||'')}</p><div class="mut">${out?'Stok habis':'Stok tersedia: '+p.stock}</div>
 <b>Ukuran</b><div class="szs">${p.sizes.split(',').map(z=>{z=z.trim();return `<button class="sz ${z===D.size?'on':''}" data-z="${esc(z)}" onclick="D.size=this.dataset.z;renderD()">${esc(z)}</button>`}).join('')}</div>
 <b>Jumlah</b><div class="qty" style="margin:6px 0"><button class="gry" onclick="dq(-1)">−</button><span>${D.qty}</span><button class="gry" onclick="dq(1)">+</button></div>
 <div class="dbtn"><button class="blu" ${out?'disabled':''} onclick="dAdd()">🛒 Masukkan Keranjang</button><button class="pri" ${out?'disabled':''} onclick="dBuy()">Beli Langsung</button></div></div></div>`)}
function dq(d){const p=P.find(x=>x.id===D.id);D.qty=Math.max(1,Math.min(Math.max(p.stock,1),D.qty+d));renderD()}
function dAdd(){const p=P.find(x=>x.id===D.id),have=C.filter(i=>i.id===p.id).reduce((a,i)=>a+i.qty,0);
 if(have+D.qty>p.stock)return alert('Stok tidak cukup. Di keranjang sudah ada '+have+' pcs.');
 const it=C.find(i=>i.id===p.id&&i.size===D.size);it?it.qty+=D.qty:C.push({id:p.id,size:D.size,qty:D.qty});save();closeM();toast('Ditambahkan ke keranjang ✓')}
function dBuy(){const p=P.find(x=>x.id===D.id);if(D.qty>p.stock)return alert('Stok tidak cukup');CK=[{id:p.id,size:D.size,qty:D.qty}];showCheckout()}
