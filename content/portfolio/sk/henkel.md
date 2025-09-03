---
tags:
  - icon: ph:git-branch
    content: Development [C#]
title: Henkel
description: Nástroj zápisu a správy chýb vybavený terminálovým rozhraním
seo:
  title: Henkel
  description: Nástroj zápisu a správy chýb vybavený terminálovým rozhraním
name: Softvér Henkel
slug: henkel
platform: Desktop
technology: .NET C#
development:
  start: 2022-11-09
  end: 2022-12-24
  status: archived
source: https://github.com/branislavjuhaas/henkel
image: /thumbnails/henkel.webp
---

#### Snaha o automatizáciu

Keď som nastupoval do svojho prvého zamestnania, ešte som netušil, akú repetitívnu prácu budem mať: Zobrať papier, prepísať, zaklasifikovať uložiť. To všetko v obrovskej, preplnenej databáze programu Microsoft Access. Z frustrácie pri pravidelnom pohľade sa zrodil nápad - izolovať technológiu nutnú pre moju prácu.

![Rozhranie softvéru Henkel](/portfolio/henkel.webp)

#### Úplný minimalizmus

Ak som si raz povedal, že proces zredukujem na nutné minimum, myslel som to smrteľne vážne. Tak ďaleko ako k jazykom `C++` alebo `Assembly` som sa však nažťastie nedostal. Mojou voľbou sa stal vtedy jediný rozumný jazyk, ktorý som ovládal - `C#`. Jednoduchosť som však zapracoval do ovládania aplikácie. Predlohou sa mi stali aplikácie minulého milénia s textovým rozhraním. Vnímal som to ako najlepšie možné rozhodnutie.

Neohrabané `WinForms` založené čisto na `windows.h` boli nielen ťažké na pokročilé ovládanie, ale aj pomalé a neudržiavané. V ostrom kontraste vystupovala open-source knižnica [`Terminal.Gui`](https://gui-cs.github.io/Terminal.Gui/index.html), ktorá okrem svojich pomerne pokročilých funkcií predstavovala pravidelné aktualizácie a nové funkcie.

#### Limity zvoleného prostredia

Ako som už mohol tušiť pri samom vytváraní .sln projektu, idilické rozhranie terminálu pozná hranice svojich možností. Animácie, komplexné viacvlákonové procesy alebo komplexnejšia práca s oknami alebo umelou inteligenciou sú mu úplne cudzie. Fakt, že množstvo z týchto funkcií pre projekt Henkel nutnosťou ma postavil na rázcestie.

#### Predčasný dôchodok

Cesta nebola najpríjemnejšia, ale jednoznačná. Už počas aktívnej práci na aplikácii som objavil [Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/), respektíve jeho kľúčovnú súčasť `WinUI`. Netrvalo dlho a ja som nabral odvahu začať s prácou na novom riešení pôvodného problému. Odpoveďou bol [DN Henkel Vision](https://github.com/branislavjuhaas/dn-henkel-vision) - projekt Henkel, teraz však so skutočnou _víziou_ a s vizuálnym rozhraním.
