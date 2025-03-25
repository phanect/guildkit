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
    justify-content: flex-start;
    column-gap: 2.5rem;
  }
</style>

<Nav isLoggedIn />
<div class="wrapper">
  <Sidebar />
  <main>
    {@render children()}
  </main>
</div>
