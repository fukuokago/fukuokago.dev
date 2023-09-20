import satori, { SatoriOptions } from 'satori'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import OgImage from '@/components/ogimage'
import { Buffer } from 'buffer'
import sharp from 'sharp'

const poppins = readFileSync('./lib/fonts/Poppins-SemiBold.ttf')

export const MakeOgImage = async (title: string, id: string): Promise<string> => {
  const src = `images/${id}.png`
  const path = `public/${src}`

  if (existsSync(path)) {
    return src
  }

  const options: SatoriOptions = {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Poppins',
        data: poppins,
        weight: 600,
      },
    ],
  }

  const svg = await satori(OgImage({ title }), options)
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  writeFileSync(path, png)
  console.log(`saved ogimage -- path: ${path}`)
  return src
}
