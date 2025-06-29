<script lang="ts">
  let { children, data } = $props()
</script>

<div class="page-header">
  <h3 class="page-title"> {data.pageInformation?.title} </h3>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">UI Elements</a></li>
      <li class="breadcrumb-item active" aria-current="page">{data.pageInformation?.title}</li>
    </ol>
  </nav>
</div>
{@render children()}
