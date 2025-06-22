import { redirect } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const load = async ({ cookies, url }: RequestEvent) => {
  const token = cookies.get('token')

  const isAuthPath = url.pathname.startsWith('/auth')
  if (token && isAuthPath) {
    // If the user is authenticated and trying to access an auth path, redirect them to the home page
    redirect(307, '/')
  } else if (!token && !isAuthPath) {
    // If the user is not authenticated and trying to access a non-auth path, redirect them
    redirect(307, '/auth/login')
  }

  return { isNotLoggedIn: !token}
}
