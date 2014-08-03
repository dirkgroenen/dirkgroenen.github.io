---
layout: post
title:  "SVGMagic"
subtitle: "Start using it and you will never let SVG go away"
date:   2014-08-02 16:33:07
image: "//31.media.tumblr.com/e7ac48834604ac8e9aaf4a3c106c4e86/tumblr_n9hxd1c4Y81st5lhmo1_1280.jpg"
fbimage: "//s3.amazonaws.com/ooomf-com-files/kMh0QXZMQOmsIiQRQIlW_14701556285_aacce9be47_o.jpg"
categories: projects
---

SVGMagic is a simple jQuery plugin that searchs for SVG images (including background-images) on your website andcreates PNG versions if the browser doesn't support SVG.
Wondering why you should use SVG images? SVG images are vector based! Meaning that they will be as sharp as hell no matter how big they are. In other words: one file for every size. See it yourself: (assuming you are now using a browser that understands SVG images)

## Where the magic happens
SVGmagic checks which browser your visitor is using. Is it a browser that doesn't support SVG images, than it starts the magic! First of all the script will check which images on your website are SVG and collects their URLs. These URLs are then send to our server which will temporarily download, convert and save them. When that's done the server send back a package with new URLs. The SVG images on your website than get replaced by the new PNG images and your old-school visitor can see the 'SVG' images.

[SVGMagic]: https://github.com/dirkgroenen/svgmagic
