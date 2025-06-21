<script lang="ts">
  let {
    id,
    name,
    type,
    placeholder,
    value = $bindable(),
    error,
    classes,
    onblur,
    onfocus,
    disabled = false,
  } = $props()
</script>

<input
  class={[...classes, error ? 'is-invalid' : '']}
  {id}
  {name}
  {type}
  {placeholder}
  {onblur}
  {onfocus}
  {disabled}
  bind:value
/>
{#if error}
  <span class="invalid-feedback d-block">{error}</span>
{/if}
