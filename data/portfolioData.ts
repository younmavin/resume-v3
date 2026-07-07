export type Dep = { text: string; link?: string }

export type PortfolioItem = {
  title: string
  type: string
  img: string
  desc?: string
  skills: { label: string; cls: string }[]
  rate: { label: string; value: string }[]
  deps: Dep[]
  link: string
}

export const portfolioData: PortfolioItem[] = [
  {
    title: '포트폴리오 Version3',
    type: '포트폴리오 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_01.jpg',
    desc: '대시보드 + 머터리얼 디자인으로 제작',
    skills: [
      { label: 'React', cls: 'react' },
      { label: 'Next', cls: 'next' },
      { label: 'TypeScript', cls: 'js' },
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '7일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'Next.js(App Router) 기반 서버/클라이언트 컴포넌트 분리 설계 및 공통 컴포넌트 모듈화' },
      { text: 'TypeScript 사용한 Props 타입 정의' },
      { text: '웹표준·접근성 준수 마크업(W3C 유효성 검사 에러 0) 및 SEO 최적화' },
      { text: 'SCSS 활용한 공통 스타일 변수 및 함수화를 통한 코드 재사용성 향상 및 유지보수 효율 개선' },
      { text: 'GitHub REST API 연동으로 레포지토리 목록·언어 통계 동적 조회 및 차트 렌더링' },
      { text: 'Notion API 연동 게시판 콘텐츠 동적 조회, 캐싱(revalidate) 적용으로 응답 성능 확보' },
      { text: 'AWS S3 + CloudFront CDN 구성으로 이미지 리소스 분리 및 전송 최적화' },
      { text: 'Google Analytics 연동을 통한 사용자 행동 데이터 수집 및 분석' },
    ],
    link: 'https://resume-v3-nine.vercel.app',
  },
  {
    title: '포트폴리오 Version2',
    type: '포트폴리오 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_02.jpg',
    desc: 'Windows 98 + Windows XP 테마를 기반으로 제작',
    skills: [
      { label: 'Vue', cls: 'vue' },
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'Vue SFC 기반 공통 컴포넌트 모듈화 및 데이터 바인딩 구현' },
      { text: '공통 스타일 변수 및 함수화를 통한 코드 재사용성 향상 및 유지보수 효율 개선' },
      { text: 'GitHub REST API 연동을 통한 레포지토리 동적 조회 및 렌더링 구현' },
      { text: 'EmailJS를 활용한 실제 메일 발송 기능 구현' },
      { text: 'Amazon S3를 활용한 이미지 리소스 외부 저장 및 CDN 배포를 통한 트래픽 최적화' },
      { text: 'Google Analytics 연동을 통한 사용자 행동 데이터 수집 및 트래킹 구현' },
    ],
    link: 'https://ddw6229.dothome.co.kr',
  },
  {
    title: '포트폴리오 Version1',
    type: '포트폴리오 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_03.jpg',
    desc: '텍스트에 집중한 문서형 디자인으로 제작',
    skills: [
      { label: 'Vue', cls: 'vue' },
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '3일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'Vue SFC 기반 공통 컴포넌트 모듈화 및 데이터 바인딩 구현' },
      { text: '공통 스타일 변수 및 함수화를 통한 코드 재사용성 향상 및 유지보수 효율 개선' },
      { text: 'GitHub REST API 연동을 통한 레포지토리 동적 조회 및 렌더링 구현' },
      { text: 'EmailJS를 활용한 실제 메일 발송 기능 구현' },
      { text: 'Amazon S3를 활용한 이미지 리소스 외부 저장 및 CDN 배포를 통한 트래픽 최적화' },
      { text: 'Google Analytics 연동을 통한 사용자 행동 데이터 수집 및 트래킹 구현' },
    ],
    link: 'https://resume-v1-alpha-eight.vercel.app',
  },
  {
    title: '애니메이션 웹1',
    type: '기타 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_04.jpg',
    desc: 'GSAP를 사용해 제주도 종주 갔던 경험을 웹 페이지로 제작',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '1일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'GSAP scroll trigger 사용' },
      { text: 'Lenis scroll 사용' },
      { text: '스타일시트 모듈화 및 rem단위 반응형 작업' },
      { text: 'i18n 언어팩 추가' },
    ],
    link: 'https://gsap-ani01.vercel.app',
  },
  {
    title: '한국교통안전공단',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_05.jpg',
    desc: 'GSAP + Lenis Scroll을 사용한 인터랙션 및 애니메이션 연출',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '30%(서브페이지8개)' },
      { label: '제작기간', value: '5일' },
    ],
    deps: [],
    link: 'http://tsmagazine.co.kr/',
  },
  {
    title: '사학연금',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_06.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    deps: [],
    link: 'https://www.tpwebzine.com',
  },
  {
    title: '삼구아이앤씨',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_07.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출 + 이벤트 페이지 디자인 지원',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '30%(서브페이지6개)' },
      { label: '제작기간', value: '5일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'GSAP scroll trigger 사용' },
      { text: '행운쿠키 클릭시 랜덤 메세지 및 애니메이션 연출' },
      { text: 'Ajax를 활용해 참가자 데이터를 받아와 민들레 fill 애니메이션 연출', link: 'https://webzine.samkoo.com/page/vol25/20.html' },
    ],
    link: 'https://webzine.samkoo.com/page/vol25/index.html',
  },
  {
    title: '방위사업청',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_08.jpg',
    desc: '퀴즈+투표 등 미니게임 구현',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'JavaScript 이벤트 핸들링을 활용한 OX퀴즈 구현', link: 'https://dapa-magazine.kr/page/vol145/event.html' },
      { text: 'JavaScript 이벤트 핸들링을 활용한 투표 구현', link: 'https://dapa-magazine.kr/page/vol145/00.html' },
    ],
    link: 'https://dapa-magazine.kr/page/vol145/index.html',
  },
  {
    title: '한국철도공사',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_09.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    deps: [],
    link: 'https://www.korailstory.com',
  },
  {
    title: '한국중부발전',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_10.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출 + 코미포 세상에 디자인 지원',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '30%(서브페이지8개)' },
      { label: '제작기간', value: '5일' },
    ],
    // prettier-ignore
    deps: [
      { text: 'FullPage Scroll 사용' },
      { text: 'JavaScript 이벤트 핸들링을 활용한 틀린그림 찾기 구현', link: 'https://komipo-webzine.co.kr/page/vol25/event.html' },
    ],
    link: 'https://komipo-webzine.co.kr/page/vol25/index.html',
  },
  {
    title: '서울특별시의회',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_11.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '50%' },
      { label: '제작기간', value: '3일' },
    ],
    deps: [],
    link: 'https://webzine.smc.seoul.kr/',
  },
  {
    title: '고용노동부',
    type: '웹 매거진',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_12.jpg',
    desc: '페이지 및 섹션별 애니메이션 연출',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
      { label: 'Php', cls: 'php' },
    ],
    rate: [
      { label: '마크업', value: '50%' },
      { label: '제작기간', value: '3일' },
    ],
    deps: [],
    link: 'https://www.labor21.kr',
  },
  {
    title: '씽크블락',
    type: '기타 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_13.jpg',
    desc: '전체 페이지 마크업 + 디자인, 일본어 번역',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    deps: [],
    link: 'http://thinkblock.co.kr',
  },
  {
    title: '벡스',
    type: '기타 웹',
    img: 'https://d3az2v3o9tyrsq.cloudfront.net/pf_14.jpg',
    desc: '전체 페이지 마크업 + 디자인, 일본어 번역',
    skills: [
      { label: 'Html', cls: 'html' },
      { label: 'Scss', cls: 'css' },
      { label: 'JavaScript', cls: 'js' },
    ],
    rate: [
      { label: '마크업', value: '100%' },
      { label: '디자인', value: '100%' },
      { label: '제작기간', value: '5일' },
    ],
    deps: [],
    link: 'https://www.vaex.info',
  },
]
