'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackHomeButtons() {
  const router = useRouter()
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => router.back()}
        className="ghost-btn px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back
      </button>
      <Link href="/dashboard" className="ghost-btn px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
        <Home size={16} /> Home
      </Link>
    </div>
  )
}
