---
layout: post
title: "Honeywell API documentation"
subtitle: "An unofficial documentation of its API endpoints."
date: 2016-01-15 22:15:00
image: "/assets/images/internet-of-things.jpg.jpg"
fbimage: "/assets/images/internet-of-things.jpg.jpg"
categories: projects
comments: true
published: true
---

About a month ago I moved into my new home. As I wrote a month earlier I was planning to put some nice home automation in it. Right now I've got two running Raspberry Pis; one for the home automation (PiLight) and one for the music (Mopidy-Mopify). The home automation already has some nice features like turning on my light when I'm at home and the sun is set, as well as some scenes to watch a movie or have a 'comfy evening'.

# Controlling the thermostat 
So besides controlling my music and lights I would also like to be able to control my thermostat (HoneyWell Round). Right now I can do this with the Android application provided by Honeywell, but to be honest: I've seen better apps. To bad for us Honeywell doesn't provide a public documented API, so we have to put in some extra digging to find out how it all works. Luckily for me some people already wrote Python and NodeJS wrappers for it. 

In this post I'll write how to simply change your thermostats temperature. Mostly as a reference for myself, but maybe I can make someone else happy with it too.

# API Endpoints

## Default headers
Make sure you add a `Content-type: application/json` to each request, otherwise it won't work.

## Authentication 
The first thing we have to do is getting a `sessionId`. This ID is used in all further requests to authenticate the user. To get a `sessionId` we have to make a `POST` request to: 

`https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/Session`

In the POST body we have to put a raw JSON object containing our username, password and ApplicationId:

```
{
    "username": "user@email.com",
    "password": "123!password",
    "ApplicationId": "91db1612-73fd-4500-91b2-e63b069b185c"
}
```

As for the `ApplicationId`: I found this one online, so feel free to use it too. 

After you execute the request it should respond with an `userInfo` object and `sessionId`. Make sure you store the `sessionId` and `userId` somewhere, cause we need it in our next requests.

## Retrieving locations
Each thermostat is part of a location. To get a list of all available locations and their registered thermostats you have to make a `GET` request to the following endpoint:

`https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/locations?userId=[yourID]&allData=True`

Make sure you add an extra `sessionId` header to these requests containing your `sessionId` from the authentication request.

After you execute the request it will respond with an array of your registered locations. Each location object contains information about the location and its registered devices. Each device has a `deviceId`, which you'll need in your requests to make changes to your thermostat. 

## Changing the temperature
Now we have our deviceId we can finally change our thermostat's temperature. To do this execute a `PUT` request to the following endpoint:

`https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/devices/[deviceId]/thermostat/changeableValues/heatSetpoint`

In the `PUT` body we have to put a raw JSON object containing at least three parameters: 

- `Value`: our desired temperature
- `Status`: ...
- `NextTime`: ...

In this case I want to permanently change the temperature to 19.0 degrees:

```
{"Value":"19.0","Status":"Hold","NextTime":null}
```

# To be continued 
This 'documentation' is based on my own findings and experience. I'm planning to update this post every time I stumble upon something new.