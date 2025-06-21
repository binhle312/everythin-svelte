<script lang=ts>
  let { children } = $props();
</script>

<div class="container-fluid page-body-wrapper full-page-wrapper">
  <div class="content-wrapper d-flex align-items-center auth">
    <div class="row flex-grow">
      <div class="col-lg-4 mx-auto">
        <div class="auth-form-light text-left p-5">
          <div class="brand-logo">
            <img src="/images/logo.svg" alt="logo.svg">
          </div>
          {@render children()}
        </div>
      </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</div>
