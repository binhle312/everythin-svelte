<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // Redirect to static documentation
    window.location.href = '/documentation.html';
  });
</script>

<svelte:head>
  <title>Documentation</title>
</svelte:head>

<div class="loading">
  <p>Loading documentation...</p>
</div>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.2rem;
  }
</style>
