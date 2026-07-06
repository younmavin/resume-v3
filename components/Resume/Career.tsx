'use client'

import React from 'react'
import '@/lib/fontawesome'
import Personality from './Personality'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// 기술 역량 테이블 데이터
const skillTables = [
  {
    head: '사용 언어',
    rows: [
      { label: 'HTML', desc: '웹표준 및 접근성, SEO최적화' },
      { label: 'CSS / SCSS', desc: '크로스 브라우징, 반응형, 공통스타일 모듈화' },
      { label: 'JQuery /\nJavaScript', desc: '이벤트 핸들링, 인터랙션 및 애니메이션' },
      { label: 'TypeScript', desc: '타입 정의' },
      { label: 'Ajax', desc: '비동기 통신을 활용한 API 연동 및 데이터 바인딩' },
      { label: 'Vue', desc: '컴포넌트 설계 및 데이터 바인딩, 이벤트 핸들링' },
      { label: 'React / Next', desc: '컴포넌트 설계 및 데이터 바인딩, 이벤트 핸들링' },
      { label: '라이브러리', desc: 'Bootstrap, GSAP, TailWind CSS 등 다양한 라이브러리 활용' },
    ],
  },
  {
    head: '사용 툴',
    rows: [
      { label: 'Git / SVN', desc: '버전 관리 및 팀 협업' },
      { label: 'Vercel', desc: '프로젝트 배포 및 운영' },
      { label: '피그마 / XD', desc: '템플릿 제작 및 팀 협업' },
      { label: '포토샵', desc: '이미지 보정, 배너 및 템플릿 제작' },
      { label: 'AWS S3', desc: '이미지 및 정적 파일 관리, CDN 연동' },
    ],
  },
]

// 주요 성과 (문장 중 강조 부분은 <b>로 렌더링)
const achievements = [
  ['공통 스타일 시스템을 제작·배포하여 팀 ', '스타일 가이드', ' 구축'],
  ['공통 UI 컴포넌트화를 통해 ', '코드 재사용성 및 유지보수 효율', ' 개선'],
  ['GSAP 기반 인터랙션·애니메이션 구현으로 ', '페이지 이탈률 감소', '에 기여'],
  ['Ajax 기반 API 연동으로 ', '사용자 인증 기능', '(회원가입·로그인·비밀번호 찾기) 개발'],
  ['포토샵·피그마 등 디자인 툴을 활용하여 ', 'UI/UX 디자인 산출물', ' 제작 및 협업'],
  ['프로젝트 관리 툴(ASANA) 도입 및 운영을 주도해 ', '팀 협업 효율', ' 향상'],
  ['이미지 저장 방식을 AWS S3로 제안·적용하여 ', '서버 디스크 부하', ' 감소'],
  ['이벤트 페이지 미니게임을 기획·구현하여 ', '클라이언트 재계약률 향상', '에 기여'],
]

const Career = () => {
  const dlRefs = useScrollAnimation()

  return (
    <div className="intro-cont cont">
      <Personality />
      <div className="cont-inner">
        <div className="cont-body">
          <div className="txt-wrap">
            <div className="line">
              <span></span>
            </div>
            <div className="txt-bx">
              <dl
                className="table"
                ref={(el) => {
                  dlRefs.current[0] = el
                }}
              >
                <dt>기술 역량</dt>
                <dd>
                  {skillTables.map((tbl) => (
                    <table key={tbl.head}>
                      <thead>
                        <tr>
                          <th>{tbl.head}</th>
                          <th>내용</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tbl.rows.map((row) => (
                          <tr key={row.label}>
                            <td style={{ whiteSpace: 'pre-line' }}>{row.label}</td>
                            <td>{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
                </dd>
              </dl>
              <dl
                className="list"
                ref={(el) => {
                  dlRefs.current[1] = el
                }}
              >
                <dt>주요 성과</dt>
                <dd>
                  <ul>
                    {achievements.map(([before, bold, after], i) => (
                      <li key={i} data-txt={`${i + 1})`}>
                        <p>
                          {before}
                          <b>{bold}</b>
                          {after}
                        </p>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <dl
                ref={(el) => {
                  dlRefs.current[2] = el
                }}
              >
                <dt>경력 배경</dt>
                <dd className="mb-30">
                  <strong>제이브로 컴퍼니(웹 게임 제작사)</strong>
                  대기업 출신 실무진들과 함께 <b>게임 사이트, 게임 관리자 사이트, 기업 홈페이지</b> 등 다양한 프로젝트를 진행했습니다.
                  <br />
                  입사 초기에는 팀원들과 미니 프로젝트를 진행 했고, 서로 코드 리뷰를 하면서 빠르게 성장했습니다.
                  <br />
                  3개월 차부터는 실서비스 퍼블리싱 전반을 독립적으로 담당하게 됐고, 이후에는 <b>사내 웹디자인과 배포물 제작</b>까지 영역을 넓혀 나갔습니다.
                  <br />
                  게임 특성상 px 단위의 UI 디테일과 인터랙션 품질에 특히 신경 썼고, 프론트엔드 개발자 공석이 생겼을 때는 자발적으로 해당 업무를 커버하며 <b>Vue.js, REST API 연동, 사용자 인증 기능</b>까지 개발했습니다.
                  <br />
                  <b>Git, SVN, 피그마</b> 등 다양한 협업 툴을 활용하며 웹 전문가들과 협업하는 경험을 쌓았습니다.
                </dd>
                <dd>
                  <strong>경성문화사(공공기관 웹 매거진&뉴스레터 제작사)</strong>
                  공공기관 특성에 맞춰 <b>웹 표준과 접근성</b>을 엄격히 준수하고 <b>SEO를 최적화</b>하며 마크업했습니다.
                  <br />
                  매달 새 호가 발행되는 사이트 구조에 맞춰 <b>공통 CSS/JS 시스템</b>을 구축하여 주간 웹 매거진 3~4건, 뉴스레터 2~3건을 안정적으로 소화했습니다.
                  <br />
                  단순 제작에 그치지 않고 다양한 애니메이션과 인터랙션을 연구해 적용했으며, <b>Google Analytics</b>로 지표를 직접 확인하며 개선에 반영했습니다.
                  <br />
                  이벤트 페이지의 미니게임은 아이디어 기획부터 구현까지 주도했고, 뉴스레터는 제작부터 실제 발송까지 전담했습니다.
                  <br />
                  <br />
                  게임, 기업 웹, 웹 매거진까지 성격이 다른 웹사이트를 두루 경험했고, 더 다양한 경험을 하고자 이직을 결심했습니다.
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career
