import { error } from '@sveltejs/kit'
import * as MockUsers from '$lib/database/users'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const employee = await MockUsers.getOneById(params.id)
    return { employee }
  } catch (e) {
    console.error(e)
    error(404)
  }
}
