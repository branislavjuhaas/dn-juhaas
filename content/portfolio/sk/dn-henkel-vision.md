---
tags:
  - icon: ph:git-branch
    content: Development [C#]
title: DN Henkel Vision
description: Profesionálny nástroj na zápis, spracovanie a klasifikáciu hardvérových chýb
seo:
  title: DN Henkel Vision
  description: Profesionálny nástroj na zápis, spracovanie a klasifikáciu hardvérových chýb
name: DN Henkel Vision
slug: dn-henkel-vision
platform: Windows
technology: WinUI C#
development:
  start: 2023-04-04
  end: 2024-07-13
  status: archived
source: https://github.com/branislavjuhaas/dn-henkel-vision
image: /thumbnails/dn-henkel-vision.webp
---

#### Potrebná modernizácia

Pri finálnej fáze vývoja pôvodného softvéru [Henkel](/sk-sk/portfolio/henkel) začalo byť čoraz jasnejšie, že textové rozhranie a obmedzené možnosti knižnice [`Terminal.Gui`](https://gui-cs.github.io/Terminal.Gui/index.html) už nepostačujú pre naplnenie vízie moderného nástroja na správu chýb. V snahe nájsť moderné rozhranie s bohatými možnosťami som narazil na [Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk) a jeho kľúčovú súčasť `WinUI`, ktorá ponúkala takmer neobmedzené možnosti pre tvorbu moderných aplikácií. To, že som ju nakoniec použil zrejme nie je prekvapením.

![Rozhranie softvéru DN Henkel Vision](/portfolio/dn-henkel-vision.webp)

#### Použitie AI ešte kým nebola v móde

Aby čas strávený vývojom priniesol časovú úsporu, pripraviť krajšie rozhranie ako nadstavbu databázy bolo nedostatočné, pre urýchlenie procesu zápisu chýb som sa rozhodol pre čiastočné nahradenie práce používateľa umelou inteligenciou. Knižnica [`ML.NET`](https://dotnet.microsoft.com/en-us/apps/ai/ml-dotnet) dovoľovala rýchlo trénovať modely v elegantnom rozhraní a jednoduché použitie v aplikácii. Úspešné nasadenie modelu na klasifikáciu chýb prinieslo automatickú klasifikáciu s presnosťou nad 80 %, čo výrazne znížilo čas potrebný na spracovanie nových záznamov.

#### Nárast produktivity

Najlepším dôkazom užitočnosti aplikácie je zrejme fakt, že pôvodný pracovný čas, ktorý som niekedy strávil spracovaním chýb v Microsoft Access, sa znížil na polovicu, čo umožnilo ďalší vývoj aplikácie. Vďaka čiastočnej finančnej podpore od [Kraussmaffei Technologies](https://www.kraussmaffei.com/en/) som mohol nakoniec dokončiť vývoj aplikácie a nasadiť ju do produkčného prostredia.

![Vývoj aplikácie DN Henkel Vision](/portfolio/four-setup.webp)

#### Dôchodok a odkaz

Z dôvodu môjho prechodu na zaujímavejšia a potrebnejšie projekty pre spoločnosť [Kraussmaffei Technologies](https://www.kraussmaffei.com/en/) som sa rozhodol ukončiť aktívny vývoj aplikácie DN Henkel Vision. Napriek tomu zostáva aplikácia plne funkčná a naďalej môže slúžiť svojmu účelu v prostredí spoločnosti, kde pomáha zefektívniť proces správy hardvérových chýb. Verím, že tento projekt bude slúžiť ako inšpirácia pre budúce projekty a prinesie hodnotu aj v ďalších kontextoch.
