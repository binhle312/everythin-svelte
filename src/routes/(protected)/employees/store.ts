import { writable, derived } from 'svelte/store'
import type { UserInfo } from '$lib/database/users'

export const employees = writable<UserInfo[]>([])
export const searchTerm = writable('')
export const statusFilter = writable<'all' | 'active' | 'inactive'>('all')

export const statsTotal = derived(employees, $employees => $employees.length)
export const statsActive = derived(employees, $employees => $employees.filter(employee => employee.status === 'active').length)
export const statsInactive = derived(employees, $employees => $employees.filter(employee => employee.status === 'inactive').length)
export const filteredEmployees = derived([employees, searchTerm, statusFilter], ([$employees, $searchTerm, $statusFilter]) =>
  $employees.filter(employee => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes($searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes($searchTerm.toLowerCase())

    const matchesStatus = $statusFilter === 'all' || employee.status === $statusFilter

    return matchesSearch && matchesStatus
  })
)

// Refresh employees
export const isRefreshing = writable(false)
export const refreshEmployees = async () => {
  isRefreshing.set(true)

  const response = await fetch('/api/employees')
  const result = await response.json()
  employees.set(result.data)

  isRefreshing.set(false)
}

// View detail employee
export const navigatingId = writable<string | null>(null)
export const toggleNavigating = (employeeId: string | null) => {
  navigatingId.set(employeeId)
}

// Update employee status
export const updatingId = writable<{[index: string]: boolean} | null>({})
export const handleToggleStatus = async (employeeId: string, ) => {
  updatingId.update(current => ({ ...(current ?? {}), [employeeId]: true }))

  const response = await fetch(`/api/employee/${employeeId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  })

  const result = await response.json()

  if (response.status === 200) {
    const updatedEmployee = result.data

    // Update the employees
    employees.update(employees => {
      return employees.map(user => user.id === updatedEmployee.id ? updatedEmployee : user)
    })
  }

  // Remove the loading state for this specific employee
  updatingId.update(current => {
    const updated = { ...(current ?? {}) }
    delete updated[employeeId]
    return updated
  })
}