<script setup lang="ts">
import Lenis from 'lenis'
import { onMounted, onUnmounted, ref } from 'vue'

type Star = {
  el: HTMLDivElement
  initialY: number
  speed: number
}

const starsContainer = ref<HTMLDivElement | null>(null)
let lenis: Lenis | undefined
let animationFrame: number | undefined
let onScroll: ((lenis: Lenis) => void) | undefined

onMounted(() => {
  const container = starsContainer.value
  if (!container) return

  const stars: Star[] = []

  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    el.className = 'star'

    const x = Math.random() * 100
    const y = Math.random() * 100
    const isStatic = Math.random() < 0.3
    const speed = isStatic ? 0 : 0.2 + Math.random() * 0.6
    const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2

    el.style.left = `${x}%`
    el.style.top = `${y}%`
    el.style.width = `${size}px`
    el.style.height = `${size}px`
    el.style.setProperty('--duration', `${2 + Math.random() * 4}s`)
    el.style.animationDelay = `${Math.random() * 5}s`

    container.appendChild(el)
    stars.push({ el, initialY: y, speed })
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  })

  onScroll = ({ scroll, velocity }) => {
    const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.15, 4))

    stars.forEach((star) => {
      if (star.speed === 0) {
        star.el.style.transform = 'scaleY(1)'
        return
      }

      let position = (star.initialY - scroll * star.speed * 0.05) % 100
      if (position < 0) position += 100

      star.el.style.top = `${position}%`
      star.el.style.transform = `scaleY(${stretch})`
    })
  }

  lenis.on('scroll', onScroll)

  const raf = (time: number) => {
    lenis?.raf(time)
    animationFrame = requestAnimationFrame(raf)
  }

  animationFrame = requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
  if (lenis && onScroll) lenis.off('scroll', onScroll)
  lenis?.destroy()
})
</script>

<template>
  <div id="stars" ref="starsContainer" aria-hidden="true" />
</template>

<style scoped>
#stars {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 100%;
  z-index: 0;
}

#stars :deep(.star) {
  animation: twinkle var(--duration) ease-in-out infinite;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  position: absolute;
  transform-origin: center;
  will-change: top, transform, opacity;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}
</style>
