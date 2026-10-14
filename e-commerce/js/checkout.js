/* Checkout: alamat, kurir, pembayaran, buat pesanan */
function showCheckout(){
 openM(`<h2>Checkout</h2>${CK?`<p class="mut">Beli langsung: ${esc(P.find(x=>x.id===CK[0].id).name)} (${esc(CK[0].size)}) x${CK[0].qty}</p>`:''}<b>Alamat Pengiriman</b><div class="f">
 <div class="f2"><input id="n" placeholder="Nama penerima"><input id="h" placeholder="No. HP / WhatsApp"></div>
 <textarea id="a" rows="2" placeholder="Alamat lengkap (jalan, RT/RW, kelurahan)"></textarea>
 <div class="f2"><input id="k" placeholder="Kota / Kabupaten"><input id="z" placeholder="Kode pos"></div>
 <select id="c" onchange="tt()">${Object.entries(SHIP).map(([k,v])=>`<option value="${k}">${k} — ${rp(v)}</option>`).join('')}</select></div>
 <b>Metode Pembayaran</b><div class="f">${PAYS.map((m,i)=>`<label class="pay"><input type="radio" name="pm" value="${m}" ${i?'':'checked'}>${m}</label>`).join('')}</div>
 <div class="tot"><span>Subtotal</span><span>${rp(sub())}</span></div><div class="tot"><span>Ongkir</span><span id="ok"></span></div><div class="tot"><span>Total</span><span class="price" id="to"></span></div>
 <div style="display:flex;gap:8px;justify-content:flex-end"><button class="gry" onclick="CK?closeM():showCart()">Kembali</button><button class="pri" onclick="order()">Buat Pesanan</button></div>`);tt()}
function tt(){const s=SHIP[$('#c').value];$('#ok').textContent=rp(s);$('#to').textContent=rp(sub()+s)}
function order(){
 const v=id=>$('#'+id).value.trim(),f={n:v('n'),h:v('h'),a:v('a'),k:v('k'),z:v('z')};
 if(Object.values(f).some(x=>!x))return alert('Lengkapi semua data alamat pengiriman.');
 const cr=$('#c').value,pm=document.querySelector('input[name=pm]:checked').value,ship=SHIP[cr];
 const items=(CK||C).map(i=>{const p=P.find(x=>x.id===i.id);p.stock-=i.qty;return {name:p.name,size:i.size,qty:i.qty,price:p.price}});
 const o={id:'MGP-'+Date.now().toString().slice(-7),date:new Date().toLocaleString('id-ID'),to:f,courier:cr,pay:pm,items,ship,total:sub()+ship,status:'Menunggu Pembayaran'};
 O.unshift(o);if(CK)CK=null;else C=[];save();
 const info=pm.startsWith('Transfer')?`Transfer ke ${STORE.bank} a.n. ${STORE.name}.`:pm==='QRIS'?'Scan QRIS toko saat konfirmasi pembayaran.':pm.startsWith('COD')?'Siapkan uang tunai saat paket tiba.':`Kirim ke ${STORE.ewallet} (a.n. ${STORE.name}).`;
 openM(`<h2>Pesanan Berhasil 🎉</h2><p>Nomor pesanan: <b>${o.id}</b></p><p>Total bayar: <b class="price">${rp(o.total)}</b></p><p class="mut">${info}</p><p class="mut">Dikirim ke: ${esc(f.n)}, ${esc(f.a)}, ${esc(f.k)} ${esc(f.z)}</p><button class="pri" onclick="closeM()">Selesai</button>`)}
