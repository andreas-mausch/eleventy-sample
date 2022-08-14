---
title: Image Carousel
date: 2022-08-14T16:00:00+02:00
---

Image carousel:

<div style="width: 500px; height: 300px">
{% assign images = "image1.jpg image2.jpg image3.jpg image4.jpg image5.jpg image6.jpg" | split: " " %}
{% carousel images %}
</div>
