import { cookies } from 'next/headers'
import { getOverviewStats, getPageViewsTrend, getFirstUserSource, getSessionsBySourceMedium, getNewVsReturning, getActiveUsersByCity } from '@/lib/ga4'
import AdminDashboardClient from './AdminDashboardClient'
import AdminLoginGate from './AdminLoginGate'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthed = cookieStore.get('admin_auth')?.value === process.env.ADMIN_SECRET

  if (!isAuthed) {
    return <AdminLoginGate />
  }

  const [overview, pageTrend, firstUserSource, sessionsBySource, newVsReturning, byCity] = await Promise.all([getOverviewStats(), getPageViewsTrend(), getFirstUserSource(), getSessionsBySourceMedium(), getNewVsReturning(), getActiveUsersByCity()])

  const updatedAt = new Date().toISOString()

  return <AdminDashboardClient overview={overview} pageTrend={pageTrend} firstUserSource={firstUserSource} sessionsBySource={sessionsBySource} newVsReturning={newVsReturning} byCity={byCity} updatedAt={updatedAt} />
}
