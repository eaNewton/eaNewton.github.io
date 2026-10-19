<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Component } from 'vue'
import { useI18n } from 'vue-i18n'

import vueIcon from 'vue-material-design-icons/Vuejs.vue'
import reactIcon from 'vue-material-design-icons/React.vue'

import cardElement from '@/components/elements/cardElement'
import itemElement from '@/components/elements/itemElement'

interface PortfolioItem {
  description?: string
  icon?: Component
  id: string | number
  link?: string
  stack?: string[]
  title: string
}

const { t } = useI18n()

const portfolioItems: PortfolioItem[] = [
  {
    description: t('portfolio-section.items.breakerlink.description'),
    icon: vueIcon,
    id: 'portfolio_item_breakerlink',
    link: 'https://apps.apple.com/us/app/reliahome/id6740243178',
    stack: ['vue'],
    title: t('portfolio-section.items.breakerlink.title'),
  },
  {
    description: t('portfolio-section.items.wattson.description'),
    icon: vueIcon,
    id: 'portfolio_item_wattson',
    link: 'https://calculator.reliahome.abb.com/',
    stack: ['vue'],
    title: t('portfolio-section.items.wattson.title'),
  },
  {
    description: t('portfolio-section.items.building-blocks.description'),
    icon: vueIcon,
    id: 'portfolio_item_building_blocks',
    link: '',
    stack: ['vue'],
    title: t('portfolio-section.items.building-blocks.title'),
  },
  {
    description: t('portfolio-section.items.octane.description'),
    icon: vueIcon,
    id: 'portfolio_item_octane',
    link: 'https://apps.apple.com/us/app/lumin-energy/id1671843496',
    stack: ['vue'],
    title: t('portfolio-section.items.octane.title'),
  },
  {
    description: t('portfolio-section.items.rdc-pro.description'),
    icon: reactIcon,
    id: 'portfolio_item_rdc_pro',
    link: 'https://apps.apple.com/us/app/realtor-com-pro/id1382372941',
    stack: ['react native'],
    title: t('portfolio-section.items.rdc-pro.title'),
  },
  {
    description: t('portfolio-section.items.opcity.description'),
    icon: reactIcon,
    id: 'portfolio_item_opcity',
    link: 'https://mobile.opcity.com/',
    stack: ['react native'],
    title: t('portfolio-section.items.opcity.title'),
  },
  {
    description: t('portfolio-section.items.alooola.description'),
    icon: reactIcon,
    id: 'portfolio_item_alooola',
    link: 'https://apps.apple.com/us/app/alooola-wealth-management/id1582483447',
    stack: ['react native'],
    title: t('portfolio-section.items.alooola.title'),
  },
  {
    description: t('portfolio-section.items.bluestar.description'),
    icon: reactIcon,
    id: 'portfolio_item_bluestar',
    link: 'https://play.google.com/store/apps/details?id=com.ameritas.myplanconnection&hl=en_US&pli=1',
    stack: ['react native'],
    title: t('portfolio-section.items.bluestar.title'),
  },
  {
    description: t('portfolio-section.items.open-stalls.description'),
    icon: reactIcon,
    id: 'portfolio_item_open_stalls',
    link: 'https://openstalls.com/',
    stack: ['react'],
    title: t('portfolio-section.items.open-stalls.title'),
  },
  {
    description: t('portfolio-section.items.wcra.description'),
    icon: reactIcon,
    id: 'portfolio_item_wcra',
    link: 'https://app.wcrarodeo.com/',
    stack: ['react'],
    title: t('portfolio-section.items.wcra.title'),
  },
]

const expandedItemIds = ref(new Set<PortfolioItem['id']>())
const floatingStyles = new Map(
  portfolioItems.map((item) => {
    const driftX = Math.random() * 10 - 5
    const driftY = Math.random() * 12 - 6

    return [
      item.id,
      {
        '--float-duration': `${8 + Math.random() * 12}s`,
        '--float-delay': `${-Math.random() * 20}s`,
        '--float-start-x': `${driftX.toFixed(1)}px`,
        '--float-start-y': `${driftY.toFixed(1)}px`,
        '--float-end-x': `${(-driftX).toFixed(1)}px`,
        '--float-end-y': `${(-driftY).toFixed(1)}px`,
      },
    ] as const
  }),
)

const setItemExpanded = (id: PortfolioItem['id'], expanded: boolean): void => {
  const nextExpandedIds = new Set(expandedItemIds.value)
  if (expanded) nextExpandedIds.add(id)
  else nextExpandedIds.delete(id)
  expandedItemIds.value = nextExpandedIds
}

const activeOutlineIds = ref(new Set<PortfolioItem['id']>())
let outlineTimer: ReturnType<typeof setTimeout> | undefined
let outlineQueue: PortfolioItem[] = []
const outlineDuration = 1400

