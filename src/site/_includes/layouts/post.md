---
layout: layouts/base.njk
pageClass: post
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<p class="date">
  Posted as an example, on <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main>
  {{ content | safe }}
  <div class="footnote">
    <p>
      Feel free to comment on this page using the form below. Keep in mind though, that this is an example site, so it's not the place to make a big grand political gesture. Try it out, but be nice. (All comments are <a href="/about">moderated</a> anyway)
    </p>
  </div>
</main>
<div class="comments">
{# Add the any comments we have stashed for this page #}
{% include "comments.njk" -%}

{# Unless we have disabled comments for this page, add a comments form #}
{% if commentsClosed != true %}
{% include "comment-form.njk" -%}
{% else %}
  <div class="footnote">
    <p>
      comments on this page are now closed. Perhaps express your opinions about this <a href="https://twitter.com/intent/tweet?text=I%20need%20to%20tell%20the%20world%20about%20this!&url={{ init.rootURL }}{{ page.url }}">on twitter</a> instead?
    </p>
  </div>
{% endif %}
</div>
