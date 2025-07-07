import * as MockUsers from '$lib/database/users'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const employees = await MockUsers.getAll()

  return { employees }
}
