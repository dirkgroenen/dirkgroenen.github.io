---
layout: post
title: "Big changes: Mopify's new version!"
subtitle: "A new name, multiple sources and more."
date: 2015-08-16 11:32:00
image: "/assets/images/sonate-top-site.jpg"
fbimage: "/assets/images/sonate-top-fb.jpg"
categories: projects
comments: true
published: true
---

After promising it for a long time I've finally decided to get started on Mopify 2.0 (which won't be named Mopify). To make this version even more awesome I would love to hear your suggestions and ideas.documents contains the ideas and uploaded it to the repository.

The text below is coming from the document I've uploaded to the Mopify repository. If you have any feedback: let me know via Github or the comments below.

-------

# V2.0 - Mopify -> Sonate
When I've first written Mopify it was nothing more than a simple copy cat of Spotify play. Mostly created as a learning project for myself. 

In January 2015 I released a new version: Mopify 1.0. This was a complete remake, built on Angular and with Spotify as main source in mind. 

After some time the client got more and more popular. At this point in time it's quite a popular client and many people have been requesting the support of more Mopidy extensions. So, after a few months I've decided to write a new version: 2.0. 

### The bloody name
One thing I've always been bothered with is the name. The name was picked when I first released the client. A simple mutation of Mopidy and Spotify resulted in Mopify. 

The name doesn't make sense anymore since I'm going to widen up the scope for the client. And beside that; the name sucks.

So I've decided to release Mopify 2.0 with a brand new name: **Sonate**.

# Menu structure
The current menu structure is quite resting on the Spotify implementation as main source. Although I don't want to change it to much, since It's working for me, I have to make some changes so we can have access to other music sources. 

Below I've written a comparison between the current en (possibly) next menu structure.

### Current

- Discover
    - Browse
    - Featured Playlists
    - New Releases

- Your Music 
    - Playlists
    - Songs
    - Albums
    - Artists

- Stations
    - Stations

- Account
    - Settings
    - Services


### Proposal [v2.0]

- Discover
    - Browse
    - Featured Playlists
    - New Releases

- Collection
    - Browse
    - [user's shortcuts to directories]

- Stations
    - Stations

- Account
    - Settings
    - Services
        + Mopidy
        + Sonate


# Collection
Sonate will have some big changes in the 'My Music' section. To support the multiple sources. and browsing in between them, I'm going to add a horizontal column based navigation. 

## Browse
The browse section will contain all enabled sources. Here you can navigate through for example SoundCloud, LocalFiles and Spotify. 

It's possible to add a shortcut to a directory or subdirectory to the navigation.

**Examples (quickly drawn)**

![](http://i.imgur.com/wT4cGot.png)
![](http://i.imgur.com/XwE2Yf7.png)

# Services
At the moment services are extensions for Mopify. In v2.0 this will be changed to a more global scope. Instead of only Mopify/Sonate extensions it will also contain Mopidy extensions. Grouped by those two categories the user will be able to extend his client with more features. 

## Mopidy services
This category will contain the available Mopidy Extensions. The user will be informed on how to install these extensions and if the extension if available/already integrated in Mopify/Sonate. 

## Sonate services
These extensions will extend the overall client interface. Think of the ability to upload files via the client or enable the Sync service. 

# Help
Mopify/Sonate is a project I've started because I wanted a better player. I've noticed more people using, and liking, it which brings me to releasing a new version. 

As of most things in life: I can't do it all myself. So if you have any suggestions of tips for the new version; please let me know! I would appreciate it! :) You can send me an email, drop them in the [comments on my blog](http://dirkgroenen.nl/projects/2015-08-16/mopidy-mopify-version-two/) or put them in an issue. 