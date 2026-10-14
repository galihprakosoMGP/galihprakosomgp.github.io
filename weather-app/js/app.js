/* ============================================================
   Logika utama: menghubungkan input pengguna -> API -> tampilan.
   Alur: pilih kota -> loadWeather() -> Api.getWeather() -> UI.weather()
   ============================================================ */

/* Penyimpanan kecil di browser (aman jika localStorage diblokir) */
const Store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* abaikan */ } }
};

const State = {
  units: Store.get('wx.units', 'metric'),
  place: Store.get('wx.place', null),
  found: [],      // hasil pencarian terakhir
  requestId: 0    // untuk mengabaikan respons lama
};

function friendlyError(e) {
  if (e.name === 'TimeoutError' || e.name === 'AbortError') return 'Permintaan terlalu lama. Periksa koneksi internet lalu coba lagi.';
  if (e instanceof TypeError) return 'Tidak bisa terhubung ke server cuaca. Periksa koneksi internet kamu.';
  return 'Server cuaca sedang bermasalah (' + e.message + '). Coba lagi sebentar lagi.';
}

async function loadWeather(place) {
  const id = ++State.requestId;
  State.place = place;
  UI.suggestions([], null);
  UI.show('loading');
  UI.announce('Memuat cuaca…');
  try {
    const data = await Api.getWeather(place.latitude, place.longitude, State.units);
    if (id !== State.requestId) return;
    Store.set('wx.place', place);
    UI.weather(place, data, State.units);
    UI.show('weather');
    UI.announce('Cuaca ' + UI.placeLabel(place) + ' dimuat');
  } catch (e) {
    if (id === State.requestId) UI.error(friendlyError(e));
  }
}

/* Cari kota berdasarkan nama, lalu muat cuaca hasil pertama */
async function searchAndLoad(name) {
  try {
    const list = await Api.searchCity(name);
    if (!list.length) return UI.error('Kota “' + name + '” tidak ditemukan. Coba ejaan lain.');
    loadWeather(list[0]);
  } catch (e) { UI.error(friendlyError(e)); }
}

/* ---------- Pencarian + saran (debounce 300 ms) ---------- */
const input = $('#q');
let timer;
input.addEventListener('input', () => {
  clearTimeout(timer);
  const q = input.value.trim();
  if (q.length < 2) return UI.suggestions([], null);
  timer = setTimeout(async () => {
    try {
      State.found = await Api.searchCity(q);
      if (input.value.trim() === q) {
        UI.suggestions(State.found, q);
        UI.announce(State.found.length + ' saran kota');
      }
    } catch (e) { UI.suggestions([], null); }
  }, 300);
});

$('#searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (q) searchAndLoad(q);
});

$('#suggest').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-i]');
  if (!btn) return;
  input.value = '';
  loadWeather(State.found[btn.dataset.i]);
});

document.addEventListener('click', (e) => { if (!e.target.closest('.search')) UI.suggestions([], null); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') UI.suggestions([], null); });

/* ---------- Tombol lain ---------- */
(CONFIG.DEMO ? Demo.names() : CONFIG.QUICK_CITIES).forEach((name) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'chip'; b.textContent = name;
  b.addEventListener('click', () => searchAndLoad(name));
  $('#chips').appendChild(b);
});

$('#geoBtn').addEventListener('click', () => {
  if (CONFIG.DEMO) return loadWeather({ name: 'Lokasi saya', latitude: 35.68, longitude: 139.69 });
  if (!navigator.geolocation) return UI.error('Browser kamu tidak mendukung lokasi.');
  UI.show('loading');
  navigator.geolocation.getCurrentPosition(
    (pos) => loadWeather({ name: 'Lokasi saya', latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
    () => UI.error('Izin lokasi ditolak atau tidak tersedia. Cari kota secara manual.'),
    { timeout: 10000 }
  );
});

function paintUnit() { $('#unitBtn').textContent = State.units === 'metric' ? '°C' : '°F'; }
$('#unitBtn').addEventListener('click', () => {
  State.units = State.units === 'metric' ? 'imperial' : 'metric';
  Store.set('wx.units', State.units);
  paintUnit();
  if (State.place) loadWeather(State.place);
});

$('#retryBtn').addEventListener('click', () => (State.place ? loadWeather(State.place) : UI.show('welcome')));

/* ---------- Mulai ---------- */
UI.hydrate();
$('#demoBadge').hidden = !CONFIG.DEMO;
paintUnit();
if (State.place) loadWeather(State.place); else UI.show('welcome');
