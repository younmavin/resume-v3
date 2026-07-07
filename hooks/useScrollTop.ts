'use client'

import { useState, useEffect } from 'react'

export const useScrollTop = (threshold = 300) => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  // 스크롤 위치에 따라 탑 버튼 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 상태 반영
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  // 최상단으로 스크롤 (Lenis 우선, 없으면 기본 스크롤)
  const scrollToTop = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return { showTopBtn, scrollToTop }
}
