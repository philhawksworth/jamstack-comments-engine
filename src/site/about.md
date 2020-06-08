---
title: Jamstack Comments Engine - about
layout: layouts/base.njk
---

# What is this anyway?

This site is an example of how a [Jamstack](https://www.jamstack.org) site can implement comments.

All comments are posted with a form and once approved, rendered directly onto the site via a build. No JavaScript is required to pull them into your browser for rendering.

The site is a living example and you can try commenting on the [pages](/) listed on the home page. (The [site owner](https://twitter.com/philhawksworth) will get a notification of your comment via Slack, and will need to approve your comment before it shows up, so be patient).

## How do the comments work?

Rather than using a third party comments service which might inject comments (and other things?!) into your site using JavaScript, this approach uses traditional http form posts and continuous integration to automatically build your comments directly into your site.

The flow goes like this:

1. A user submits a comment to the comments queue form on your page. That form posts to the [form handling](https://www.netlify.com/docs/form-handling/) facility in Netlify where the site is hosted.
2. The form submission triggers a call to a [Lambda function](https://www.netlify.com/docs/functions) which passes the details of the comment along to Slack where a site administrator can review the comment, and click a button to accept or reject the comment.
3. Rejected comments get deleted from the comment queue
4. Accepted comments get posted into the approved comments form, which automatically triggers a build and deployment of the site. Accepted comments are also deleted from the queue.
5. The site build pulls all the approved comments from the Netlify submissions API, and then generates all of the pages (complete with their comments) with a static site generator (the simple and elegant [11ty](https://www.11ty.io/))


## See the moderation in action

<div class="video-responsive">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/-5z74ORssHE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>


## Want one of your own?

You can get your own instance of this example site up and running on Netlify very quickly by clicking the button below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/jamstack-comments-engine)


## Wait, what happens when I click that button?

Good question. Here's what it will do...

1. We'll clone the [git repository](https://github.com/philhawksworth/jamstack-comments-engine) of this project into your Github account. We'll be asking for permission to add the repo for you.
2. We'll create a new site for you in [Netlify](https://www.netlify.com), and configure it to use your shiny new repo. Right away you'll be able to deploy changes simply by pushing changes to your repo.
3. You'll need to do a little config in order to integrate with Slack etc. There are some [instructions](https://github.com/philhawksworth/jamstack-comments-engine/blob/master/README.md) to help get you set up
4. That's it really.



