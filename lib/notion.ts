import { Client } from '@notionhq/client'
import { unstable_cache } from 'next/cache'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export type GuideItem = {
  id: string
  title: string
  sub: string
  date: string
  url: string
}

async function fetchGuideList(): Promise<GuideItem[]> {
  try {
    const db: any = await notion.databases.retrieve({
      database_id: process.env.NOTION_GUIDE_DB_ID!,
    })
    const dataSourceId = db.data_sources?.[0]?.id

    if (!dataSourceId) {
      console.error('데이터 소스를 찾을 수 없습니다.')
      return []
    }

    const res: any = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [{ property: '업로드일', direction: 'descending' }],
    })

    return res.results.map((page: any) => {
      const props = page.properties
      return {
        id: page.id,
        title: props['제목']?.title?.[0]?.plain_text ?? '제목 없음',
        sub: props['설명']?.rich_text?.[0]?.plain_text ?? '',
        date: (props['업로드일']?.date?.start ?? '').replace(/-/g, '.'),
        url: props['URL']?.url ?? page.public_url ?? page.url,
      }
    })
  } catch (e: any) {
    console.error('Notion 에러:', e.code, e.message)
    return []
  }
}

export const getGuideList = unstable_cache(
  fetchGuideList,
  ['notion-guide-list'],
  { revalidate: 3600 }, // 1시간 캐시
)
