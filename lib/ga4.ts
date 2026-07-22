// lib/ga4.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const PROPERTY_ID = process.env.GA_PROPERTY_ID
const DATE_RANGE = { startDate: '28daysAgo', endDate: 'today' }

// 상단 4개 지표: 활성 사용자 / 새 사용자 수 / 활성 사용자당 평균 참여 시간 / 이벤트 수
export async function getOverviewStats() {
  // 28일 누적 지표
  const [totalResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'userEngagementDuration' }, { name: 'eventCount' }],
  })

  const totalRow = totalResponse.rows?.[0]
  const activeUsers = Number(totalRow?.metricValues?.[0].value ?? 0)
  const newUsers = Number(totalRow?.metricValues?.[1].value ?? 0)
  const engagementDuration = Number(totalRow?.metricValues?.[2].value ?? 0)
  const eventCount = Number(totalRow?.metricValues?.[3].value ?? 0)

  const avgSeconds = activeUsers ? Math.round(engagementDuration / activeUsers) : 0
  const minutes = Math.floor(avgSeconds / 60)
  const seconds = avgSeconds % 60

  // 오늘 vs 어제 증감
  const [diffResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [
      { startDate: 'today', endDate: 'today', name: 'today' },
      { startDate: 'yesterday', endDate: 'yesterday', name: 'yesterday' },
    ],
    metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'eventCount' }],
  })

  const diffRows = diffResponse.rows ?? []
  const today = diffRows.find((r) => r.dimensionValues?.[0].value === 'today')
  const yesterday = diffRows.find((r) => r.dimensionValues?.[0].value === 'yesterday')

  const todayActiveUsers = Number(today?.metricValues?.[0].value ?? 0)
  const todayNewUsers = Number(today?.metricValues?.[1].value ?? 0)
  const todayEventCount = Number(today?.metricValues?.[2].value ?? 0)

  const yesterdayActiveUsers = Number(yesterday?.metricValues?.[0].value ?? 0)
  const yesterdayNewUsers = Number(yesterday?.metricValues?.[1].value ?? 0)
  const yesterdayEventCount = Number(yesterday?.metricValues?.[2].value ?? 0)

  return {
    activeUsers,
    activeUsersDiff: todayActiveUsers - yesterdayActiveUsers,
    newUsers,
    newUsersDiff: todayNewUsers - yesterdayNewUsers,
    avgEngagementTime: `${minutes}분 ${seconds}초`,
    eventCount,
    eventCountDiff: todayEventCount - yesterdayEventCount,
  }
}

// 인기 페이지/화면: 상위 4개 페이지의 일자별 조회수 추이 (멀티라인)
export async function getPageViewsTrend() {
  const [topResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 4,
  })

  const topPages = topResponse.rows?.map((r) => r.dimensionValues?.[0].value ?? '') ?? []

  if (topPages.length === 0) return { pages: [], data: [] }

  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'date' }, { name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        inListFilter: { values: topPages },
      },
    },
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  })

  const dateMap = new Map<string, Record<string, number>>()

  response.rows?.forEach((row) => {
    const date = row.dimensionValues?.[0].value ?? ''
    const page = row.dimensionValues?.[1].value ?? ''
    const views = Number(row.metricValues?.[0].value ?? 0)

    if (!dateMap.has(date)) dateMap.set(date, {})
    dateMap.get(date)![page] = views
  })

  const data = Array.from(dateMap.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, values]) => ({
      date,
      ...Object.fromEntries(topPages.map((p) => [p, values[p] ?? 0])),
    }))

  return { pages: topPages, data }
}

// 첫 사용자 소스/매체별 활성 사용자
export async function getFirstUserSource() {
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'firstUserSourceMedium' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 5,
  })

  return (
    response.rows?.map((row) => ({
      source: row.dimensionValues?.[0].value ?? '',
      users: Number(row.metricValues?.[0].value),
    })) ?? []
  )
}

// 세션 소스/매체별 세션수
export async function getSessionsBySourceMedium() {
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'sessionSourceMedium' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 6,
  })

  return (
    response.rows?.map((row) => ({
      source: row.dimensionValues?.[0].value ?? '',
      sessions: Number(row.metricValues?.[0].value),
    })) ?? []
  )
}

// 신규 사용자 대 재방문자 (일자별 라인차트)
export async function getNewVsReturning() {
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'date' }, { name: 'newVsReturning' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  })

  const dateMap = new Map<string, { new: number; returning: number }>()

  response.rows?.forEach((row) => {
    const date = row.dimensionValues?.[0].value ?? ''
    const type = row.dimensionValues?.[1].value ?? ''
    const users = Number(row.metricValues?.[0].value ?? 0)

    if (!dateMap.has(date)) dateMap.set(date, { new: 0, returning: 0 })
    if (type === 'new') dateMap.get(date)!.new = users
    if (type === 'returning') dateMap.get(date)!.returning = users
  })

  return Array.from(dateMap.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, values]) => ({ date, ...values }))
}

// 시/군/구별 활성 사용자
export async function getActiveUsersByCity() {
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    dimensions: [{ name: 'city' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 5,
  })

  return (
    response.rows?.map((row) => ({
      city: row.dimensionValues?.[0].value ?? '',
      users: Number(row.metricValues?.[0].value),
    })) ?? []
  )
}

// 사이드바 표시용 - 28일 활성 사용자 수
export async function getActiveUsersTotal() {
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [DATE_RANGE],
    metrics: [{ name: 'activeUsers' }],
  })

  return Number(response.rows?.[0]?.metricValues?.[0].value ?? 0)
}
