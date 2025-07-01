<script lang="ts">
  import { page } from '$app/state'
  import type { UserInfo } from '$lib/database/users'
  import Avatar from '$lib/components/Avatar.svelte'

  const users: UserInfo[] = page.data.users || []
  let searchTerm = ''
  let statusFilter = 'all'

  // Computed filtered users
  $: filteredUsers = users.filter(user => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Statistics
  $: stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length
  }

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    // Here you would typically call an API to toggle the status
    console.log(`Toggling status for user ${userId} from ${currentStatus}`)
    alert(`This would toggle the user status from ${currentStatus} to ${currentStatus === 'active' ? 'inactive' : 'active'}`)
  }
</script>

<!-- Page Header with Statistics -->
<div class="row">
  <div class="col-12">
    <div class="page-header">
      <h3 class="page-title">
        <i class="fa fa-users me-2"></i>Employee Management
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li class="breadcrumb-item active" aria-current="page">Employees</li>
        </ol>
      </nav>
    </div>
  </div>
</div>

<!-- Statistics Cards -->
<div class="row mb-4">
  <div class="col-md-4 grid-margin stretch-card">
    <div class="card bg-gradient-primary text-white">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="card-title mb-0">Total Employees</h6>
            <h2 class="mb-0">{stats.total}</h2>
          </div>
          <div class="icon-large">
            <i class="fa fa-users"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4 grid-margin stretch-card">
    <div class="card bg-gradient-success text-white">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="card-title mb-0">Active Employees</h6>
            <h2 class="mb-0">{stats.active}</h2>
          </div>
          <div class="icon-large">
            <i class="fa fa-user-check"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4 grid-margin stretch-card">
    <div class="card bg-gradient-warning text-white">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="card-title mb-0">Inactive Employees</h6>
            <h2 class="mb-0">{stats.inactive}</h2>
          </div>
          <div class="icon-large">
            <i class="fa fa-user-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Control Panel -->
