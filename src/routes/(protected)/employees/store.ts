import { page } from '$app/state'
import { writable, derived } from 'svelte/store'
import type { UserInfo } from '$lib/database/users'

export const employees = writable<UserInfo[]>(page.data?.employees || [])
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

// View detail employee
export const isNavigating = writable(false)

// Refresh employees
export const isRefreshing = writable(false)
export const refreshEmployees = async () => {
  isRefreshing.set(true)

  const response = await fetch('/api/employees')
  const result = await response.json()
  employees.set(result.data)

  isRefreshing.set(false)
}

// Toggle employee status
export const updatingId = writable<string | null>(null)

export const handleToggleStatus = async (employeeId: string, ) => {
  updatingId.set(employeeId)

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

  updatingId.set(null)
}