<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    href: string;
    preload?: boolean;
  };

  const { href, preload = false, children }: Props = $props();
</script>

<style lang="scss">
  @use "$lib/styles/button-linktext.scss";
</style>

<a {href} class="button" data-sveltekit-preload-data={ preload ? "hover" : null }>
  {@render children()}
</a>
