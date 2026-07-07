'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'
import { useParallax } from '@/hooks/useParallax'

type MenuItem = {
  title: string
  icon: [IconPrefix, IconName]
  href: string
  total?: number
  sub: { label: string; count?: number | string; href: string }[]
}

type SidebarProps = {
  portfolioTotal: number
  portfolioCounts: Record<string, number>
  gitTotal: number
  gitCounts: Record<string, number>
  guideCount: number
  qnaCount: number
  open?: boolean
  onClose?: () => void
}

const Sidebar = ({ portfolioTotal, portfolioCounts, gitTotal, gitCounts, guideCount, qnaCount, open = false, onClose }: SidebarProps) => {
  const ref = useParallax()
  const pathname = usePathname()

  // 페이지 이동 시 사이드바 자동 닫기
  useEffect(() => {
    onClose?.()
  }, [pathname])

  // 사이드바 열림 시 배경 스크롤 잠금
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  const menuItems: MenuItem[] = [
    {
      title: '홈 화면',
      icon: ['far', 'house'],
      href: '/',
      sub: [],
    },
    {
      title: '이력서',
      icon: ['far', 'user'],
      href: '/resume/intro',
      sub: [
        { label: '나의 소개', href: '/resume/intro' },
        { label: '경력 기술', href: '/resume/career' },
      ],
    },
    {
      title: '포트폴리오',
      icon: ['fas', 'display'],
      href: '/portfolio',
      total: portfolioTotal,
      sub: [],
    },
    {
      title: '깃 프로젝트',
      icon: ['fab', 'github'],
      href: '/gitproject',
      total: gitTotal,
      sub: [],
    },
    {
      title: '게시판',
      icon: ['fas', 'list-ul'],
      href: '/board/guide',
      total: guideCount + qnaCount,
      sub: [
        { label: '코딩 가이드 자료', count: guideCount, href: '/board/guide' },
        { label: '자주묻는 질문', count: qnaCount, href: '/board/qna' },
      ],
    },
  ]

  const isMenuActive = (menu: MenuItem) => {
    if (pathname === menu.href) return true
    if (menu.href !== '/' && pathname.startsWith(menu.href + '/')) return true
    return menu.sub.some((item) => pathname === item.href || pathname.startsWith(item.href + '/'))
  }

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`} ref={ref as React.RefObject<HTMLElement>} data-lenis-prevent>
        <button className="btn-close" onClick={onClose} aria-label="닫기">
          <FontAwesomeIcon icon={['fas', 'xmark']} />
        </button>
        <Link href="/" className="logo">
          <span className="ico">M</span> 포트폴리오
        </Link>
        <nav>
          <ul>
            {menuItems.map((menu) => {
              const isActive = isMenuActive(menu)
              return (
                <li key={menu.title} className={`menu-item ${isActive ? 'active' : ''}`}>
                  <Link href={menu.href}>
                    <strong>
                      <span>
                        <FontAwesomeIcon icon={menu.icon} />
                        {menu.title}
                      </span>
                      {menu.total !== undefined && <span className="total">{menu.total}</span>}
                    </strong>
                  </Link>
                  {menu.sub.length > 0 && (
                    <ul>
                      {menu.sub.map((item) => (
                        <li key={item.label} className={pathname === item.href ? 'active' : ''}>
                          <Link href={item.href}>
                            {item.label}
                            {item.count !== undefined && <span>{item.count}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
