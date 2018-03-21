---
title: A snazzy blog
layout: layouts/base.njk
---

This example uses a comments system which is litte more than a form handler and Lambda function from Netlify. Have a look around and then perhaps get a version of your own to tinker with.


## Posts

<ul>
{%- for post in collections.post -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>


{% if init.environment == false %}
  {% include "setup-hint.njk" -%}
{% endif %}


{% include "stub.njk" -%}
