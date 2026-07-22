'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Contactbar from '@/components/Contactbar'
import Topbar from '@/components/Topbar'
import Bottombar from '@/components/Bottombar'
import Floating from '@/components/Floating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollTop } from '@/hooks/useScrollTop'
import { useTheme } from '@/hooks/useTheme'
import MailModal from '@/components/MailModal'

type LayoutShellProps = {
  children: React.ReactNode
  portfolioTotal: number
  portfolioCounts: Record<string, number>
  gitTotal: number
  gitCounts: Record<string, number>
  guideCount: number
  qnaCount: number
  visitorTotal: number
}

const LayoutShell = ({ children, portfolioTotal, portfolioCounts, gitTotal, gitCounts, guideCount, qnaCount, visitorTotal }: LayoutShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { showTopBtn, scrollToTop } = useScrollTop()
  const { isDark, mounted, toggleTheme } = useTheme()
  const [mailOpen, setMailOpen] = useState(false)

  return (
    <>
      <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar portfolioTotal={portfolioTotal} portfolioCounts={portfolioCounts} gitTotal={gitTotal} gitCounts={gitCounts} guideCount={guideCount} qnaCount={qnaCount} visitorTotal={visitorTotal} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main>{children}</main>
      <Contactbar />
      <Bottombar onMailClick={() => setMailOpen(true)} />
      <Floating showTopBtn={showTopBtn} onMailClick={() => setMailOpen(true)} onTopClick={scrollToTop} onThemeClick={toggleTheme} isDark={isDark} mounted={mounted} />
      {mailOpen && <MailModal onClose={() => setMailOpen(false)} />}
    </>
  )
}

export default LayoutShell
