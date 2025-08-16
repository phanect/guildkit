<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "../../app.scss";
  import type { LayoutProps } from "./$types";

  const { children, data }: LayoutProps = $props();
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .main {
    width: 100%;
    padding-left: 2.5em;
    padding-right: 2.5em;
  }
</style>

<Nav for={data.user.props.type ?? "guest"} />
<div class="wrapper">
  <Sidebar />
  <main class="main">
    {@render children()}
  </main>
</div>
