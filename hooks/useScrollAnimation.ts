import { useEffect, useRef } from 'react'

export const useScrollAnimation = () => {
  const dlRefs = useRef<(HTMLDListElement | null)[]>([])
  const lineRef = useRef<HTMLElement | null>(null)
  const lineSpanRef = useRef<HTMLElement | null>(null)
  const txtBxRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // ref로 직접 잡기
    lineRef.current = document.querySelector('.line')
    lineSpanRef.current = document.querySelector('.line span')
    txtBxRef.current = document.querySelector('.txt-bx')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.2 },
    )

    dlRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      const txtBx = txtBxRef.current
      const line = lineRef.current
      const lineSpan = lineSpanRef.current
      if (!txtBx || !line || !lineSpan) return

      const rect = txtBx.getBoundingClientRect()
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const absoluteTop = rect.top + scrollY
      const absoluteBottom = rect.bottom + scrollY

      const total = absoluteBottom - absoluteTop
      const passed = scrollY + windowHeight - absoluteTop

      const ratio = Math.min(Math.max(passed / total, 0), 1)
      const lineHeight = line.offsetHeight

      lineSpan.style.height = `${ratio * lineHeight}px`
    }

    // 약간 딜레이 후 초기 실행 (DOM 렌더링 후)
    const timer = setTimeout(() => {
      handleScroll()
    }, 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return dlRefs
}
