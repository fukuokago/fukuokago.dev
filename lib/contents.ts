import {
  FetchBlocks,
  FetchDatabase,
  ListBlockChildrenResponseEx,
  QueryDatabaseParameters,
  PageObjectResponseEx,
  RichTextItemResponse,
  DBPageBase,
} from 'rotion'

export type DBPropsMembers = DBPageBase & {
  properties: {
    Name: {
      type: 'title',
      title: RichTextItemResponse[],
    }
  }
}

export const GetContent = async (title: string): Promise<ListBlockChildrenResponseEx> => {
  const { results } = await FetchDatabase({
    database_id: process.env.NOTION_CONTENTS_DB_ID,
  } as QueryDatabaseParameters)

  const page = results.find(v => {
    const p = v as unknown as DBPropsMembers
    return p.properties.Name.title.map(v => v.plain_text).join(',') === title
  }) as PageObjectResponseEx

  return await FetchBlocks({ block_id: page.id, last_edited_time: page.last_edited_time })
}

