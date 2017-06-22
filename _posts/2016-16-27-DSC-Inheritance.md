---
layout: post
title:  "Inheritance in PowerShell DSC resources."
excerpt: "Last week i made a blog post about the DSC framework and its limitations, I can now withdraw that statement."
date:   2016-06-16 20:00:21 +0100
categories: articles
author: luke_griffith
---

# Intro

Last week i made a blog post about the DSC framework and its limitations, I can now withdraw that statement. for me it was a learning experience and taught me to always test on multiple versions and operating systems before you come to a theory.

This post is to show an example of how to use the DSC framework in a better way, to hopefully reduce code smells and reduce repetitive code use, keeping close to agile principles. In the WMF 4 way of writing resources, many times i came across functions that I was using time and time again in different modules that had DSC resources. 

Eventually I settled for a helper module that my resources depended on but due to the limitations of the WMF4 LCM and pull server - having a requirement of a module that was not already located on the box caused issues for the download manager as it could not validate the modules. After a number of hacks and effectively bending Powershell and DSC out of shape, I managed to get my helper module and use it as a central store for useful functions to be used across a number of DSC resources. 

Now on WMF 5, utilizing class based resources and inheritance I believe there is a better way to achieve this. 

# DSC Inheritance

[GITHUB PROJECT LINK](https://github.com/lukemgriffith/DSCInheritance)

See the above link to the GitHub project, I've used this as an example of how inheritance can be achieved in DSC, in this project you have the two Powershell modules 

    -- Modules 
        |-- Base
            |-- Base.psm1
            |-- Base.psd1
        |-- InheritedResource
            |-- InheritedResource.psm1
            |-- InheritedResource.psd1

Having these modules located in the module path, will export a single DSC resource, InheritedResource and it has the following properties. 

{% highlight powershell %}

PS wrk:\> Get-DscResource -Name InheritedResource | % Properties

Name                 PropertyType   IsMandatory Values                     
----                 ------------   ----------- ------                     
Enforce              [string]              True {Always, Controlled, Never}
Ensure               [string]              True {Absent, Present}          
SettingName          [string]              True {}                         
DependsOn            [string[]]           False {}                         
PsDscRunAsCredential [PSCredential]       False {}                
 
{% endhighlight %}

If you look at the class for InheritedResource, not a lot is going on compared to what you might expect a standard DSC resource to have. A single property $SettingName is declared and made the Key of the resource, yet without a valid Get/Set/Test the resource is still valid and you can compile a mof, Furthermore the properties above Enforce and Ensure are no where to be seen.  

{% highlight powershell %}
using Module Base


[DscResource()]
class InheritedResource : Base
{

    [DSCProperty(Key)]
    [String]$SettingName 

}

{% endhighlight %}

How this is achieved is by inheriting form the base resource (See **InheritedResource : Base**), this ensures that InheritedResource has all the properties of base, unless they are overwritten by the child class. This allows me to inherit the Get, Set and Test method to effectively abstract away the inner workings of my resource, leaving only superficial settings available in the class.


# Abstract the Get / Set / Test

First question is why would you want to do this? Well really you wouldn't in this form, each resource really needs its own implementation of the Get, Set and Test because it needs to implement its own logic to configure what your resource is developed for. Where could this be helpful? well abstracting the implementation of the methods allows you more control over what happens inside the resource - Say for example base looked like this.


{% highlight powershell %}
using Module Base


[DscResource()]
class Base
{

    [Bool]$Enforce

    [Void]Set() {

        Start-Logger

        $ShouldRun = Get-EnforcementConfig $Enforce

        if ($ShouldRun) {

            $this.xSet()
        } 

    }

    [Void]xSet() {} 

}

{% endhighlight %}

With this implementation of the base resource, I would be able to override the xSet method on the inherited class and any Set that was triggered by the DSC framework would always go through this method before executing the inherited resource set. 

The benefits this gives allows you to have a single point to trap logs, check if a set should run and other business logic that your configuration workflows might need, in this case the Inherited Resource might look something like this. 

{% highlight powershell %}
class InheritedResource : Base
{

    [DSCProperty(Key)]
    [String]$SettingName 

    [Void]xSet() { 

        Set-SettingName $this.SettingName

    }

}

{% endhighlight %}

So the above inheritedResource Set method that DSC executes would first hit the Base Set method, execute the central logic defined in this resource, then pass it through to the overridden xSet method and execute the individual resource logic. 

This method alone, can cut down a lot of repetitive code if you need to engage a logger, or send notifications to a monitoring tool that a configuration has started converging this is where you would want to do it and it would stop you from littering your individual resources with the exact same code. This approach makes your implementation neater, reduces code re-usage but also allows you to have a central place to change the workflow if required. 


# General Methods

The second benefit to this, is the ability to have shared methods defined on the base class that can be used across all resources. Take for example a method called $this.WriteLog().

Potentially WriteLog() might send a line to a log file on disk, or send an SNMP trap to an external monitor - the implementation of this code when defined on the base resource is only made once and can be used across all resources that utilize the Base class, and similar to the shared Set method, you have a central place to change this - in case a new monitoring system has been brought into production it reduces the need to change code to a single point in the base class. 

The actual implementation of the base class for this project can be found [here](https://github.com/lukemgriffith/DSCInheritance/blob/master/Modules/Base/Base.psm1) and you can see I've already defined a number of default methods. Ideally I will look to expand this to include a number of useful methods that can be used across the board for all resources so things like Logging and checking restart times can be moved to this. 

Classes in PowerShell will be the start of a lot of great things, and this for me is one of the huge benefits on top of class based resources alone.   
