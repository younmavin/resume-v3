'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { qnaData, QnaData } from '@/data/qnaData'
import SearchBar from '@/components/SearchBar'

const FILTER_TYPES = ['전체', '코딩', '디자인', '기타'] as const
type FilterType = (typeof FILTER_TYPES)[number]

const POPULAR_KEYWORDS = ['웹표준', '크로스브라우징', '최적화', 'SPA']

type QnaItemProps = { item: QnaData; id: string }

const QnaItem = ({ item, id }: QnaItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight)
  }, [])

  return (
    <li className={isOpen ? 'active' : ''}>
      <div
        className="list-item"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen((prev) => !prev)
          }
        }}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-ans`}
      >
        <div className="faq">
          <span className="txt">
            <span>{item.faq}</span>
          </span>

          <FontAwesomeIcon icon={['fas', 'chevron-down']} />
        </div>

        <p className="ans" id={`${id}-ans`} ref={ref}>
          {item.ans}
        </p>
      </div>
    </li>
  )
}

const QnaList = ({ perPage = 10 }: { perPage?: number }) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<FilterType>('전체')

  // 검색만 적용된 결과 (필터 버튼 카운트용)
  const searched = qnaData.filter((item) => item.faq.toLowerCase().includes(search.toLowerCase()) || item.ans.toLowerCase().includes(search.toLowerCase()))

  // 검색 + 타입 필터 적용된 결과
  const filtered = filter === '전체' ? searched : searched.filter((item) => item.type === filter)

  const totalPage = Math.ceil(filtered.length / perPage)
  const current = filtered.slice((page - 1) * perPage, page * perPage)

  const countByType = (type: FilterType) => (type === '전체' ? searched.length : searched.filter((item) => item.type === type).length)

  const handleSearch = (word: string) => {
    setSearch(word)
    setFilter('전체')
    setPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setFilter('전체')
    setPage(1)
  }

  const handleFilter = (type: FilterType) => {
    setFilter(type)
    setPage(1)
  }

  return (
    <div className="qna-cont cont">
      <div className="tit-wrap">
        <h2>
          자주묻는 질문 <span className="total">{qnaData.length}</span>
        </h2>
        <Link href="/board/qna" className="btn-link mt-0">
          전체보기 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </Link>
      </div>
      <SearchBar popularKeywords={POPULAR_KEYWORDS} onSearch={handleSearch} onReset={handleReset} />
      <ul className="filter">
        {FILTER_TYPES.map((type) => (
          <li key={type}>
            <button type="button" className={filter === type ? 'active' : ''} onClick={() => handleFilter(type)}>
              {type} <span>{countByType(type)}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="list-wrap">
        {filtered.length > 0 ? (
          <ul className="list">
            {current.map((item, i) => (
              <QnaItem key={`${filter}-${page}-${i}`} item={item} id={`qna-${page}-${i}`} />
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>검색 결과가 없습니다.</p>
        )}
        <div className="paging">
          <p>
            페이지 <span className="current">{page}</span> / <span className="total">{totalPage || 1}</span>
          </p>
          <div className="btn-wrap">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              <FontAwesomeIcon icon={['fas', 'arrow-left']} /> 이전
            </button>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPage))} disabled={page === totalPage || totalPage === 0}>
              다음 <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QnaList
