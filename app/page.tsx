import Link from 'next/link'
import { getGuideList } from '@/lib/notion'

import Personality from '@/components/Resume/Personality'
import PortfolioChart from '@/components/Portfolio/PortfolioChart'
import GitChart from '@/components/GitProject/GitChart'
import BoardGuide from '@/components/Board'

export default async function Home() {
  const res = await fetch('https://api.github.com/users/younmavin/repos', {
    next: { revalidate: 3600 },
  })
  const repos = await res.json()
  const sorted = Array.isArray(repos) ? repos.sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()) : []

  const guides = await getGuideList()

  return (
    <div className="home">
      <Personality />
      <div className="chart-wrap">
        <div className="chart-item">
          <PortfolioChart />
        </div>
        <div className="chart-item">
          <GitChart repos={sorted} />
        </div>
      </div>
      <BoardGuide guides={guides} perPage={5} />
    </div>
  )
}
