/* ============================================================
   Spendly - Expense Tracker (app.js)
   Sections, in order:
     Config -> State & helpers -> Storage -> Theme -> Rendering
     -> Modal -> Delete -> Filters + delegation -> Export / Print -> Init
   Flow: user action -> change `tx` -> save() -> render()
   ============================================================ */

/* Config - add a category by adding one line here (emoji + color);
   the form, filters and chart pick it up automatically. */
const CURRENCY='USD'; // e.g. 'IDR', 'EUR'
const CATS={Food:{e:'🍔',c:'#f97316'},Transport:{e:'🚌',c:'#3b82f6'},Utilities:{e:'💡',c:'#eab308'},Entertainment:{e:'🎬',c:'#a855f7'},Other:{e:'📦',c:'#64748b'}};
const KEY='spendly.tx.v1'; // localStorage key
/* State & helpers */
let tx=[],q='',fc='all',ft='all',editId=null,delId=null,formType='expense';
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>new Intl.NumberFormat(undefined,{style:'currency',currency:CURRENCY}).format(n);
const pad=n=>String(n).padStart(2,'0');
const todayStr=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const fmtDate=s=>{const d=new Date(s+'T00:00:00');return isNaN(d)?s:d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);

/* Storage */
function load(){try{const r=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(r))tx=r.filter(t=>t&&typeof t.amount==='number'&&t.date&&CATS[t.category])}catch(e){tx=[]}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(tx))}catch(e){toast('Could not save to browser storage')}}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.add('hidden'),2200)}

