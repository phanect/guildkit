<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

<Sidebar />

{@render children()}
