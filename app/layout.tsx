import type { Metadata } from 'next'
import '@/styles/globals.scss'
import LenisProvider from '@/components/LenisProvider'
import { portfolioData } from '@/data/portfolioData'
import LayoutShell from '@/components/LayoutShell'

export const metadata: Metadata = {
  title: '포트폴리오',
  description: '웹퍼블리셔 포트폴리오',
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