/* Theme */
const SUN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
function applyTheme(dark){document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light';$('#themeBtn').innerHTML=dark?SUN:MOON}
function initTheme(){let t=null;try{t=localStorage.getItem('spendly.theme')}catch(e){}
  applyTheme(t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)}
$('#themeBtn').onclick=()=>{const d=!document.documentElement.classList.contains('dark');applyTheme(d);try{localStorage.setItem('spendly.theme',d?'dark':'light')}catch(e){}};

/* Rendering */
const ICON_EDIT='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
const ICON_DEL='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>';

function row(t,actions){
  const inc=t.type==='income',c=CATS[t.category];
  return `<li class="flex items-center gap-3 py-3">
    <div class="w-10 h-10 rounded-xl grid place-items-center text-lg shrink-0" style="background:${c.c}22">${c.e}</div>
    <div class="min-w-0 flex-1"><p class="font-medium truncate">${esc(t.description)}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400">${t.category} · ${fmtDate(t.date)}</p></div>
    <p class="font-semibold tabular-nums ${inc?'text-emerald-500':'text-slate-800 dark:text-slate-100'}">${inc?'+':'−'}${money(t.amount)}</p>
    ${actions?`<div class="flex shrink-0">
      <button data-edit="${t.id}" aria-label="Edit" class="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800">${ICON_EDIT}</button>
      <button data-del="${t.id}" aria-label="Delete" class="w-8 h-8 grid place-items-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800">${ICON_DEL}</button></div>`:''}
  </li>`;
}
const empty=(title,sub,btn)=>`<div class="text-center py-8"><div class="text-3xl mb-2">🗂️</div><p class="font-medium">${title}</p><p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${sub}</p>${btn||''}</div>`;
const sampleBtn='<button data-sample class="mt-4 h-9 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Load sample data</button>';

function render(){
  const now=new Date(),ym=now.getFullYear()+'-'+pad(now.getMonth()+1);
  $('#monthLabel').textContent=now.toLocaleDateString(undefined,{month:'long',year:'numeric'});
  const sum=a=>a.reduce((s,t)=>s+t.amount,0);
  const inc=sum(tx.filter(t=>t.type==='income')),exp=sum(tx.filter(t=>t.type==='expense'));
  const mTx=tx.filter(t=>t.date.startsWith(ym)),mExp=mTx.filter(t=>t.type==='expense'),mInc=sum(mTx.filter(t=>t.type==='income'));
  const bal=inc-exp;
  $('#cards').innerHTML=`
    <div class="rounded-2xl p-5 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
      <p class="text-sm opacity-80">Total balance</p><p class="text-3xl font-bold mt-1 tabular-nums">${money(bal)}</p>
      <p class="text-xs opacity-70 mt-2">${tx.length} transaction${tx.length===1?'':'s'} recorded</p></div>
    <div class="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <p class="text-sm text-slate-500 dark:text-slate-400">Spent this month</p><p class="text-3xl font-bold mt-1 tabular-nums text-rose-500">${money(sum(mExp))}</p>
      <p class="text-xs text-slate-400 mt-2">${mExp.length} expense${mExp.length===1?'':'s'}</p></div>
    <div class="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <p class="text-sm text-slate-500 dark:text-slate-400">Income this month</p><p class="text-3xl font-bold mt-1 tabular-nums text-emerald-500">${money(mInc)}</p>
      <p class="text-xs text-slate-400 mt-2">Net ${money(mInc-sum(mExp))}</p></div>`;

  /* Breakdown */
  const by={};mExp.forEach(t=>by[t.category]=(by[t.category]||0)+t.amount);
  const tot=sum(mExp),ents=Object.entries(by).sort((a,b)=>b[1]-a[1]);
  if(!ents.length){$('#breakdown').innerHTML=empty('No spending yet this month','Add an expense to see your category breakdown.')}
  else{
    let acc=0;const stops=ents.map(([k,v])=>{const s=acc/tot*100;acc+=v;return `${CATS[k].c} ${s}% ${acc/tot*100}%`}).join(',');
    $('#breakdown').innerHTML=`<div class="flex flex-col sm:flex-row items-center gap-6">
      <div class="relative w-36 h-36 shrink-0 rounded-full" style="background:conic-gradient(${stops})" role="img" aria-label="Spending by category">
        <div class="absolute inset-4 rounded-full bg-white dark:bg-slate-900 grid place-items-center text-center"><div><p class="text-xs text-slate-500">Total</p><p class="font-bold text-sm">${money(tot)}</p></div></div></div>
      <ul class="w-full space-y-3">${ents.map(([k,v])=>`<li><div class="flex justify-between text-sm mb-1"><span>${CATS[k].e} ${k}</span><span class="tabular-nums text-slate-500 dark:text-slate-400">${money(v)} · ${Math.round(v/tot*100)}%</span></div>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div class="bar h-full rounded-full" style="width:${v/tot*100}%;background:${CATS[k].c}"></div></div></li>`).join('')}</ul></div>`;
  }

  /* Recent */
  const sorted=[...tx].sort((a,b)=>b.date.localeCompare(a.date)||b.created-a.created);
  $('#recent').innerHTML=sorted.length?`<ul class="divide-y divide-slate-100 dark:divide-slate-800">${sorted.slice(0,5).map(t=>row(t,false)).join('')}</ul>`
    :empty('Nothing here yet','Your latest transactions will appear here.',sampleBtn);

  /* Filtered list */
  const kw=q.trim().toLowerCase();
  const f=sorted.filter(t=>(fc==='all'||t.category===fc)&&(ft==='all'||t.type===ft)&&(!kw||t.description.toLowerCase().includes(kw)));
  $('#count').textContent=tx.length?`(${f.length} of ${tx.length})`:'';
  $('#list').innerHTML=!tx.length?empty('No transactions yet','Click “Add” to record your first income or expense.',sampleBtn)
    :!f.length?empty('No matches','Try a different search or clear the filters.','<button data-clear class="mt-4 h-9 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Clear filters</button>')
    :`<ul class="divide-y divide-slate-100 dark:divide-slate-800">${f.map(t=>row(t,true)).join('')}</ul>`;
}

/* Modal */
function setType(t){formType=t;document.querySelectorAll('#typeToggle button').forEach(b=>{const on=b.dataset.type===t;
  b.className='h-9 rounded-lg text-sm font-medium '+(on?(t==='income'?'bg-emerald-500 text-white':'bg-rose-500 text-white'):'text-slate-600 dark:text-slate-300')})}
function openModal(id){
  editId=id||null;const t=id&&tx.find(x=>x.id===id);
  $('#modalTitle').textContent=t?'Edit transaction':'Add transaction';
  setType(t?t.type:'expense');
  $('#amount').value=t?t.amount:'';$('#desc').value=t?t.description:'';$('#cat').value=t?t.category:'Food';$('#date').value=t?t.date:todayStr();
  $('#err').classList.add('hidden');$('#modal').classList.remove('hidden');$('#modal').classList.add('flex');
  setTimeout(()=>$('#amount').focus(),50);
}
function closeModal(){$('#modal').classList.add('hidden');$('#modal').classList.remove('flex')}
function showErr(m){const e=$('#err');e.textContent=m;e.classList.remove('hidden')}

$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const amount=parseFloat($('#amount').value),description=$('#desc').value.trim(),category=$('#cat').value,date=$('#date').value;
  if(!(amount>0)||!isFinite(amount))return showErr('Enter an amount greater than 0.');
  if(!description)return showErr('Please add a description.');
  if(!date)return showErr('Please choose a date.');
  const rec={amount:Math.round(amount*100)/100,description,category,date,type:formType};
  if(editId){tx=tx.map(t=>t.id===editId?{...t,...rec}:t);toast('Transaction updated')}
  else{tx.push({id:uid(),created:Date.now(),...rec});toast('Transaction added')}
  save();closeModal();render();
});
document.querySelectorAll('#typeToggle button').forEach(b=>b.onclick=()=>setType(b.dataset.type));
$('#addBtn').onclick=()=>openModal();
$('#closeBtn').onclick=closeModal;
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeConfirm()}});

/* Delete */
function closeConfirm(){$('#confirm').classList.add('hidden');$('#confirm').classList.remove('flex');delId=null}
$('#cancelDel').onclick=closeConfirm;
$('#okDel').onclick=()=>{tx=tx.filter(t=>t.id!==delId);save();closeConfirm();render();toast('Transaction deleted')};

