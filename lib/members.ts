import {
  FetchDatabase,
  QueryDatabaseParameters,
  PersonUserObjectResponseEx,
  DateResponse,
  RichTextItemResponse,
  DBPageBase,
} from 'notionate'

export type Member = {
  id: string
  name: string
  avatar: string | null
  x: string | null
  github: string | null
  dribbble: string | null
  website: string | null
}

export type DBPropsMembers = DBPageBase & {
  properties: {
    Name: {
      type: "title"
      title: RichTextItemResponse[]
      id: string
    }
    'Joined at': {
      type: "date"
      date: DateResponse | null
      id: string
    }
    X: {
      type: "url"
      url: string | null
      id: string
    }
    GitHub: {
      type: "url"
      url: string | null
      id: string
    }
    Dribbble: {
      type: "url"
      url: string | null
      id: string
    }
    Website: {
      type: "url"
      url: string | null
      id: string
    }
    Person: {
      type: "people"
      people: PersonUserObjectResponseEx[]
      id: string
    }
    Published: {
      type: "checkbox"
      checkbox: boolean
      id: string
    }
  }
}

export const GetMembers = async (): Promise<Member[]> => {
  const { results } = await FetchDatabase({
    database_id: process.env.NOTION_MEMBERS_DB_ID,
    filter: { property: 'Published', checkbox: { equals: true }, },
    sorts: [ { property: 'Joined at', direction: 'descending' }, ],
  } as QueryDatabaseParameters)

  return results.map(v => {
    const props = (v as DBPropsMembers).properties
    return {
      id: v.id,
      name: props.Name.title.map(v => v.plain_text).join(',') || '',
      avatar: props.Person.people.length > 0 ? props.Person.people.map(v => v.avatar)[0] : null,
      x: props.X.url,
      github: props.GitHub.url,
      dribbble: props.Dribbble.url,
      website: props.Website.url,
    } as Member
  })
}
