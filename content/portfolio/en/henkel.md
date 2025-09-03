---
tags:
  - icon: ph:git-branch
    content: Development [C#]
title: Henkel
description: Tool for recording and managing errors equipped with a terminal interface
seo:
  title: Henkel
  description: Tool for recording and managing errors equipped with a terminal interface
name: Henkel Software
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

#### An Attempt at Automation

When I started my first job, I had no idea how repetitive the work would be: Take a piece of paper, transcribe it, classify it, and save it. All of this in a huge, cluttered Microsoft Access database. Out of frustration from the regular view, an idea was born—to isolate the technology necessary for my work.

![Henkel Software interface](/portfolio/henkel.webp)

#### Absolute Minimalism

If I said I would reduce the process to the bare minimum, I meant it deadly seriously. Luckily, I didn't get as far as languages like `C++` or `Assembly`. My choice at the time was the only reasonable language I knew: `C#`. However, I incorporated simplicity into the application's controls. My model was the text-based interface applications of the last millennium. I saw it as the best possible decision.

Clumsy `WinForms` based purely on `windows.h` were not only difficult to control advanced features but also slow and unmaintained. In stark contrast was the open-source library [`Terminal.Gui`](https://gui-cs.github.io/Terminal.Gui/index.html), which, in addition to its relatively advanced features, offered regular updates and new functions.

#### Limits of the Chosen Environment

As I could have guessed when creating the .sln project, the idyllic terminal interface has its limits. Animations, complex multi-threaded processes, or more complex work with windows or artificial intelligence are completely alien to it. The fact that many of these functions were a necessity for the Henkel project put me at a crossroads.

#### Early Retirement

The path was not the most pleasant, but it was clear. While actively working on the application, I discovered the [Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk), or its key component `WinUI`. It didn't take long for me to muster the courage to start working on a new solution to the original problem. The answer was [DN Henkel Vision](https://github.com/branislavjuhaas/dn-henkel-vision) — the Henkel project, but now with a true _vision_ and a _visual_ interface.
