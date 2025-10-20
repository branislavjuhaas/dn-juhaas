---
tags:
  - icon: ph:git-branch
    content: Development [C#]
title: DN Henkel Vision
description: Professional tool for recording, processing, and classification of
  hardware faults
seo:
  title: DN Henkel Vision
  description:
    Professional tool for recording, processing, and classification of
    hardware faults
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

#### Modernization Required

During the final development phase of the original [Henkel](/portfolio/henkel) software, it became increasingly clear that a text-based interface and the limited capabilities of the [`Terminal.Gui`](https://gui-cs.github.io/Terminal.Gui/index.html) library were insufficient to achieve the vision of a modern fault management tool. In search of a modern interface with rich features, I discovered the [Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk) and its key component `WinUI`, which offered virtually unlimited possibilities for creating modern applications. It's probably not surprising that I ultimately chose to use it.

![DN Henkel Vision Software Interface](/portfolio/dn-henkel-vision.webp)

#### Using AI Before It Was Trendy

To ensure that development time resulted in time savings, merely creating a modern interface as a database frontend was insufficient. To accelerate the fault recording process, I decided to partially replace user work with artificial intelligence. The [`ML.NET`](https://dotnet.microsoft.com/en-us/apps/ai/ml-dotnet) library allowed rapid model training through an elegant interface and easy integration into the application. Successful deployment of the fault classification model achieved over 80% accuracy in automated classification, significantly reducing the time needed to process new records.

#### Increased Productivity

Perhaps the best proof of the application's usefulness is the fact that the processing time I previously spent on fault management in Microsoft Access was cut in half, enabling further application development. Thanks to partial financial support from [Kraussmaffei Technologies](https://www.kraussmaffei.com/en/), I was able to complete development and deploy the application to production.

![DN Henkel Vision Application Development](/portfolio/four-setup.webp)

#### Retirement and Legacy

Due to my transition to more interesting and urgent projects for [Kraussmaffei Technologies](https://www.kraussmaffei.com/en/), I decided to discontinue active development of DN Henkel Vision. Nevertheless, the application remains fully functional and continues to serve its purpose within the company, helping streamline hardware fault management processes. I believe this project will serve as inspiration for future projects and deliver value in other contexts as well.
