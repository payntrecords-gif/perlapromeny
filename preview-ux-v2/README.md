# Pracovní náhled — UX reset v2 + RPG C2

**Toto je pracovní verze. Nejde o produkci.**

- Save: `perla_promeny_preview_v5` (oddělený od produkce — produkční save `perla-promeny-v4` se nikdy nečte automaticky ani nepřepisuje)
- Service worker: vypnutý v tomto náhledu
- Badge „PRACOVNÍ NÁHLED" vlevo nahoře
- Nástroje (levý dolní roh): reset náhledu, nový hrdina, import kopie v4 pro test migrace, přepínání Strážce/Posel/Učedník

## Testovací postup
1. **Nový hráč:** otevři náhled → vytvoření hrdiny (3 kroky)
2. **Migrace v4:** Nástroje → „Importovat kopii produkčního v4" → nabídne výběr classy → potvrzení (produkce nedotčena)
3. **Tři classy:** Nástroje → ▶ Strážce / ▶ Posel / ▶ Učedník (vizuální kontrola siluet + Hrdina screen)
4. **Výbava:** Hrdina → Inventář → Nasadit (změní staty i sprite)
