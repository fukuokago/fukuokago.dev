import {
  FetchDatabase,
  QueryDatabaseResponseEx,
  QueryDatabaseParameters,
} from 'notionate'

export const GetEvents = async (): Promise<QueryDatabaseResponseEx> => {
  return await FetchDatabase({
    database_id: process.env.NOTION_EVENTS_DB_ID,
    sorts: [ { property: 'Date', direction: 'descending' }, ],
  } as QueryDatabaseParameters)
}

