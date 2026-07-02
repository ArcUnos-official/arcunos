'use client'

import DashboardNeuralCanvas from '@/components/dashboard/DashboardNeuralCanvas'

export default function AmbientVideo() {
  return (
    <div className="dashboard-live-engine">
      <DashboardNeuralCanvas />
      <div className="dashboard-engine-vignette" />
    </div>
  )
}
