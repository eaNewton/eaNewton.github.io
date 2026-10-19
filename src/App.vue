<script setup lang="ts">
import StarField from './components/features/StarField/StarField.vue'
import HeroSection from './components/features/HeroSection/HeroSection.vue'
import PortfolioSection from './components/features/PortfolioSection/PortfolioSection.vue'
import ContactSection from './components/features/ContactSection/ContactSection.vue'
</script>

<template>
  <div id="app-container">
    <StarField />

    <div class="scroll-section" id="hero-section">
      <HeroSection />
    </div>

    <div class="scroll-section" id="portfolio-section">
      <PortfolioSection />
    </div>

    <div class="scroll-section" id="contact-section">
      <ContactSection />
    </div>
  </div>
</template>

<style scoped>
#hero-section,
#portfolio-section,
#contact-section {
  height: 100vh;
}

.scroll-section {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 300px;
}
</style>
