/* Dashboard owner: login PIN, kelola produk, kelola pesanan */
/* OWNER */
function showAdmin(){
 if(!isAdm)return openM(`<h2>Login Owner</h2><div class="f"><input id="pin" type="password" placeholder="PIN owner (default: 1234)"></div><div style="display:flex;gap:8px"><button class="pri" onclick="if($('#pin').value==='${PIN}'){isAdm=true;showAdmin()}else alert('PIN salah')">Masuk</button><button class="gry" onclick="closeM()">Batal</button></div>`);
 openM(`<h2>Dashboard Owner</h2><div class="tabs"><button class="${tab==='p'?'blu':'gry'}" onclick="tab='p';showAdmin()">Produk</button><button class="${tab==='o'?'blu':'gry'}" onclick="tab='o';showAdmin()">Pesanan (${O.length})</button><button class="gry" style="margin-left:auto" onclick="isAdm=false;$('#ob').style.display='none';closeM()">Keluar</button></div>`+(tab==='p'?prodTab():ordTab()))}
function prodTab(){const e=ed||{name:'',cat:'Anak',price:'',stock:'',sizes:SA,icon:'shirt',img:''};
 return `<b>${ed&&ed.id?'Edit Produk':'Tambah Produk'}</b><div class="f"><input id="pn" placeholder="Nama produk" value="${esc(e.name)}">
 <div class="f2"><select id="pc" onchange="$('#ps').value=this.value==='Anak'?'${SA}':'S,M,L,XL'">${CATS.map(c=>`<option ${c===e.cat?'selected':''}>${c}</option>`).join('')}</select><select id="pe">${Object.entries(ICONS).map(([k,v])=>`<option value="${k}" ${k===ic(e)?'selected':''}>${v}</option>`).join('')}</select></div>
 <div class="f2"><input id="pp" type="number" placeholder="Harga (Rp)" value="${e.price}"><input id="pk" type="number" placeholder="Stok" value="${e.stock}"></div>
 <input id="ps" placeholder="Ukuran, pisahkan koma" value="${esc(e.sizes)}"><textarea id="pd" rows="2" placeholder="Deskripsi produk (opsional)">${esc(e.desc||'')}</textarea><input type="file" accept="image/*" onchange="upl(this)"><span class="mut" id="pv">${e.img?'Gambar terpasang ✓':'Gambar opsional (otomatis diperkecil)'}</span></div>
 <div style="display:flex;gap:8px"><button class="pri" onclick="saveP()">Simpan</button>${ed?'<button class="gry" onclick="ed=null;showAdmin()">Batal</button>':''}</div><hr style="border:0;border-top:1px solid var(--bd);margin:14px 0">`+
 P.map(p=>`<div class="row"><div class="th" ${pic(p)}>${p.img?'':art(p)}</div><div class="g"><b>${esc(p.name)}</b><div class="mut">${p.cat} • ${rp(p.price)} • stok ${p.stock}</div></div><button class="blu" onclick="editP(${p.id})">Edit</button><button class="dng" onclick="delP(${p.id})">Hapus</button></div>`).join('')}
function upl(el){const f=el.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,400/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);ed=Object.assign(ed||{},{img:c.toDataURL('image/jpeg',.7)});$('#pv').textContent='Gambar siap ✓'};im.src=r.result};r.readAsDataURL(f)}
function saveP(){const g=id=>$('#'+id).value.trim(),name=g('pn'),price=+g('pp'),stock=+g('pk');
 if(!name||!(price>0)||stock<0||g('pk')==='')return alert('Isi nama, harga, dan stok dengan benar.');
 const d={name,cat:g('pc'),price,stock,sizes:g('ps')||'All Size',desc:g('pd'),icon:g('pe')||'shirt',img:(ed&&ed.img)||''};
 if(ed&&ed.id)Object.assign(P.find(x=>x.id===ed.id),d);else P.push({id:Math.max(0,...P.map(x=>x.id))+1,...d});
 ed=null;save();showAdmin()}
function editP(id){ed={...P.find(x=>x.id===id)};showAdmin();scrollTo(0,0)}
function delP(id){if(confirm('Hapus produk ini?')){P=P.filter(x=>x.id!==id);C=C.filter(i=>i.id!==id);save();showAdmin()}}
function ordTab(){return O.length?O.map((o,n)=>`<div class="row" style="align-items:flex-start"><div class="g"><b>${o.id}</b> <span class="mut">${o.date}</span><div class="mut">${esc(o.to.n)} • ${esc(o.to.h)} • ${esc(o.to.k)}</div><div class="mut">${o.items.map(i=>`${esc(i.name)} (${esc(i.size)}) x${i.qty}`).join(', ')}</div><div class="mut">${o.courier} • ${o.pay}</div><b class="price">${rp(o.total)}</b></div>
 <select style="width:auto" onchange="O[${n}].status=this.value;save()">${['Menunggu Pembayaran','Dibayar','Dikemas','Dikirim','Selesai','Dibatalkan'].map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')}</select></div>`).join(''):'<p class="mut">Belum ada pesanan.</p>'}
