import { appModules } from '@/lib/modules'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import WorkspaceClient from '@/components/modules/WorkspaceClient'
import BackHomeButtons from '@/components/layout/BackHomeButtons'

export function generateStaticParams() {
  return appModules.map((module) => ({ moduleId: module.id }))
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const moduleData = appModules.find(m => m.id === params.moduleId)
  if (!moduleData) return notFound()
  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="text-xs text-muted mb-2"><Link href="/dashboard" className="hover:text-violet">Dashboard</Link> / <span>{moduleData.name}</span></div>
          <h2 className="text-2xl md:text-3xl font-bold text-text flex items-center gap-2"><span>{moduleData.icon}</span> {moduleData.name}</h2>
          <p className="text-muted text-sm mt-1">{moduleData.desc}</p>
        </div>
        <BackHomeButtons />
      </div>
      <div className="flex-1 glass-card p-4 md:p-5 min-h-[650px] lg:min-h-[calc(100vh-180px)]">
        <WorkspaceClient moduleData={moduleData} />
      </div>
    </div>
  )
}
