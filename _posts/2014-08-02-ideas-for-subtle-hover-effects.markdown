---
layout: post
title:  "Ideas for subtle hover effects"
subtitle: "Some creative and subtle hover effect inspiration using latest techniques"
date:   2014-07-02 16:33:07
image: "//38.media.tumblr.com/2c1a9d53169f1eca25b2a0b8238744c9/tumblr_n9hxdqatsK1st5lhmo1_1280.jpg"
fbimage: "//s3.amazonaws.com/ooomf-com-files/apx8EPiSnWoYHSEiUENI_14553734675_699b2aa038_o.jpg" 
categories: blog
---

It’s time for some fresh hover effect inspiration! Nowadays we are seeing a lot of delicate designs with fine lines, lots of white space, clean typography and subtle effects. With that beautiful trend in mind we want to share some creative ideas for grid item hover effects. It’s all about being subtle with that little delightful surprise.
The techniques we are using for these hover effects involve 3D transforms and some pseudo-element transitions. Note that these will only work in modern browsers.

Sadly, transitions on text in Firefox are not very smooth which influences most of the effects.

    if($(".authorinfo").length > 0 && $("header.image.singlepost").length > 0){
        $(window).scroll(function(){
            if($(document).scrollTop() > $("header.image.singlepost").height() - 30){
                $("a.openmenu, .authorinfo:not(.open)").removeClass("white");
            }
            else{
                $("a.openmenu, .authorinfo").addClass("white");
            }
        });
    }

The beautiful photography is from Unsplash, a site that brings you 10 free hi-resolution photos every 10 days. The icons used in one of the hover styles is from the Feather icon set by Cole Bemis.

For the structure we are simply using a grid with figures:It’s time for some fresh hover effect inspiration! Nowadays we are seeing a lot of delicate designs with fine lines, lots of white space, clean typography and subtle effects. With that beautiful trend in mind we want to share some creative ideas for grid item hover effects. It’s all about being subtle with that little delightful surprise.
The techniques we are using for these hover effects involve 3D transforms and some pseudo-element transitions. Note that these will only work in modern browsers.

Sadly, transitions on text in Firefox are not very smooth which influences most of the effects.

The beautiful photography is from Unsplash, a site that brings you 10 free hi-resolution photos every 10 days. The icons used in one of the hover styles is from the Feather icon set by Cole Bemis.

For the structure we are simply using a grid with figures:

![Responsive](http://front-endmagazine.com/wp-content/uploads/2012/10/base-responsive-framework.jpg)