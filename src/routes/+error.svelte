<script lang="ts">
  import { page } from '$app/state'

  const { status, error } = page

  let background = 'bg-info'
  let message = error?.message

  if (status === 404) {
    background = 'bg-primary'
    message = 'The page you’re looking for was not found.'
  } else if (error?.message) {
    background = 'bg-danger'
    message = 'An unexpected error occurred. Please try again later.'
  }
</script>

<div class="container-fluid page-body-wrapper full-page-wrapper">
  <div class="content-wrapper d-flex align-items-center text-center error-page {background}">
    <div class="row flex-grow">
      <div class="col-lg-7 mx-auto text-white">
        <div class="row align-items-center d-flex flex-row">
          <div class="col-lg-6 text-lg-right pr-lg-4">
            <h1 class="display-1 mb-0">{status}</h1>
          </div>
          <div class="col-lg-6 error-page-divider text-lg-left pl-lg-4">
            <h2>SORRY!</h2>
            <h3 class="font-weight-light">{message}</h3>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 text-center mt-xl-2">
            <a class="text-white font-weight-medium" href="/">Back to home</a>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 mt-xl-2">
            <p class="text-white font-weight-medium text-center">Copyright &copy; 2021 All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</div>
