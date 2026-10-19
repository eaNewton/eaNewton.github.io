<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Component } from 'vue'
import { useI18n } from 'vue-i18n'

import GithubIcon from 'vue-material-design-icons/Github.vue'
import LinkedinIcon from 'vue-material-design-icons/Linkedin.vue'

import cardElement from '@/components/elements/cardElement'

interface SocialLinkItem {
  href: string
  icon: Component
  id: string | number
  title: string
}

const { t } = useI18n()

const socialLinks: SocialLinkItem[] = [
  {
    href: 'https://github.com/eaNewton',
    icon: GithubIcon,
    id: 'github_link',
    title: 'github',
  },
  {
    href: 'https://www.linkedin.com/in/emmettnewton',
    icon: LinkedinIcon,
    id: 'linkedin_link',
    title: 'linkedin',
  },
]

const activeSocialLinkIds = ref(new Set<SocialLinkItem['id']>())
const animationTimers = new Set<ReturnType<typeof setTimeout>>()
const animationDuration = 800

function scheduleAnimation(item: SocialLinkItem, delay: number) {
  const timer = setTimeout(() => {
    animationTimers.delete(timer)
    activeSocialLinkIds.value.add(item.id)

    const animationTimer = setTimeout(() => {
      animationTimers.delete(animationTimer)
      activeSocialLinkIds.value.delete(item.id)
      scheduleAnimation(item, 4000 + Math.random() * 6000)
    }, animationDuration)

    animationTimers.add(animationTimer)
  }, delay)

  animationTimers.add(timer)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  socialLinks.forEach((item) => scheduleAnimation(item, 1000 + Math.random() * 4000))
})

onUnmounted(() => {
  animationTimers.forEach(clearTimeout)
  animationTimers.clear()
})
</script>

<template>
  <cardElement>
    <h2 class="section-title fade-up-and-in delay-1s">{{ t('hero-section.greeting') }}</h2>
    <h4 class="section-body fade-up-and-in delay-2s">{{ t('hero-section.body') }}</h4>
    <div class="section-links flex items-center justify-center fade-up-and-in delay-3s mt-md">
      <a
        v-for="item in socialLinks"
        :key="item.id"
        :href="item.href"
        :aria-label="`Visit ${item.title}`"
        :title="item.title"
        target="_blank"
        rel="noopener noreferrer"
        :class="{ 'social-link--alive': activeSocialLinkIds.has(item.id) }"
      >
        <component :is="item.icon" fillColor="var(--general-text-color)" :size="32" />
      </a>
    </div>
  </cardElement>
</template>

<style scoped>
.section-body,
.section-links,
.section-title {
  color: var(--general-text-color);
  text-align: center;
  width: 100%;
}

.section-body {
  font-family: var(--font-family-300);
}

.section-title {
  font-family: var(--font-family-400);
}

.section-links {
  gap: 1rem;
}

.section-links a {
  color: inherit;
  display: inline-flex;
  transform-origin: center;
}

.section-links a.social-link--alive {
  animation: social-link-wiggle 800ms ease-in-out;
}

@keyframes social-link-wiggle {
  0%,
  100% {
    transform: scale(1) rotate(0);
  }

  24% {
    transform: scale(1.18) rotate(-6deg);
  }

  50% {
    transform: scale(1.12) rotate(3deg);
  }

  74% {
    transform: scale(1.04) rotate(-2deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-links a.social-link--alive {
    animation: none;
  }
}
</style>
