'use client'

import { useMemo, useState } from 'react'
import { Module, Tool } from '@/lib/modules'
import { ArrowLeft, Copy, Download, Save } from 'lucide-react'

const introOutput = 'Select one tool to open a focused ArcUnos workspace. Other tools will hide so the interface feels like a real AI app.'

export default function WorkspaceClient({ moduleData }: { moduleData: Module }) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState(introOutput)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const savedKey = useMemo(() => `arcunos.history.${moduleData.id}`, [moduleData.id])

  const openTool = (tool: Tool) => {
    setActiveTool(tool)
    setInput('')
    setOutput(`Opened ${tool.name}.\n\nDescribe what you want ArcUnos to do, then run the agent.`)
    setError('')
  }

  const backToTools = () => {
    setActiveTool(null)
    setInput('')
    setOutput(introOutput)
    setError('')
  }

  const saveWork = (latestOutput = output) => {
    if (typeof window === 'undefined') return
    if (typeof window !== 'undefined' && localStorage.getItem('arcunos_guest_preview') === '1') {
      setError('Login required to save work and memory.')
      return
    }
    const item = {
      id: crypto.randomUUID?.() || String(Date.now()),
      moduleId: moduleData.id,
      moduleName: moduleData.name,
      toolName: activeTool?.name || 'Module workspace',
      input,
      output: latestOutput,
      createdAt: new Date().toISOString(),
    }
    const oldItems = JSON.parse(localStorage.getItem(savedKey) || '[]')
    localStorage.setItem(savedKey, JSON.stringify([item, ...oldItems].slice(0, 30)))
  }

  const handleRunAgent = async () => {
    if (!activeTool) return
    if (typeof window !== 'undefined' && localStorage.getItem('arcunos_guest_preview') === '1') {
      setError('Login required. Guest preview can view tools only. Please create an account or sign in to run ArcUnos.')
      setOutput('This is a preview workspace. Sign in to run AI tools, save work, upload files and use memory.')
      return
    }
    if (!input.trim()) {
      setError('Please enter some details first.')
      return
    }

    setLoading(true)
    setError('')
    setOutput('ArcUnos is thinking...')

    try {
      const res = await fetch('/api/ai/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: moduleData.id,
          moduleName: moduleData.name,
          toolName: activeTool.name,
          input,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'AI request failed')
      setOutput(data.output)
      saveWork(data.output)
    } catch (err: any) {
      const message = err?.message || 'Something went wrong'
      setError(message)
      setOutput('ArcUnos could not complete this request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyOutput = async () => {
    try {
      await navigator.clipboard?.writeText(output)
    } catch {}
  }

  if (!activeTool) {
    return (
      <div className="h-full flex flex-col gap-5">
        <div className="soft-card p-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-muted mb-2">{moduleData.short} workspace</p>
              <h3 className="text-2xl font-bold text-text">Choose one tool</h3>
              <p className="text-sm text-muted mt-1">After you open a tool, all other tools hide and ArcUnos shows a focused AI interface with back navigation.</p>
            </div>
            <span className="text-xs font-bold px-3 py-2 rounded-full border border-line bg-white/5 text-muted">{moduleData.tools.length} tools</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-1 pb-2">
          {moduleData.tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => openTool(tool)}
              className="soft-card p-5 text-left hover:border-violet/60 hover:-translate-y-1 transition-all group min-h-[160px]"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-2xl">{moduleData.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${tool.tier === 'PRO' ? 'bg-gold/15 text-gold border-gold/30' : 'bg-green/15 text-green border-green/30'}`}>{tool.tier}</span>
              </div>
              <h4 className="font-bold text-text group-hover:text-violet transition-colors">{tool.name}</h4>
              <p className="text-sm text-muted mt-2 leading-relaxed">{tool.description}</p>
              <p className="text-xs text-violet font-bold mt-4">Open tool →</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 flex flex-col gap-4">
      <div className="soft-card p-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <button onClick={backToTools} className="ghost-btn px-3 py-2 text-sm flex items-center gap-2 shrink-0">
              <ArrowLeft size={16} /> Back
            </button>
            <div>
              <p className="text-xs text-muted">{moduleData.name} / Active Tool</p>
              <h3 className="text-xl md:text-2xl font-bold text-text flex items-center gap-2">
                <span>{moduleData.icon}</span> {activeTool.name}
              </h3>
            </div>
          </div>
          <span className={`w-fit text-[10px] font-bold px-3 py-1.5 rounded-full border ${activeTool.tier === 'PRO' ? 'bg-gold/15 text-gold border-gold/30' : 'bg-green/15 text-green border-green/30'}`}>
            {activeTool.tier} TOOL
          </span>
        </div>
      </div>

      <section className="grid lg:grid-rows-[1fr_auto] gap-4 min-h-0 flex-1">
        <div className="soft-card p-4 md:p-5 min-h-[300px] overflow-hidden flex flex-col">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3 shrink-0">
            <div>
              <h3 className="font-bold text-text">ArcUnos Output</h3>
              <p className="text-xs text-muted">Output appears here at the top, not hidden below the input.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copyOutput} className="ghost-btn px-3 py-2 text-xs flex items-center gap-1"><Copy size={14}/>Copy</button>
              <button onClick={() => saveWork()} className="ghost-btn px-3 py-2 text-xs flex items-center gap-1"><Save size={14}/>Save</button>
              <button className="ghost-btn px-3 py-2 text-xs flex items-center gap-1"><Download size={14}/>Export</button>
            </div>
          </div>
          <div className="flex-1 bg-bg/70 border border-line rounded-2xl p-4 text-text whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed overflow-y-auto">
            {output}
          </div>
        </div>

        <div className="soft-card p-4 md:p-5 shrink-0">
          <label className="text-sm font-bold text-text block mb-2">Your input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeTool.placeholder}
            className="input-shell min-h-[110px] md:min-h-[130px] resize-y"
          />
          {error && <p className="text-red text-sm mt-2">{error}</p>}
          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={handleRunAgent} disabled={loading} className="primary-btn px-6 py-3 disabled:opacity-50">
              {loading ? 'Processing...' : 'Run ArcUnos →'}
            </button>
            <button onClick={() => { setInput(''); setOutput(`Opened ${activeTool.name}.\n\nDescribe what you want ArcUnos to do, then run the agent.`); setError('') }} className="ghost-btn px-4 py-3">
              Clear
            </button>
            <button onClick={backToTools} className="ghost-btn px-4 py-3">
              Choose another tool
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
