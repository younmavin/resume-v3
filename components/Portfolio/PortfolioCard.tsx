'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { portfolioData } from '@/data/portfolioData'
import CountUp from '@/components/CountUp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const getTopSkills = (tab: string) => {
  const data = tab === '웹 전체' ? portfolioData : portfolioData.filter((item) => item.type === tab)
  const skillCount: Record<string, number> = {}
  data.forEach((item) => {
    item.skills.forEach((s) => {
      skillCount[s.label] = (skillCount[s.label] || 0) + 1
    })
  })
  const sorted = Object.entries(skillCount).sort((a, b) => b[1] - a[1])
  const top3 = sorted.slice(0, 3).map(([label]) => label)
  const rest = sorted.length - 3
  return { top3, rest }
}

type Props = {
  tabs: string[]
  counts: Record<string, number>
  activeTab: string
  onTabChange?: (tab: string) => void
  interactive?: boolean
}

const PortfolioCard = ({ tabs, counts, activeTab, onTabChange, interactive = true }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    setIsMobile(mq.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const handleSelect = (tab: string) => {
    if (interactive) onTabChange?.(tab)
  }

  // Enter 또는 Space로 탭 선택
  const handleKeyDown = (e: React.KeyboardEvent, tab: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault() // Space의 페이지 스크롤 방지
      handleSelect(tab)
    }
  }

  const renderCard = (tab: string) => {
    const { top3, rest } = getTopSkills(tab)
    return (
      <figure>
        <div className="ico">
          <FontAwesomeIcon icon={['fas', 'display']} />
        </div>
        <figcaption>
          <p>{tab}</p>
          <ul>
            {top3.map((skill, i) => (
              <li key={i}>{skill} /</li>
            ))}
            <li>외 {rest}개</li>
          </ul>
          <h5>
            <CountUp target={counts[tab]} /> <small>개</small>
          </h5>
        </figcaption>
      </figure>
    )
  }

  const cardClass = (tab: string) => `${interactive && activeTab === tab ? 'active' : ''} ${!interactive ? 'no-interact' : ''}`

  // 인터랙티브일 때만 탭 접근성 속성 부여
  const tabA11yProps = (tab: string) =>
    interactive
      ? {
          role: 'tab' as const,
          tabIndex: 0,
          'aria-selected': activeTab === tab,
          onClick: () => handleSelect(tab),
          onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, tab),
        }
      : {}

  return (
    <div className="portfolio-card-cont cont">
      <div className="tit-wrap">
        <h5>
          포트폴리오 <span className="total">{counts['웹 전체']}</span>
        </h5>
      </div>
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 15 },
            576: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="card-swiper"
          {...(interactive && { role: 'tablist', 'aria-label': '포트폴리오 분류' })}
        >
          {tabs.map((tab) => (
            <SwiperSlide key={tab} className={cardClass(tab)} {...tabA11yProps(tab)}>
              {renderCard(tab)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className="card-wrap" {...(interactive && { role: 'tablist', 'aria-label': '포트폴리오 분류' })}>
          {tabs.map((tab) => (
            <li key={tab} className={cardClass(tab)} {...tabA11yProps(tab)}>
              {renderCard(tab)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PortfolioCard
