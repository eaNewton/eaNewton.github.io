import { onMounted, onUnmounted, type Ref } from 'vue'

export function useShootingStars(container: Ref<HTMLElement | null>): void {
  let scheduleTimer: ReturnType<typeof setTimeout> | undefined
  let removeTimer: ReturnType<typeof setTimeout> | undefined
  let activeShootingStar: HTMLDivElement | undefined
  let burstStarsRemaining = 0

  const scheduleAfterStar = (): void => {
    if (burstStarsRemaining > 0) {
      burstStarsRemaining -= 1
      scheduleNext(400 + Math.random() * 900)
      return
    }

    if (Math.random() < 0.25) {
      burstStarsRemaining = 1 + Math.floor(Math.random() * 2)
      scheduleNext(400 + Math.random() * 900)
      return
    }

    scheduleNext(8000 + Math.random() * 10000)
  }

  const scheduleNext = (delay: number): void => {
    scheduleTimer = setTimeout(() => {
      const parent = container.value
      if (!parent) return

      const shootingStar = document.createElement('div')
      const duration = 1.2 + Math.random() * 0.6
      const angle = Math.random() * Math.PI * 2
      const distance = 140 + Math.random() * 80
      const angleDegrees = (angle * 180) / Math.PI

      shootingStar.className = 'shooting-star'
      shootingStar.style.left = `${30 + Math.random() * 70}%`
      shootingStar.style.top = `${Math.random() * 70}%`
      shootingStar.style.setProperty('--shoot-duration', `${duration}s`)
      shootingStar.style.setProperty('--shoot-x', `${Math.cos(angle) * distance}px`)
      shootingStar.style.setProperty('--shoot-y', `${Math.sin(angle) * distance}px`)
      shootingStar.style.setProperty('--shoot-angle', `${angleDegrees + 180}deg`)
      parent.appendChild(shootingStar)
      activeShootingStar = shootingStar

      removeTimer = setTimeout(() => {
        shootingStar.remove()
        activeShootingStar = undefined
        scheduleAfterStar()
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
