<script lang="ts">
  let { data } = $props();
  $inspect(data);
  console.log('Data:', data);
</script>

<h1>{data.element.title}</h1>
<div>{@html data.element.content}</div>
