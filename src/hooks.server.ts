import type { Handle } from '@sveltejs/kit'
import * as MockUser from '$lib/database/users'

const extractUserFromToken = async (token?: string) => {
  if (!token) return null

  try {
    const user = await MockUser.verifyToken(token)
    return user
  } catch {
    // If this failes, we assume the token is invalid or expired
    return null
  }
}

// Hook will be triggered on every request to server
export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token')

  console.log(`Hook is being triggered [path=${event.url.pathname}, token=${(token || '').slice(-9)}]`)

  const user = await extractUserFromToken(token)
  event.locals.user = user

  return resolve(event)
}
