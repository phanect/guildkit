<script lang="ts">
  import Link from "$lib/components/generic/Link.svelte";
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { jobs = [], type, userBelongsToOrganization } = data;
  const editable = type === "recruiter";
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2.5em;

    width: 100%;
  }

  .button-section {
    display: flex;
    justify-content: start;

    background-color: #f0f0f0;
    box-shadow: 2px 2px 5px 5px #d0d0d0;
    border-radius: 0.5rem;

    width: 42.5rem;
    max-width: 100%;
    padding: 1rem;
}
</style>

<div class="container">
  {#if userBelongsToOrganization === true}
    <section class="button-section">
      <Link href="/employer/jobs/new" theme="button" preload={true}>
        Add job
      </Link>
    </section>
  {:else}
    <p>
      You do not belong to any organization.
      <Link href="/employer/orgs/new" theme="linktext" preload={true}>
        Create a new organization
      </Link> or ask your organization owner to add you.
      <!-- TODO Add button to ask invitation to the org in the organization page -->
    </p>
  {/if}

  <JobList {jobs} {editable} />
</div>
