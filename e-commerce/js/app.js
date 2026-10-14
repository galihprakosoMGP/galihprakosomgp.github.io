/* Titik masuk: tombol owner tersembunyi & inisialisasi */
let tapN=0,tapT;
function logoTap(){tapN++;clearTimeout(tapT);tapT=setTimeout(()=>tapN=0,1500);if(tapN>=5){tapN=0;$('#ob').style.display=''}}
function chkHash(){if(location.hash==='#owner')$('#ob').style.display=''}
function init(){addEventListener('hashchange',chkHash);chkHash();shop();initSlider()}
init();
