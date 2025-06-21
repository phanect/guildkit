<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    onclick?: HTMLButtonElement["onclick"];
  };

  const { onclick, children }: Props = $props();
</script>

<style lang="scss">
  @import "$lib/styles/button-linktext.scss";
</style>

<button type="submit" class="button" {onclick}>
  {@render children()}
</button>
