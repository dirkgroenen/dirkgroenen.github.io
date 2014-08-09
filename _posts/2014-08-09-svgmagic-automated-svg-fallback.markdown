---
layout: post
title:  "SVGMagic: Automated SVG fallback"
subtitle: "Because SVGs are so much better, prettier and easier to use!"
date:   2014-08-09 15:30:07
image: "/assets/images/svgmagic-top-splash.jpg"
fbimage: "/assets/images/svgmagic-top-splash.jpg"
categories: projects
comments: true
---

When you're working with responsive web designs and retina-displays SVG graphics are absolutely indispensable. However, fall-back solutions often put you on a lot of extra work. With SVGmagic I wanted to create a plugin that does all the fallback work, so I could just focus on the SVG images.

During my days at the office the designers often asked me why it wasn't possible to use vector images on a new website. Mostly I responded with the answer that it was to much work to convert all the images to PNG and create a fallback for that. Especially when the website has many small icons. 

## The idea
After hearing this question repeating itself through the office daily I started thinking of a way to create an automated fallback. After a few hours I started working on a little script that searched the website for any SVG images and, if SVG wasn't supported by the browser, send those URLs to an API. This API downloads all the SVG images, converts them to PNG and returns an array with the location of the converted images. When the plugin receives the array with new URLs it loops again through all the images and replaces the SVG image with the new PNG image. 

At this moment the first version of [SVGMagic](https://dirkgroenen.github.io/SVGMagic/) was born! I pushed the script to Github so I could use it in every project from that moment on. 

A few days later it got mentioned by [Codrops](http://tympanus.net/codrops/collective/collective-100/) and within a few hours it got mentioned throughout the whole world. Nowadays the plugin has been extended and offers even more fallbacks.

So if you ever want to try SVG graphics, but aren't motivated enough to create a full fallback for it, just check out [SVGMagic](https://dirkgroenen.github.io/SVGMagic/) and let me know if you liked it! 
