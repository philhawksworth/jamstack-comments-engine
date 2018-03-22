---
layout: layouts/base.njk
pageClass: post
templateEngineOverride: njk,md
---



<h1>{{ title }}</h1>
<p class="date">
  Posted as an example, on <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>

<main>
  {{ content | safe }}
</main>
<div class="comments">
 {% include "comments.njk" -%}

 {% if commentsClosed != true %}
 {% include "comment-form.njk" -%}
 {% endif %}

</div>
