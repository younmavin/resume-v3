'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { portfolioData } from '@/data/portfolioData'

const COLORS: Record<string, string> = {
  '포트폴리오 웹': '#91a6f7',
  '웹 매거진': '#6a86f5',
  '기타 웹': '#9fb2f7',
}

const renderLegend = (props: any) => {
  const { payload } = props
  return (
    <ul className="chart-legend">
      {payload.map((entry: any, i: number) => (
        <li key={i}>
          <span className="dot" style={{ background: entry.color }} />
          {entry.value}
        </li>
      ))}
    </ul>
  )
}

const PortfolioChart = () => {
  // 차트는 마운트 후에만 렌더링 (recharts hydration mismatch 방지)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const typeCount: Record<string, number> = {}

  portfolioData.forEach((item) => {
    typeCount[item.type] = (typeCount[item.type] || 0) + 1
  })

  const data = Object.entries(typeCount)
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
    <div className="portfolio-chart cont">
      <div className="tit-wrap">
        <h2>
          포트폴리오 <span className="total">{portfolioData.length}</span>
        </h2>
        <Link href="/portfolio" className="btn-link mt-0">
          전체보기 <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </Link>
      </div>
      <Link className="chart-bx" href="/portfolio">
        <div className="ico">
          <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
        </div>
        <div className="chart-inner">
          <div className="chart">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
                <PieChart style={{ outline: 'none' }}>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" labelLine={false} label={renderCustomLabel} style={{ outline: 'none' }}>
                    {data.map((entry, i) => (
                      <Cell key={i} fill={COLORS[entry.name] ?? '#C0BDD8'} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={28} fontWeight={700} fill="#333">
                    {portfolioData.length}
                  </text>
                  <text x="50%" y="50%" dy={20} textAnchor="middle" dominantBaseline="middle" fontSize={12} fill="#999">
                    total
                  </text>
                  <Tooltip active={false} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <ul className="chart-legend">
            {data.map((entry, i) => (
              <li key={i} style={{ color: '#363636' }}>
                <span className="dot" style={{ background: COLORS[entry.name] ?? '#C0BDD8' }} />
                {entry.name}
                <span className="count" style={{ color: COLORS[entry.name] ?? '#C0BDD8' }}>
                  {entry.value}개
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="deps">
          실제 진행한 프로젝트는 30건 이상이지만,
          <br /> 성격이 중복되는 프로젝트와 URL이 확인되지 않는 사이트는 제외했습니다.
        </p>
      </Link>
    </div>
  )
}

export default PortfolioChart
