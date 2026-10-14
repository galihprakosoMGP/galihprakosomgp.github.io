/* State aplikasi & penyimpanan (localStorage) */
let P=ld('mgp_p',null)||SEED,C=ld('mgp_c',[]),O=ld('mgp_o',[]),cat='Semua',q='',isAdm=false,ed=null,tab='p';
const save=()=>{sv('mgp_p',P);sv('mgp_c',C);sv('mgp_o',O)};
let CK=null; // item "Beli Langsung" (null = pakai isi keranjang)
let D=null;
