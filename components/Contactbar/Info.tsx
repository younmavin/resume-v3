import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const contactData: { href: string; icon: IconProp; label: string }[] = [
  { href: 'tel:010-9506-1006', icon: ['fas', 'phone'], label: '010-9506-1006' },
  { href: 'mailto:ddw6229@naver.com', icon: ['fas', 'envelope'], label: 'ddw6229@naver.com' },
  { href: 'https://github.com/younmavin', icon: ['fab', 'github'], label: 'https://github.com/younmavin' },
]

const Info = () => {
  return (
    <div className="info-cont cont">
      <figure>
        <div className="img-bx">
          <img src="/images/avatar.png" alt="프로필 이미지" loading="lazy" />
        </div>
        <figcaption>
          <h3>윤관호</h3>
          <p>프론트엔드 & 웹퍼블리셔</p>
          <ul>
            {contactData.map((item, i) => (
              <li key={i}>
                <Link href={item.href} target="_blank">
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn-link" href="/resume/intro">
            나의 소개 보기 <FontAwesomeIcon icon={['fas', 'arrow-right']} />
          </Link>
        </figcaption>
      </figure>
    </div>
  )
}

export default Info
