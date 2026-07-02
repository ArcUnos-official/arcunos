import Image from 'next/image'

export default function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-line bg-white shadow-sm shrink-0" style={{ width: size, height: size }}>
      <Image src="/logo.jpg" alt="ArcUnos logo" width={size} height={size} className="w-full h-full object-cover" priority />
    </div>
  )
}
