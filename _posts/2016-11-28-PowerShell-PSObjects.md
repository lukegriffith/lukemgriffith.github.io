---
layout: post
title:  "PSObjects"
excerpt: "A post about PowerShell objects."
date:   2016-11-28 22:00:21 +0000
categories: posts
tag: powershell
author: luke_griffith
---

# Get-Member
Everything in PowerShell returns an object. It may be an object of the  System.String class, it may be an object of the System.Management.Automation.PSDriveInfo class literally everything returned in the shell is an object, with properties, methods and so much more!

The best way to work out what you’re looking at is the cmdlet Get-Member. Pipe anything to this and it will return not only what type of object you have but also its members and properties. 

![get-member]({{ site.url }}/images/psintro/psobj_1.gif)

Above I’ve piped the command Get-Process what returns an object of the class  System.Diagnostics.Process, what is a list of running processes on the system . This shows its properties, and methods. One method of this Object is .Kill(), running this method against an objcet of this type would kill the process. 

# Objects through the Pipeline
As I mentioned previously, you can use the pipe to pass objects to another cmdlet, you can also enumerate object in the pipe with Where/ForEach-Object, and within a script block the pipeline object is represented as the variable $_. Passing objects through the pipeline allows you to manipulate them. In the below example, I’ve used the select-object cmdlet.

![select-object]({{ site.url }}/images/psintro/psobj_2.gif)

So in this case, the get-service cmdlet is being presented to the shell as an object then I’m selecting the ServiceName and the first object in the collection (This is the first object in the array of objects returned from get-service).

As you can see with the Select-Object cmdlet, you need to specify the property to view, you can add multiple ones by adding a comma or you can try and add a wildstar * and it will return every single property the object has. In most cases, there are too many and a lot of them are unnecessary so the shell redacts them but a lot of them can be helpful in specific cases. This is controlled through cmdlet XML formatting.  

# HashTables
Hashtables are a type of object in PowerShell used to move, store and transform data. Cmdlets of similar names, like Get-Service and Stop-Service accept the same parameters some of these can be accessed via the pipeline, so piping Get-Service to Stop-Service it automatically knows that the Name passed from Get-Service will be used was the Name for Stop-Service. In some cases, the pipeline parameters the cmdlet accepts will be different from the object that you’re piping, The below example shows importing a CSV file of stopped services, and transforming the name to be piped into Get-Service, then eventually Stop-Service. In this case a hashtable would need to be used on the Select-Object cmdlet to change the name of the property. Below I’ve changed ServiceName to Name, I can tell the Name property takes input by pipeline as I've checked it using the Get-Help cmdlet. 

![transformexample]({{ site.url }}/images/psintro/psobj_3.gif)

Creating a longer pipe, using the ` charater to indicate to the shell to ignore the line break.

![pipeline]({{ site.url }}/images/psintro/psobj_4.gif) 

Hashtables are also used as key value stores, for instance you can store strings, numbers and any object using a key, then obtain it from the hashtable using the key. 

![hashtable]({{ site.url }}/images/psintro/psobj_5.gif)

# Formatting
Each cmdlet and PowerShell object generally gets formatted in different ways depending on what information is returned. You can bypass this and manually tell the Shell to format it in your desired way.

Format-List and Format-Table can be used for this, see the below example. 

![format-table]({{ site.url }}/images/psintro/psobj_6.gif)

# Methods and Properties
In this example, I will run the .Kill() method against Notepad.exe, in a practical example I would pipe the output of my first command to Stop-Process but I want to show how PowerShell Methods and Properties can be used.

![methods]({{ site.url }}/images/psintro/psobj_7.gif)

 I’ve done a few new things in the above example, first off I’ve used the Where-Object cmdlet, this cmdlet give you the ability to map an expression to each of the pipeline objects, in case the cmdlet does not support filtering (Always best to filter as far left of the pipe as possible). The syntax is a bit different and requires script blocks { } to process the object. In the above example i've expressed where the objects ProcessName is equal to Notepad it will keep the object, and the rest will be thrown away. The $_ represents the object in the pipeline, so the PowerShell object passed through from Get-Process is represented as $_ the .ProcessName is a member property of the Get-Process object, this can be found using the Get-Member cmdlet.

 ![where-object]({{ site.url }}/images/psintro/psobj_8.gif)

 You will also notice the $notepadProcess syntax I used. This stores the object of the get-process cmdlet to the variable $notepadProcess, this gives me the ability to come back to it later, or more easily run methods on the object like the .Kill method. All variables in PowerShell start with a dollar sign $ and you can set anything to them, an integer, string, powershell object… anything.

 You can also pull back individual properties as well as methods. 

 ![where-object]({{ site.url }}/images/psintro/psobj_9.gif)

# Creating Objects
Objects can be created and returned to the shell by using a type accelerator, and a hashtable or dictionary object. Say I made a query and want to take some properties and add them to my own, You can store the output and define them In your own object to be used later.

{% highlight powershell %}
<#
.notes
Script gives an example of how to generate a PowerShell object from script level variables
 
.output
ComputerName 10.0.0.20
------------ ---------
HostA        10.0.0.20
 
#>
 
$ComputerName = "HostA"
$IPAddress = "10.0.0.20"
 
$object = [pscustomobject]@{

ComputerName = "HostA"
$IPAddress = "10.0.0.20"

}
 
$object
{% endhighlight %}

# .PsObject property
The .PsObject property contains meta data about the object its self. Any object can be accessed directly on this property, and it exposes members, properties, methods and details about its base object. Type names are also included. 

![psobject]({{ site.url }}/images/psintro/psobj_9.gif)