---
layout: post
title: "Setup a stunning Nginx PHP5-FPM cache with FastCGI"
subtitle: "Nginx + PHP5-FPM + FastCGI (+ Wordpress) == fast!"
date: 2015-05-28 14:48:00
categories: blog
image: "/assets/images/nginx-php-fpm-cache-site.png"
fbimage: "/assets/images/nginx-php-fpm-cache.png"
comments: true
published: true
---

Besides my love for developing I'm also a pretty big fan of servers. I think that at least every back- and front-end developer should know the basics about web servers. A bit like the opinion of how every front-end designer should at least know a bit about HTML and CSS.

Before you continue reading I want to point out that this post is mostly created for myself so I can always find back the needed code when setting up a server. Of course you can also use this post when setting up your own webserver. 

## Setting up FastCGI Caching
I'm assuming that you have already setup and configured Nginx with PHP-FPM on your server. In case you haven't you can always check some great tutorials like [How To Install Linux, Nginx, MySQL, PHP (LEMP) stack on Ubuntu 12.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-12-04).

Start by creating a directory which will be used to store the cached pages.

```
mkdir /usr/share/nginx/cache
```

After that, you need to open the Nginx configuration file

```
nano /etc/nginx/nginx.conf
```

and add the following line of code in the **server{}** directive before you include any other configuration files:

```
fastcgi_cache_path /usr/share/nginx/cache/fcgi levels=1:2 keys_zone=microcache:10m max_size=1024m inactive=1h;
add_header X-Cache $upstream_cache_status;
```

The ``fastcgi_cache_path`` directive defines the location of the cache (in my case the directory we've created), the subdirectory levels, memory zone name (microcache), it's maximum size (10m) and the inactive time. The size must be less than your server's RAM + Swap or you will receive an error. The inactive timer will make sure that the cache is removed after it has been inactive for the given time.

After we have defined the default options we will open our Virtual Host configuration file for which caching has to be enabled. In my case I'm editing my bitlabs.nl Virtual Host. 

```
nano /etc/nginx/sites-available/bitlabs.nl.conf
```

We scroll to that directive where PHP request are passed to php5-fpm. Inside the ``location ~ \.php$ {}`` directive we add to following lines of code. This will enable the FastCGI cache for the parsed PHP files. 

```
fastcgi_cache  microcache;
fastcgi_cache_key $scheme$host$request_uri$request_method;
fastcgi_cache_valid 200 301 302 30s;
fastcgi_cache_use_stale updating error timeout invalid_header http_500;

fastcgi_pass_header Set-Cookie;
fastcgi_pass_header Cookie;
fastcgi_ignore_headers Cache-Control Expires Set-Cookie;

fastcgi_cache_bypass $no_cache;
fastcgi_no_cache $no_cache;
```

The ``fastcgi_cache`` directive references to the memory zone name we specified when defining our default options. 

Normally pages are cached based on the information in any of the following headers: **X-Accel-Expires/Expires/Cache-Control.** The ``fastcgi_cache_valid`` defines a default lifetime when these headers are missing. The status codes (200 301 302) make sure that only responses with the defined status codes are cached. Of course it's possible to add more status codes.

After you have saved the file you can test the configuration:

``` 
service nginx configtest
```

If no problems have occurred you can reload Nginx:

```
service nginx reload
```

In my case the complete PHP directive looks like:

```
location ~ \.php$ {
    try_files $uri =404;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;

    fastcgi_cache_key $scheme$host$request_uri$request_method;
    fastcgi_cache  microcache;
    fastcgi_cache_valid 200 301 302 30s;
    fastcgi_cache_use_stale updating error timeout invalid_header http_500;

    fastcgi_pass_header Set-Cookie;
    fastcgi_pass_header Cookie;
    fastcgi_ignore_headers Cache-Control Expires Set-Cookie;

    fastcgi_cache_bypass $no_cache;
    fastcgi_no_cache $no_cache;

    fastcgi_pass            unix:/var/run/php5-fpm/bitlabs.nl.socket;
    fastcgi_index           index.php;
    fastcgi_param           SCRIPT_FILENAME    $document_root$fastcgi_script_name;
    fastcgi_param           SCRIPT_NAME        $fastcgi_script_name;
    include fastcgi_params;
}

```

## Define cache exceptions
In some cases you don't want FastCHI to cache the page. Think of authentication pages, backends or other content that has to be dynamic. Such content can be excluded from the cache by adding ``fastcgi_cache_bypass`` and ``fastcgi_no_cache``. 

In my case I use a ``$no_cache`` variable which is used to tell FastCGI that some pages don't need to be cached. I have defined some default rules I add to every Virtual Host configuration file:

```
#Cache everything by default
set $no_cache 0;

# Only cache GET requests
if ($request_method != GET){
    set $no_cache 1;
}

#Don't cache if the URL contains a query string
if ($query_string != ""){
    set $no_cache 1;
}

#Don't cache the following URLs
if ($request_uri ~* "/(wp-login.php|wp-admin|login.php|backend|admin)"){
    set $no_cache 1;
}

#Don't cache if there is a cookie called PHPSESSID
if ($http_cookie = "PHPSESSID"){
    set $no_cache 1;
}
``` 

After defining your rules you only have to add the following to lines of code to your PHP directive:

```
fastcgi_cache_bypass $no_cache;
fastcgi_no_cache $no_cache;
```

## Testing your setup 

After you have added everything and reloaded Nginx we can start testing. Open your terminal and run the following command:

```
curl -X GET -I http://bitlabs.nl/
```

If everything works it should return something like this:

```
HTTP/1.1 200 OK
Server: nginx/1.1.19
Date: Thu, 28 May 2015 12:06:03 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Pragma: no-cache
X-Cache: HIT
```

Remember the ``X-Cache`` header we defined in Nginx's config file? As you can see the header has been added to our response. In this case the header says ``HIT`` which tells us that the returned response was coming from our cache.

In my exceptions I've added ``wp-login.php``. We can't test this by running the following command:

```
curl -X GET -I http://bitlabs.nl/wp-login.php
```
If everything works we should get the following response:

```
HTTP/1.1 200 OK
Server: nginx/1.1.19
Date: Thu, 28 May 2015 12:08:37 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Powered-By: PHP/5.5.13-2+deb.sury.org~precise+1
Expires: Wed, 11 Jan 1984 05:00:00 GMT
X-Frame-Options: SAMEORIGIN
X-Cache: BYPASS
```

As you can see the X-Cache header now tells us that this page bypassed the cache. when running a Wordpress website you have to be sure that your server doesn't cache pages like ``wp-login.php`` and wp-admin``. This can result in unexpected behavior. 
