<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "$lib/styles/global.scss";
  import type { LayoutProps } from "./$types";

  const { children, data }: LayoutProps = $props();
</script>

<style lang="scss">
  @use "$lib/styles/mixins.scss";

  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .main {
    @include mixins.layout-root;
  }
</style>

<Nav for={data.user.props.type ?? "guest"} />
<div class="wrapper">
  <Sidebar />
  <main class="main">
    {@render children()}
  </main>
</div>
