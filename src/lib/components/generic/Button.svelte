<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    onclick?: HTMLButtonElement["onclick"];
    theme?: "button" | "linktext";
    width?: number | string;
  };

  const { onclick, theme = "button", width, children }: Props = $props();
</script>

<style lang="scss">
  @use "$lib/styles/button-linktext.scss";
</style>

<button type="submit" class={ theme } style:width {onclick}>
  {@render children()}
</button>
