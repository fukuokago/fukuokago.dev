import {
  FetchDatabase,
  QueryDatabaseParameters,
  PersonUserObjectResponseEx,
  SelectPropertyResponse,
  RichTextItemResponse,
  DBPageBase,
} from 'notionate'

export type Fact = {
  id: string,
  name: string,
  number: number,
  unit: string,
  description: RichTextItemResponse[],
  icon: string,
}

export type DBPropsFacts = DBPageBase & {
  properties: {
    Name: {
      type: "title"
      title: RichTextItemResponse[]
      id: string
    }
    Number: {
      type: "number"
      number: number
      id: string
    }
    Unit: {
      type: "rich_text"
      rich_text: RichTextItemResponse[]
      id: string
    }
    Description: {
      type: "rich_text"
      rich_text: RichTextItemResponse[]
      id: string
    }
    Icon: {
      type: "select"
      select: SelectPropertyResponse
      id: string
    }
  }
}

export const GetFacts = async (): Promise<Fact[]> => {
  const { results } = await FetchDatabase({
    database_id: process.env.NOTION_FACTS_DB_ID,
    sorts: [ { property: 'ID', direction: 'ascending' }, ],
  } as QueryDatabaseParameters)

  return results.map(v => {
    const props = (v as DBPropsFacts).properties
    return {
      id: v.id,
      name: props.Name.title.map(v => v.plain_text).join(',') || '',
      number: props.Number.number,
      unit: props.Unit.rich_text.map(v => v.plain_text).join(',') || '',
      description: props.Description.rich_text,
      icon: props.Icon.select.name,
    } as Fact
  })
}
