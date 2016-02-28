---
layout: post
title: "The next level Mopidy music client"
subtitle: "Since 'just playing music' didn't make me happy<br/>(and because Mopify needs a new name)"
date: 2015-05-20 22:30:00
image: "/assets/images/mopify-top-vinyl-site.jpg"
fbimage: "/assets/images/mopify-top-vinyl-fb.jpg"
categories: projects
comments: true
published: true
---

In 2013 I moved to a new place and one of the things I definitely wanted in my new apartment was something that would enable me to control my music anywhere in the place. Of course, the first thing I thought about was Sony's Sonos, but looking at those prices and that awful interface I almost died. Lucky as I am I've chosen the road of being a developer. So why not just create my own system?!

*TL;DR
I just wanted to tell you a bit more about Mopify, but fine! The conclusion: Mopify is a Mopidy web client which aims on providing a full music experience and which needs a new create name/brand.*

A few days later I started searching for already existing software. One of the things I definitely wanted was support for Spotify, since I stopped downloading music a few years ago. After a few hours I stumbled onto this little program called [Mopidy](https://www.mopidy.com/). Mopidy is nothing more than 'just' a music server which can be extended with a lot of different extensions. One of these extensions was Spotify. Bam, I just found my new music server! After downloading and installing it a started looking for an interface to control it. After trying some different Linux MPD clients I realized that this wasn't going to work for me, so I decided to start writing my own web client. 

On October 28, 2013 [Mopify saw its first light](https://github.com/dirkgroenen/mopidy-mopify/tree/6c194bc00c884384d002e6a9834b1740cb3ba928). Since I was only planning to use Mopidy in combination with Spotify I decided to fully focus the client on providing the same experience as Spotify did with their web client. On the 8th of November I uploaded the first screens. Back then Mopify looked like this:

![https://raw.githubusercontent.com/dirkgroenen/mopidy-mopify/3942c28f2fc1a90f8e34fc7e209e6277a84f7cb9/Screenshots/albumlookup.png](https://raw.githubusercontent.com/dirkgroenen/mopidy-mopify/3942c28f2fc1a90f8e34fc7e209e6277a84f7cb9/Screenshots/albumlookup.png)
![https://raw.githubusercontent.com/dirkgroenen/mopidy-mopify/3942c28f2fc1a90f8e34fc7e209e6277a84f7cb9/Screenshots/playlists.png](https://raw.githubusercontent.com/dirkgroenen/mopidy-mopify/3942c28f2fc1a90f8e34fc7e209e6277a84f7cb9/Screenshots/playlists.png)

It was a simple Spotify copy, but for me it was the end of the world. Depending on your system Mopidy can be quite slow. So to make the client feel a bit smoother I combined some of the Mopidy methods with Spotify API endpoints. When comparing with the other available clients it wasn't great, but when you only used Spotify as your music source it worked better than most of the other available clients. 

## Time for the remake 
A year went by and at the end of 2014 I wanted to recreate the client. I had used it everyday and still liked it, but I knew it could be so much better. By this time the project had a few stargazers on Github, but nothing special. Most of my projects are meant to be a learning experience for myself. So instead of using frameworks or code I'm already familiar with I decided to pick something I had never used before. On November 25th, 2014 I started [writing down](https://github.com/dirkgroenen/mopidy-mopify/commit/57a9f1d7cc2df146baa6884011764f4813dbb18d) some ideas for the new client and after a few days I decided to go with AngularJS.

Besides creating the client and keeping the same features I wanted to create a 'full experience Mopidy music player'. So I wrote down ideas like:

* Radio mode - Create a queue based on the given artist, album, track, genre or mood (Echonest)
* Artist information 
* Rich album/artist graphics
* Playlists 
* Discover new music - charts etc.
* Improved searching with Spotify
* Consider if it still has to be Spotify only. Will have impact on the 'improved searching with Spotify' item.
* Use the Spotify API to edit playlists (if possible with redirect_uri)

On January the 4th, 2015, I released Mopify's first beta. The client was read enough (read: buggy) to show it to the world and I just didn't want to wait any longer to show people what I had worked on. The result (Version 1):

![https://camo.githubusercontent.com/6d1b253991eed84ebcce5b5bc4abceb1df67c7a6/687474703a2f2f692e696d6775722e636f6d2f42546c414745662e6a7067](https://camo.githubusercontent.com/6d1b253991eed84ebcce5b5bc4abceb1df67c7a6/687474703a2f2f692e696d6775722e636f6d2f42546c414745662e6a7067)
![https://camo.githubusercontent.com/60393b2678a5dd08671fff4127daf544a030d912/687474703a2f2f692e696d6775722e636f6d2f74315065764a662e6a7067](https://camo.githubusercontent.com/60393b2678a5dd08671fff4127daf544a030d912/687474703a2f2f692e696d6775722e636f6d2f74315065764a662e6a7067)

It was definitely I completely different look and feel, but damn it felt so good! Now, a few months later, I released version 1.5.0 with even more awesome features like an improved Queue manager, Synchronization service and more! Check the [Github repo](https://github.com/dirkgroenen/mopidy-mopify) and the [Wiki](https://github.com/dirkgroenen/mopidy-mopify/wiki) if you want to know more.

Let me know if you're using Mopify and if you like it! In the mean time there is just one thing left for me/us to do:

## A new name!

Exactly, no Mopify anymore! A new name, a new brand, something to refer to and especially something that looks like a type of the word Mopidy. Sadly, I'm not so creative when it comes to creating names. So let me know in the comments if you have an awesome idea! 