const refillOutlineQueue = (): void => {
  outlineQueue = [...portfolioItems]

  for (let index = outlineQueue.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = outlineQueue[index]
    const swapItem = outlineQueue[swapIndex]
    if (!currentItem || !swapItem) continue

    outlineQueue[index] = swapItem
    outlineQueue[swapIndex] = currentItem
  }
}

const scheduleNextOutline = (delay: number): void => {
  outlineTimer = setTimeout(() => {
    if (outlineQueue.length === 0) refillOutlineQueue()

    const item = outlineQueue.shift()
    if (!item) return

    activeOutlineIds.value.add(item.id)

    outlineTimer = setTimeout(() => {
      activeOutlineIds.value.delete(item.id)
      scheduleNextOutline(5000 + Math.random() * 5000)
    }, outlineDuration)
  }, delay)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  refillOutlineQueue()
  scheduleNextOutline(Math.random() * 5000)
})

onUnmounted(() => {
  if (outlineTimer !== undefined) clearTimeout(outlineTimer)
})
</script>

<template>
  <cardElement>
    <div class="section-title-container mt-xl mb-xxl">
      <h2 class="section-title">{{ t('portfolio-section.title') }}</h2>
    </div>

    <div class="portfolio-container mx-auto">
      <itemElement
        v-for="item in portfolioItems"
        :class="{
          'portfolio-item--outlined': activeOutlineIds.has(item.id),
          'portfolio-item--expanded': expandedItemIds.has(item.id),
        }"
        :key="item.id"
        :content-id="`${item.id}-content`"
        :expanded="expandedItemIds.has(item.id)"
        :style="floatingStyles.get(item.id)"
        :title="item.title"
        @update:expanded="setItemExpanded(item.id, $event)"
        class="portfolio-item"
        clickable
      >
        <div v-if="item.description" class="portfolio-item-description">{{ item.description }}</div>
        <div class="flex align-center space-between mt-md">
          <a
            v-if="item.link"
            class="portfolio-item-link"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('portfolio-section.visit-project') }}
          </a>
          <div v-if="item.icon" class="portfolio-item-icon-container">
            <component :is="item.icon" fillColor="var(--general-text-color)" :size="32" />
          </div>
        </div>
      </itemElement>
    </div>

    <div class="section-disclaimer mt-xxl mb-xl mx-auto">
      <span class="disclaimer-text">{{ t('portfolio-section.disclaimer') }}</span>
    </div>
  </cardElement>
</template>

<style scoped>
.portfolio-container {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  max-width: 800px;
  width: 100%;
}

.portfolio-item {
  animation: portfolio-drift var(--float-duration) ease-in-out var(--float-delay) infinite alternate;
  color: var(--general-text-color);
  isolation: isolate;
  position: relative;
  z-index: 0;
}

.portfolio-item--expanded {
  animation-play-state: paused;
  z-index: 2;
}

.portfolio-item::before {
  --outline-angle: 0deg;

  background: conic-gradient(
    from var(--outline-angle),
    transparent 0deg 300deg,
    rgba(105, 62, 145, 0.08) 322deg,
    rgba(105, 62, 145, 0.55) 340deg,
    rgba(105, 62, 145, 1) 351deg,
    #f4eff880 356deg,
    rgba(105, 62, 145, 0.35) 360deg
  );
  border-radius: inherit;
  content: '';
  inset: 0;
  opacity: 0;
  padding: 1px;
  pointer-events: none;
  position: absolute;
  z-index: 1;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.portfolio-item--outlined::before {
  animation: portfolio-outline-sweep 1400ms ease-out forwards;
}

.portfolio-item-description {
  font-family: var(--font-family-100);
}

.portfolio-item-icon-container {
  height: 32px;
}

.portfolio-item-link {
  color: inherit;
  display: inline-block;
  font-family: var(--font-family-300);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.disclaimer-text {
  color: var(--general-text-color);
  font-family: var(--font-family-100);
  font-size: 12px;
}

.section-disclaimer {
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 70%;
  width: 100%;
}

.section-title-container {
  width: 100%;
}

.section-title {
  color: var(--general-text-color);
  font-family: var(--font-family-400);
  text-align: center;
  width: 100%;
}

@keyframes portfolio-outline-sweep {
  0% {
    --outline-angle: 0deg;
    opacity: 0;
  }

  12% {
    opacity: 1;
  }

  82% {
    opacity: 0.85;
  }

  100% {
    --outline-angle: 360deg;
    opacity: 0;
  }
}

@keyframes portfolio-drift {
  from {
    transform: translate3d(var(--float-start-x), var(--float-start-y), 0);
  }

  to {
    transform: translate3d(var(--float-end-x), var(--float-end-y), 0);
  }
}

@property --outline-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-item {
    animation: none;
  }

  .portfolio-item--outlined::before {
    animation: none;
  }
}

@media (max-width: 640px) {
  .portfolio-container {
    gap: 22px;
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
