<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    href: string;
    theme?: "button-deep" | "button-pale" | "linktext";
    preload?: boolean;
  };

  const { href, theme = "linktext", preload = false, children }: Props = $props();
</script>

<style lang="scss">
  @use "$lib/styles/button-linktext.scss";
</style>

<a {href} class={ theme } data-sveltekit-preload-data={ preload ? "hover" : null }>
  {@render children()}
</a>
