'use client'

import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollTop } from '@/hooks/useScrollTop'

const Bottombar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { scrollToTop } = useScrollTop()

  return (
    <footer className="bottombar">
      <div className="inner">
        <button className="btn-menu" onClick={onMenuClick} aria-label="메뉴 열기">
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </button>
        <Link href="/" className="btn-home" aria-label="홈으로">
          <FontAwesomeIcon icon={['fas', 'home']} />
        </Link>
        <button className="btn-top" onClick={scrollToTop} aria-label="맨 위로">
          <FontAwesomeIcon icon={['fas', 'arrow-up']} />
        </button>
      </div>
    </footer>
  )
}

export default Bottombar
