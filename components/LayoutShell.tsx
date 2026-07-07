'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Contactbar from '@/components/Contactbar'
import Bottombar from '@/components/Bottombar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollTop } from '@/hooks/useScrollTop'

type LayoutShellProps = {
  children: React.ReactNode
  portfolioTotal: number
  portfolioCounts: Record<string, number>
  gitTotal: number
  gitCounts: Record<string, number>
  guideCount: number
  qnaCount: number
}

const LayoutShell = ({ children, portfolioTotal, portfolioCounts, gitTotal, gitCounts, guideCount, qnaCount }: LayoutShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { showTopBtn, scrollToTop } = useScrollTop()

  return (
    <>
      <Sidebar portfolioTotal={portfolioTotal} portfolioCounts={portfolioCounts} gitTotal={gitTotal} gitCounts={gitCounts} guideCount={guideCount} qnaCount={qnaCount} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main>{children}</main>
      <Contactbar />
      <Bottombar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <button type="button" className={`btn-top ${showTopBtn ? 'is-show' : ''}`} onClick={scrollToTop} aria-label="맨 위로 이동">
        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
      </button>
    </>
  )
}

export default LayoutShell
