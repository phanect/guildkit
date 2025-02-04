<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { Drawer, drawerStore } from "@skeletonlabs/skeleton";
  import JobForm from "$lib/components/JobForm.svelte";
  import type { LayoutProps } from "./$types";

  const { data, children }: LayoutProps = $props();
</script>

<Drawer>
  {#if $drawerStore.id === "add-job"}
    <JobForm {data} />
  {/if}
</Drawer>
<Sidebar />

{@render children()}
