<!--
  App.vue — the whole portfolio is one page, laid out as one rail line
  =====================================================================
  Hero (the station board), then the route strip that becomes the sticky nav, then one section per stop.
  Section ids must match the station ids in content.ts: the route strip measures them to move its marker.
-->
<script setup lang="ts">
import { stations } from './content'
import ContactSigns from './components/ContactSigns.vue'
import ExperienceLine from './components/ExperienceLine.vue'
import PhotoBoard from './components/PhotoBoard.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import RouteStrip from './components/RouteStrip.vue'
import SignIcons from './components/SignIcons.vue'
import SiteFooter from './components/SiteFooter.vue'
import SkillLines from './components/SkillLines.vue'
import StationHero from './components/StationHero.vue'
</script>

<template>
  <SignIcons />
  <a class="skip-link" href="#apps">Skip to the apps</a>

  <header id="start">
    <StationHero />
  </header>

  <RouteStrip :stations="stations" />

  <main>
    <ProjectsSection />
    <ExperienceLine />
    <SkillLines />
    <PhotoBoard />
    <ContactSigns />
  </main>

  <SiteFooter />
</template>
