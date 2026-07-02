'use client'

import { useEffect, useRef } from 'react'

export default function DashboardNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas = canvasEl
    const ctxMaybe = canvas.getContext('2d')
    if (!ctxMaybe) return
    const ctx = ctxMaybe

    let raf = 0
    let particles: Array<{ angle: number; length: number; speed: number; phase: number; pulseSpeed: number }> = []
    const linesCount = 34
    let globalPulsePhase = 0
    let w = 0
    let h = 0
    let dpr = 1

    function initSystemNodes() {
      particles = []
      for (let i = 0; i < linesCount; i++) {
        const angle = (i / linesCount) * Math.PI * 2
        particles.push({
          angle,
          length: 180 + Math.random() * 250,
          speed: 0.0035 + Math.random() * 0.006,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.020 + Math.random() * 0.030,
        })
      }
    }

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initSystemNodes()
    }

    function currentColor() {
      const style = getComputedStyle(document.body)
      const color = style.getPropertyValue('--violet').trim() || '#d4af37'
      return color
    }

    function renderLoop() {
      ctx.clearRect(0, 0, w, h)
      const accent = currentColor()
      const centerX = w * 0.58
      const centerY = h * 0.52
      globalPulsePhase += 0.012

      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(w, h) * 0.52)
      grad.addColorStop(0, `${accent}28`)
      grad.addColorStop(0.32, `${accent}0f`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.globalAlpha = 0.11
      ctx.strokeStyle = accent
      ctx.lineWidth = 1
      const grid = 78
      for (let x = ((globalPulsePhase * 16) % grid) - grid; x < w + grid; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = ((globalPulsePhase * 11) % grid) - grid; y < h + grid; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }
      ctx.restore()

      const centerBrainRadius = 34 + Math.sin(globalPulsePhase) * 4
      ctx.shadowBlur = 30
      ctx.shadowColor = accent
      ctx.fillStyle = accent
      ctx.beginPath()
      ctx.arc(centerX, centerY, centerBrainRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = accent
      ctx.lineWidth = 1
      for (let r = 56; r <= 220; r += 42) {
        ctx.globalAlpha = 0.06 + (r % 3) * 0.015
        ctx.beginPath()
        ctx.arc(centerX, centerY, r + Math.sin(globalPulsePhase + r) * 2, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      particles.forEach((p) => {
        p.phase += p.speed
        const currentLen = p.length + Math.sin(p.phase) * 30
        const targetX = centerX + Math.cos(p.angle) * currentLen
        const targetY = centerY + Math.sin(p.angle) * currentLen
        const controlX = centerX + Math.cos(p.angle + 0.1) * (currentLen * 0.5)
        const controlY = centerY + Math.sin(p.angle + 0.1) * (currentLen * 0.5)

        ctx.shadowBlur = 0
        ctx.strokeStyle = accent
        ctx.globalAlpha = 0.16
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.quadraticCurveTo(controlX, controlY, targetX, targetY)
        ctx.stroke()
        ctx.globalAlpha = 1

        const pulseProgress = (globalPulsePhase * p.pulseSpeed * 3.6) % 1
        const pulseX = centerX + Math.cos(p.angle) * (currentLen * pulseProgress)
        const pulseY = centerY + Math.sin(p.angle) * (currentLen * pulseProgress)

        ctx.shadowBlur = 12
        ctx.shadowColor = accent
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(pulseX, pulseY, 2.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 8
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(targetX, targetY, 3.6, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(renderLoop)
    }

    resizeCanvas()
    raf = requestAnimationFrame(renderLoop)
    window.addEventListener('resize', resizeCanvas)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none object-cover" aria-hidden="true" />
}
