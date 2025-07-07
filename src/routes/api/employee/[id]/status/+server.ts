import { json, fail } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import * as MockUsers from '$lib/database/users'

export const PUT = async ({ params, cookies }: RequestEvent) => {
  try {
    await MockUsers.verifyToken(cookies.get('token') as string)
    const employee = await MockUsers.toggleStatus(params.id as string)
    return json({ status: 200, data: employee })
  } catch (error) {
    return fail(500, { error })
  }
}
