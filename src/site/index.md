---
title: JAMstack Comments Engine
layout: layouts/base.njk
---

# Jamstack Comments Engine

This example site demonstrates a comments system build by combining form handling, serverless functions, and build triggers on Netlify. Try it out by exploring one of the pages listed below, and then perhaps [learn more or get a version of your own](/about) to experiment with.

{% if init.environment !== true %}
  {% include "setup-hint.njk" -%}
{% endif %}


## Some pages with comments

There are some pages listed below which include comments. You can try adding a comment of your own, or just enjoy the delicious and insightful comments others have left there for you.

<ul class="listing">
{%- for post in collections.post -%}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <small>({{ comments[post.url].length }} comments)</small>
  </li>
{%- endfor -%}
</ul>
