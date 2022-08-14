---
title: Image Carousel
date: 2022-08-14T16:00:00+02:00
---

Image carousel:

<!-- slider-item-ratio slider-item-ratio-16x9 -->
<div style="width: 500px; height: 300px; max-width: 100%">
<div class="swiffy-slider slider-indicators-sm slider-nav-animation slider-nav-animation-fadein" id="swiffy-animation">
    <ul class="slider-container" id="container1">
        <li class="slide-visible"><a href="https://google.com" target="_blank">{% thumbnail "image1.jpg", "Image via thumbnail" %}</a></li>
        <li>{% thumbnail "image2.jpg", "Image via thumbnail" %}</li>
        <li>{% thumbnail "image3.jpg", "Image via thumbnail" %}</li>
        <li>{% thumbnail "image4.jpg", "Image via thumbnail" %}</li>
        <li>{% thumbnail "image5.jpg", "Image via thumbnail" %}</li>
        <li>{% thumbnail "image6.jpg", "Image via thumbnail" %}</li>
    </ul>

    <button type="button" class="slider-nav" aria-label="Go to previous"></button>
    <button type="button" class="slider-nav slider-nav-next" aria-label="Go to next"></button>

    <div class="slider-indicators">
        <button aria-label="Go to slide" class="active"></button>
        <button aria-label="Go to slide" class=""></button>
        <button aria-label="Go to slide" class=""></button>
        <button aria-label="Go to slide" class=""></button>
        <button aria-label="Go to slide" class=""></button>
        <button aria-label="Go to slide" class=""></button>
    </div>
</div>
</div>