<div class="row mb-4">
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="d-flex gap-3">
              <!-- Search -->
              <div class="flex-grow-1">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search employees..."
                    bind:value={searchTerm}
                  >
                </div>
              </div>

              <!-- Status Filter -->
              <div>
                <select class="form-select" bind:value={statusFilter}>
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="d-flex justify-content-end align-items-center gap-2">
              <!-- Action Buttons -->
              <button type="button" class="btn btn-primary">
                <i class="fa fa-plus me-2"></i>Add Employee
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="fa fa-cog me-2"></i>Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Results Count -->
<div class="row mb-3">
  <div class="col-12">
    <p class="text-muted mb-0">
      Showing {filteredUsers.length} of {users.length} employees
      {#if searchTerm || statusFilter !== 'all'}
        <button
          type="button"
          class="btn btn-link btn-sm p-0 ms-2"
          on:click={() => { searchTerm = ''; statusFilter = 'all' }}
        >
          Clear filters
        </button>
      {/if}
    </p>
  </div>
</div>

<!-- Table View -->
<div class="row">
  <div class="col-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-primary">
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Email</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredUsers as user, index}
                <tr class="employee-row {user.status}">
                  <td class="fw-bold">{index + 1}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="position-relative me-3">
                        <Avatar fullName={user.fullName} size={40} />
                        <span class="status-dot status-{user.status}"></span>
                      </div>
                      <div>
                        <h6 class="mb-0">{user.fullName}</h6>
                        <small class="text-muted">ID: {user.id}</small>
                      </div>
                    </div>
                  </td>
                  <td class="text-muted">{user.email}</td>
                  <td class="text-center">
                    <span class="badge badge-{user.status === 'active' ? 'success' : 'secondary'} px-3 py-2">
                      <i class="fa fa-{user.status === 'active' ? 'check-circle' : 'times-circle'} me-1"></i>
                      {user.status}
                    </span>
                  </td>
                  <td class="text-center">
                    <div class="btn-group" role="group">
                      <a
                        href="/employee/{user.id}"
                        class="btn btn-outline-primary btn-sm"
                        title="View Details"
                        aria-label="View Details"
                        data-sveltekit-preload-data
                      >
                        <i class="fa fa-eye"></i>
                      </a>
                      {#if user.id !== page.data.user.id}
                        <button
                          type="button"
                          class="btn btn-outline-{user.status === 'active' ? 'warning' : 'success'} btn-sm"
                          title="{user.status === 'active' ? 'Deactivate' : 'Activate'} Employee"
                          aria-label="{user.status === 'active' ? 'Deactivate' : 'Activate'} Employee"
                          on:click={() => handleToggleStatus(user.id, user.status)}
                        >
                          <i class="fa fa-{user.status === 'active' ? 'unlock' : 'lock'}"></i>
                        </button>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Empty State -->
{#if filteredUsers.length === 0}
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body text-center py-5">
          <div class="empty-state">
            <i class="fa fa-users fa-3x text-muted mb-3"></i>
            <h4 class="text-muted">No employees found</h4>
            <p class="text-muted">
              {#if searchTerm || statusFilter !== 'all'}
                Try adjusting your search criteria or filters.
              {:else}
                Start by adding your first employee to the system.
              {/if}
            </p>
            {#if searchTerm || statusFilter !== 'all'}
              <button 
                type="button" 
                class="btn btn-outline-primary"
                on:click={() => { searchTerm = ''; statusFilter = 'all' }}
              >
                Clear Filters
              </button>
            {:else}
              <button type="button" class="btn btn-primary">
                <i class="fa fa-plus me-2"></i>Add First Employee
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Page Header Styles */
  .page-header {
    padding: 1.5rem 0;
    border-bottom: 1px solid #e3e6f0;
    margin-bottom: 2rem;
  }

  .page-title {
    color: #5a5c69;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .breadcrumb {
    background: none;
    padding: 0;
    margin-bottom: 0;
  }

  .breadcrumb-item a {
    color: #858796;
    text-decoration: none;
  }

  .breadcrumb-item a:hover {
    color: #5a5c69;
  }

  /* Statistics Cards */
  .bg-gradient-primary {
    background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%);
  }

  .bg-gradient-success {
    background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%);
  }

  .bg-gradient-warning {
    background: linear-gradient(87deg, #fb6340 0, #fbb140 100%);
  }

  .icon-large {
    font-size: 2.5rem;
    opacity: 0.8;
  }

  /* Employee Cards (Grid View) */
  .employee-card {
    transition: all 0.3s ease;
    border: none;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    position: relative;
    overflow: hidden;
  }

  .employee-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #5e72e4, #825ee4);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .employee-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.25rem 2rem 0 rgba(58, 59, 69, 0.2);
  }

  .employee-card:hover::before {
    transform: scaleX(1);
  }

  .employee-card.inactive {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .employee-card.inactive .card-title {
    color: #6c757d;
  }

  /* Avatar Container */
  .employee-avatar-container {
    position: relative;
    display: inline-block;
  }

  .status-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .status-indicator.status-active {
    background: #28a745;
  }

  .status-indicator.status-inactive {
    background: #6c757d;
  }

  /* Status Dot for Table View */
  .status-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .status-dot.status-active {
    background: #28a745;
  }

  .status-dot.status-inactive {
    background: #6c757d;
  }

  /* Employee Actions */
  .employee-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Table Enhancements */
  .table-primary th {
    background: #b66dff;
    color: white;
  }

  .table-primary th {
    border: none;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: white;
  }

  .employee-row {
    transition: all 0.2s ease;
  }

  .employee-row:hover {
    background-color: #f8f9fc !important;
    transform: scale(1.01);
  }

  .employee-row.inactive td {
    opacity: 0.7;
  }

  /* Control Panel */
  .input-group-text {
    background: #f8f9fc;
    border-color: #d1d3e2;
    color: #6e707e;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.2rem rgba(94, 114, 228, 0.25);
  }

  /* View Toggle */
  .btn-group .btn {
    transition: all 0.2s ease;
  }

  /* Badges */
  .badge {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .badge-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
  }

  .badge-secondary {
    background: linear-gradient(45deg, #6c757d, #adb5bd);
    border: none;
  }

  .badge-info {
    background: linear-gradient(45deg, #17a2b8, #6f42c1);
    border: none;
  }

  /* Button Enhancements */
  .btn {
    transition: all 0.2s ease;
    font-weight: 500;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
  }

  .btn-primary {
    background: linear-gradient(45deg, #5e72e4, #825ee4);
    border: none;
  }

  .btn-outline-info {
    border-color: #17a2b8;
    color: #17a2b8;
  }

  .btn-outline-info:hover {
    background: linear-gradient(45deg, #17a2b8, #6f42c1);
    border-color: #17a2b8;
  }

  /* Empty State */
  .empty-state {
    padding: 3rem 1rem;
  }

  .empty-state i {
    opacity: 0.5;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .employee-card,
  .employee-row {
    animation: fadeInUp 0.3s ease forwards;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .page-header {
      text-align: center;
    }

    .employee-actions {
      flex-direction: column;
    }

    .employee-actions .btn {
      width: 100%;
      margin-bottom: 0.25rem;
    }

    .d-flex.justify-content-end {
      justify-content: center !important;
      margin-top: 1rem;
    }

    .control-panel .row > div:first-child {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 576px) {
    .icon-large {
      font-size: 2rem;
    }

    .card-body h2 {
      font-size: 1.5rem;
    }

    .employee-card .card-body {
      padding: 1rem;
    }
  }

  /* Loading Animation */
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .loading {
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* Custom Scrollbar for Table */
  .table-responsive::-webkit-scrollbar {
    height: 8px;
  }

  .table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .table-responsive::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #5e72e4, #825ee4);
    border-radius: 4px;
  }

  .table-responsive::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #4c63d2, #7048d2);
  }
</style>