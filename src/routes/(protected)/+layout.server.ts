import { redirect } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const load = async ({ locals }: RequestEvent) => {
  if (!locals.user) throw redirect(302, '/auth/login')

  return { user: locals.user }
}
