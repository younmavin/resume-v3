import type { Metadata } from 'next'
import '@/styles/globals.scss'
import LenisProvider from '@/components/LenisProvider'
import { portfolioData } from '@/data/portfolioData'
import LayoutShell from '@/components/LayoutShell'

// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://resume-v3-nine.vercel.app'),
  title: {
    default: '윤관호 | 프론트엔드 & 웹퍼블리셔',
    template: '%s | 윤관호 포트폴리오',
  },
  description: '프론트엔드 & 웹퍼블리셔 윤관호의 포트폴리오.',
  keywords: ['프론트엔드', '웹퍼블리셔', '포트폴리오', 'Next.js', 'React', '윤관호'],
  openGraph: {
    title: '윤관호 | 프론트엔드 & 웹퍼블리셔',
    description: '프론트엔드 & 웹퍼블리셔 포트폴리오',
    url: 'https://resume-v3-nine.vercel.app',
    siteName: '윤관호 포트폴리오',
    images: [
      {
        url: 'https://d3az2v3o9tyrsq.cloudfront.net/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch('https://api.github.com/users/younmavin/repos', {
    next: { revalidate: 3600 },
  })
  const repos = await res.json()

  const portfolioTotal = portfolioData.length
  const portfolioCounts = portfolioData.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const gitTotal = repos.length
  const gitCounts = repos.reduce((acc: Record<string, number>, repo: any) => {
    const lang = repo.language || '기타'
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})

  return (
    <html lang="ko">
      <body>
        <LenisProvider>
          <LayoutShell portfolioTotal={portfolioTotal} portfolioCounts={portfolioCounts} gitTotal={gitTotal} gitCounts={gitCounts}>
            {children}
          </LayoutShell>
        </LenisProvider>
      </body>
    </html>
  )
}
