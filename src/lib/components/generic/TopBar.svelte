<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div style="display: flex; justify-content: center; align-items: center; width=100%; height: 2.5rem; background-color: red; color: white;">
  {@render children()}
</div>
