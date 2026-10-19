import { onMounted, onUnmounted, type Ref } from 'vue'

export function useShootingStars(container: Ref<HTMLElement | null>): void {
  let scheduleTimer: ReturnType<typeof setTimeout> | undefined
  let removeTimer: ReturnType<typeof setTimeout> | undefined
  let activeShootingStar: HTMLDivElement | undefined

  const scheduleNext = (delay: number): void => {
    scheduleTimer = setTimeout(() => {
      const parent = container.value
      if (!parent) return

      const shootingStar = document.createElement('div')
      const duration = 1.2 + Math.random() * 0.6

      shootingStar.className = 'shooting-star'
      shootingStar.style.left = `${30 + Math.random() * 70}%`
      shootingStar.style.top = `${Math.random() * 70}%`
      shootingStar.style.setProperty('--shoot-duration', `${duration}s`)
      parent.appendChild(shootingStar)
      activeShootingStar = shootingStar

      removeTimer = setTimeout(() => {
        shootingStar.remove()
        activeShootingStar = undefined
        scheduleNext(8000 + Math.random() * 10000)
      }, duration * 1000)
    }, delay)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    scheduleNext(5000 + Math.random() * 5000)
  })

  onUnmounted(() => {
    if (scheduleTimer !== undefined) clearTimeout(scheduleTimer)
    if (removeTimer !== undefined) clearTimeout(removeTimer)
    activeShootingStar?.remove()
  })
}
