import { error } from '@sveltejs/kit'
import MockData from '../data'

export const load = ({ params }: { params: { slug: string } }) => {
  const element = MockData.uiElements.find((el) => el.slug === params.slug)

  if (!element) error(404)

  return { element }
}
