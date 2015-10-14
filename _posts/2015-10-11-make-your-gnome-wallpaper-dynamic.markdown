---
layout: post
title: "Have an automatically changing desktop wallpaper"
subtitle: "'Cause there are so many awesome images I can't choose from"
date: 2015-10-11 02:13:00
image: "https://unsplash.it/1680/800/?random"
fbimage: "/assets/images/gnome-wallpaper-changer-top-fb.jpg"
categories: projects
comments: true
published: true
---

So once in a while I have the urge to write something else than the usual web languages. As a big fan of using (Arch) Linux on my systems I usually trap myself writing a simple bash script to perform 'some task' I'm missing or just don't want to repeat too often.

Besides the 'bigger' scripts I've written to support the development process of working with Wordpress in different environments (might share those some time if anyone is interested) I've also written a little script to pimp my Gnome Desktop. A few years ago I stumbled on [Unsplash.com](http://unsplash.com). A day I will never forget since it was just amazing to see how many beautiful, free to use, images were available. Since that moment I've been on their daily subscription list which weekly drops me a list of amazing images. 

Last week I needed a break from the regular work so I decided to write myself a little script which loads an image out of a directory and sets it as my wallpaper. This script repeated itself every 10 minutes which resulted in a nice dynamic desktop. Awesome! Till I got my newsletter from Unsplash and wondered why I don't just load a random image from their website. 

So I decided to rewrite the script, add Unsplash as source, make a little installer (cause I'm still lazy and don't want to repeat the same tasks on every device), have it running on all my Linux devices and drop it on [Github](https://github.com/dirkgroenen/gnome-wallpaper-changer).

### Awesome, I want that too! 
That's great to hear! If you want to use it too you can easily download and install it by running the following command:

```
wget -O gnome-wallpaper-changer.tar.gz https://github.com/dirkgroenen/gnome-wallpaper-changer/archive/master.tar.gz && tar -vxf gnome-wallpaper-changer.tar.gz && ./gnome-wallpaper-changer-master/install.sh
```

This will download the repository and run the installer. The installer will ask you some questions and after you've answered these and rebooted your computer you're all set up!

[![Gnome Wallpaper Changer Installer](/assets/images/gnome-wallpaper-changer-installer.png)](/assets/images/gnome-wallpaper-changer-installer.png)

Let me know if you like it, or if you encounter any issues.