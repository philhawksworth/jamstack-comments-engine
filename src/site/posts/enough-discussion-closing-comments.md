---
title: Enough discussion. Comments on this page are closed
date: 2018-03-23
commentsClosed: true
---

It can be useful to close comments on a page after a while. Either the conversation has reached a natural end, or perhaps the page has become so popular that it is attracting more attention than we can cope with!

Closing comments needs to be simple to do, and possible page by page.


## How to close the comments

Since our comments form is just [a partial](https://github.com/philhawksworth/jamstack-comments-engine/blob/master/src/site/_includes/comment-form.njk) that we include in our page template, most good static site generators will let us toggle that form on and off with a variable which we can set on any page.

This page had comments open of for a while... and then they were closed by adding `commentsClosed: true` to the page's front matter.

You can take a look at that in the [source of this page](https://github.com/philhawksworth/jamstack-comments-engine/blob/master/src/site/posts/enough-discussion-closing-comments.md), and if you are curious, you can see the simple logic which [renders the comment](https://raw.githubusercontent.com/philhawksworth/jamstack-comments-engine/master/src/site/_includes/layouts/post.md) form or leaves it out.





