<script setup lang="ts">
import { profile, projects, experience, otherWork, skills, education } from './content'
import ProjectCard from './components/ProjectCard.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <header class="top">
      <a class="mono home" href="#top">imran.ikko.space</a>
      <nav class="mono nav" aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
      </nav>
    </header>

    <main id="top">
      <section class="intro">
        <img class="portrait" :src="profile.portrait.src" :alt="profile.portrait.alt" width="480" height="480" />
        <div>
          <h1 class="name">{{ profile.name }}</h1>
          <p class="mono">{{ profile.role }} · {{ profile.location }}</p>
          <p class="pitch">{{ profile.pitch }}</p>
          <p class="links">
            <a class="link" :href="`mailto:${profile.email}`">Email</a>
            <a class="link" :href="profile.linkedin" rel="noopener" target="_blank">LinkedIn</a>
            <a class="link" :href="profile.github" rel="noopener" target="_blank">GitHub</a>
          </p>
        </div>
      </section>

      <section id="work" class="section">
        <h2 class="heading">Selected work</h2>
        <div class="cards">
          <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </section>

      <section id="experience" class="section">
        <h2 class="heading">Experience</h2>
        <!-- Each row: mono dates and company on the left (30%), the role and what it did on the right (70%). -->
        <div v-for="r in experience" :key="r.company" class="row">
          <div class="mono side">
            <p>{{ r.when }}</p>
            <p>{{ r.company }}</p>
            <p>{{ r.where }}</p>
          </div>
          <div class="main">
            <h3 class="title">{{ r.title }}</h3>
            <div v-for="w in r.work" :key="w.name" class="work">
              <p class="work-name">
                {{ w.name }}<span v-if="w.client" class="client"> · {{ w.client }}</span>
              </p>
              <ul class="bullets">
                <li v-for="pt in w.points" :key="pt">{{ pt }}</li>
              </ul>
            </div>
            <ul class="pills" aria-label="Stack">
              <li v-for="s in r.stack" :key="s" class="pill">{{ s }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="heading">Other work</h2>
        <div v-for="o in otherWork" :key="o.name" class="row">
          <div class="mono side">
            <p>{{ o.when }}</p>
            <p>{{ o.context }}</p>
          </div>
          <div class="main">
            <h3 class="title small">{{ o.name }}</h3>
            <p>{{ o.note }}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="heading">Areas of expertise</h2>
        <div v-for="g in skills" :key="g.name" class="row tight">
          <p class="mono side">{{ g.name }}</p>
          <ul class="pills main">
            <li v-for="s in g.items" :key="s" class="pill">{{ s }}</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <h2 class="heading">Education</h2>
        <div v-for="e in education" :key="e.school" class="row">
          <div class="mono side">
            <p>{{ e.when }}</p>
            <p>{{ e.where }}</p>
          </div>
          <div class="main">
            <h3 class="title small">{{ e.title }}</h3>
            <p>{{ e.school }}</p>
            <p class="mono">{{ e.note }}</p>
          </div>
        </div>
      </section>

      <section id="contact" class="section contact">
        <h2 class="heading">Get in touch</h2>
        <p>
          The quickest way to reach me is email:
          <a class="link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>. I’m also on
          <a class="link" :href="profile.linkedin" rel="noopener" target="_blank">LinkedIn</a> and
          <a class="link" :href="profile.github" rel="noopener" target="_blank">GitHub</a>.
        </p>
      </section>
    </main>

    <footer class="mono foot">
      <p>© {{ year }} {{ profile.fullName }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--hairline);
}
.home,
.nav a {
  text-decoration: none;
  color: var(--ink-2);
  transition: color var(--hover);
}
.home:hover,
.nav a:hover {
  color: var(--accent);
}
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.intro {
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 32px;
  align-items: start;
  padding: 64px 0 56px;
}
.portrait {
  width: 100%;
  max-width: 200px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-card);
}
.name {
  font-size: clamp(44px, 7vw, 64px);
  margin-bottom: 10px;
}
.pitch {
  margin-top: 20px;
  max-width: 34em;
}
.links {
  display: flex;
  gap: 22px;
  margin-top: 20px;
}

.section {
  border-top: 1px solid var(--hairline);
  padding: 48px 0;
}
.heading {
  font-size: 30px;
  margin-bottom: 28px;
}
.cards {
  display: grid;
  gap: 20px;
}

.row {
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 32px;
  padding: 22px 0;
  border-top: 1px solid var(--hairline);
}
.row:first-of-type {
  border-top: 0;
  padding-top: 0;
}
.row.tight {
  padding: 14px 0;
  align-items: center;
}
.side p + p {
  margin-top: 2px;
}
.title {
  font-size: 26px;
  margin-bottom: 12px;
}
.title.small {
  font-size: 22px;
  margin-bottom: 6px;
}
.work + .work {
  margin-top: 14px;
}
.work-name {
  font-weight: 600;
}
.client {
  font-weight: 400;
  color: var(--ink-2);
}
.bullets {
  padding-left: 18px;
  margin: 6px 0 16px;
}
.bullets li + li {
  margin-top: 4px;
}
.bullets li::marker {
  color: var(--ink-2);
}

.contact p {
  max-width: 36em;
}

.foot {
  border-top: 1px solid var(--hairline);
  padding: 24px 0 40px;
}

@media (max-width: 640px) {
  .nav a {
    display: none;
  }
  .intro {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 40px 0 40px;
  }
  .portrait {
    max-width: 112px;
  }
  .row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .row.tight {
    align-items: start;
  }
  .section {
    padding: 40px 0;
  }
}
</style>
