'use client'

import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollTop } from '@/hooks/useScrollTop'
import { useTheme } from '@/hooks/useTheme'

type BottombarProps = {
  onMailClick: () => void
}

const Bottombar = ({ onMailClick }: BottombarProps) => {
  const { scrollToTop } = useScrollTop()
  const { isDark, mounted, toggleTheme } = useTheme()

  return (
    <footer className="bottombar">
      <div className="inner">
        <Link href="/" className="btn-home" aria-label="홈으로">
          <FontAwesomeIcon icon={['fas', 'home']} />
        </Link>

        <button type="button" className="btn-mode" onClick={toggleTheme} aria-label={mounted && isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}>
          <FontAwesomeIcon icon={['fas', mounted && isDark ? 'sun' : 'moon']} />
        </button>

        <button type="button" className="btn-mail" onClick={onMailClick} aria-label="메일 보내기">
          <FontAwesomeIcon icon={['fas', 'envelope']} />
        </button>

        <button className="btn-top" onClick={scrollToTop} aria-label="맨 위로">
          <FontAwesomeIcon icon={['fas', 'arrow-up']} />
        </button>
      </div>
    </footer>
  )
}

export default Bottombar
