'use client'

import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type MailModalProps = {
  onClose: () => void
}

type FieldErrors = {
  name?: string
  email?: string
  phone?: string
  subject?: string
  content?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9-]{9,13}$/

const MailModal = ({ onClose }: MailModalProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  // 모달 열릴 때 Lenis / body 스크롤 잠금
  useEffect(() => {
    const lenis = (window as any).__lenis

    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const validate = (): boolean => {
    const next: FieldErrors = {}

    if (!name.trim()) {
      next.name = '성함을 입력해 주세요.'
    }

    if (!email.trim()) {
      next.email = '메일주소를 입력해 주세요.'
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = '메일주소 형식이 올바르지 않습니다.'
    }

    if (!phone.trim()) {
      next.phone = '연락처를 입력해 주세요.'
    } else if (!PHONE_REGEX.test(phone)) {
      next.phone = '010-0000-0000 형식으로 입력해 주세요.'
    }

    if (!subject.trim()) {
      next.subject = '제목을 입력해 주세요.'
    }

    if (!content.trim()) {
      next.content = '내용을 입력해 주세요.'
    }

    setErrors(next)

    return Object.keys(next).length === 0
  }

  const handleSend = async () => {
    if (!validate()) return

    setStatus('sending')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: name,
          reply_to: email,
          phone,
          subject,
          message: content,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="mail-modal" role="dialog" aria-modal="true" aria-label="메일 보내기">
      <div className="mail-modal-overlay" onClick={onClose} />

      <div className="mail-modal-inner" data-lenis-prevent>
        <button type="button" className="btn-close" onClick={onClose} aria-label="닫기">
          <FontAwesomeIcon icon={['fas', 'xmark']} />
        </button>

        {status === 'done' ? (
          <div className="mail-result">
            <div className="success-icon">
              <FontAwesomeIcon icon={['far', 'circle-check']} />
            </div>

            <h3>메일이 정상적으로 발송되었습니다.</h3>

            <p>
              문의해 주셔서 감사합니다.
              <br />
              확인 후 최대한 빠르게 답변드리겠습니다.
            </p>

            <button type="button" className="btn btn-send" onClick={onClose}>
              확인
            </button>
          </div>
        ) : (
          <>
            <h2>
              <FontAwesomeIcon icon={['far', 'envelope']} />
              메일 보내기
            </h2>

            <p className="mail-desc">궁금한 점이나 채용 관련 문의를 남겨주시면 빠르게 답변드릴게요.</p>

            <div className="field-grid">
              <fieldset className={`field ${errors.name ? 'is-error' : ''}`}>
                <label>
                  성함 <em>*</em>
                </label>

                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" />

                {errors.name && <p className="err-msg">{errors.name}</p>}
              </fieldset>

              <fieldset className={`field ${errors.email ? 'is-error' : ''}`}>
                <label>
                  메일주소 <em>*</em>
                </label>

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />

                {errors.email && <p className="err-msg">{errors.email}</p>}
              </fieldset>

              <fieldset className={`field ${errors.phone ? 'is-error' : ''}`}>
                <label>
                  연락처 <em>*</em>
                </label>

                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" />

                {errors.phone && <p className="err-msg">{errors.phone}</p>}
              </fieldset>

              <fieldset className={`field ${errors.subject ? 'is-error' : ''}`}>
                <label>
                  제목 <em>*</em>
                </label>

                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="문의 제목" />

                {errors.subject && <p className="err-msg">{errors.subject}</p>}
              </fieldset>
            </div>

            <fieldset className={`field field-editor ${errors.content ? 'is-error' : ''}`}>
              <label>
                내용 <em>*</em>
              </label>

              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="문의 내용을 입력해 주세요." rows={10} />

              {errors.content && <p className="err-msg">{errors.content}</p>}
            </fieldset>

            {status === 'error' && <p className="mail-error">발송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>}

            <button type="button" className="btn btn-send" onClick={handleSend} disabled={status === 'sending'}>
              {status === 'sending' ? '발송 중...' : '보내기'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MailModal
