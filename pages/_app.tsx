import '@/styles/globals.css'
import styles from '@/styles/App.module.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import 'rotion/style.css'
import { Poppins, Zen_Kaku_Gothic_New } from 'next/font/google'
import Icon from '@/components/icon'

const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] })
const zenkaku = Zen_Kaku_Gothic_New({ weight: '400', subsets: ['latin-ext'] })

export default function App({ Component, pageProps }: AppProps) {
  const nowYear = new Date().getFullYear()
  return (
    <>
      <div className={styles.photoLicense}>
        <Icon name="image" />
        Background photo provided by <a href="https://showcase.city.fukuoka.lg.jp/" target="_blank">Fukuoka City</a>.
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.snsNav}>
            <ul>
              <li>
                <a href="https://join.slack.com/t/fukuokago/shared_invite/enQtNDI2OTYyNjg4NTE5LWYzNzBkYTY2NjYyZjBmMTk0OWFkNTE3ZmIxYWRhOGFhMWFjYjI0ZjBhNTQ0YTY1YmUyNTQxNGEyZGE0ZjkxNjE">
                  <Icon name="slack" />
                  Join on Slack
                </a>
              </li>
              <li>
                <a href="https://github.com/fukuokago">
                  <Icon name="github" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://fukuokago.connpass.com">
                  <Icon name="compass" />
                  Connpass
                </a>
              </li>
            </ul>
          </nav>

          <h1 className={`${styles.logo} ${poppins.className}`}>
            <Link href="/">
              <Image className={styles.logoIcon} src="/static/fukuoka-gopher.svg" alt="Fukuoka.go Logo" width={200} height={202} priority />
              <span className={styles.logoText}>Fukuoka.go</span>
            </Link>
          </h1>
        </header>

        <Component {...pageProps} />

        <footer className={styles.footer}>
          <p className={poppins.className}>
            &copy; {nowYear} Fukuoka.go.{` `}
            The Go gopher was designed by <a href="http://reneefrench.blogspot.com/">Renee French</a>.{` `}
            Illustrations by <a href="https://github.com/keitakawamoto">@keitakawamoto</a>.{` `}
            Powered by Next.js and Notion with <a href="https://github.com/linyows/notionate">Notionate</a>.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --font-family-en: ${poppins.style.fontFamily};
          --font-family-ja: ${zenkaku.style.fontFamily};
        }
      `}</style>
    </>
  )
}
