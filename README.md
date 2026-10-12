# Perla Proměny — pixelová RPG víry

Herní týden od pondělí do neděle: každý den splň jeden úkol (Označování / Život víry / Evangelizace / Pokání–Proměna), bojuj s duchy temnoty, sbírej gear a rozzáři PERLU!

## Co je v balíčku
- `index.html` — celá hra v jediném souboru (React + grafika inline, funguje i offline po prvním načtení)
- `manifest.json` — PWA manifest (instalace na mobilu)
- `sw.js` — service worker (offline cache)
- `icon-192.png`, `icon-512.png` — ikonky perly

## Spuštění lokálně
Stačí otevřít `index.html` v prohlížeči (pro service worker doporučuji lokální server, např. `npx serve .`).

## Nasazení na GitHub Pages
1. Vytvoř repozitář (např. `perla-promeny`) a nahraj obsah této složky.
2. Settings → Pages → Source: branch `main`, folder `/ (root)` → Save.
3. Hra poběží na `https://<tvuj-ucet>.github.io/perla-promeny/`

## APK přes PWABuilder
1. Otevři pwabuilder.com a vlož URL z GitHub Pages.
2. Package for stores → Android → sign the package (řádek "Generate signing key" můžeš nechat prázdný, PWABuilder vygeneruje vlastní).
3. Stáhni APK a nainstaluj na mobil (povol "Neznámé zdroje").
