<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="top-bar">
  {@render children()}
</div>

<style lang="scss">
  .top-bar {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(255, 225, 225);
    color: red;

    width: 100%;
    min-height: 2.5rem;
    padding: 0.75rem;
  }
</style>
