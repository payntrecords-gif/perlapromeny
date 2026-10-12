# HOLLOWFANE — Evaluation build (Windows x86_64)

**Toto je neupravený evaluation build HOLLOWFANE v1.0.0** (commit `8211bb7`).
Nejedná se o hru Perla Proměny — slouží k posouzení technického a herního základu.

## Zdroj
- Repo: https://github.com/Ryvos/hollowfane
- Commit: `8211bb739943d819a2910c9aedad6a706b6134cb` (v1.0.0)
- Engine: Godot 4.6 stable
- Licence kódu a assetů: viz `LICENSES.md` v tomto ZIPu

## Spuštění
1. Rozbal ZIP kamkoli (např. `C:\HOLLOWFANE-eval\`).
2. Poklepej na `HOLLOWFANE.exe`.
   - Windows SmartScreen může zobrazit varování (unsigned binary) → „More info" → „Run anyway".
3. Hra startuje přímo do hry (hlavní menu je plánováno, v1.0 startuje rovnou do hubu Whitestone).

## Postava
- Hra začíná s výchozí třídou **Hollowbinder** (v1.0 jsou třídy statově odlišené; Furyborn má 120 HP).
- Jinou třídu nevybereš ve starém menu ( není) — hodnotí se proto hlavně jádro pohybu/boje/lootu.

## Ovládání (z README upstreamu)
| Vstup | Akce |
|---|---|
| Levý klik na dlaždici | Pohyb na místo |
| Levý klik na nepřítele | Základní útok (nejbližší v dosahu) |
| Levý klik na předmět na zemi | Sebrat do inventáře |
| Levý klik na buňku inventáře | Nasadit předmět |
| Levý klik na slot paper-dollu | Sundat předmět |
| Levý klik na NPC | Promluvit / obchod |
| Levý klik na portál | Cesta do scény |
| `1` `2` `3` `4` | Aktivace schopnosti z hotbaru |
| `I` | Inventář |
| `C` | Postava (character sheet) |
| `Q` | Quest log |
| `Esc` | Zavřít panel; jinak nastavení |
| `F5` / `F9` | Rychlé uložení / načtení |
| Ukončení | `Esc` → Settings → Quit (nebo zavři okno) |

## Cesta z hubu do dungeonu
- V Whitestone hubu najdi **portál** (světlá dlaždice/oblouk) → klikni na něj → dostaneš se do Catacombs (procedurální dungeon).
- V dungeonu postupuj hlouběji; v hloubce je boss **The Hollow Bishop**.
- Portálem se vracíš zpět do hubu.

## 5minutový testovací scénář
1. **(30 s)** Počkej na start. Klikni na několik míst — ověř klik-to-move plynulost.
2. **(1 min)** Najdi portál → Catacombs. Procházej dungeonem; všimni si BSP generace.
3. **(1,5 min)** Klikni na nepřítele → základní útok. Zkus `1`–`4` (hotbar schopnosti — většina slotů může být dimmed/nezmapovaná, to je známý stav v1.0).
4. **(1 min)** Seber loot kliknutím na předmět na zemi → otevři `I` inventář → klikni na předmět = nasadit → `C` ověř změnu statů (damage/max_hp).
5. **(30 s)** `F5` ulož → `F9` načti. `Q` quest log. Vrať se portálem do hubu.

## Co hodnotit
### A. Vizuál
- [ ] Prostředí působí jako skutečná hra?
- [ ] Postava dostatečně velká a čitelná?
- [ ] Nepřátelé jasně rozpoznatelní?
- [ ] Konzistentní styl objektů?
- [ ] Osvětlení/kontrast použitelný?
- [ ] UI nepůsobí jako prototyp?

### B. Pohyb
- [ ] Postava jde tam, kam kliknu?
- [ ] Pathfinding se nezasekává?
- [ ] Rychlost přesná?
- [ ] Kamera sleduje postavu?

### C. Boj
- [ ] Zásahy mají vizuální odezvu (damage numbers)?
- [ ] Jasné, kdo utrpěl poškození?
- [ ] Nepřátelé reagují (aggro)?
- [ ] Boj má pocit dopadu (ne jen klikání)?
- [ ] Schopnosti fungují?

### D. Loot
- [ ] Předměty na zemi viditelné?
- [ ] Sebrání srozumitelné?
- [ ] Inventář pohodlný?
- [ ] Nový předmět lze porovnat (tooltip)?
- [ ] Vybavení mění statistiky?

### E. Celkový dojem
- [ ] Pripomíná skutečné izometrické ARPG?
- [ ] Vhodný základ pro Perlu Proměny?
- [ ] Stojí za to pokračovat?

## Známá omezení tohoto buildu
- Hotbar sloty 1–4: většina je „dimmed mirror" — plné třídní skill trees jsou plánované upstream weeks 6–9 (README upstream).
- Bez hudby a zvuků (v upstream repu nejsou žádné audio assety).
- Bez hlavního menu a výběru třídy (start rovnou do hubu).
- Bez mobilního ovládání (upstream: „No mobile at launch").
- Binárka není podepsaná (SmartScreen varování je normální).
- PCK obsahuje i vendored-nepoužívané LPC assety (CC-BY-SA 3.0) — viz `LICENSE_SNAPSHOT.txt`; runtime je nepoužívá, atribuce zachována v `LICENSES.md`.

## Licence (shrnutí — plné znění v LICENSES.md)
| Asset | Autor | Licence |
|---|---|---|
| Isometric Miniature Dungeon | Kenney (kenney.nl) | CC0 1.0 |
| LPC Medieval Fantasy Sprites (vendored, runtime NEPOUŽÍVÁN) | wulax / OGA | CC-BY-SA 3.0 |
| MedievalSharp font | Kludgy Fonts | OFL 1.1 |
