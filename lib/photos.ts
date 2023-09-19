export type Photos = {
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

export const GetPhoto = (): { light: string, dark: string } => {
  const n = new Date().getHours() % 3
  return {
    light: lightPhotos[n],
    dark: darkPhotos[n],
  }
}
