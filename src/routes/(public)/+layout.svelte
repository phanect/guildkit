<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "../../app.postcss";
  import type { LayoutProps } from "./$types";

  const { data, children }: LayoutProps = $props();
</script>

<Nav isLoggedIn={data.isLoggedIn} />
<main class="max-h-fit">
  {@render children()}
</main>
