<script lang="ts">
  import { page } from '$app/state'
  import { goto, preloadData } from '$app/navigation'
  import Avatar from '$lib/components/Avatar.svelte'

  let employee = page.data.employee
  let isEditing = false
  let formData = {
    fullName: employee?.fullName || '',
    email: employee?.email || '',
    status: employee?.status || 'active',
    department: '',
    position: '',
    phone: '',
    address: '',
    joinDate: '',
    salary: '',
    emergencyContact: '',
    notes: ''
  }

  const toggleEdit = () => {
    isEditing = !isEditing
    if (!isEditing) {
      // Reset form data when canceling edit
      formData = {
        fullName: employee?.fullName || '',
        email: employee?.email || '',
        status: employee?.status || 'active',
        department: '',
        position: '',
        phone: '',
        address: '',
        joinDate: '',
        salary: '',
        emergencyContact: '',
        notes: ''
      }
    }
  }

  const handleSave = async () => {
    // Here you would typically send the data to your API
    console.log('Saving employee data:', formData)

    // For now, just simulate a save and exit edit mode
    alert('Employee data saved successfully!')
    isEditing = false
  }

  const handleCancel = () => {
    goto('/employees')
  }
</script>

<div class="row">
  <!-- Employee Profile Header -->
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex align-items-center">
            <Avatar fullName={employee?.fullName || 'Unknown'} size={80} />
            <div class="ms-3">
              <h4 class="mb-1">{employee?.fullName || 'Employee Name'}</h4>
              <span class="badge badge-{employee?.status === 'active' ? 'success' : 'secondary'} mb-2">
                {employee?.status || 'Unknown'}
              </span>
              <p class="text-muted mb-0">Employee ID: {employee?.id || 'N/A'}</p>
            </div>
          </div>
          <div class="d-flex gap-2">
            {#if !isEditing}
              <button type="button" class="btn btn-outline-primary" on:click={toggleEdit}>
                <i class="fa fa-edit me-2"></i>Edit Employee
              </button>
            {/if}
            <button type="button" class="btn btn-outline-secondary" on:click={handleCancel}>
              <i class="fa fa-arrow-left me-2"></i>Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Employee Details Form -->
  <div class="col-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">
          {isEditing ? 'Edit Employee Information' : 'Employee Information'}
        </h5>
        {#if isEditing}
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-success btn-sm" on:click={handleSave}>
              <i class="fa fa-save me-1"></i>Save Changes
            </button>
            <button type="button" class="btn btn-secondary btn-sm" on:click={toggleEdit}>
              <i class="fa fa-times me-1"></i>Cancel
            </button>
          </div>
        {/if}
      </div>
      <div class="card-body">
        <form class="forms-sample">
          <div class="row">
            <!-- Personal Information -->
            <div class="col-md-6">
              <h6 class="mb-3 text-primary">
                <i class="fa fa-user me-2"></i>Personal Information
              </h6>

              <div class="form-group mb-3">
                <label for="fullName" class="form-label">Full Name <span class="text-danger">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  bind:value={formData.fullName}
                  disabled={!isEditing}
                  placeholder="Enter full name"
                >
              </div>

              <div class="form-group mb-3">
                <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  bind:value={formData.email}
                  disabled={!isEditing}
                  placeholder="Enter email address"
                >
              </div>

              <div class="form-group mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  bind:value={formData.phone}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                >
              </div>

              <div class="form-group mb-3">
                <label for="address" class="form-label">Address</label>
                <textarea
                  class="form-control"
                  id="address"
                  rows="3"
                  bind:value={formData.address}
                  disabled={!isEditing}
                  placeholder="Enter address"
                ></textarea>
              </div>

              <div class="form-group mb-3">
                <label for="emergencyContact" class="form-label">Emergency Contact</label>
                <input
                  type="text"
                  class="form-control"
                  id="emergencyContact"
                  bind:value={formData.emergencyContact}
                  disabled={!isEditing}
                  placeholder="Emergency contact details"
                >
              </div>
            </div>

            <!-- Work Information -->
            <div class="col-md-6">
              <h6 class="mb-3 text-primary">
                <i class="fa fa-briefcase me-2"></i>Work Information
              </h6>

              <div class="form-group mb-3">
                <label for="status" class="form-label">Employment Status <span class="text-danger">*</span></label>
                <select
                  class="form-select"
                  id="status"
                  bind:value={formData.status}
                  disabled={!isEditing}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div class="form-group mb-3">
                <label for="department" class="form-label">Department</label>
                <select
                  class="form-select"
                  id="department"
                  bind:value={formData.department}
                  disabled={!isEditing}
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div class="form-group mb-3">
                <label for="position" class="form-label">Position/Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="position"
                  bind:value={formData.position}
                  disabled={!isEditing}
                  placeholder="Job title or position"
                >
              </div>

              <div class="form-group mb-3">
                <label for="joinDate" class="form-label">Join Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="joinDate"
                  bind:value={formData.joinDate}
                  disabled={!isEditing}
                >
              </div>

              <div class="form-group mb-3">
                <label for="salary" class="form-label">Salary</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="salary"
                    bind:value={formData.salary}
                    disabled={!isEditing}
                    placeholder="Annual salary"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="row mt-3">
            <div class="col-12">
              <h6 class="mb-3 text-primary">
                <i class="fa fa-sticky-note me-2"></i>Additional Notes
              </h6>

              <div class="form-group mb-3">
                <label for="notes" class="form-label">Notes</label>
                <textarea
                  class="form-control"
                  id="notes"
                  rows="4"
                  bind:value={formData.notes}
                  disabled={!isEditing}
                  placeholder="Any additional notes about the employee..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Action Buttons (only show when editing) -->
          {#if isEditing}
            <div class="row mt-4">
              <div class="col-12">
                <div class="d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-secondary" on:click={toggleEdit}>
                    <i class="fa fa-times me-2"></i>Cancel
                  </button>
                  <button type="button" class="btn btn-gradient-primary" on:click={handleSave}>
                    <i class="fa fa-save me-2"></i>Save Changes
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>

  <!-- Quick Actions Card -->
  <div class="col-12 grid-margin">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">
          <i class="fa fa-cogs me-2"></i>Quick Actions
        </h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="d-grid gap-2">
              <button type="button" class="btn btn-outline-info">
                <i class="fa fa-eye me-2"></i>View Performance Records
              </button>
              <button type="button" class="btn btn-outline-warning">
                <i class="fa fa-calendar me-2"></i>View Attendance
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-grid gap-2">
              <button type="button" class="btn btn-outline-success">
                <i class="fa fa-download me-2"></i>Export Employee Data
              </button>
              <button
                type="button"
                class="btn btn-outline-{employee?.status === 'active' ? 'danger' : 'success'}"
                disabled={employee?.id === page.data.user?.id}
              >
                <i class="fa fa-{employee?.status === 'active' ? 'lock' : 'unlock'} me-2"></i>
                {employee?.status === 'active' ? 'Deactivate' : 'Activate'} Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }

  .form-control:disabled,
  .form-select:disabled {
    background-color: #f8f9fa;
    opacity: 0.8;
  }

  .text-primary {
    color: #6f42c1 !important;
  }

  .badge {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .input-group-text {
    background-color: #e9ecef;
    border-color: #ced4da;
  }

  .btn-outline-primary:hover,
  .btn-outline-secondary:hover,
  .btn-outline-info:hover,
  .btn-outline-warning:hover,
  .btn-outline-success:hover,
  .btn-outline-danger:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn {
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    .d-flex.justify-content-between {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 1rem;
    }

    .d-flex.gap-2 {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>