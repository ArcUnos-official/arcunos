'use client'

export default function JarvisCore({ size = 'large' }: { size?: 'small' | 'large' }) {
  return (
    <div className={`jarvis-core ${size === 'small' ? 'jarvis-small' : ''}`} aria-hidden="true">
      <div className="jarvis-ring jarvis-ring-a" />
      <div className="jarvis-ring jarvis-ring-b" />
      <div className="jarvis-ring jarvis-ring-c" />
      <div className="jarvis-scan" />
      <div className="jarvis-pulse" />
      <div className="jarvis-dot">AI</div>
    </div>
  )
}
