'use client'

import { useState, useEffect } from 'react'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CountUp from '@/components/CountUp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const langConfig: Record<string, { icon: any; className: string }> = {
  HTML: { icon: ['fab', 'html5'], className: 'html' },
  CSS: { icon: ['fab', 'css3'], className: 'css' },
  JavaScript: { icon: ['fab', 'js'], className: 'js' },
  Vue: { icon: ['fab', 'vuejs'], className: 'vue' },
  TypeScript: { icon: ['fab', 'typescript'], className: 'ts' },
}

type Props = {
  total: number
  langCount: Record<string, { total: number; recentCount: number; date: string }>
}

const CardItem = ({ lang, data }: { lang: string; data: Props['langCount'][string] }) => (
  <>
    <figure>
      <div className="ico">
        <FontAwesomeIcon icon={langConfig[lang].icon} />
      </div>
      <figcaption>
        <h6>
          <span className="total">
            <CountUp target={data.total} />
          </span>
          {data.recentCount > 0 && <span className="inc">+{data.recentCount}개</span>}
        </h6>
        <p>{lang.toUpperCase()}</p>
      </figcaption>
    </figure>
    <p className="date">
      <span>최근 업데이트</span>
      <span className="date-txt">{data.date || '-'}</span>
    </p>
  </>
)

const GitProjectCardList = ({ total, langCount }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    setIsMobile(mq.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="project-card-cont cont">
      <div className="tit-wrap">
        <h5>
          깃 프로젝트 <span className="total">{total}</span>
        </h5>
      </div>
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 15 }, // ~575px
            576: { slidesPerView: 2.5, spaceBetween: 20 }, // 576~767px
            768: { slidesPerView: 3, spaceBetween: 20 }, // 768~1023px
            1024: { slidesPerView: 4, spaceBetween: 20 }, // 768~1023px
          }}
          className="card-swiper"
        >
          {Object.entries(langCount).map(([lang, data]) => (
            <SwiperSlide key={lang} className={`item-${langConfig[lang].className}`}>
              <CardItem lang={lang} data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul>
          {Object.entries(langCount).map(([lang, data]) => (
            <li key={lang} className={`item-${langConfig[lang].className}`}>
              <CardItem lang={lang} data={data} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GitProjectCardList
