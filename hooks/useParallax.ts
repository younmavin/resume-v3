import { useEffect, useRef } from 'react'

const BREAKPOINT = 1200

export const useParallax = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT + 1}px)`)

    let cleanup: (() => void) | undefined
    let timer: NodeJS.Timeout | undefined

    const handleScroll = ({ scroll, velocity = 0 }: { scroll: number; velocity?: number }) => {
      if (!ref.current) return
      ref.current.style.transition = 'transform 0.3s ease-out'
      ref.current.style.transform = `translateY(${scroll * 0.01}px)`

      if (Math.abs(velocity) < 0.5) {
        ref.current.style.transition = 'transform 0.5s ease'
        ref.current.style.transform = 'translateY(0px)'
      }
    }

    const handleWindowScroll = () => handleScroll({ scroll: window.scrollY })

    const setup = () => {
      timer = setTimeout(() => {
        const lenis = (window as any).__lenis
        if (lenis) {
          lenis.on('scroll', handleScroll)
          cleanup = () => lenis.off('scroll', handleScroll)
        } else {
          window.addEventListener('scroll', handleWindowScroll)
          cleanup = () => window.removeEventListener('scroll', handleWindowScroll)
        }
      }, 100)
    }

    const teardown = () => {
      if (timer) clearTimeout(timer)
      cleanup?.()
      cleanup = undefined
      // 남아있는 인라인 스타일 제거 → 모바일 슬라이드 transform과 충돌 방지
      if (ref.current) {
        ref.current.style.transition = ''
        ref.current.style.transform = ''
      }
    }

    // 초기 상태: 1200px 초과일 때만 패럴랙스 시작
    if (mq.matches) setup()

    // 리사이즈로 데스크톱 ↔ 모바일 전환 대응
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setup()
      else teardown()
    }
    mq.addEventListener('change', handleChange)

    return () => {
      teardown()
      mq.removeEventListener('change', handleChange)
    }
  }, [])

  return ref
}
