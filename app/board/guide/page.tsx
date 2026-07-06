// app/board/guide/page.tsx
import Guide from '@/components/Board/Guide'
import { getGuideList } from '@/lib/notion'

export default async function GuidePage() {
  const guides = await getGuideList()

  return (
    <div className="board">
      <Guide guides={guides} perPage={10} />
    </div>
  )
}
