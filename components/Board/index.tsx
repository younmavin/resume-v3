import Guide from './Guide'
import Qna from './Qna'
import type { GuideItem } from '@/lib/notion'

const BoardGuide = ({ guides, perPage }: { guides: GuideItem[]; perPage?: number }) => {
  return (
    <>
      <Guide guides={guides} perPage={perPage} />
      <Qna perPage={perPage} />
    </>
  )
}

export default BoardGuide
