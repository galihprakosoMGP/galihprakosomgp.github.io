/* ============================================================
   Ikon SVG.
   - Icons.weather(kunci): ikon cuaca berwarna (viewBox 64)
   - Icons.ui(kunci)     : ikon antarmuka bergaris (viewBox 24)
   Kunci cuaca dipilih oleh describeWeather() di codes.js.
   ============================================================ */
const Icons = (() => {
  const CLOUD = 'M18 46a10 10 0 0 1 0-20 14 14 0 0 1 27-3 12 12 0 0 1 1 23z';
  const cloud = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="${CLOUD}" fill="${fill}"/>`;
  const sun = (cx, cy, r) => {
    let rays = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4, c = Math.cos(a), s = Math.sin(a), p = (k) => k.toFixed(1);
      rays += `M${p(cx + c * (r + 4))} ${p(cy + s * (r + 4))}L${p(cx + c * (r + 9))} ${p(cy + s * (r + 9))}`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFC93C"/><path d="${rays}" stroke="#FFC93C" stroke-width="3.5" stroke-linecap="round"/>`;
  };
  const moon = (x = 0, y = 0, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M40 12a20 20 0 1 0 12 32 16 16 0 0 1-12-32z" fill="#FDE9A9"/><circle cx="50" cy="20" r="1.8" fill="#FDE9A9"/></g>`;

  const W = {
    sun: sun(32, 32, 12),
    moon: moon(),
    partly: sun(24, 24, 9) + cloud(4, 12, 1, '#F4F8FD'),
    'partly-night': moon(-8, -8, 0.7) + cloud(4, 12, 1, '#E6EEF8'),
    cloud: cloud(14, 2, 0.8, '#AFC3DA') + cloud(0, 10, 1, '#F4F8FD'),
    fog: cloud(2, -2, 0.95, '#F4F8FD') + '<path d="M12 50h40M18 56h34" stroke="#CFDCEA" stroke-width="4" stroke-linecap="round"/>',
    drizzle: cloud(2, -3, 0.95, '#E3ECF7') + '<path d="M22 46l-2 5M32 48l-2 5M42 46l-2 5" stroke="#7CC4FF" stroke-width="3" stroke-linecap="round"/>',
    rain: cloud(2, -3, 0.95, '#DCE7F4') + '<path d="M22 44l-4 10M33 46l-4 10M44 44l-4 10" stroke="#4DA3FF" stroke-width="3.5" stroke-linecap="round"/>',
    storm: cloud(2, -3, 0.95, '#9FB0C8') + '<path d="M35 36l-9 13h7l-4 11 13-16h-7l4-8z" fill="#FFC93C"/>',
    snow: cloud(2, -3, 0.95, '#E8F0FA') + '<g fill="#fff"><circle cx="22" cy="48" r="2.6"/><circle cx="33" cy="53" r="2.6"/><circle cx="44" cy="48" r="2.6"/><circle cx="28" cy="58" r="2.2"/><circle cx="39" cy="59" r="2.2"/></g>'
  };

  const U = {
    feels: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
    humidity: '<path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z"/>',
    wind: '<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>',
    pressure: '<circle cx="12" cy="12" r="9"/><path d="M12 12l4-4"/>',
    rain: '<path d="M7 15a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a3.5 3.5 0 0 1 0 6.5z"/><path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/>',
    uv: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>'
  };

  return {
    keys: Object.keys(W),
    weather: (k) => `<svg viewBox="0 0 64 64" aria-hidden="true">${W[k] || W.cloud}</svg>`,
    ui: (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${U[k] || ''}</svg>`
  };
})();
