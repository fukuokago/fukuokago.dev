import '@/styles/globals.css'
import styles from '@/styles/App.module.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import 'notionate/dist/styles/notionate.css'
import 'notionate/dist/styles/notionate-dark.css'
import { Poppins, Zen_Kaku_Gothic_New } from 'next/font/google'
import Icon from '@/components/icon'

type Photos = {
  light: string,
  dark: string,
}

const lightPhotos: string[] = [
  '/light/pink-flowers.jpg',
  '/light/yellow-flowers.jpg',
  '/light/green-valley.jpg',
]
const darkPhotos: string[] = [
  '/dark/rocks.jpg',
  '/dark/weave.jpg',
  '/dark/shine.jpg',
]
const getPhoto = (): { light: string, dark: string } => {
  const n = new Date().getHours() % 3
  return {
    light: lightPhotos[n],
    dark: darkPhotos[n],
  }
}

const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] })
const zenkaku = Zen_Kaku_Gothic_New({ weight: '400', subsets: ['latin-ext'] })
const getStyles = ({ light, dark }: Photos): string => {
  return `
:root {
  --font-family-en: ${poppins.style.fontFamily};
  --font-family-ja: ${zenkaku.style.fontFamily};
}
body { background-image: url(/static${light}); }
@media (prefers-color-scheme: dark) {
  body { background-image: url(/static${dark}); }
}
`}

export default function App({ Component, pageProps }: AppProps) {
  const css = getStyles(getPhoto())
  return (
    <>
      <div className={styles.photoLicense}>
        <Icon name="image" />
        Background photo provided by <a href="https://showcase.city.fukuoka.lg.jp/" target="_blank">Fukuoka City</a>.
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={`${styles.logo} ${poppins.className}`}>
            <Link href="/">
              <Image className={styles.logoIcon} src="/static/fukuoka-gopher.svg" alt="Fukuoka.go Logo" width={200} height={202} priority />
              <span className={styles.logoText}>Fukuoka.go</span>
            </Link>
          </h1>

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
        </header>

        <Component {...pageProps} />

        <footer className={styles.footer}>
          <p className={poppins.className}>
            &copy; Fukuoka.go. The Go gopher was designed by <a href="http://reneefrench.blogspot.com/">Renee French</a>.
            Illustrations by <a href="https://github.com/keitakawamoto">@keitakawamoto</a>
          </p>
        </footer>

        <style jsx global>{css}</style>
      </div>
    </>
  )
}
