import * as MockUsers from '$lib/database/users'
import { json } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

// This file is used to define API routes (GET, POST, PUT, DELETE)
// Tutorial: https://svelte.dev/tutorial/kit/other-handlers
export const POST = async ({ request }: RequestEvent) => {
  const { email }  = await request.json()
  const isEmailTaken = await MockUsers.isEmailTaken(email)
  return json({ isEmailTaken, status: 200 })
}
