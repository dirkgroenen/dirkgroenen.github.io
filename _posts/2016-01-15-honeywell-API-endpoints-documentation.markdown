---
layout: post
title: "Honeywell API documentation"
subtitle: "An unofficial documentation of its API endpoints."
date: 2016-01-15 22:15:00
image: "/assets/images/internet-of-things.jpg"
fbimage: "/assets/images/internet-of-things.jpg"
categories: projects
comments: true
published: true
---

About a month ago I moved into my new home. As I wrote a month earlier I was planning to put some nice home automation in it. Right now I've got two running Raspberry Pis; one for the home automation (PiLight) and one for the music (Mopidy-Mopify). The home automation already has some nice features like turning on my light when I'm at home and the sun is set, as well as some scenes to watch a movie or have a 'comfy evening'.

# Controlling the thermostat 
So besides controlling my music and lights I would also like to be able to control my thermostat (HoneyWell Round). Right now I can do this with the Android application provided by Honeywell, but to be honest: I've seen better apps. To bad for us Honeywell doesn't provide a public documented API, so we have to put in some extra digging to find out how it all works. Luckily for me some people already wrote Python and NodeJS wrappers for it. 

In this post I'll write how to simply change your thermostats temperature. Mostly as a reference for myself, but maybe I can make someone else happy with it too.

# API Endpoints

- [Default headers](#default-headers)
- [Authentication](#authentication)
- [Retrieving locations](#retrieving-locations)
- [Changing the temperature](#changing-the-temperature)
- [Getting a task's status](#getting-a-tasks-status)

## Default headers
Make sure you add a `Content-type: application/json` to each request, otherwise it won't work.

## Authentication 
The first thing we have to do is getting a `sessionId`. This ID is used in all further requests to authenticate the user. To get a `sessionId` we have to make a `POST` request to: 

```
curl -X POST -H "Content-Type: application/json" -d '{
        "username": "user@email.com", 
        "password": "pass!word123", 
        "ApplicationId": "91db1612-73fd-4500-91b2-e63b069b185c" 
    }' 'https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/Session'
```

In the POST body we have to put a raw JSON object containing our username, password and ApplicationId:

### Accepted parameters

| Parameter | Description |
|:------------- |:------------- |
| username | Your Honeywell mail address |
| password  | Your Honeywell password  |
| ApplicationId | A valid ApplicationId. _I've found this one online so you're free to use it too._ |

After you execute the request it should respond with an `userInfo` object and `sessionId`. Make sure you store the `sessionId` and `userId` somewhere, cause we need it in our next requests.

## Retrieving locations
Each thermostat is part of a location. To get a list of all available locations and their registered thermostats you have to make a `GET` request to the following endpoint:

```
curl -X GET -H "sessionId: $sessionId" -H "Content-Type: application/json" \
    'https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/locations?userId=$userId&allData=True'
```

Make sure you add an extra `sessionId` header to these requests containing your `sessionId` from the authentication request.

After you execute the request it will respond with an array of your registered locations. Each location object contains information about the location and its registered devices. Each device has a `deviceId`, which you'll need in your requests to make changes to your thermostat. 

## Changing the temperature
Now we have our deviceId we can finally change our thermostat's temperature. To do this execute a `PUT` request to the following endpoint:

```
curl -X PUT -H "sessionId: $sessionId" -H "Content-Type: application/json" \
    -d '{"Value":"18.0","Status":"hold","NextTime":"2016-01-16T22:00:00Z"}' \
    'https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/devices/$deviceId/thermostat/changeableValues/heatSetpoint'
```

In the `PUT` body we have to put a raw JSON object containing at least three parameters: 

### Accepted parameters

| Parameter | Description |
|:------------- |:------------- |
| value | The temperature to set (1 decimal) |
| status  | `Temporary` if you want to set the temperature till a given time or `Hold` if you want the temperature to persist until you change it |
| NextTime | The end time (datetime) of the temperature. Only required when `Status` is set to `Temporary`, otherwise use `null`.  |

Example body in case you want to set the temperature to 19.5 degrees till 10PM (assuming today is the 16th of January).

```
{"Value":"19.5","Status":"Temporary","NextTime":"2016-01-16T22:00:00Z"}
```

## Getting a task's status
Some requests, like changing the temperature, respond with a `TaskId`. We can use this ID to get the status of the Task. To get the status of a task we have to make a `GET` request to the following endpoint:

```
curl -X GET -H "sessionId: $sessionId" -H "Content-Type: application/json" \
    'https://rs.alarmnet.com/TotalConnectComfort/WebAPI/api/commTasks?commTaskId=$taskId' 
```

The request returns an object containing the status of the task, start time and finish time. An example of a response:

```
{
  "state": "Succeeded",
  "started": "2016-01-16T14:09:36.147",
  "finished": "2016-01-16T14:09:42.507"
}
```

# To be continued 
This 'documentation' is based on my own findings and experience as well as other existing wrappers. I'm planning to update this post every time I stumble upon something new.