<script lang="ts">
  import type { Snippet } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

  type Props = {
    children: Snippet;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    theme: "button-deep" | "button-pale" | "linktext";
    width?: number | string;
  };

  const { onclick, theme, width, children }: Props = $props();
</script>

<style lang="scss">
  @use "$lib/styles/button-linktext.scss";
</style>

<button type="submit" class={ theme } style:width {onclick}>
  {@render children()}
</button>
