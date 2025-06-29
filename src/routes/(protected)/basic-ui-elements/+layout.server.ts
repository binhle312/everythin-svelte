import { PAGES } from '$lib/constants/page.constant'
import type { LayoutServerLoad } from './$types'


export const load: LayoutServerLoad = async ({ url }) => {
  const pageInformation = Object.values(PAGES).find(p => p.path === url.pathname)

  return { pageInformation }
}
