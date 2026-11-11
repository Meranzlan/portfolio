<!--
  App.vue — the whole portfolio is one page, dressed in FitXP's dark theme
  =========================================================================
  The hero (laid out like the app's Today page), then one section per place, and the corner dial on top of it all.
  Section ids must match the station ids in content.ts: the dial measures them to light the section you're in.
-->
<script setup lang="ts">
import { stations } from './content'
import ContactSigns from './components/ContactSigns.vue'
import CornerDial from './components/CornerDial.vue'
import ExperienceLine from './components/ExperienceLine.vue'
import PhotoBoard from './components/PhotoBoard.vue'
import ProjectsSection from './components/ProjectsSection.vue'
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

  <main>
    <ProjectsSection />
    <ExperienceLine />
    <SkillLines />
    <PhotoBoard />
    <ContactSigns />
  </main>

  <SiteFooter />

  <CornerDial :stations="stations" />
</template>
