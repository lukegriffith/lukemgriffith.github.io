---
layout: post
title:  "My new Jekyll blog."
excerpt: "After a short hiatus I'm back, with a new platform to host my technology blog."
date:   2016-04-23 17:00:21 +0100
categories: blog
author: luke_griffith
---

After a short hiatus I'm back, with a new platform to host my technology blog, I've moved to a Jekyll backed static page project, what is simple to deploy and has me very happy with the automation potential around the deployment process.

Its enabled me to reduce the cost of my hosting to mere pennies while still having full control of all aspects of its hosting environment. 

# Install

Installing the required bits to my development environment was two commands using [chocolatey](https://chocolatey.org/)

{% highlight powershell %}
choco install ruby -y
gem install jekyll
{% endhighlight %}

Chocolately installs ruby what inturn allows me to install Jekyll what is a ruby gem. 

I can create a new blank Jekyll site by running the following after installing Jekyll.

{% highlight powershell %}
jekyll create
{% endhighlight %}

and I can host the site using the Jekyll webserver with

{% highlight powershell %}
jekyll serve 
{% endhighlight %}

# configuration and posts

The _config.yml file allows you to set specific site variables, like description, title and input your github and Twitter usernames. Making a new blog post is simple, create a new markdown file in the _posts folder with the filename representative of the location, for example www.lukemgriffith.co.uk/2016/04/27/myfirstblogpost.HTML would be a file called 2016-04-27-myfirstblogpost.markdown. 

More to come on how I've automated my build an release process, this is more of a hello I'm here again, with a new site type post.


