'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { GuideItem } from '@/lib/notion'
import SearchBar from '@/components/SearchBar'

const POPULAR_KEYWORDS = ['웹표준 및 접근성', '크로스브라우징', 'SCSS', 'SEO 최적화']

const BoardGuideList = ({ guides = [], perPage = 10 }: { guides: GuideItem[]; perPage?: number }) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [showScrollHint, setShowScrollHint] = useState(false)
  const tableListRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)
  const [theadHeight, setTheadHeight] = useState(0)
  const hintDismissedRef = useRef(false) // 한 번 닫으면 다시 안 뜨게

  useEffect(() => {
    const checkOverflow = () => {
      if (hintDismissedRef.current) return
      const el = tableListRef.current
      if (!el) return
      setShowScrollHint(el.scrollWidth > el.clientWidth)
      if (theadRef.current) {
        setTheadHeight(theadRef.current.offsetHeight)
      }
    }

    const rafId = requestAnimationFrame(checkOverflow)

    window.addEventListener('resize', checkOverflow)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [guides])

  const handleDismissHint = () => {
    hintDismissedRef.current = true
    setShowScrollHint(false)
  }

  const filtered = guides.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.sub.toLowerCase().includes(search.toLowerCase()))
  const totalPage = Math.ceil(filtered.length / perPage)
  const current = filtered.slice((page - 1) * perPage, page * perPage)

  const handleSearch = (word: string) => {
    setSearch(word)
    setPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setPage(1)
  }

  const openGuide = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="cont">
      <div className="tit-wrap">
        <h2>
          코딩 가이드 자료 <span className="total">{guides.length}</span>
        </h2>

        <Link href="/board/guide" className="btn-link mt-0">
          전체보기
          <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </Link>
      </div>

      <SearchBar popularKeywords={POPULAR_KEYWORDS} onSearch={handleSearch} onReset={handleReset} />

      <div className="table-wrap">
        <div className={`table-list ${showScrollHint ? 'is-locked' : ''}`} ref={tableListRef}>
          {showScrollHint && (
            <div className="scroll-hint" style={{ top: theadHeight }} onClick={handleDismissHint}>
              <span className="pill">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="ico" />
                내용을 우측으로 밀어서 확인하세요
              </span>
            </div>
          )}

          <table>
            <thead ref={theadRef}>
              <tr>
                <th>제목</th>
                <th>업로드 일</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {current.length > 0 ? (
                current.map((item) => (
                  <tr
                    key={item.id}
                    className="row-link"
                    tabIndex={0}
                    aria-label={`${item.title} 자료 새 탭에서 열기`}
                    onClick={() => openGuide(item.url)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        openGuide(item.url)
                      }
                    }}
                  >
                    <td className="deps item">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-only">
                        {item.title}
                      </a>

                      <figure>
                        <div className="ico">
                          <FontAwesomeIcon icon={['fab', 'notion']} />
                        </div>

                        <figcaption>
                          <p>
                            {item.title}
                            <small>{item.sub}</small>
                          </p>
                        </figcaption>
                      </figure>
                    </td>

                    <td className="update item">{item.date}</td>

                    <td className="ico">
                      <FontAwesomeIcon icon={['fas', 'circle-right']} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="empty">
                    {guides.length === 0 ? '자료를 불러올 수 없습니다.' : '검색 결과가 없습니다.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="paging">
          <p>
            페이지 <span className="current">{page}</span> / <span className="total">{totalPage || 1}</span>
          </p>

          <div className="btn-wrap">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              <FontAwesomeIcon icon={['fas', 'arrow-left']} />
              이전
            </button>

            <button onClick={() => setPage((p) => Math.min(p + 1, totalPage))} disabled={page === totalPage || totalPage === 0}>
              다음
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardGuideList
