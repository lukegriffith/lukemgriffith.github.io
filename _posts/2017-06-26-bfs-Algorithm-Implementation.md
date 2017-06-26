---
layout: post
title:  "Implementing Breadth-first search."
excerpt: "Writing up a simple algorithm."
date:   2017-06-25 22:00:21 +0000
categories: posts
author: luke_griffith
published: false

custom_css:
- "bfs/bfs_layout"

custom_footer_js:
- "bfs/Grid"
- "bfs/Main"

---

In summary BFS is essentially finding all paths on a given graph from a single source and it utilises a couple of basic data structures to complete the operation, mainly a queue. I've created an example below in the form of a grid that navigates from an active cell, to a target destiantion.



<section id="grid">

<article class="cell active" id="0">
0
</article>
<article class="cell" id="1">
1
</article>
<article class="cell" id="2">
2
</article>
<article class="cell" id="3">
3
</article>
<article class="cell dead" id="4">
4
</article>
<article class="cell" id="5">
5
</article>
<article class="cell" id="6">
6
</article>
<article class="cell dead" id="7">
7
</article>
<article class="cell" id="8">
8
</article>
<article class="cell" id="9">
9
</article>
<article class="cell" id="10">
10
</article>
<article class="cell" id="11">
11
</article>
<article class="cell" id="12">
12
</article>
<article class="cell" id="13">
13
</article>
<article class="cell" id="14">
14
</article>
<article class="cell dead" id="15">
15
</article>
<article class="cell" id="16">
16
</article>
<article class="cell dead" id="17">
17
</article>
<article class="cell" id="18">
18
</article>
<article class="cell" id="19">
19
</article>
<article class="cell" id="20">
20
</article>

</section>