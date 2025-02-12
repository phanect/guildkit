<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<Nav {data} />
<main class="max-h-fit">
  <slot />
</main>
