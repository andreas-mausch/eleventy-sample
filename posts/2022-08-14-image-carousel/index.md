---
title: Image Carousel
date: 2022-08-14T16:00:00+02:00
---

<div style="width: 500px; height: 300px; max-width: 100%; margin: 0 auto">
{{ "image1.jpg image2.jpg image3.jpg image4.jpg image5.jpg image6.jpg" | split: " " | carousel }}
</div>

Second carousel, this time using a glob file filter

<div style="width: 500px; height: 300px; max-width: 100%; margin: 0 auto">
{{ "*.jpg" | glob | carousel }}
</div>
