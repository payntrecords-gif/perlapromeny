# Perla Proměny — pixelová RPG víry (ChangeON)

Herní týden od pondělí do neděle. Každý den provádí hra hráče systémem ChangeON: plní skutečné činnosti ve čtyřech oblastech, píše Deník proměny a rozzařuje Perlu, která prochází sedmi stavy ChangeON1 → ChangeON7.

## Co je ve hře

- **Více činností za jeden den** — každý den můžeš splnit libovolný počet činností ve všech oblastech; den se automaticky neuzavírá po první činnosti
- **Čtyři oblasti**: Označování · Život víry · Evangelizace · Pokání / Proměna (Deník proměny, Skutek proměny, Shimbang)
- **Panel „Dnešní cesta"** — přehled oblastí, počet splněných činností, doporučený další krok
- **Navigační šipka** — zlatý ukazatel na mapě směřuje k vybrané oblasti (tlačítko „Navést"); cíl mimo obrazovku → šipka na okraji s názvem a vzdáleností
- **Deník proměny** — tři otázky (vděčnost / boj / změna), průběžné automatické ukládání, stav Rozpracováno → Dokončeno; po uzavření dne je zápis jen ke čtení. Zápis se ukládá **pouze do tohoto zařízení** (localStorage)
- **Sedm stavů Perly (ChangeON1–7)** — od tmavé perly s prasklinami po čistou zářící perlu; postup podle uzavřených dnů týdne
- **Týdenní lišta dní** — aktuální den zvýrazněný („Dnes"), splněné ✓
- **Ukončení dne** — ruční, se souhrnem (co je splněno / co zbývá) a potvrzením
- **Volitelné souboje** — duchové na mapě jsou volitelná výzva; nikdy neblokují plnění činností, Deník ani dokončení dne
- **Onboarding** — krátký průvodce po prvním spuštění (lze přeskočit, znovu spustit tlačítkem „?")

## Ovládání

- **Mobil**: klepej na mapu (krok směrem k tapnutí), „Dnešní cesta" se otevře ze spodního panelu; layout respektuje safe-area
- **Desktop**: mapa zabírá hlavní část okna, vpravo je panel Dnešní cesty; pohyb klávesnicí (WASD / šipky) nebo kliknutím na mapu

## Ukládání a offline

- Vše se ukládá **automaticky po každé změně** do localStorage prohlížeče (včetně rozepsaného Deníku)
- Service worker zajistí **offline režim** po prvním načtení
- Data zůstávají v zařízení; vymazání dat prohlížeče je odstraní

## Spuštění lokálně

Stačí otevřít `index.html` v prohlížeči. Pro správnou funkci service workeru doporučuji lokální server:

```
npx serve .
# nebo
python3 -m http.server
```

## Nasazení na GitHub Pages

1. Settings → Pages → Source: branch `main`, folder `/ (root)` → Save
2. Hra poběží na `https://<ucet>.github.io/perlapromeny/`

## Instalace na mobil (PWA)

Otevři URL z GitHub Pages v Chrome → nabídka → **„Přidat na domovskou obrazovku"**. Případně přes [PWABuilder](https://www.pwabuilder.com) lze vygenerovat APK.

## Struktura

- `index.html` — celá hra v jednom souboru (React + grafika inline)
- `manifest.json` — PWA manifest
- `sw.js` — service worker (offline cache)
- `icon-192.png`, `icon-512.png` — ikonky
