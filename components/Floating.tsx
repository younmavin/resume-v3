'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@/lib/fontawesome'

type UtilButtonsProps = {
  showTopBtn: boolean
  onMailClick: () => void
  onTopClick: () => void
  onThemeClick: () => void
  isDark: boolean
  mounted: boolean
}

const Floating = ({ showTopBtn, onMailClick, onTopClick, onThemeClick, isDark, mounted }: UtilButtonsProps) => {
  return (
    <div className="btn-util">
      <button type="button" className="btn-mode" onClick={onThemeClick} aria-label={mounted && isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}>
        <FontAwesomeIcon icon={['far', mounted && isDark ? 'sun' : 'moon']} />
      </button>

      <button type="button" className="btn-mail" onClick={onMailClick} aria-label="메일 보내기">
        <FontAwesomeIcon icon={['far', 'envelope']} />
      </button>

      <button type="button" className={`btn-top ${showTopBtn ? 'is-show' : ''}`} onClick={onTopClick} aria-label="맨 위로 이동 버튼">
        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
      </button>
    </div>
  )
}

export default Floating
