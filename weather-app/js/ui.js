/* ============================================================
   Tampilan: mengisi elemen HTML dengan data. Tidak memanggil API.
   ============================================================ */
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const round = (n) => Math.round(n);

const UI = {
  states: ['welcome', 'loading', 'error', 'weather'],

  /** Tampilkan satu bagian saja: welcome | loading | error | weather */
  show(name) { this.states.forEach((id) => { $('#' + id).hidden = id !== name; }); },

  announce(msg) { $('#status').textContent = msg; },

  /** Pasang ikon SVG ke elemen [data-icon]/[data-wicon] dan buat bintang latar malam. */
  hydrate() {
    document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = Icons.ui(el.dataset.icon); });
    document.querySelectorAll('[data-wicon]').forEach((el) => { el.innerHTML = Icons.weather(el.dataset.wicon); });
    const stars = $('#stars');
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('i');
      s.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 65).toFixed(1)}%;--d:${(Math.random() * 4).toFixed(1)}s;--s:${(1 + Math.random() * 1.8).toFixed(1)}px`;
      stars.appendChild(s);
    }
  },

  error(msg) { $('#errMsg').textContent = msg; this.show('error'); this.announce(msg); },

  placeLabel(p) {
    return [p.name, p.admin1, p.country].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(', ');
  },

  /** Daftar saran kota di bawah kolom pencarian. */
  suggestions(list, query) {
    const box = $('#suggest');
    if (query === null) { box.hidden = true; box.innerHTML = ''; return; }
    box.innerHTML = list.length
      ? list.map((p, i) => `<li><button type="button" data-i="${i}">${esc(p.name)}<small>${esc([p.admin1, p.country].filter(Boolean).join(', '))}</small></button></li>`).join('')
      : `<li class="none">Kota “${esc(query)}” tidak ditemukan</li>`;
    box.hidden = false;
  },

  /** Isi seluruh kartu cuaca. units: 'metric' | 'imperial' */
  weather(place, data, units) {
    const c = data.current, d = data.daily;
    const w = describeWeather(c.weather_code, c.is_day);
    const windUnit = units === 'metric' ? 'km/j' : 'mph';

    document.body.dataset.sky = w.sky;
    $('#place').textContent = this.placeLabel(place);
    $('#date').textContent = new Date(c.time).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + ' (waktu setempat)';
    $('#icon').innerHTML = Icons.weather(w.icon);
    $('#temp').textContent = round(c.temperature_2m) + '°';
    $('#cond').textContent = w.label;
    $('#hilo').textContent = `Tertinggi ${round(d.temperature_2m_max[0])}° · Terendah ${round(d.temperature_2m_min[0])}°`;

    $('#sFeels').textContent = round(c.apparent_temperature) + '°';
    $('#sHumidity').textContent = c.relative_humidity_2m + '%';
    $('#sWind').textContent = `${round(c.wind_speed_10m)} ${windUnit}`;
    $('#sPressure').textContent = round(c.pressure_msl) + ' hPa';
    $('#sRain').textContent = d.precipitation_probability_max[0] == null ? '–' : d.precipitation_probability_max[0] + '%';
    $('#sUv').textContent = d.uv_index_max[0] == null ? '–' : round(d.uv_index_max[0]);

    $('#daily').innerHTML = d.time.map((day, i) => {
      const info = describeWeather(d.weather_code[i], 1);
      const name = i === 0 ? 'Hari ini' : new Date(day + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
      const rain = d.precipitation_probability_max[i];
      return `<li><span class="d">${esc(name)}</span><span class="i" aria-hidden="true">${Icons.weather(info.icon)}</span>
        <span class="p"><span class="sr-only">${esc(info.label)}, </span>${rain == null ? '' : Icons.ui('humidity') + rain + '%'}</span>
        <span class="t"><b>${round(d.temperature_2m_max[i])}°</b><span>${round(d.temperature_2m_min[i])}°</span></span></li>`;
    }).join('');
  }
};
