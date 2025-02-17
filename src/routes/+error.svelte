<script lang="ts">
  import { page } from "$app/state";
</script>

{#if page.status === 404}
  <h1>This page is not found.</h1>
{:else}
  <h1>{ page.status }: { page.error?.message }</h1>
{/if}
