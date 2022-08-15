---
title: Image Comparison Slider
date: 2022-08-15T18:00:00+02:00
---

<div class="image-comparison-slider">
  <img-comparison-slider>
    <img slot="first" src="{% imageUrl "before.jpg" %}" style="max-height: 80vh" />
    <img slot="second" src="{% imageUrl "after.jpg" %}" style="max-height: 80vh" />
    <svg slot="handle" class="image-comparison-slider-handle" xmlns="http://www.w3.org/2000/svg" width="125" viewBox="-8 -3 16 6">
      <path stroke="#fff" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#fff" vector-effect="non-scaling-stroke"></path>
    </svg>
  </img-comparison-slider>
</div>
