import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const sections = [
  {
    title: '경력',
    items: [
      { title: '경성문화사', date: '2023.11 ~ 2026.02' },
      { title: '제이브로 컴퍼니', date: '2022.05 ~ 2023.06' },
    ],
  },
  {
    title: '학력',
    items: [
      { title: '학점은행제(컴퓨터공학+관광학)', date: '2024.01 ~ 2026.12(졸업예정)' },
      { title: '목포대학교(간호학)', date: '2015.03 ~ 2020.06(중퇴)' },
      { title: '광주자연과학고등학교', date: '2012.03 ~ 2015.02(졸업)' },
    ],
  },
  {
    title: '자격증',
    items: [
      { title: 'JLPT N1', date: '2026.02' },
      { title: '웹디자인기능사', date: '2022.04' },
      { title: 'GTQI 1급(일러스트)', date: '2021.08' },
      { title: 'GTQ 1급(포토샵)', date: '2021.07' },
      { title: '레크리에이션 1급', date: '2014.02' },
      { title: '웃음치료사 1급', date: '2014.02' },
      { title: '펀리더쉽지도자 1급', date: '2014.02' },
    ],
  },
]

const Career = () => {
  return (
    <div className="career-cont cont">
      <figure>
        <div className="img-bx">
          <img src="https://d3az2v3o9tyrsq.cloudfront.net/avatar.png" alt="유저 프로필 사진" />
        </div>
        <figcaption>
          <h1>윤관호</h1>
          <p>프론트엔드 & 웹퍼블리셔</p>
        </figcaption>
      </figure>
      {sections.map((section) => (
        <div key={section.title} className="list">
          <h2>{section.title}</h2>
          <ul>
            {section.items.map((item, i) => (
              <li key={i}>
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    <span>{item.date}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* {section.title === '자격증' && (
            <Link className="btn-link" href="/resume/career">
              경력 기술 보기 <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </Link>
          )} */}
        </div>
      ))}
    </div>
  )
}

export default Career
