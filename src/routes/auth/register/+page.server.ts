import * as MockUsers from '$lib/server/users'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
  register: async ({ request }: { request: Request }) => {
    console.log('Register action called')
    try {
      const data = await request.formData()

      const email    = data.get(   'email')?.toString() || ''
      const password = data.get('password')?.toString() || ''
      const fullName = data.get('fullName')?.toString() || ''

      await MockUsers.register(email, password, fullName)

      // 303 — for form actions, following a successful submission
      // 307 — for temporary redirects
      // 308 — for permanent redirects
      return redirect(303, '/auth/login')
    } catch (error) {
      console.error('Register failed:', error)
      let message = 'An unknown error occurred'
      if (error instanceof Error) {
        message = error.message
      }
      return fail(422, { error: { message } })
    }
  }
}
