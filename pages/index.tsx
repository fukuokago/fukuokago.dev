import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Icon from '@/components/icon'
import { GetPhoto } from '@/lib/photos'
import { GetEvents } from '@/lib/events'
import { GetMembers, Member } from '@/lib/members'
import { GetFacts, Fact } from '@/lib/facts'
import { GetContent } from '@/lib/contents'
import { MakeOgImage } from '@/lib/ogimage'
import {
  ListBlockChildrenResponseEx,
  QueryDatabaseResponseEx,
  Link as NLink,
} from 'notionate'
import {
  Blocks,
  TextBlock,
  Table,
} from 'notionate/dist/components'

type Props = {
  about: ListBlockChildrenResponseEx,
  coc: ListBlockChildrenResponseEx,
  eve: ListBlockChildrenResponseEx,
  team: ListBlockChildrenResponseEx,
  events: QueryDatabaseResponseEx,
  members: Member[],
  facts: Fact[],
  ogimage: string,
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const about = await GetContent('About')
  const coc = await GetContent('Code of Conduct')
  const eve = await GetContent('Events')
  const team = await GetContent('Team')
  const events = await GetEvents()
  const members = await GetMembers()
  const facts = await GetFacts()
  const ogimage = await MakeOgImage('', 'home')

  return {
    props: {
      about,
      coc,
      eve,
      team,
      events,
      members,
      facts,
      ogimage,
    }
  }
}

export default function Home({ about, coc, eve, team, events, members, facts, ogimage }: Props) {
  const { light, dark } = GetPhoto()
  const title = 'Fukuoka.go - A gopher community in Fukuoka'
  const desc = 'fmt.Println("Hello, 世界")'
  const url = 'https://fukuokago.dev'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:image" content={`${url}/${ogimage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@fukuokago" />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={`${url}/${ogimage}`} />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={url} />
      </Head>

      <main className={`fukuokago ${styles.main}`}>
        <div className={styles.aboutus}>
          <Blocks blocks={about} />
        </div>

        <div className={styles.facts}>
          <div className={styles.factCards}>
            {facts.map((f, i) => (
              <div className={styles.factCard} key={i}>
                <div>
                  <span className={styles.factName}>
                    <Icon name={f.icon} />{` `}
                    {f.name}
                  </span>
                  <span className={styles.factNumber}>{f.number}</span>
                  <span className={styles.factUnit}>{f.unit}</span>
                </div>
                <div className={styles.factDesc}>
                  <TextBlock tag="span" block={f.description} />
                </div>
              </div>
            ))}
          </div>
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
            <div className={styles.memberCard} key={i}>
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

      <style jsx global>{`
        body { background-image: url(/static${light}); }
        @media (prefers-color-scheme: dark) {
          body { background-image: url(/static${dark}); }
        }
      `}</style>
    </>
  )
}
