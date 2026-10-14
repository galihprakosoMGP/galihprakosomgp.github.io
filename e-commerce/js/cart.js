/* Keranjang belanja */
const sub=()=>(CK||C).reduce((a,i)=>{const p=P.find(x=>x.id===i.id);return a+(p?p.price*i.qty:0)},0);
function showCart(){
 if(!C.length)return openM(`<h2>Keranjang</h2><p class="mut">Keranjang masih kosong.</p><button class="gry" onclick="closeM()">Tutup</button>`);
 openM(`<h2>Keranjang Belanja</h2>`+C.map((i,n)=>{const p=P.find(x=>x.id===i.id);return `<div class="row"><div class="th" ${pic(p)}>${p.img?'':art(p)}</div><div class="g"><b>${esc(p.name)}</b><div class="mut">Ukuran ${esc(i.size)} • ${rp(p.price)}</div></div><div class="qty"><button class="gry" onclick="qty(${n},-1)">−</button>${i.qty}<button class="gry" onclick="qty(${n},1)">+</button></div></div>`}).join('')+
 `<div class="tot"><span>Subtotal</span><span class="price">${rp(sub())}</span></div><div style="display:flex;gap:8px;justify-content:flex-end"><button class="gry" onclick="closeM()">Lanjut belanja</button><button class="pri" onclick="showCheckout()">Checkout</button></div>`)}
function qty(n,d){const i=C[n],p=P.find(x=>x.id===i.id);i.qty+=d;if(i.qty>p.stock)i.qty=p.stock;if(i.qty<1)C.splice(n,1);save();showCart()}
