import { json } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const POST = async ({ cookies, locals }: RequestEvent) => {
  locals.user = null // Clear the user from locals
  cookies.delete('token', { path: '/' }) // Remove the token cookie
  return json({ status: 200 })
}
