---
layout: post
title: "Building my personal home assistant - part 1"
subtitle: "A series containing my experiences with building my own personal home assistant."
date: 2015-10-14 17:30:00
image: "/assets/images/home-assistant-top-site.jpg"
fbimage: "/assets/images/home-assistant-top-site.jpg"
categories: projects
comments: true
published: true
---

It has been almost three years ago since I've moved and I remember well having the intentions to create my own home assistant back then. Unfortunately duo a lack of free time it never really happened. Now, three years later, I've bought my own place and the interest of building a personal home assistant has come back. Luckily for me my personal situation has changed over the years and this time I probably will have enough time to spent on this project. 

Since this is a whole new level of programming and building stuff (which I have never done before) I've decided to write something on my blog once in a while. Creating a place where I can write down my findings and struggles.

# The idea
The idea is 'quite simple'. Remove the dust from my Raspberry Pis and create some software which listens to my commands and executes 'something'. I want to be able to say things like: "Play some Jazz music.", which should start some Jazz music, "Turn of my living room lights" which, as you might expect, should turn off the lights and "I'm going to bed" which should say something like: "Sleep well, I'll wake you up at 11 am." (If I have an alarm set).

Things like the PIs, 433MHz receiver/transmitter and remote controlled switches are already bought, it's just writing the software what is left. 

There are still many questions left which I haven't answered yet. The last days I've mostly been digging into the current solutions for Text-to-Speech and Speech-to-Text. This post will contain my findings on that subject.

# The search to Speech-to-Text
I've been doing some research on possible ways to achieve this and finally after a full day of searching I ended up with [wit.ai](http://wit.ai). As described on their website:

> "We... turn speech or text into actionable data.
Your users give us voice or text, you get back structured data. It's that simple"

What it does is quite 'simple', but extremely awesome. You can give it a sentence or audio file and it will try to convert that sentence or file to structured data. For example: if you send a sentence like: "Can you turn on the lights in the living room" it will return the following object: 

```
$ curl [..] 'https://api.wit.ai/message?v=20151014&q=Can%20you%20turn%20on%20the%20lights%20in%20the%20living%20room'
{
  "msg_id" : "b565c5a8-5629-43de-9e1b-4e0341e77de9",
  "_text" : "Can you turn on the lights in the living room",
  "outcomes" : [ {
    "_text" : "Can you turn on the lights in the living room",
    "confidence" : 0.728,
    "intent" : "lights",
    "entities" : {
      "on_off" : [ {
        "value" : "on"
      } ],
      "location" : [ {
        "suggested" : true,
        "value" : "living room",
        "type" : "value"
      } ]
    }
  } ]

```

As you can see it has transformed my sentence to a so called 'Intent' containing entities. An intent can be compared to something like an action and entities can be compared to something like predefined variables. This is really useful since it's easier to link intents to actions than intents to thousands of possible sentences. 

Take the above Intent as an example. You have to manually create intents in your console. The response above is based on the following `lights` intent I created:

![](http://i.imgur.com/crThWGE.png)

As you can see I've defined the two possible entities: `Location` and `On_Off`. If you want to learn more about this you should definitely read their [docs](https://wit.ai/docs), it's quite fun and interesting to play with.

For now I'm satisfied with this outcome. I think those intents can really help me making it easy to define commands which the home assistant should execute.

# The search to Text-to-Speech
After I completed my search for a STT solution I had to find out how I can let the system say things (TTS). Like I've already said I don't want to have a home assistant which sounds like some creepy robot so I'm not accepting software like [Festival](http://www.cstr.ed.ac.uk/projects/festival/). After a while I came up with three possible 'solutions':

- Google Translate
- API.ai
- Neospeech

## Google Translate 
Google Translate doesn't offer an official API for their text-to-speech service, but with a bit of 'hacking' people have found a way to use their Text-to-Speech service used in Google Translate. The only problem: Google has been clever enough to notice people using this service so they've added a captcha when making a request to the endpoint. Thanks to this captcha it has become quite hard and unreliable to use this service. Quite a shame, 'cause Google's voice sounds really good! 

## API.ai
[API.ai](http://api.ai) is something very familiar to [wit.ai](http://wit.ai) (for as far as I've discovered). To only thing they have which wit doesn't is an endpoint for converting text to speech.

Their API.ai is free to use and responds quickly. The only problem for me: the voice still sounds a bit creepy... So at this point API.ai is definitely better than Google, but I'm still not fully satisfied. Up to the next!

## Neospeech.com
The moment I stumbled on [Neospeech.com](http://neospeech.com/) and listened to their Demo I was settled. This is the one I want to use! Their voices sound really nice and natural, but unfortunately it isn't free. At least that's what I thought. After some better searching on their site I noticed their Basic Plan. A plan developers can use which offers Basic Text-to-Speech Translation for free. Awesome! :) 

The only down side: their API isn't that great and their service isn't really fast in use. To translate a sentence you have to perform at least three requests:

- Send a text to the service
- Poll the queue number and wait for it to be finished
- Open the download link and download the conversion

As you can see: not the most efficient way to work. But I didn't want to give up to quickly so I wrote a little bash script which accepts a sentence as parameter, converts it to a MD5 hash, converts it using Neospeech and saves it on my system with the MD5 hash as filename. The next time I parse the same sentence as parameter it will check if there is already a file with that MD5 hash. If it exists it will immediately play that file. 

At the end this solution is good enough, since most of the assistant's answers will be the same. 

# Conclusion
As for now I'm satisfied with the results. I've found a free Text-to-Speech and Speech-to-Text tool which I will definitely try to implement. The next thing I will be researching is what the rest of the system will look like. Since I'm mostly a web developer I think I'll go for something like Node.JS, but hey: who knows... 

If you're reading this and have any suggestions: let me know! :) Follow me on [Twitter](https://twitter.com/dirkgroenen) or [Google Plus](https://google.com/+dirkgroenen) and stay updated when I write new posts.