<script lang=ts>
  import NavigationProcessBar from '$lib/components/NavigationProgressBar.svelte'

  let { children } = $props()

</script>

<NavigationProcessBar />
{@render children()}
