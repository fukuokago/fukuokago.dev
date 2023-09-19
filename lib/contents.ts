import { DBPropsMembers } from '@/lib/members'
import {
  FetchBlocks,
  FetchDatabase,
  ListBlockChildrenResponseEx,
  QueryDatabaseParameters,
  PageObjectResponseEx,
} from 'notionate'

export const GetContent = async (title: string): Promise<ListBlockChildrenResponseEx> => {
  const { results } = await FetchDatabase({
    database_id: process.env.NOTION_CONTENTS_DB_ID,
  } as QueryDatabaseParameters)
  const page = results.find(v => {
    const p = v as DBPropsMembers
    return p.properties.Name.title.map(v => v.plain_text).join(',') === title
  }) as PageObjectResponseEx
  return await FetchBlocks(page.id, page.last_edited_time)
}

