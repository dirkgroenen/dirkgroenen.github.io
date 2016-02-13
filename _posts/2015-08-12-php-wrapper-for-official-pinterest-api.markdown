---
layout: post
title: "PHP Wrapper for the official Pinterest API"
subtitle: "Finally, Pinterest released their official API!"
date: 2015-08-12 16:18:47
updated: 2016-02-13 15:40:00
image: "/assets/images/pinterest-site.jpg"
fbimage: "/assets/images/pinterest-site.jpg"
categories: projects
comments: true
published: true
---

Yes, the day has finally arrived: Pinterest released their official API including a (bit buggy) documentation! 

It was almost a year ago when I needed to work with Pinterest for one of our clients at [TakeTwo](http://taketwo.nl). We promised the client to integrate their boards and pins in their new website, which normally isn't really a problem since we had worked with third parties before. But the whole story changed when we found out that Pinterest lacked the support of an official API. Solution: I created a nasty PHP wrapper for some unofficial Pinterest API. Good enough for the client at that point, but not good enough for further usage.

A year later a new client arrived with the same question, he wanted to integrated different social media sources in his website. So I started to search on Pinterest's website to see if they had finally added an API. After I searched for a few minutes I stumbled on the [Pinterest Dev site](https://dev.pinterest.com/). Well look at that, they finally added an API! :) One 'problem': it missed a wrapper/SDK for PHP. So to help myself a bit, and maintain my PHP skills, I decided to develop a wrapper for it. Quickly I registered myself as a developer and waited for them to approve my application submission. A day later they approved it so I got started on the wrapper. 

# A buggy documentation
[edit January 2016]
Previously this section contained some stuff about certrain endpoints which didn't work. By now all the endpoints in the Pinterest PHP Wrapper work.

Original text:
> During the development of the [PHP Wrapper](https://github.com/dirkgroenen/Pinterest-API-PHP) I noticed the documentation not being completely in line with the API itself. For instance:

> ## Missing endpoints
> Some of the documented endpoints aren't working. I've still added them to the wrapper in case they are going to work, but for now it isn't possible to make the following requests:

> ```
PATCH   /v1/pins/
POST    /v1/me/following/interests/
DELETE  /v1/me/following/interests/<interest_id>/
```

> I've also added these to the project's README. 

> ## Different authentication process 
> According to Pinterest the authentication process should be in line with OAuth, but at the moment it isn't. 

> Normally, and according to Pinterest's docs, we should first obtain an access code. Once we've obtained this code we can exchange it for an access token. At this point the Pinterest API directly returns an access token when the user is redirected from the Pinterest authentication page back to your application. 

> For now I've added the required methods for exchanging a code to an access token, in case Pinterest decides to change their authentication flow.~

> # The result
> As you can read, the API isn't working 100% properly. But hey: at least we finally have an official API to work with! 

At the moment of writing the wrapper is almost finished. All the documented methods are available and working and the tests run successfully. If you have any comments, please drop them below or in the repository's [issue tracker](https://github.com/dirkgroenen/Pinterest-API-PHP/issues). 

Interested in the wrapper? You can check it out in my [Pinterest-API-PHP repository.](https://github.com/dirkgroenen/Pinterest-API-PHP).
