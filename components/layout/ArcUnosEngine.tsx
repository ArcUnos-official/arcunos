'use client'

import { useEffect, useRef } from 'react'

type Spectrum = 'gold' | 'blue'
type Density = 'landing' | 'dashboard'

type Particle = {
  seed: number
  radius: number
  orbit: number
  speed: number
  angle: number
  layer: number
}

export default function ArcUnosEngine({ spectrum = 'gold', density = 'landing' }: { spectrum?: Spectrum; density?: Density }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const targetCanvas = canvas
    const context = targetCanvas.getContext('2d', { alpha: true })
    if (!context) return

    const ctx: CanvasRenderingContext2D = context
    const isGold = spectrum === 'gold'
    const isLanding = density === 'landing'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const primary = isGold ? [240, 196, 92] : [70, 211, 255]
    const secondary = isGold ? [255, 234, 166] : [170, 236, 255]
    const initialMobile = window.innerWidth < 760
    const baseCount = isLanding ? (initialMobile ? 64 : 104) : 120

    const particles: Particle[] = Array.from({ length: baseCount }, (_, index) => ({
      seed: index * 193.17,
      radius: 0.6 + Math.random() * (isLanding ? 1.7 : 1.8),
      orbit: isLanding ? 0.08 + Math.random() * 0.64 : 70 + Math.random() * 520,
      speed: 0.0009 + Math.random() * 0.0022,
      angle: Math.random() * Math.PI * 2,
      layer: Math.random(),
    }))

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let time = 0
    let isVisible = !document.hidden

    const rgba = (color: number[], alpha: number) => `rgba(${color[0]},${color[1]},${color[2]},${alpha})`

    function resize() {
      width = window.innerWidth
      height = window.innerHeight

      const requestedDpr = Math.min(window.devicePixelRatio || 1, isLanding ? 2 : 1.6)
      const maximumPixels = isLanding ? 8_600_000 : 6_200_000
      const pixelSafeDpr = Math.sqrt(maximumPixels / Math.max(1, width * height))
      dpr = Math.max(1, Math.min(requestedDpr, pixelSafeDpr))

      targetCanvas.width = Math.floor(width * dpr)
      targetCanvas.height = Math.floor(height * dpr)
      targetCanvas.style.width = `${width}px`
      targetCanvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawGrid(currentTime: number) {
      const grid = isLanding ? 76 : 78
      ctx.save()
      ctx.globalAlpha = isGold ? (isLanding ? 0.13 : 0.18) : 0.24
      ctx.strokeStyle = rgba(primary, isLanding ? 0.14 : 0.18)
      ctx.lineWidth = 1

      for (let x = ((currentTime * 8) % grid) - grid; x < width + grid; x += grid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = ((currentTime * 4.5) % grid) - grid; y < height + grid; y += grid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawRings(centerX: number, centerY: number, currentTime: number, scale = 1) {
      ctx.save()
      ctx.translate(centerX, centerY)
      const ringCount = isLanding ? 11 : 10

      for (let index = 0; index < ringCount; index += 1) {
        ctx.save()
        ctx.rotate((index % 2 ? -1 : 1) * currentTime * (0.045 + index * 0.006) + index)
        const radiusX = (isLanding ? 112 + index * 47 : 100 + index * 34) * scale
        const radiusY = (isLanding ? 35 + index * 16 : 28 + index * 11) * scale
        ctx.beginPath()
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(primary, (isLanding ? 0.045 : 0.07) + (index % 3) * 0.023)
        ctx.lineWidth = index % 2 ? 1 : 1.6
        ctx.setLineDash(index % 2 ? [18, 28] : [44, 20, 8, 16])
        ctx.shadowBlur = isLanding ? 11 : 14
        ctx.shadowColor = rgba(primary, 0.36)
        ctx.stroke()
        ctx.restore()
      }
      ctx.restore()
    }

    function drawPanels(currentTime: number) {
      const panelCount = isLanding ? (width < 760 ? 6 : 12) : 15
      const labels = ['Website AI', 'Resume AI', 'Developer AI', 'SEO AI', 'Student AI', 'Finance AI', 'PDF AI', 'Research AI', 'Image AI', 'Marketing AI', 'Business AI', 'Video AI']

      for (let index = 0; index < panelCount; index += 1) {
        const horizontalRange = isLanding ? 0.86 : 0.76
        const verticalRange = isLanding ? 0.80 : 0.72
        const positionX = width * (0.07 + ((index * 0.137 + Math.sin(currentTime * 0.03 + index) * 0.012) % horizontalRange))
        const positionY = height * (0.08 + ((index * 0.211 + Math.cos(currentTime * 0.025 + index) * 0.012) % verticalRange))
        const panelWidth = (isLanding ? 84 : 96) + (index % 4) * 31
        const panelHeight = 25 + (index % 3) * 14

        ctx.save()
        ctx.globalAlpha = isLanding ? 0.11 + (index % 3) * 0.035 : 0.16 + (index % 3) * 0.04
        ctx.strokeStyle = rgba(primary, 0.42)
        ctx.fillStyle = isGold ? 'rgba(0,0,0,0.30)' : 'rgba(3,18,32,0.28)'
        ctx.shadowBlur = 12
        ctx.shadowColor = rgba(primary, 0.16)
        ctx.beginPath()
        ctx.roundRect(positionX, positionY, panelWidth, panelHeight, 10)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = rgba(secondary, 0.44)
        ctx.font = `${isLanding ? 9 : 10}px Inter, sans-serif`
        ctx.fillText(labels[index % labels.length], positionX + 10, positionY + 17)
        ctx.restore()
      }
    }

    function drawParticles(centerX: number, centerY: number, currentTime: number) {
      const points: Array<{ x: number; y: number; layer: number }> = []
      const maximumDimension = Math.max(width, height)

      particles.forEach((particle) => {
        particle.angle += particle.speed
        const squash = isLanding ? 0.60 : 0.72
        const orbit = isLanding ? particle.orbit * maximumDimension : particle.orbit
        const driftX = Math.sin(currentTime * 0.05 + particle.seed) * (isLanding ? 90 : 70) * particle.layer
        const driftY = Math.cos(currentTime * 0.035 + particle.seed) * (isLanding ? 58 : 40) * particle.layer
        const x = centerX + Math.cos(particle.angle + currentTime * 0.01) * orbit + driftX
        const y = centerY + Math.sin(particle.angle) * orbit * squash + driftY
        points.push({ x, y, layer: particle.layer })
      })

      if (isLanding) {
        ctx.save()
        ctx.lineWidth = 0.7
        for (let index = 0; index < points.length; index += 1) {
          const point = points[index]
          for (let offset = 1; offset <= 2; offset += 1) {
            const next = points[(index + offset * 7) % points.length]
            const distanceX = next.x - point.x
            const distanceY = next.y - point.y
            const distance = Math.hypot(distanceX, distanceY)
            const threshold = width < 760 ? 150 : 250
            if (distance < threshold) {
              ctx.strokeStyle = rgba(primary, (1 - distance / threshold) * 0.105)
              ctx.beginPath()
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(next.x, next.y)
              ctx.stroke()
            }
          }
        }
        ctx.restore()
      }

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      points.forEach((point, index) => {
        const particle = particles[index]
        const pulse = 0.32 + Math.sin(currentTime * 0.9 + index) * 0.18 + 0.32
        ctx.fillStyle = rgba(index % 5 === 0 ? secondary : primary, Math.max(0.08, Math.min(0.85, pulse)))
        ctx.beginPath()
        ctx.arc(point.x, point.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }

    function drawCore(centerX: number, centerY: number, currentTime: number) {
      const coreRadius = isLanding ? Math.min(300, Math.max(180, width * 0.18)) : 260
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius)
      gradient.addColorStop(0, rgba(secondary, isLanding ? 0.33 : 0.48))
      gradient.addColorStop(0.24, rgba(primary, isLanding ? 0.16 : 0.24))
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = rgba(secondary, isLanding ? 0.52 : 0.72)
      ctx.shadowBlur = isLanding ? 48 : 34
      ctx.shadowColor = rgba(primary, 0.8)
      ctx.beginPath()
      ctx.arc(centerX, centerY, 12 + Math.sin(currentTime * 1.2) * 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawFrame() {
      if (!isVisible) return

      time += reduceMotion ? 0 : 0.016
      ctx.clearRect(0, 0, width, height)

      const mobileLanding = isLanding && width < 920
      const centerX = isLanding ? (mobileLanding ? width * 0.5 : width * 0.70) : width * 0.52
      const centerY = isLanding ? (mobileLanding ? height * 0.64 : height * 0.50) : height * 0.48
      const landingScale = isLanding ? Math.max(1.08, Math.min(1.72, Math.max(width, height) / 960)) : 1.22

      drawGrid(time)
      drawPanels(time)
      drawCore(centerX, centerY, time)
      drawRings(centerX, centerY, time, landingScale)
      drawParticles(centerX, centerY, time)

      if (!reduceMotion) raf = requestAnimationFrame(drawFrame)
    }

    const handleVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && !reduceMotion) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(drawFrame)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)
    drawFrame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [spectrum, density])

  return <canvas ref={canvasRef} className="arcunos-engine-canvas" aria-hidden="true" />
}
