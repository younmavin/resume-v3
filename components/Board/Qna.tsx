'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const qnaData = [
  {
    faq: '웹퍼블리셔를 시작하게 된 계기가 무엇인가요?',
    ans: '영상을 배우려고 신청한 국비교육 커리큘럼이 코딩 비중이 높아 자연스럽게 공부하게 되었고, 하다 보니 재미있어서 지금까지 하게 되었습니다.',
  },
  {
    faq: '웹표준과 접근성을 준수하며 코딩해본 적이 있나요?',
    ans: '네 있습니다. 공기업 사이트들을 제작한 경험이 다수 있어 해당 부분을 준수하며 작업했습니다.',
  },
  {
    faq: 'SEO 최적화를 한 경험이 있나요?',
    ans: '네 있습니다. meta태그, 시멘틱 태그, img alt 속성 등을 준수하여 작업합니다.',
  },
  {
    faq: '컴포넌트는 어떤 식으로 분리하나요?',
    ans: '재사용 가능한 UI를 기준으로 컴포넌트를 분리합니다. 다만 버튼처럼 작은 UI 요소들은 무조건 공통 컴포넌트로 만들지는 않습니다.',
  },
  {
    faq: '크로스 브라우징은 어디까지 지원하나요?',
    ans: '일반적으로 IE를 제외한 최신 브라우저(Chrome, Edge, Safari, Firefox)를 지원합니다.',
  },
  {
    faq: 'SPA는 어떤 걸 써보셨나요?',
    ans: 'Vue, React, Next.js를 사용해봤습니다. Vue는 실무 프로젝트에서 사용한 경험이 있어 가장 익숙하며, React와 Next.js는 개인 포트폴리오를 제작하면서 학습했습니다.',
  },
  {
    faq: '웹사이트 최적화는 어떤 식으로 하나요?',
    ans: 'W3C를 준수한 마크업 및 이미지는 WebP 압축과 Lazy Loading을 적용하고, 정적 파일은 AWS S3에 저장한 뒤 CDN을 통해 배포했습니다.',
  },
  {
    faq: 'Bootstrap이나 Tailwind CSS 사용 경험이 있나요?',
    ans: '네 있습니다. 간단한 UI를 빠르게 작업할 때 활용했지만, 번들 용량 증가, 커스터마이징의 한계, HTML 가독성 저하, 그리고 CSS와 이중으로 관리해야 하는 번거로움 때문에 주력으로는 사용하지 않습니다. 다만 프로젝트 성격에 따라 적절히 사용합니다.',
  },
  {
    faq: '카페24를 사용해본적 있나요?',
    ans: '네 있습니다. 처음부터 끝까지 코딩한건 아니고 미리 구매한 템플릿을 커스텀한 경험이 있습니다.',
  },
  {
    faq: 'AI(클로드)를 사용하여 코딩해 본적이 있나요?',
    ans: '네, 있습니다. 잘 모르는 부분은 클로드에게 질문하고, 작성된 코드를 리뷰한 뒤 제 스타일에 맞게 수정하여 사용합니다.',
  },
  {
    faq: '디자인도 가능한가요?',
    ans: '네 가능합니다. 웹 관련 디자인 산출물을 제작한 경험이 다수 있습니다. 다만 현재까지는 코딩 비중이 높아 디자인 전문가 수준은 아닙니다.',
  },
  {
    faq: '그동안의 프로젝트 경험 중 가장 기억에 남는 것은 무엇인가요?',
    ans: '게임 사이트를 만들며 기획자, 디자이너, 개발자 분들 사이에서 조율하고, 디자인 및 기획 지원과 프론트엔드 역할까지 수행했을 때가 기억에 남습니다.',
  },
  {
    faq: '협업 스타일은 어떤가요?',
    ans: '팀원 분들의 스타일에 최대한 맞추려고 합니다. 다만 구현 가능성이 낮거나 생산비용이 높을 시에는 대안을 제시하며 조율하려고 노력합니다.',
  },
  {
    faq: '본인의 개발 철학은 무엇인가요?',
    ans: '단순히 화면 구현에 그치지 않고, 코드를 읽기 쉽게 다듬고 유지보수가 용이하게 만드는 것입니다.',
  },
  {
    faq: '앞으로 어떤 개발자가 되고 싶나요?',
    ans: '기획, 디자인, 개발까지 직접 구현할 수 있는 웹 마스터가 되고 싶습니다.',
  },
]

type QnaItemProps = { item: { faq: string; ans: string }; id: string }

const QnaItem = ({ item, id }: QnaItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight)
  }, [])

  return (
    <li className={isOpen ? 'active' : ''}>
      <h5 className="faq">
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen} aria-controls={`${id}-ans`}>
          <span>
            <span>{item.faq}</span>
          </span>
          <FontAwesomeIcon icon={['fas', 'chevron-down']} />
        </button>
      </h5>
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
        <h6>
          페이지 <span className="current">{page}</span> / <span className="total">{totalPage || 1}</span>
        </h6>
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
