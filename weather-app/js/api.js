/* ============================================================
   Akses API Open-Meteo (gratis, tanpa API key).
   - searchCity : nama kota -> daftar lokasi (geocoding)
   - getWeather : koordinat -> cuaca sekarang + 7 hari
   ============================================================ */
const Api = {
  GEO: 'https://geocoding-api.open-meteo.com/v1/search',
  WEATHER: 'https://api.open-meteo.com/v1/forecast',

  async searchCity(name) {
    if (CONFIG.DEMO) return Demo.search(name);
    const params = new URLSearchParams({ name, count: 5, language: 'id', format: 'json' });
    const data = await this._get(`${this.GEO}?${params}`);
    return data.results || []; // API tidak mengirim "results" jika tidak ada hasil
  },

  async getWeather(lat, lon, units = 'metric') {
    if (CONFIG.DEMO) return Demo.weather(lat, lon, units);
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
      forecast_days: 7,
      timezone: 'auto',
      temperature_unit: units === 'metric' ? 'celsius' : 'fahrenheit',
      wind_speed_unit: units === 'metric' ? 'kmh' : 'mph'
    });
    return this._get(`${this.WEATHER}?${params}`);
  },

  /** fetch dengan batas waktu 10 detik + pengecekan status HTTP. */
  async _get(url) {
    const opts = AbortSignal.timeout ? { signal: AbortSignal.timeout(10000) } : {};
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }
};
