<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "../../app.postcss";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
  }
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

<Nav isLoggedIn />
<div class="wrapper">
  <Sidebar />
  <main class="main">
    {@render children()}
  </main>
</div>
