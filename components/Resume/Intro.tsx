'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@/lib/fontawesome'
import Personality from './Personality'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

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
                ref={(el) => {
                  dlRefs.current[0] = el
                }}
              >
                <dt>개발 철학</dt>
                <dd>
                  단순한 화면 구현에 그치지 않고, 지속적인 리팩토링으로 <b>코드를 간결하고 읽기 쉽게 다듬는 것</b>을 중요하게 생각합니다.
                  <br />
                  W3C 표준을 준수한 마크업을 기반으로 컴포넌트 설계 및 공통 스타일을 구축하여 <b>유지 보수성</b>을 높이고,
                  <br />
                  적절한 인터랙션을 더해, 사용자에게 <b>기억에 남는 웹 경험</b>을 제공하기 위해 최선을 다합니다.
                </dd>
              </dl>
              <dl
                ref={(el) => {
                  dlRefs.current[1] = el
                }}
              >
                <dt>팀 협업 및 의사소통 능력</dt>
                <dd>
                  협업에서 가장 중요한 것은 <b>신뢰</b>라고 생각합니다.
                  <br />
                  믿고 맡길 수 있는 동료가 되기 위해, 안 되는 이유보다 해낼 방법을 먼저 찾는 자세로 업무에 임합니다.
                  <br />
                  <br />
                  프로젝트 완수를 위해 팀원들과 꾸준히 소통하고 의견을 경청하며, 제 의견을 제시할 때는 논리적인 근거를 바탕으로 설득하려 노력합니다.
                  <br />팀 전체의 성장을 위해 <b>코딩 가이드 문서 제작·공유</b> 등 서포트 역할을 자처하고, 필요한 상황에서는 팀원들의 업무를 파악해 일정을 조율하며 프로젝트를 이끕니다.
                  <br />
                  <br />
                  <b>돌잔치 사회자</b>, <b>여행 가이드</b> 등 다양한 아르바이트 경험을 통해 사람들과 자연스럽게 소통하는 능력을 키웠습니다.
                  <br />
                  이를 바탕으로 사내 워크숍·야유회에서 레크리에이션 진행을 맡아 조직 분위기를 활기차게 이끌었으며, 동아리 활동에도 적극 참여하며 동료들과 신뢰를 쌓아왔습니다.
                </dd>
              </dl>
              <dl
                ref={(el) => {
                  dlRefs.current[2] = el
                }}
              >
                <dt>개발자가 되기까지</dt>
                <dd>
                  어릴 적 꿈은 해외 관광가이드였습니다.
                  <br />
                  일본에서 대학 진학을 준비했지만, 코로나로 여행업계가 큰 타격을 받아 진학을 포기하고 귀국했습니다.
                  <br />
                  <br />
                  이후 여행 유튜버가 되고자 영상을 배우러 등록한 국비교육이 실은 코딩 중심의 커리큘럼이었고,
                  <br />
                  문제 해결을 좋아하는 성격과 생각보다 잘 맞아, 몰입해서 공부한 끝에 종합 성적 <b>2위</b>로 수료했습니다.
                  <br />
                  <br />
                  수료 후 웹퍼블리셔로 커리어를 시작해, 3년 5개월간 <b>웹 게임, 기업 웹, 웹 매거진, 뉴스레터</b> 등 다양한 프로젝트를 수행했습니다.
                  <br />
                  현재는 프론트엔드 개발까지 범위를 넓혔고, 나아가 풀스택 개발자를 목표로 꾸준히 성장하고 있습니다.
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
