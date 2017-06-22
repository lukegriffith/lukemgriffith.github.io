---
layout: post
title:  "Custom function and property attributes."
excerpt: "A post about PowerShell objects."
date:   2016-11-28 22:00:21 +0000
categories: documentation
author: luke_griffith
---

# Why do you want this?
These decorations can be added to powershell elements to provide more information via reflection to outside frameworks, allowing for more modular and extensible module design.


# Property attributes
These can be applied to properties of classes to give extra meaning to it, effectively adding meta data. This meta data can be used by PowerShell developers to utilize framework instructions when working with an application. 
This type of scenario might come when you're wanting to map class properties to API queries.

{% highlight powershell %}

<#
    .Notes
        Created: 23/01/2017 
        Author: Luke Griffith

    .Synopsis
        Creates a property attribute that can be mapped to class properties.

    .Description
        apiObject informs the Mapper that this property is a member 
        of the API and should be mapped accordingly.

    .Example
        class Software {
            [apiObject(shouldQuery=$true)]
            [String]$Name   
            ...
    
#>
class apiObject : System.Attribute {
    [bool]$shouldQuery
}
{% endhighlight %}

Above we've defined the apiObject, inheriting from the System.Attribute class it inherits the required functionality to make this class an attribute. 
Now I can use the class to add metadata to properties.


{% highlight powershell %}

class Software {

    [apiObject(shouldQuery=$true)]
    [String]$Name

    Software([apiMapper]$mapper){

    }

}

{% endhighlight %}


Now we can create a software class, and add the attribute to any property. We can reflect on the property to obtain the named arguments. 

{% highlight powershell %}

[Software].GetProperties().Where{$_.Name -eq "Name"}

{% endhighlight %}


# Function attributes

These can be added to powershell functions, just like the [CmdletBinding()] class. These can be pulled back from the FunctionInfo object.

{% highlight powershell %}


# enum for class options
enum httpMethods {

    GET
    PUT
    POST
    DELETE

}

<#
    .Notes 
    Luke Griffith
    23/01/17

    .Synopsis
    Function attribute that interfaces with WebModule

    .Description
    Can be used to add WebModule properties like route, and method.

#>
class Web : System.Management.Automation.CmdletCommonMetadataAttribute { 

    [httpMethods]$Method
    [string]$Route

    Web(){ 

    }
}

<#
    .Notes 
    Luke Griffith
    23/01/17

    .Synopsis 
    Obtains host data from the config database registry.

    .Description
    Using the ConfigDB module, it queries the registry for the computer name provided.
#>
function Get-HostData {
    [Web(Method="GET", Route="api/hosts")]
    param(
        [String]$ComputerName
    )

    Get-ConfigDBItem $ComputerName
}


{% endhighlight %}

In the above example, I've coded out a Web function attribute and this can be added to the function much like the CmdletBinding attribute.
In this case, the attributes provide a web framework data around the HTML route for this function to be called at, and what method it takes.

To obtain this metadata, I just need to get the FunctionInfo.


{% highlight powershell %}
$function = Get-Command Get-HostData

$function.ScriptBlock.Attributes


# Method                  : GET
# Route                   : api/hosts
# DefaultParameterSetName : 
# SupportsShouldProcess   : False
# SupportsPaging          : False
# SupportsTransactions    : False
# ConfirmImpact           : Medium
# HelpUri                 : 
# RemotingCapability      : PowerShell
# TypeId                  : Web

{% endhighlight %}