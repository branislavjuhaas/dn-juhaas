---
tags:
  - icon: ph:git-branch
    content: Engineering
title: Gasbag
description: Legendary retro computer game with balloon shooting
seo:
  title: Gasbag
  description: Legendary retro computer game with balloon shooting
name: Gasbag
slug: gasbag
platform: MS DOS
technology: QBasic
development:
  start: 2021-05-04
  end: 2021-05-07
  status: archived
source: https://github.com/branislavjuhaas/dn-gasbag/tree/v1
image: /thumbnails/gasbag.webp
---

#### Mission

At the beginning was an effort to create a simple program, a 2D game for MS DOS. No complex virtualization, memory management, just bombarding the system with numerous commands to rewrite text on the screen, similar to most of my work from 2021 - 2022.

![Photo of local development environment for MS DOS application](/portfolio/retro-setup.webp)

#### Challenges

Although the QBasic environment is built for simple text interfaces, reading input and updating the screen in real time presented challenges. The game had to be smooth, respond to keystrokes while simultaneously rendering moving objects. Did I succeed? Partially.

I successfully managed input reading without stopping the program and slowing down the game logic. However, responding to hardware speed using proper delta time functions was foreign to a beginning developer at the time. The result can be observed on slower hardware, where the game becomes very slow or unplayable. I still remember the horror when the computer simply froze and started beeping after launching the game.

#### First Launch

I remember that moment when I saw a moving balloon on the screen. It was trivial, but for me it meant a feeling of victory - the computer was actually obeying my commands and the game came to life.

![GASBAG game title screen](/portfolio/gasbag-title.webp)

#### From BASIC to VBA

Today I look at the GASBAG game and perceive its unusability in the 21st century world. On the other hand, it's a work that helped shape my current focus and skills in programming. Although the program's language, BASIC, is long forgotten, its similarity to VBA helped me understand Microsoft Office scripting, which remains an important part of many work processes.

GASBAG taught me respect for simple solutions and willingness to experiment - even when the result may not be perfect. Every "stuck" project is a step forward.
