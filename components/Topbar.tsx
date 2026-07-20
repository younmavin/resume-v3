'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type TopbarProps = {
  onMenuClick: () => void
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // 상단에서는 항상 표시
      if (currentY < 20) {
        setHidden(false)
      } else if (currentY > lastScrollY.current) {
        // 아래로 스크롤 → 숨김
        setHidden(true)
      } else {
        // 위로 스크롤 → 표시
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`header ${hidden ? 'is-hide' : ''}`}>
      <Link href="/" className="logo">
        <span className="ico">M</span> 포트폴리오
      </Link>

      <button type="button" className="btn-menu" onClick={onMenuClick} aria-label="메뉴 열기">
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </button>
    </header>
  )
}

export default Topbar
