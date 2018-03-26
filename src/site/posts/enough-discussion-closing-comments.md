---
layout: layouts/post.md
title: Enough discussion. Comments on this page are closed
tags: post
date: 2018-03-23
templateEngineOverride: njk,md
commentsClosed: true
---

It can be useful to close comments on a page after a while. Either the conversation has reached a natural end, or perhaps the page has become so popular that it is attracting more attention than we can cope with!

Closing comments needs to be simple to do, and possible page by page.


## How to close the comments

Since our comments form is just [a partial]() that we include in our page template, most good static site generators will let us toggle that form on and off with a variable which we can set on any page.

This page had comments open of for a while... and then they were closed by adding `commentsClosed: true` to the page's front matter.

You can take a look at that in the [source of this page](), and if you are curious, you can see the simple logic which [renders the comment]() form or leaves it out.





