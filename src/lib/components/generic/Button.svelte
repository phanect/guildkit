<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    onclick?: HTMLButtonElement["onclick"];
    theme?: "button" | "linktext";
  };

  const { onclick, theme = "button", children }: Props = $props();
</script>

<style lang="scss">
  @use "$lib/styles/button-linktext.scss";
</style>

<button type="submit" class={ theme } {onclick}>
  {@render children()}
</button>
