import * as MockUsers from '$lib/database/users'
import { fail } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, cookies }: RequestEvent) => {
    try {
      const data = await request.formData()

      const email      = data.get(     'email')?.toString() || ''
      const password   = data.get(  'password')?.toString() || ''
      const rememberMe = data.get('rememberMe') === 'on'

      const token = await MockUsers.login(email, password)

      // Note: If 'rememberMe' is not checked, the cookie will be a session cookie.
      // However, some browsers (e.g., Microsoft Edge with "Continue where you left off" enabled)
      // may restore session cookies after closing and reopening the browser,
      // causing users to remain logged in unexpectedly.
      cookies.set('token', token, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined // 30 days if remember me is checked
      })
    } catch (error) {
      console.error('Login failed:', error)
      let message = 'An unknown error occurred'
      if (error instanceof Error) {
        message = error.message
      }
      return fail(422, { error: { message } })
    }

    return { success: true }
  }
}
