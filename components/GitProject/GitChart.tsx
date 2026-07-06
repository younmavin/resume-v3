'use client'

import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS: Record<string, string> = {
  HTML: '#d46a53',
  CSS: '#496fd4',
  JavaScript: '#dfc570',
  TypeScript: '#f1dfa2',
  Vue: '#68b876',
  React: '#82c3ca',
  기타: '#C0BDD8',
}

const GitChart = ({ repos = [] }: { repos: any[] }) => {
  const langCount: Record<string, number> = {}

  repos.forEach((repo) => {
    const lang = repo.language || '기타'
    langCount[lang] = (langCount[lang] || 0) + 1
  })

  const data = Object.entries(langCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
        {value}
      </text>
    )
  }

  return (
    <div className="git-chart cont">
      <div className="tit-wrap">
        <h5>
          깃 프로젝트 <span className="total">{repos.length}</span>
        </h5>
        <Link href="/gitproject" className="btn-link mt-0">
          전체보기 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </Link>
      </div>
      <Link className="chart-bx" href="/gitproject">
        <div className="ico">
          <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </div>
        <div className="chart-inner">
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
              <PieChart style={{ outline: 'none' }}>
                <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" labelLine={false} label={renderCustomLabel} style={{ outline: 'none' }}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS[entry.name] ?? COLORS['기타']} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={28} fontWeight={700} fill="#333">
                  {repos.length}
                </text>
                <text x="50%" y="50%" dy={20} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="#999">
                  total
                </text>
                <Tooltip active={false} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="chart-legend">
            {data.map((entry, i) => (
              <li key={i} style={{ color: '#363636' }}>
                <span className="dot" style={{ background: COLORS[entry.name] ?? COLORS['기타'] }} />
                {entry.name}
                <span className="count" style={{ color: COLORS[entry.name] ?? COLORS['기타'] }}>
                  {entry.value}개
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="deps">
          회사에서 진행한 프로젝트는 보안 정책상 비공개이며,
          <br /> 개인 프로젝트만 공개하고 있습니다.
        </p>
      </Link>
    </div>
  )
}

export default GitChart
