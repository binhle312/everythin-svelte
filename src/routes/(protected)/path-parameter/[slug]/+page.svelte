<script lang="ts">../../basic-ui-elements copy/[slug]/$types.js
  let { data } = $props()
</script>

<h1>{data.element.title}</h1>
<div>{@html data.element.content}</div>