/* Filters + delegation */
$('#search').oninput=e=>{q=e.target.value;render()};
$('#fCat').onchange=e=>{fc=e.target.value;render()};
$('#fType').onchange=e=>{ft=e.target.value;render()};
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.edit)openModal(b.dataset.edit);
  else if(b.dataset.del){delId=b.dataset.del;$('#confirm').classList.remove('hidden');$('#confirm').classList.add('flex')}
  else if('clear' in b.dataset){q='';fc='all';ft='all';$('#search').value='';$('#fCat').value='all';$('#fType').value='all';render()}
  else if('sample' in b.dataset){
    const d=n=>{const x=new Date();x.setDate(Math.max(1,x.getDate()-n));return x.getFullYear()+'-'+pad(x.getMonth()+1)+'-'+pad(x.getDate())};
    [['income',2400,'Salary','Other',0],['expense',64.2,'Groceries','Food',1],['expense',18,'Bus pass','Transport',2],['expense',92.5,'Electricity bill','Utilities',3],['expense',15.99,'Streaming subscription','Entertainment',4],['expense',27.4,'Dinner out','Food',5]]
      .forEach(([type,amount,description,category,n],i)=>tx.push({id:uid(),created:Date.now()+i,type,amount,description,category,date:d(n)}));
    save();render();toast('Sample data loaded');
  }
});

/* Export / Print */
function reportData(scope){
  const now=new Date(),ym=now.getFullYear()+'-'+pad(now.getMonth()+1);
  const sorted=[...tx].sort((a,b)=>a.date.localeCompare(b.date)||a.created-b.created);
  const kw=q.trim().toLowerCase();
  if(scope==='month')return{label:'This month ('+now.toLocaleDateString(undefined,{month:'long',year:'numeric'})+')',rows:sorted.filter(t=>t.date.startsWith(ym))};
  if(scope==='filtered')return{label:'Current filters',rows:sorted.filter(t=>(fc==='all'||t.category===fc)&&(ft==='all'||t.type===ft)&&(!kw||t.description.toLowerCase().includes(kw)))};
  return{label:'All transactions',rows:sorted};
}
function renderReport(){
  const{label,rows}=reportData($('#rScope').value);
  $('#printBtn').disabled=!rows.length;
  if(!rows.length){$('#reportBody').innerHTML='<div class="text-center py-10"><div class="text-3xl mb-2">🗂️</div><p class="font-medium">Nothing to export</p><p class="text-sm text-slate-500 mt-1">No transactions match this selection.</p></div>';return}
  const sum=t=>rows.filter(r=>r.type===t).reduce((s,r)=>s+r.amount,0);
  const inc=sum('income'),exp=sum('expense'),TD='border border-slate-300 px-2 py-1.5';
  const trs=rows.map(t=>`<tr><td class="${TD} whitespace-nowrap">${fmtDate(t.date)}</td><td class="${TD}">${esc(t.description)}</td><td class="${TD}">${t.category}</td><td class="${TD} capitalize">${t.type}</td><td class="${TD} text-right tabular-nums">${t.type==='income'?'+':'−'}${money(t.amount)}</td></tr>`).join('');
  const box=(l,v)=>`<div class="border border-slate-300 rounded-lg p-3"><p class="text-xs text-slate-500">${l}</p><p class="font-semibold tabular-nums">${money(v)}</p></div>`;
  $('#reportBody').innerHTML=`<h2 class="text-xl font-bold">Expense Report</h2>
    <p class="text-sm text-slate-500">${esc(label)} · Generated ${new Date().toLocaleDateString(undefined,{dateStyle:'long'})}</p>
    <div class="grid grid-cols-3 gap-3 my-4 text-sm">${box('Total income',inc)}${box('Total expenses',exp)}${box('Net',inc-exp)}</div>
    <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="${TD}">Date</th><th class="${TD}">Description</th><th class="${TD}">Category</th><th class="${TD}">Type</th><th class="${TD} text-right">Amount</th></tr></thead>
    <tbody>${trs}</tbody>
    <tfoot><tr class="bg-slate-50 font-semibold"><td colspan="4" class="${TD} text-right">Net total</td><td class="${TD} text-right tabular-nums">${money(inc-exp)}</td></tr></tfoot></table>`;
}
function openReport(){
  $('#rScope').value='all';renderReport();
  document.body.classList.add('report-open');
  $('#reportModal').classList.remove('hidden');$('#reportModal').classList.add('flex');
}
function closeReport(){
  document.body.classList.remove('report-open');
  $('#reportModal').classList.add('hidden');$('#reportModal').classList.remove('flex');
}
$('#exportBtn').onclick=openReport;
$('#rClose').onclick=closeReport;
$('#rScope').onchange=renderReport;
$('#reportModal').addEventListener('click',e=>{if(e.target.id==='reportModal')closeReport()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeReport()});
$('#printBtn').onclick=()=>{try{window.print()}catch(e){toast('Printing is not available here')}};

/* Init */
$('#cat').innerHTML=Object.keys(CATS).map(k=>`<option value="${k}">${CATS[k].e} ${k}</option>`).join('');
$('#fCat').innerHTML='<option value="all">All categories</option>'+Object.keys(CATS).map(k=>`<option value="${k}">${k}</option>`).join('');
initTheme();load();render();
