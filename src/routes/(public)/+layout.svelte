<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "$lib/styles/global.scss";
  import type { LayoutProps } from "./$types";

  const { data, children }: LayoutProps = $props();
</script>

<style lang="scss">
  @use "$lib/styles/mixins.scss";
  .main {
    @include mixins.layout-root;
  }
</style>

<Nav for={data.userType} />
<main class="main">
  {@render children()}
</main>
