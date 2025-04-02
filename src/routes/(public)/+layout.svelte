<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "../../app.postcss";
  import type { LayoutProps } from "./$types";

  const { data, children }: LayoutProps = $props();
</script>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;

    width: 100%;
    padding-left: 2.5em;
    padding-right: 2.5em;
  }
</style>

<Nav isLoggedIn={data.isLoggedIn} />
<main class="main">
  {@render children()}
</main>
