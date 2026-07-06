'use client'

import { usePathname } from 'next/navigation'
import History from './History'
import { useParallax } from '@/hooks/useParallax'

const Contactbar = () => {
  const ref = useParallax()
  const pathname = usePathname()

  return (
    <aside className="contactbar" ref={ref as React.RefObject<HTMLElement>}>
      <History key={pathname} />
    </aside>
  )
}

export default Contactbar
