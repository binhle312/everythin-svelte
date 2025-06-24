<script lang="ts">
  import { Tween } from "svelte/motion"
  import { cubicOut } from 'svelte/easing'
  import { beforeNavigate, afterNavigate, onNavigate } from '$app/navigation'

  const duration = 700
  const progress = new Tween(0, {
    duration,
    easing: cubicOut,
  })

  beforeNavigate(() => {
    progress.set(0, { duration: 0 })
  })

  onNavigate(() => {
    progress.target = 0.99
  })

  afterNavigate(() => {
    progress.target = 1
  })
</script>

{#if 0 < progress.current && progress.current < 1}
  <progress class="top-progress" value={progress.current} ></progress>
{/if}

<style>
  .top-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 6px;
    z-index: 1100;
    appearance: none;
    -webkit-appearance: none;
    background: #eee;
    border: none;
  }
  .top-progress::-webkit-progress-bar {
    background: #eee;
    border-radius: 3px;
  }
  .top-progress::-webkit-progress-value {
    background: linear-gradient(90deg, #da8cff, #9a55ff);
    border-radius: 3px;
    transition: width 0.3s;
  }
  .top-progress::-moz-progress-bar {
    background: linear-gradient(90deg, #da8cff, #9a55ff);
    border-radius: 3px;
    transition: width 0.3s;
  }
  .top-progress::-ms-fill {
    background: linear-gradient(90deg, #da8cff, #9a55ff);
    border-radius: 3px;
    transition: width 0.3s;
  }
</style>