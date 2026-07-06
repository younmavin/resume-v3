'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { GuideItem } from '@/lib/notion'

const BoardGuideList = ({ guides = [], perPage = 10 }: { guides: GuideItem[]; perPage?: number }) => {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState('')

  const filtered = guides.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.sub.toLowerCase().includes(search.toLowerCase()))
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
    <div className="cont">
      <div className="tit-wrap">
        <h2>
          코딩 가이드 자료 <span className="total">{filtered.length}</span>
        </h2>
        <Link href="/board/guide" className="btn-link mt-0">
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
      <div className="table-list">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>업로드 일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {current.length > 0 ? (
              current.map((item) => (
                <tr key={item.id}>
                  <td className="deps item">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="row-link" aria-label={`${item.title} 자료 새 탭에서 열기`}>
                      <figure>
                        <div className="ico">
                          <FontAwesomeIcon icon={['fab', 'notion']} />
                        </div>
                        <figcaption>
                          {item.title} <small>{item.sub}</small>
                        </figcaption>
                      </figure>
                    </a>
                  </td>
                  <td className="update item">{item.date}</td>
                  <td className="ico">
                    <FontAwesomeIcon icon={['fas', 'circle-right']} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>
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

export default BoardGuideList
