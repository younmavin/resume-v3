'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const langClass: Record<string, string> = {
  HTML: 'html',
  CSS: 'css',
  JavaScript: 'js',
  TypeScript: 'ts',
  Vue: 'vue',
  React: 'react',
}

const GitProjectList = ({ repos = [], perPage = 10 }: { repos: any[]; perPage?: number }) => {
  const [page, setPage] = useState(1)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [theadHeight, setTheadHeight] = useState(0)
  const tableListRef = useRef<HTMLDivElement>(null)
  const theadRef = useRef<HTMLTableSectionElement>(null)

  const totalPage = Math.ceil(repos.length / perPage)
  const current = repos.slice((page - 1) * perPage, page * perPage)

  useEffect(() => {
    const checkOverflow = () => {
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
  }, [repos])

  const openRepo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="project-list-cont cont">
      <div className="table-wrap">
        <div className="table-list" ref={tableListRef}>
          {showScrollHint && (
            <div className="scroll-hint" style={{ top: theadHeight }} onClick={() => setShowScrollHint(false)}>
              <span className="pill">
                <FontAwesomeIcon icon={['fas', 'arrow-right']} className="ico" />
                내용을 우측으로 밀어서 확인하세요
              </span>
            </div>
          )}

          <table>
            <thead ref={theadRef}>
              <tr>
                <th>레포지토리</th>
                <th>마지막 업데이트</th>
                <th>언어</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {current.map((repo: any) => (
                <tr
                  key={repo.id}
                  className="row-link"
                  tabIndex={0}
                  aria-label={`${repo.name} GitHub 저장소 새 탭에서 열기`}
                  onClick={() => openRepo(repo.html_url)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      openRepo(repo.html_url)
                    }
                  }}
                >
                  <td className="deps item">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="sr-only">
                      {repo.name}
                    </a>
                    <figure>
                      <div className="ico">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </div>

                      <figcaption>
                        <p>
                          {repo.name}
                          <small>{repo.description ?? '설명 없음'}</small>
                        </p>
                      </figcaption>
                    </figure>
                  </td>
                  <td className="update item">{repo.pushed_at?.slice(0, 10).replace(/-/g, '.')}</td>
                  <td className="skill item">{repo.language && <span className={langClass[repo.language] ?? ''}>{repo.language}</span>}</td>
                  <td className="ico">
                    <FontAwesomeIcon icon={['fas', 'circle-right']} />
                  </td>
                </tr>
              ))}
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
    </div>
  )
}

export default GitProjectList
