<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<style lang="scss">
  .container-outer {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
  }

  .container-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="container-outer">
  <div class="container-inner">
    {@render children()}
  </div>
</div>
