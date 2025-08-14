<script lang="ts">
  import Link from "$lib/components/generic/Link.svelte";
  import { page } from "$app/state";
</script>

{#if page.error?.code === "RECRUITER_WITHOUT_ORG"}
  <p>
    You do not belong to any organization.
    <Link href="/employer/orgs/new" theme="linktext" preload={true}>
      Create a new organization
    </Link> or ask your organization owner to add you.
    <!-- TODO Add button to ask invitation to the org in the organization page -->
  </p>
{:else if page.status === 404}
  <h1>This page is not found.</h1>
{:else}
  <h1>{ page.status }: { page.error?.message }</h1>
{/if}
