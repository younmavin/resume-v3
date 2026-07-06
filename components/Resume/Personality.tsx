'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PersonalityChart from './RadarChart'
import History from '@/components/Contactbar/History'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import '@/lib/fontawesome'

const infoData: { icon: IconProp; label: string; span?: string }[] = [
  { icon: ['far', 'user'], label: '프론트엔드 & 웹퍼블리셔', span: '3년 5개월' },
  { icon: ['far', 'calendar'], label: '1996.04.12' },
]

const contactData: { href: string; icon: IconProp; label: string }[] = [
  { href: 'tel:010-9506-1006', icon: ['fas', 'mobile-screen-button'], label: '010-9506-1006' },
  { href: 'mailto:ddw6229@naver.com', icon: ['far', 'envelope'], label: 'ddw6229@naver.com' },
  { href: 'https://github.com/younmavin', icon: ['fab', 'github'], label: 'https://github.com/younmavin' },
]

const ContHead = () => {
  const pathname = usePathname()
  const title = pathname === '/' ? '이력서' : pathname === '/resume/career' ? '경력 기술' : '나의 소개'

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [careerOpen, setCareerOpen] = useState(false)

  // 모달 열려 있을 때 스크롤 잠금
  useEffect(() => {
    if (!careerOpen) return

    const lenis = (window as any).__lenis
    lenis?.stop() // Lenis 스크롤 정지
    document.body.style.overflow = 'hidden' // Lenis 없을 때 대비 폴백

    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setCareerOpen(false)
    window.addEventListener('keydown', handleKey)

    return () => {
      lenis?.start() // 모달 닫히면 재개
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [careerOpen])

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } catch {
      // clipboard API 미지원 브라우저 폴백
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    }
  }

  return (
    <div className="cont">
      <div className="tit-wrap">
        <h5>{title}</h5>
        <div className="btn-wrap">
          <Link className="btn-link mt-0" href="/resume/intro">
            나의 소개 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
          </Link>
          <Link className="btn-link mt-0" href="/resume/career">
            경력 기술 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
          </Link>
        </div>
      </div>
      <div className="cont-head personality">
        <figure>
          <div className="img-bx">
            <img src="https://d3az2v3o9tyrsq.cloudfront.net/avatar.png" alt="유저 프로필 사진" />
          </div>
          <figcaption>
            <h3>윤관호</h3>
            <ul>
              {infoData.map((item, i) => (
                <li key={i}>
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label} {item.span && <span>{item.span}</span>}
                </li>
              ))}
              {contactData.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} target="_blank">
                    <FontAwesomeIcon icon={item.icon} />
                    {item.label}
                  </Link>
                  <button className="btn-copy" onClick={() => handleCopy(item.label, i)} aria-label={`${item.label} 복사`}>
                    <FontAwesomeIcon icon={copiedIndex === i ? ['fas', 'check'] : ['far', 'copy']} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="btn-wrap">
              <button className="btn-career btn-link" onClick={() => setCareerOpen(true)}>
                경력 및 학력 <FontAwesomeIcon icon={['far', 'address-card']} />
              </button>
              <Link className="btn-resume btn-link" href="https://drive.google.com/file/d/1xfUDEkVanhYetbwdcBY5RjXJ-xJZF-QS/view?usp=sharing" target="_blank">
                이력서 PDF <FontAwesomeIcon icon={['far', 'file-pdf']} />
              </Link>
            </div>
          </figcaption>
        </figure>
        <PersonalityChart />
      </div>

      {careerOpen && (
        <div className="career-modal" role="dialog" aria-modal="true" aria-label="경력 및 학력">
          <div className="career-modal-overlay" onClick={() => setCareerOpen(false)} />
          <div className="career-modal-inner" data-lenis-prevent>
            <button className="btn-close" onClick={() => setCareerOpen(false)} aria-label="닫기">
              <FontAwesomeIcon icon={['fas', 'xmark']} />
            </button>
            <History />
          </div>
        </div>
      )}
    </div>
  )
}

export default ContHead
