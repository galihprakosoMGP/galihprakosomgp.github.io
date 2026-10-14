/* ============================================================
   Kode cuaca WMO (dipakai Open-Meteo) -> teks, kunci ikon (lihat icons.js), tema langit.
   Format: kode: [teks Indonesia, kunci ikon, tema]
   ============================================================ */
const WEATHER_CODES = {
  0:['Cerah','sun','clear'], 1:['Cerah berawan','partly','clear'], 2:['Berawan sebagian','partly','cloudy'], 3:['Mendung','cloud','cloudy'],
  45:['Berkabut','fog','fog'], 48:['Kabut beku','fog','fog'],
  51:['Gerimis ringan','drizzle','rain'], 53:['Gerimis','drizzle','rain'], 55:['Gerimis lebat','rain','rain'],
  56:['Gerimis dingin','rain','rain'], 57:['Gerimis dingin lebat','rain','rain'],
  61:['Hujan ringan','drizzle','rain'], 63:['Hujan','rain','rain'], 65:['Hujan lebat','rain','rain'],
  66:['Hujan beku','rain','rain'], 67:['Hujan beku lebat','rain','rain'],
  71:['Salju ringan','snow','snow'], 73:['Salju','snow','snow'], 75:['Salju lebat','snow','snow'], 77:['Butiran salju','snow','snow'],
  80:['Hujan lokal ringan','drizzle','rain'], 81:['Hujan lokal','rain','rain'], 82:['Hujan lokal lebat','storm','rain'],
  85:['Hujan salju ringan','snow','snow'], 86:['Hujan salju lebat','snow','snow'],
  95:['Badai petir','storm','storm'], 96:['Badai petir & es','storm','storm'], 99:['Badai petir & es lebat','storm','storm']
};

/** Mengubah kode cuaca + siang/malam menjadi {label, icon, sky}. */
function describeWeather(code, isDay = 1) {
  const [label, icon, sky] = WEATHER_CODES[code] || ['Tidak diketahui', 'cloud', 'cloudy'];
  const night = !isDay;
  return {
    label,
    icon: night && code <= 1 ? 'moon' : night && code === 2 ? 'partly-night' : icon,
    sky: night && (sky === 'clear' || sky === 'cloudy') ? 'night' : sky
  };
}
