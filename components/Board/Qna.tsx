'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { qnaData, QnaData } from '@/data/qnaData'

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
      <p className="faq">
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen} aria-controls={`${id}-ans`}>
          <span>
            <span>{item.faq}</span>
          </span>
          <FontAwesomeIcon icon={['fas', 'chevron-down']} />
        </button>
      </p>
      <p className="ans" id={`${id}-ans`} ref={ref}>
        {item.ans}
      </p>
    </li>
  )
}

const QnaList = ({ perPage = 10 }: { perPage?: number }) => {
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = qnaData.filter((item) => item.faq.toLowerCase().includes(search.toLowerCase()) || item.ans.toLowerCase().includes(search.toLowerCase()))

  const totalPage = Math.ceil(filtered.length / perPage)
  const current = filtered.slice((page - 1) * perPage, page * perPage)

  const handleSearch = () => {
    setSearch(keyword)
    setPage(1)
  }

  const handleReset = () => {
    setKeyword('')
    setSearch('')
    setPage(1)
  }

  return (
    <div className="qna-cont cont">
      <div className="tit-wrap">
        <h2>
          자주묻는 질문 <span className="total">{filtered.length}</span>
        </h2>
        <Link href="/board/qna" className="btn-link mt-0">
          전체보기 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </Link>
      </div>
      <fieldset className="search-bar">
        <input type="text" placeholder="검색어를 입력해 주세요" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
        <div className="btn-wrap">
          <button type="button" className="btn-submit" onClick={handleSearch} aria-label="검색">
            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
          </button>
          <button type="button" className="btn-refrash" onClick={handleReset} aria-label="검색 초기화">
            <FontAwesomeIcon icon={['fas', 'arrow-rotate-right']} />
          </button>
        </div>
      </fieldset>
      {filtered.length > 0 ? (
        <ul className="list">
          {current.map((item, i) => (
            <QnaItem key={`${page}-${i}`} item={item} id={`qna-${page}-${i}`} />
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
  )
}

export default QnaList
