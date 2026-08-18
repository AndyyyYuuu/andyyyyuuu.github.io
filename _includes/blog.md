<link rel="stylesheet" href="{{ '/assets/css/blog.css' | relative_url }}">

<div class="blog-page">
  <h2 style="margin-top: 2rem;">Blog</h2>

  <ol class="blog-list">
    {% for post in site.posts %}
    {% if post.unlisted != 1 %}
    <li class="blog-item">
      <div class="blog-meta">
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
      </div>

      <div class="blog-content">
        <div class="blog-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </div>

        {% if post.blurb %}
        <p class="blog-description">{{ post.blurb }}</p>
        {% endif %}
      </div>
    </li>
    {% endif %}
    {% endfor %}
  </ol>
</div>
