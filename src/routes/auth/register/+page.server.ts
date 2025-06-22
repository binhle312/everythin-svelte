import * as MockUsers from '$lib/database/users'
import { fail, redirect } from '@sveltejs/kit'

export const load = async () => {
  // This load function can be used to fetch any data needed for the registration page
  // For example, you might want to check if the user is already logged in
  // or fetch some initial data to display on the page.
  // In this case, we don't need to fetch any data, so we return an empty object.
  return {}
}

export const actions = {
  register: async ({ request }: { request: Request }) => {
    try {
      const data = await request.formData()

      const email    = data.get(   'email')?.toString() || ''
      const password = data.get('password')?.toString() || ''
      const fullName = data.get('fullName')?.toString() || ''

      await MockUsers.register(email, password, fullName)
    } catch (error) {
      console.error('Register failed:', error)
      let message = 'An unknown error occurred'
      if (error instanceof Error) {
        message = error.message
      }
      return fail(422, { error: { message } })
    }

    // 303 — for form actions, following a successful submission
    // 307 — for temporary redirects
    // 308 — for permanent redirects
    return redirect(303, '/auth/login')
  }
}
