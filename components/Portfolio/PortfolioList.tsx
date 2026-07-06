'use client'

import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { PortfolioItem } from '@/data/portfolioData'

const PER_PAGE = 5

const PortfolioListItem = ({ item }: { item: PortfolioItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="list-item">
      <figure>
        <div className="img-wrap">
          <Link className="img-bx" href={item.link} target="_blank">
            <FontAwesomeIcon icon={['fas', 'circle-plus']} />
            <img src={item.img} alt={item.title} />
          </Link>
        </div>
        <figcaption>
          <h4>
            {item.title} <small>{item.type}</small>
          </h4>
          {item.desc && (
            <p>
              <FontAwesomeIcon icon={['fas', 'pen']} />
              {item.desc}
            </p>
          )}
          <ul className="rate">
            {item.rate.map((r, j) => (
              <li key={j}>
                {r.label} <span>{r.value}</span>
              </li>
            ))}
          </ul>
          {item.deps.length > 0 && (
            <div className={`deps ${isOpen ? 'active' : ''}`}>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                상세설명 보기
                <FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
              </button>
              <ol>
                {item.deps.map((dep, j) => (
                  <li key={j} data-txt={`${j + 1})`}>
                    {dep.link ? (
                      <>
                        <Link href={dep.link} target="_blank">
                          {dep.text}
                        </Link>
                        <Link href={dep.link} target="_blank">
                          <FontAwesomeIcon icon={['fas', 'link']} />
                        </Link>
                      </>
                    ) : (
                      dep.text
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </figcaption>
      </figure>
      <div className="skill">
        {item.skills.map((s, j) => (
          <span key={j} className={s.cls}>
            {s.label}
          </span>
        ))}
      </div>
      <Link className="btn-link" href={item.link} target="_blank">
        웹사이트 바로가기 <FontAwesomeIcon icon={['fas', 'arrow-right']} />
      </Link>
    </li>
  )
}

const PortfolioList = ({ data }: { data: PortfolioItem[] }) => {
  const [page, setPage] = useState(1)
  const totalPage = Math.ceil(data.length / PER_PAGE)
  const current = data.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [data])

  return (
    <div className="portfolio-list-cont cont">
      <div className="list">
        <div className="list-body">
          <ul>
            {current.map((item, i) => (
              <PortfolioListItem key={`${page}-${i}`} item={item} />
            ))}
          </ul>
        </div>
        <div className="paging">
          <p>
            페이지 <span className="current">{page}</span> / <span className="total">{totalPage}</span>
          </p>
          <div className="btn-wrap">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              <FontAwesomeIcon icon={['fas', 'arrow-left']} /> 이전
            </button>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPage))} disabled={page === totalPage}>
              다음 <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioList
