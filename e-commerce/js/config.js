/* Pengaturan & data awal — edit PIN, rekening, kurir, produk awal, slide di sini */
const CATS=['Anak','Remaja','Dewasa'],KS=['S,M,L,XL','All Size'],SA='2-3,4-5,6-7,8-9';
const COL={Anak:'linear-gradient(135deg,#CFE8F9,#EAF5FD)',Remaja:'linear-gradient(135deg,#D7E3F0,#EEF3F9)',Dewasa:'linear-gradient(135deg,#FFE0C4,#FFF3E8)'};
const PIN='1234';
const STORE={name:'MGP Family Fashion',bank:'BCA 123-456-7890',ewallet:'0812-3456-7890'}; // ganti dengan data asli
const SHIP={'JNE Reguler':15000,'J&T Express':14000,'SiCepat':13000,'Ambil di toko':0};
const PAYS=['Transfer Bank BCA','QRIS','E-Wallet (OVO/GoPay/DANA)','COD (Bayar di Tempat)'];
const ICONS={shirt:'Kaos / Kemeja',dress:'Dress / Rok / Gamis',pants:'Celana / Jeans',hoodie:'Hoodie / Jaket'};
const TONE={Anak:'blue',Remaja:'navy',Dewasa:'slate'}; // warna ikon per kategori -> assets/icons/{jenis}-{warna}.svg
const DESC={Anak:'Bahan katun lembut, adem, dan nyaman dipakai bermain seharian. Aman untuk kulit si kecil.',Remaja:'Potongan kekinian dengan bahan nyaman, cocok untuk sekolah, nongkrong, dan jalan santai.',Dewasa:'Bahan berkualitas dengan jahitan rapi, nyaman dipakai untuk kerja, acara, maupun santai.'};
const SEED=[
['Kaos Anak Dino','Anak',65000,20,SA],['Dress Anak Floral','Anak',95000,12,SA],['Celana Pendek Anak','Anak',55000,25,SA],['Jaket Hoodie Anak','Anak',120000,10,SA],
['Kaos Oversize Remaja','Remaja',85000,30,'S,M,L,XL'],['Jeans Slim Remaja','Remaja',165000,15,'S,M,L,XL'],['Hoodie Remaja Grey','Remaja',145000,14,'S,M,L,XL'],['Rok Plisket Remaja','Remaja',99000,18,'S,M,L,XL'],
['Kemeja Pria Formal','Dewasa',175000,16,'S,M,L,XL'],['Blouse Wanita Elegan','Dewasa',135000,14,'S,M,L,XL'],['Gamis Modern','Dewasa',210000,9,'S,M,L,XL'],['Kaos Polo Dewasa','Dewasa',99000,22,'S,M,L,XL']
].map((a,i)=>({id:i+1,name:a[0],cat:a[1],price:a[2],stock:a[3],sizes:a[4],img:''}));
const SL=[
{t:'Gaya nyaman untuk seluruh keluarga',p:'Koleksi baju anak, remaja, dan dewasa dengan harga bersahabat.',c:'Semua',bg:'linear-gradient(120deg,#0B3C6E,#0F5A9E 55%,#2F86CC)',img:'assets/images/slide-1.svg'},
{t:'Ceria untuk si kecil',p:'Baju anak lembut, adem, dan aman untuk bermain seharian.',c:'Anak',bg:'linear-gradient(120deg,#1B78BE,#3DA9E8 60%,#7CC8F2)',img:'assets/images/slide-2.svg'},
{t:'Remaja kekinian',p:'Hoodie, kaos oversize, dan jeans untuk gaya bebas harianmu.',c:'Remaja',bg:'linear-gradient(120deg,#12304F,#1F4F7E 60%,#3A6EA5)',img:'assets/images/slide-3.svg'},
{t:'Dewasa tampil elegan',p:'Kemeja, blouse, dan gamis modern untuk acara apa pun.',c:'Dewasa',bg:'linear-gradient(120deg,#C2570C,#E8741A 55%,#F59E4B)',img:'assets/images/slide-4.svg'}];
