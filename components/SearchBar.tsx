'use client'

import { useState, useEffect } from 'react'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ITEM_HEIGHT_REM = 5.5 // rem(55px), SCSS의 li height와 반드시 일치

type SearchBarProps = {
  popularKeywords: string[]
  onSearch: (word: string) => void
  onReset: () => void
}

const SearchBar = ({ popularKeywords, onSearch, onReset }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // 롤링 (무한루프: 첫 항목을 끝에 복제)
  const rollingList = [...popularKeywords, popularKeywords[0]]
  const [rollIndex, setRollIndex] = useState(0)
  const [noTransition, setNoTransition] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setRollIndex((prev) => prev + 1)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // 복제 항목까지 이동 완료되면 transition 없이 0으로 리셋
  useEffect(() => {
    if (rollIndex === popularKeywords.length) {
      const timeout = setTimeout(() => {
        setNoTransition(true)
        setRollIndex(0)
        requestAnimationFrame(() => requestAnimationFrame(() => setNoTransition(false)))
      }, 500) // transition 시간과 동일
      return () => clearTimeout(timeout)
    }
  }, [rollIndex, popularKeywords.length])

  const handleSearch = () => {
    onSearch(keyword)
  }

  const handleReset = () => {
    setKeyword('')
    onReset()
  }

  // 롤링 키워드 클릭 시 바로 검색
  const handleRollingClick = (word: string) => {
    setKeyword(word)
    onSearch(word)
  }

  return (
    <fieldset className="search-bar">
      <button type="button" className="btn-submit" onClick={handleSearch} aria-label="검색">
        <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
      </button>
      <div className="input-wrap">
        <input type="text" placeholder={isFocused ? '검색어를 입력해 주세요' : ''} value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
        {!keyword && !isFocused && (
          <div className="rolling" aria-hidden="true">
            <ul
              style={{
                transform: `translateY(-${rollIndex * ITEM_HEIGHT_REM}rem)`,
                transition: noTransition ? 'none' : 'transform 0.5s ease',
              }}
            >
              {rollingList.map((word, i) => (
                <li key={i}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => handleRollingClick(word)}>
                    <span className="rank">{(i % popularKeywords.length) + 1}.</span>
                    <span className="word">{word}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="btn-wrap">
        <button type="button" className="btn-refrash" onClick={handleReset} aria-label="검색 초기화">
          <FontAwesomeIcon icon={['fas', 'arrow-rotate-right']} />
        </button>
      </div>
    </fieldset>
  )
}

export default SearchBar
