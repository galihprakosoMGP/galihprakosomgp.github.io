/* Tailwind CDN config: maps color names (bg, fg, acc...) to the CSS
   variables defined in css/style.css, and sets the font family. */
tailwind.config={theme:{extend:{
  fontFamily:{sans:['"Plus Jakarta Sans"','ui-sans-serif','system-ui','-apple-system','"Segoe UI"','Roboto','sans-serif']},
  colors:{bg:'var(--bg)',soft:'var(--soft)',fg:'var(--fg)',muted:'var(--muted)',line:'var(--line)',acc:'var(--acc)',acct:'var(--acct)'}
}}}
