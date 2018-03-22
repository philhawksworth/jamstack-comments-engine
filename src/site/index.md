---
title: A snazzy blog
layout: layouts/base.njk
---

# Jamstack Comment Engine

This example uses a comments system which is little more than a form handler and Lambda function from Netlify. Have a look around and then perhaps [get a version of your own](/about) to tinker with.


{% if init.environment == false %}
  {% include "setup-hint.njk" -%}
{% endif %}


## Posts

There are some blog posts below which you can comment on, or just enjoy the delicious and insightful comments other have left for you to enjoy.

<ul class="listing">
{%- for post in collections.post -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> <small>({{ comments[post.url].length }} comments)</small></li>
{%- endfor -%}
</ul>
