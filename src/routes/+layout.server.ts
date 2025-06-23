import { redirect } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const load = async ({ locals, url }: RequestEvent) => {
  const user = locals.user

  const isNotLoggedIn = !user
  const isAuthPath = /^\/auth\//.test(url.pathname)

  if (!isNotLoggedIn && isAuthPath) {
    // If the user is authenticated and trying to access an auth path, redirect them to the home page
    redirect(307, '/')
  } else if (isNotLoggedIn && !isAuthPath) {
    // If the user is not authenticated and trying to access a non-auth path, redirect them to the login page
    redirect(307, '/auth/login')
  }

  return { user }
}
