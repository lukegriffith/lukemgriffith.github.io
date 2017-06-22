---
layout: post
title:  "PowerShell, Cmdlets & Help"
excerpt: "What is PowerShell, and an introduction to Cmdlets and the help system."
date:   2016-11-27 21:00:21 +0100
categories: documentation
author: luke_griffith
---

# What is PowerShell?

PowerShell is an Automation and Management Framework intended to replace Windows Command Line and VBScript, the Monad Manifesto originally created by Jeffrey Snowver what laid the road map for PowerShell wanted to bring together, a consistent set of tools that can aid in windows (and now cross-platform) infrastructure and application automation that can help ease not only management of the entire environment but to also allow for a quicker pace of development of automation and tools. Along with this, the framework Desire State Configuration first shown off in version 4 brings the ability for true automation for Windows, allowing for tools similar to Puppet, Chef and Ansible to deploy Windows environments with the same ease and extensibility that UNIX and Linux operating systems have had for years.

The old style of Windows management is changing, in the near future configuration of the windows OS will come down to intelligently modifying text files. Although this is a game changers for most this is the next stage of OS management and is required as more of our core systems migrate to the cloud. 

# Where to start? 

## Powershell.exe or Powershell_ISE.exe?
The ISE (Integrated Scripting Environment) is a tool provided by microsoft it is a full development environment for powershell scripts. This tool highlights syntax issues, and can guide you on creating scripts. This can be launched by typing ISE into powershell. 
 
Powershell.exe - This is the core shell, the application that takes what input you’ve given it and runs back to the server/workstation to obtain the information, or runs the configuration cmdlets you’ve sent. Most configuration commands do require the shell to be run in Administrative mode, the mode can be determined by the window title (it will start with Administrator if it is).


## What version of PowerShell am I running? 
Theres a built in environment variable with powershell called $PSversiontable. This will return the version of powershell thats currently installed on your system. I recommend upgrading to the most current up to date stable version PowerShell V4. There is a beta of V5 for windows 8 and 8.1 but this is still unstable. Upgrading the Windows Management Framework will upgrade powershell. 

![PSVersion]({{ site.url }}/images/psintro/clip_image002.gif)

# Cmdlets / help system

### Cmdlets

Powershell runs on Cmdlets, and all Microsoft products (and as a recommended standard so do its partners) uses verb-and-noun pairs to name them. This is why you will see things like.
 
{% highlight powershell %}
Get-Service
Stop-Service
Start-Service
Set-Service
{% endhighlight %}
 
This convention makes understanding what PowerShell cmdlets do so easy, and from a glance you can probably guess what the above 4 all do. Along with making it easy to understand what they do, it also makes it easy to search for related cmdlets and finding out what ones get information, or make changes to the system.
### Anatomy of the a cmdlet
The below example shows a full cmdlet with parameters and parameter values 
![Anatomty]({{ site.url }}/images/psintro/clip_image003.gif)

The position of the parameters are important, and generally with the first parameters you can drop the parameter name, so in this case Get-EventLog Security would guy also work.

### Finding Cmdlets
PoSH comes with another invaluable command that I use daily, get-command. The command on its own pulls back a full list of loaded commands, but if you interrogate the help documentation you can use the cmdlets parameters to filter down the results.
![Anatomty]({{ site.url }}/images/psintro/clip_image004.gif)

The above example, pulls back a cmdlet we’ve already seen get-service, but the -verb parameter can be used on its own to pull back a full list of get, set, start, or any other verb that PowerShell uses. You can also use wildcards in your search as in the below example.

![Get-Command]({{ site.url }}/images/psintro/clip_image006.gif)

### The Help System

Powershells help system is extensive, and unlike other windows products the help system is separate to the core application what means its updated all the time by Microsoft and can be updated live without patches or upgrading occurring.

{% highlight powershell %}
Update-Help
{% endhighlight %}

![Update-Help]({{ site.url }}/images/psintro/clip_image006.gif)

Running the Update-Help cmdlet, will download the latest version of help documentation from the web, the green progress bar will appear and pause the shell until the operation has completed. 
 
{% highlight powershell %}
Get-Help <Cmdlet>
{% endhighlight %}


Using the help system is simple, the cmdlet you need more information on, just type get-help with the cmdlet and it will pull back the documentation. If you’re unable or unwilling to update the help, for whatever reason, you can use a -online switch that launches the default web browser to the relevant msdn page that contains the same information.
 
There are also other switches, like -examples, and -full. Examples presents samples of the cmdlet being used, and full gives you the full documentation, parameters and all.

![Update-Help]({{ site.url }}/images/psintro/clip_image010.gif)

The object can look a bit daunting, loads of square brackets and and dashes everywhere but the examples, and documentation it gives out is invaluable and second to none to any other scripting languages I’ve used. 

### Alaises

As with cmd, and bash PowerShell has the ability to alias commands, you can use the get-alias command to see a full list, or you can use new-alias to create your own. For the base of this document I will not use aliases as its good practice when writing production scripts to use full names, but you can feel free to explore this yourself some examples from my personal shell profile

{% highlight powershell %}
new-alias -name vim -value "C:\Program Files (x86)\Vim\vim74\vim.exe"
new-alias -name wm -value "whatmask.exe"
new-alias -name netbrain -value "C:\Program Files (x86)\NetBrain\Workstation Operator Edition\bin\NetBrainWorkbench.exe"
new-alias -name RepPro -value "Scr:\Scripts\RepProWk.ps1"
{% endhighlight %}

Other default aliases already configure are gps (get-process) ls/dir/gci (get-childitem)

