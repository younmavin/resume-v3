'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AdminLoginGate() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })

    setLoading(false)

    if (res.ok) {
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.message ?? '로그인에 실패했습니다.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleClose = () => {
    router.back()
  }

  return (
    <div className="admin-login-gate" onClick={handleClose}>
      <div className="modal-mount">
        <div className={`modal ${shake ? 'shake' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-ico">
            <FontAwesomeIcon icon={['fas', 'lock']} />
          </div>

          <h2>관리자 로그인</h2>
          <p className="desc">방문자 분석 데이터는 관리자만 볼 수 있습니다.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="admin-id">아이디</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={['far', 'user']} className="ico" />
                <input id="admin-id" type="text" value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" required autoFocus />
              </div>
            </div>

            <div className="field">
              <label htmlFor="admin-password">비밀번호</label>
              <div className="input-wrap">
                <FontAwesomeIcon icon={['fas', 'lock']} className="ico" />
                <input id="admin-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                <button type="button" className="btn-toggle" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}>
                  <FontAwesomeIcon icon={['far', showPassword ? 'eye-slash' : 'eye']} />
                </button>
              </div>
            </div>

            {error && (
              <p className="error-msg">
                <FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
                {error}
              </p>
            )}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
