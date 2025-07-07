import { json, fail } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import * as MockUsers from '$lib/database/users'

export const GET = async ({ cookies }: RequestEvent) => {
  try {
    await MockUsers.verifyToken(cookies.get('token') as string)
    const employees = await MockUsers.getAll()
    return json({ status: 200, data: employees })
  } catch (error) {
    return fail(500, { error })
  }
}
