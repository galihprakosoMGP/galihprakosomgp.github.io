/* ============================================================
   Mode demo: data contoh dengan bentuk yang sama seperti balasan
   Open-Meteo, jadi seluruh tampilan bisa dicoba tanpa internet.
   Aktifkan dengan CONFIG.DEMO = true (js/config.js).
   Tujuh kota di bawah mewakili tujuh tema langit.
   ============================================================ */
const Demo = (() => {
  // [nama, provinsi, negara, lat, lon, kode cuaca, siang(1)/malam(0), suhu °C]
  const CITIES = [
    ['Jakarta', 'DKI Jakarta', 'Indonesia', -6.2, 106.85, 63, 1, 29],
    ['Tokyo', 'Tokyo', 'Jepang', 35.68, 139.69, 0, 1, 24],
    ['London', 'England', 'Inggris', 51.51, -0.13, 3, 1, 14],
    ['Reykjavik', 'Capital Region', 'Islandia', 64.15, -21.94, 73, 1, -2],
    ['Singapore', '', 'Singapura', 1.35, 103.82, 95, 1, 28],
    ['San Francisco', 'California', 'Amerika Serikat', 37.77, -122.42, 45, 1, 15],
    ['Sydney', 'New South Wales', 'Australia', -33.87, 151.21, 1, 0, 17]
  ];
  const FORECAST_CODES = [0, 1, 2, 3, 61, 3, 80];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const toPlace = (c) => ({ name: c[0], admin1: c[1], country: c[2], latitude: c[3], longitude: c[4] });

  return {
    names: () => CITIES.map((c) => c[0]),

    async search(name) {
      await wait(250);
      return CITIES.filter((c) => c[0].toLowerCase().includes(name.toLowerCase())).map(toPlace);
    },

    async weather(lat, lon, units) {
      await wait(450);
      const c = CITIES.find((x) => Math.abs(x[3] - lat) < 0.01 && Math.abs(x[4] - lon) < 0.01) || CITIES[1];
      const code = c[5], tc = c[7], wet = code >= 60;
      const f = (t) => (units === 'metric' ? t : Math.round((t * 9) / 5 + 32));
      const now = new Date();
      const days = [...Array(7)].map((_, i) => { const d = new Date(now); d.setDate(d.getDate() + i); return iso(d); });
      return {
        current: {
          time: `${iso(now)}T${pad(now.getHours())}:00`, temperature_2m: f(tc), apparent_temperature: f(tc + 2),
          relative_humidity_2m: wet ? 86 : 58, is_day: c[6], weather_code: code,
          wind_speed_10m: units === 'metric' ? 14 : 9, pressure_msl: 1012
        },
        daily: {
          time: days,
          weather_code: days.map((_, i) => (i === 0 ? code : FORECAST_CODES[(i + code) % FORECAST_CODES.length])),
          temperature_2m_max: days.map((_, i) => f(tc + 3 - (i % 3))),
          temperature_2m_min: days.map((_, i) => f(tc - 5 + (i % 2))),
          precipitation_probability_max: days.map((_, i) => (wet ? 80 - i * 8 : 15 + i * 6)),
          uv_index_max: days.map(() => (wet ? 3 : 8))
        }
      };
    }
  };
})();
