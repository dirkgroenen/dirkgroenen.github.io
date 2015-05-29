---
layout: post
title: "How to setup an autoresponder for Postfix with Goldfish"
subtitle: "Including a Roundcube plugin to manage it"
date: 2015-05-29 14:18:00
categories: blog
image: "/assets/images/goldfish-top.jpg"
fbimage: "/assets/images/goldfish-top.jpg"
comments: true
published: true
---

Recently I needed to add an autoresponder to my mail server which would automatically respond to emails. In my case I'm running a setup with the following packages:

- Ubuntu
- Postfix
- Courier
- RoundCube

After a long search I decided to use Goldfish, a simple PHP script which works well with my Virtual users setup. It would also be better to understand for me since I'm a PHP programmer. The only problem I encountered was that Goldfish isn't available anymore. It looks like the original author decided to get its hand of the project and remove every download link. After some more searching I found an old package containing Goldfish V1.0. To make sure it won't get lost anymore I've decided to download it, make it compatible with the latest RoundCube and [publish it on my Github profile](https://github.com/dirkgroenen/Goldfish-Autoresponder).

In this post I'm going to explain how you can install Goldfish on your server. I'm assuming that you have already created a setup with Postfix and your (Virtual) users stored in a database.

# Install and configure Goldfish

Let's start with downloading the required files. Login into your server and run the following commands:

```
mkdir /usr/local/goldfish
wget https://github.com/dirkgroenen/Goldfish-Autoresponder/archive/master.tar.gz
tar -xvf master.tar.gz -C /usr/local/goldfish
mv /usr/local/goldfish/Goldfish-Autoresponder-master/* /usr/local/goldfish
rm -r /usr/local/goldfish/Goldfish-Autoresponder-master
```

This will create a directory to store Goldfish in, download the script, extract it and move it to the created directory. After you've followed the steps above we should have a ``goldfish.php`` file in ``/usr/local/goldfish```. 

Goldfish makes use of an extra table in which it will store the autoresponse messages and settings. Login to your MySQL server and run the following query:

```
CREATE TABLE `autoresponder` (
    `email` varchar(255) NOT NULL default '',
    `descname` varchar(255) default NULL,
    `from` date NOT NULL default '0000-00-00',
    `to` date NOT NULL default '0000-00-00',
    `message` text NOT NULL,
    `enabled` tinyint(4) NOT NULL default '0',
    `force_enabled` tinyint(4) NOT NULL default '0',
    `subject` varchar(255) NOT NULL default '',
    PRIMARY KEY (`email`),
    FULLTEXT KEY `message` (`message`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
```

We now have the required files and table to get Goldfish up and running. Before we can actually use Goldfish we have to change some configuration values in the ``goldfish.php`` file. Open the file with your favorite editor and change the configuration values to match your server setup. 

```
nano /usr/local/goldfish/goldfish.php
```

```
$conf['mysql_host'] = "localhost"; // MySQL host
$conf['mysql_user'] = "mailuser"; // MySQL user
$conf['mysql_password'] = "password"; // MySQL password
$conf['mysql_database'] = "mailserver"; // MySQL database where we created the autoresponder table
```

In some cases you also have to change the MySQL queries to match your server setup. In my case I have my messages stored in ``/var/www/vhosts/[domain]/[user]`` so my query looks like:

```
$conf['q_mailbox_path'] = "SELECT CONCAT('/var/mail/vhosts/', SUBSTRING_INDEX(email,'@',-1), '/', SUBSTRING_INDEX(email,'@',1), '/') AS `path` FROM virtual_users WHERE `email` = '%m'";
```

## Run Goldfish through a cronjob

Every time you run Goldfish it will check the user's ``new`` directory in the provided path. To enable Goldfish we create a cronjob which will call the script every 5 minutes. 

```
sudo crontab -e
```

Add the following line. This will run the script every 5 minutes. 

```
*/5 * * * * /usr/local/goldfish/goldfish.php
```

If you want the script to run at an other time you have to tell Goldfish about this. Lets assume you want the script to run every 15 minutes. In that case we have to open the ``goldfish.php`` file and change the following configuration value

```
$conf['cycle'] = 5 * 60;
```

to match our cronjob time:

```
$conf['cycle'] = 15 * 60;
```

# Adding an autoresponse message 
After you have installed and configured Goldfish it's time to add our first autoresponse message. Login to your MySQL server

```
mysql -u mailuser -p 
```

and run the following query which will insert the needed data in the autoresponder table:

```
USE mailserver;
```

```
INSERT INTO `autoresponder` (`email`, `descname`, `from`, `to`, `message`, `enabled`, `force_enabled`, `subject`) VALUES ('office@mail.com', 'office@mail.com Autoresponse', '2015-05-20', '2015-05-30', 'Dear mailer\r\n, I will be out of office till 2015-05-30. Please contact one of my colleagues.\r\nThanks!\r\Henk', 1, 1, 'Out of Office');
```

```
quit;
```

The above command created an autoresponse for ``office@mail.com`` which will be active from ``2015-05-20`` till ``2015-05-30``. Because we have created a cronjob which runs every 5 minutes, Goldfish won't send a message immediately, but somewhere within a range of five minutes after the mail was received.

If we send a message to ``office@mail.com`` and check the Goldfish log it will show us that a new message was found and a reply has been sent to the message's sender. 

```
tail -f /var/log/goldfish
```

```
2015-05-29 12:00:01 Connection to database established successfully
2015-05-29 12:00:01 Database selected successfully
2015-05-29 12:00:01 Successfully updated database (disabled entries)
2015-05-29 12:00:01 Successfully fetched maildir directories
2015-05-29 12:00:01 Reading new emails: new emails found: 1
2015-05-29 12:00:01 Start scanning directory /var/mail/vhosts/mail.com/example/new/
2015-05-29 12:00:01 Found entry [.] in directory /var/mail/vhosts/mail.com/example/new/
2015-05-29 12:00:01 Found entry [..] in directory /var/mail/vhosts/mail.com/example/new/
2015-05-29 12:00:01 Found entry [1432893598.M4690P8298.mail,S=29290,W=29790] in directory /var/mail/vhosts/mail.com/example/new/
2015-05-29 12:00:01 Successfully fetched subject of example@mail.com
2015-05-29 12:00:01 Successfully fetched message of example@mail.com
2015-05-29 12:00:02 Autoresponse e-mail was sent to: otheruser@othermail.com
```

# Install the RoundCube plugin
In my case I want my users to be able to enable their own autoresponse in RoundCube. Luckily for us, Goldfish also has a RoundCube plugin which we can install. I've made some changes to the plugin so it will also run in RoundCube's latest versions and doesn't affect other plugins.

## Install the plugin

Download this repository and move the ``autoreply`` directory (located in ``roundcube``) to your Roundcube plugins directory. Open the Roundcube config file (``config/main.inc.php``) and add ``autoreply`` to the plugin array.

```
rcmail_config['plugins'] = array('otherplugin', 'autoreply');
```

## Configure the plugin

Open the ``config.inc.php`` file, located in the autoreply plugin directory, and change the database connection string so it matchs your setup.

```
$rcmail_config['autoreply_db_dsn'] = 'mysql://mailuser:mailpass@localhost/maildatabase';
```

# Credits
Goldfish was originally created by [Remo Fritzsche](http://remofritzsche.com/). I've only made a few adjustments to the script and RoundCube plugin.