import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Icon from '@/components/icon'
import 'notionate/dist/styles/notionate.css'
import {
  FetchBlocks,
  FetchDatabase,
  ListBlockChildrenResponseEx,
  QueryDatabaseResponseEx,
  QueryDatabaseParameters,
  RichTextItemResponse,
  SelectPropertyResponse,
  PersonUserObjectResponseEx,
  PageObjectResponseEx,
  DBPageBase,
  Link as NLink,
} from 'notionate'
import {
  Blocks,
  Table,
} from 'notionate/dist/components'

type Props = {
  about: ListBlockChildrenResponseEx,
  coc: ListBlockChildrenResponseEx,
  eve: ListBlockChildrenResponseEx,
  team: ListBlockChildrenResponseEx,
  events: QueryDatabaseResponseEx,
  members: Member[],
}

type Member = {
  id: string
  name: string
  avatar: string | null
  x: string | null
  github: string | null
  website: string | null
}

type DBPropsMembers = DBPageBase & {
  properties: {
    Name: {
      type: "title"
      title: RichTextItemResponse[]
      id: string
    }
    'Joined at': {
      type: "date"
      select: SelectPropertyResponse
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

const getContent = async (title: string): Promise<ListBlockChildrenResponseEx> => {
  const { results } = await FetchDatabase({
    database_id: process.env.NOTION_CONTENTS_DB_ID,
  } as QueryDatabaseParameters)
  const page = results.find(v => {
    const p = v as DBPropsMembers
    return p.properties.Name.title.map(v => v.plain_text).join(',') === title
  }) as PageObjectResponseEx
  return await FetchBlocks(page.id, page.last_edited_time)
}

const getMembers = async (): Promise<Member[]> => {
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
      website: props.Website.url,
    } as Member
  })
}

const getEvents = async (): Promise<QueryDatabaseResponseEx> => {
  return await FetchDatabase({
    database_id: process.env.NOTION_EVENTS_DB_ID,
    sorts: [ { property: 'Date', direction: 'descending' }, ],
  } as QueryDatabaseParameters)
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await getContent('About')
  const coc = await getContent('Code of Conduct')
  const eve = await getContent('Events')
  const team = await getContent('Team')
  const events = await getEvents()
  const members = await getMembers()

  return {
    props: {
      about,
      coc,
      eve,
      team,
      events,
      members,
    }
  }
}

export default function Home({ about, coc, eve, team, events, members }: Props) {
  return (
    <>
      <Head>
        <title>Fukuoka.go - A gopher community in Fukuoka</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.aboutus}>
          <Blocks blocks={about} />
        </div>

        <div className={`notionate-table-home ${styles.events}`}>
          <h2>Events</h2>
          <div className={styles.blocks}>
            <Blocks blocks={eve} />
          </div>
          <Table keys={['Name', 'Date', 'Speakers', 'Participant', 'Link', 'Venue']} db={events} href={''} link={Link as NLink} />
        </div>

        <div className={styles.members}>
          <h2>Team</h2>
          <div className={styles.blocks}>
            <Blocks blocks={team} />
          </div>
          <div className={styles.memberCards}>
          {members.map((m, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.cardGo}>
                <Icon name="go" />
              </div>
              {m.avatar && <div className={styles.avatar}>
                <Image src={m.avatar} fill={true} alt={m.name} />
              </div>}
              <h3>{m.name}</h3>
              <ul className={styles.linkIcons}>
                {m.x && <li className={styles.icon}>
                  <a href={m.x}>
                    <Icon name="x" />
                  </a>
                </li>}
                {m.github && <li className={styles.icon}>
                  <a href={m.github}>
                    <Icon name="github" />
                  </a>
                </li>}
                {m.website && <li className={styles.icon}>
                  <a href={m.website}>
                    <Icon name="globe" />
                  </a>
                </li>}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className={styles.coc}>
          <h2>Code of Conduct</h2>
          <div className={styles.blocks}>
            <Blocks blocks={coc} />
          </div>
        </div>
      </main>
    </>
  )
}
