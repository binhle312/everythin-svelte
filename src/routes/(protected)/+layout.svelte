<script lang="ts">
  import NavigationTopbar from '$lib/components/NavigationTopbar.svelte'
	import NavigationSidebar from '$lib/components/NavigationSidebar.svelte'

  let { children } = $props();
</script>

<!-- partial:/partials/_navbar.html -->
<NavigationTopbar />
<!-- partial -->
<div class="container-fluid page-body-wrapper">
  <!-- partial:/partials/_sidebar.html -->
  <NavigationSidebar />
  <!-- partial -->
  <div class="main-panel">
    <div class="content-wrapper">
      {@render children()}
    </div>
    <!-- content-wrapper ends -->
    <!-- partial:/partials/_footer.html -->
    <footer class="footer">
      <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank">BootstrapDash</a>. All rights reserved.</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="mdi mdi-heart text-danger"></i></span>
      </div>
    </footer>
    <!-- partial -->
  </div>
  <!-- main-panel ends -->
</div>
<!-- page-body-wrapper ends -->
