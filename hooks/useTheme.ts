'use client'

import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // FOUC 방지 스크립트가 이미 html에 적용해둔 값을 읽음
    setIsDark(document.documentElement.dataset.theme === 'dark')
    setMounted(true)

    // 다른 컴포넌트에서 토글해도 동기화되도록 html 속성 변화 감지
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.dataset.theme === 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme !== 'dark'
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('theme', next ? 'dark' : 'light')
    // setIsDark는 MutationObserver가 처리 → 모든 훅 인스턴스 동시 갱신
  }

  return { isDark, mounted, toggleTheme }
}
