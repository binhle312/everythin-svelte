<script lang="ts">
  let { data } = $props()
</script>

<h1>{data.element.title}</h1>
<div>{@html data.element.content}</div>
