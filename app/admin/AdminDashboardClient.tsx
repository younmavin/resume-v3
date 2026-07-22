'use client'

import { useRouter } from 'next/navigation'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '@/lib/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
type Overview = {
  activeUsers: number
  activeUsersDiff: number
  newUsers: number
  newUsersDiff: number
  avgEngagementTime: string
  eventCount: number
  eventCountDiff: number
}
type PageTrend = { pages: string[]; data: Record<string, number | string>[] }
type SourceUsers = { source: string; users: number }
type SourceSessions = { source: string; sessions: number }
type NewVsReturning = { date: string; new: number; returning: number }
type CityUsers = { city: string; users: number }

const LINE_COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899']

function formatDate(raw: string) {
  return `${raw.slice(4, 6)}.${raw.slice(6, 8)}`
}
function DiffBadge({ value }: { value: number }) {
  if (value === 0) {
    return <span className="diff zero">+0</span>
  }
  const isUp = value > 0
  return (
    <span className={`diff ${isUp ? 'up' : 'down'}`}>
      {isUp ? '+' : ''}
      {value.toLocaleString()}
    </span>
  )
}
function formatUpdatedAt(iso: string) {
  const date = new Date(iso)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}.${m}.${d} ${h}:${min} 기준`
}

export default function AdminDashboardClient({ overview, pageTrend, firstUserSource, sessionsBySource, newVsReturning, byCity, updatedAt }: { overview: Overview; pageTrend: PageTrend; firstUserSource: SourceUsers[]; sessionsBySource: SourceSessions[]; newVsReturning: NewVsReturning[]; byCity: CityUsers[]; updatedAt: string }) {
  const router = useRouter()

  const trendData = pageTrend.data.map((d) => ({
    ...d,
    date: formatDate(String(d.date)),
  }))

  const newVsReturningData = newVsReturning.map((d) => ({
    ...d,
    date: formatDate(d.date),
  }))

  return (
    <div className="admin">
      <div className="cont">
        <div className="tit-wrap">
          <h2>
            방문자 분석
            <small>최근 28일</small>
          </h2>
          <div className="btn-wrap">
            <span className="updated-at">{formatUpdatedAt(updatedAt)}</span>
            <button type="button" className="btn-refresh btn-link" onClick={() => router.refresh()}>
              <FontAwesomeIcon icon={['fas', 'arrow-rotate-right']} /> 새로고침
            </button>
          </div>
        </div>

        <div className="stat-wrap">
          <div className="stat-item">
            <p className="label">활성 사용자</p>
            <p className="value">
              {overview.activeUsers}
              <DiffBadge value={overview.activeUsersDiff} />
            </p>
          </div>
          <div className="stat-item">
            <p className="label">새 사용자 수</p>
            <p className="value">
              {overview.newUsers}
              <DiffBadge value={overview.newUsersDiff} />
            </p>
          </div>
          <div className="stat-item">
            <p className="label">활성 사용자당 평균 참여 시간</p>
            <p className="value">{overview.avgEngagementTime}</p>
          </div>
          <div className="stat-item">
            <p className="label">이벤트 수</p>
            <p className="value">
              {overview.eventCount.toLocaleString()}
              <DiffBadge value={overview.eventCountDiff} />
            </p>
          </div>
        </div>

        <div className="main-wrap">
          <div className="chart-bx">
            <div className="tit-wrap">
              <h2>인기 페이지/화면</h2>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                {pageTrend.pages.map((page, i) => (
                  <Line key={page} type="monotone" dataKey={page} name={page} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <ul className="legend">
              {pageTrend.pages.map((page, i) => (
                <li key={page}>
                  <span className="dot" style={{ backgroundColor: LINE_COLORS[i % LINE_COLORS.length] }} />
                  {page}
                </li>
              ))}
            </ul>
          </div>

          <div className="list-bx">
            <div className="tit-wrap">
              <h2>첫 사용자 소스/매체별 활성 사용자</h2>
            </div>
            <div className="list-head">
              <span>소스/매체</span>
              <span>활성 사용자</span>
            </div>
            {firstUserSource.map((s) => (
              <div className="list-row" key={s.source}>
                <span className="path">{s.source}</span>
                <span className="value">{s.users}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="list-wrap">
          <div className="list-bx">
            <div className="tit-wrap">
              <h2>세션 소스/매체별 세션수</h2>
            </div>
            <div className="list-head">
              <span>세션 소스/매체</span>
              <span>세션수</span>
            </div>
            {sessionsBySource.map((s) => (
              <div className="list-row" key={s.source}>
                <span className="path">{s.source}</span>
                <span className="value">{s.sessions}</span>
              </div>
            ))}
          </div>

          <div className="chart-bx">
            <div className="tit-wrap">
              <h2>신규 사용자 대 재방문자</h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={newVsReturningData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="new" name="신규" stroke="#4f46e5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="returning" name="재방문" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <ul className="legend">
              <li>
                <span className="dot" style={{ backgroundColor: '#4f46e5' }} />
                신규
              </li>
              <li>
                <span className="dot" style={{ backgroundColor: '#22c55e' }} />
                재방문
              </li>
            </ul>
          </div>

          <div className="list-bx">
            <div className="tit-wrap">
              <h2>시/군/구별 활성 사용자</h2>
            </div>
            <div className="list-head">
              <span>시/군/구</span>
              <span>활성 사용자</span>
            </div>
            {byCity.map((c) => (
              <div className="list-row" key={c.city}>
                <span>{c.city}</span>
                <span className="value">{c.users}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
