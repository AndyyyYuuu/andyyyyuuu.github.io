<h2 id="projects" style="margin: 2px 0px -15px;">Projects</h2>

<div class="projects">
  <ol class="project-list">
    {% for project in site.data.projects.main %}
    <li class="project-item">
      <div class="project-meta">
        <span>{{ project.start }}</span>
        <span aria-hidden="true">-</span>
        <span>{{ project.end | default: "Present" }}</span>
      </div>

      <div class="project-content">
        <div class="project-title">
          {% if project.link %}
          <a href="{{ project.link }}" target="_blank" rel="noopener">{{ project.title }}</a>
          {% else %}
          {{ project.title }}
          {% endif %}
        </div>

        <p class="project-description">{{ project.description }}</p>

        {% if project.topics %}
        <ul class="project-topics" aria-label="Project topics">
          {% for topic in project.topics %}
          <li>{{ topic }}</li>
          {% endfor %}
        </ul>
        {% endif %}
      </div>
    </li>
    {% endfor %}
  </ol>
</div>
