import type { RequestEvent } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { randomSleep } from '$lib/helpers/delay'

export const load = async ({ locals }: RequestEvent) => {
  await randomSleep()

  if (!locals.user) throw redirect(302, '/auth/login')

  return { user: locals.user }
}
