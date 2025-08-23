<script lang="ts">
  import Link from "$lib/components/generic/Link.svelte";
  import { parseString } from "$lib/helpers/parseString.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { job } = data;
</script>

<div class="root">
  <h1 class="title">{job.title}</h1>
  <a href={`/orgs/${ job.employer.slug }`} class="employer">
    <img src="/vendor/octicons/organization.svg" alt="Employer" title="Employer" width="18" />
    {job.employer.name}
  </a>
  <div>
    <span class="condition condition-location">
      <img src="/vendor/octicons/location.svg" alt="" width="16" />
      Work location: {job.location}
    </span>
    <span class="condition condition-salary">
      <img src="/vendor/tabler/coins.svg" alt="" width="16" />
      <!-- TODO Use user's locale in `toLocaleString()` -->
      Salary: {job.salary.toLocaleString("en-US")} {job.currency}/{job.salaryPer}
    </span>
  </div>
  <div class="last-updated">
    <img src="/vendor/octicons/clock.svg" alt="" width="16" />
    <!-- TODO Use user's locale in `toLocaleString()` -->
    Last updated at {(job.updatedAt ?? job.createdAt).toLocaleDateString("en-US")}
  </div>

  <section class="section">
    <h3 class="section-title">Description</h3>
    <p>
      {job.description}
    </p>
  </section>

  <section class="section">
    <h3 class="section-title">Requirements</h3>
    <ul class="requirements">
      {#each parseString(job.requirements) as requirement, index (index)}
        {#if requirement}
          <li>{requirement}</li>
        {/if}
      {/each}
    </ul>
  </section>

  <section class="apply">
    <Link href={job.applicationUrl} theme="button-deep" preload>
      Apply
    </Link>
  </section>
</div>

<style lang="scss">
  @use "$lib/styles/mixins.scss";

  .root {
    @include mixins.page-root;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 900;
    color: #111827;
    margin: {
      bottom: 0.5rem;
    }
  }

  .employer {
    display: inline-flex;
    gap: 0.5rem;
    margin: {
      bottom: 0.75rem;
    }

    font-size: 1.125rem;
    font-weight: 700;
    color: #020202;
  }

  .condition {
    @include mixins.text-with-icon;

    margin-right: 0.5rem;
    padding: {
      top: 0.5rem;
      bottom: 0.5rem;
      left: 1rem;
      right: 1rem;
    }

    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937;
    border-radius: 9999px;
  }

  .condition-location {
    background-color: #e5e7eb;
  }

  .condition-salary {
    background-color: #bbf7d0;
  }

  .last-updated {
    @include mixins.text-with-icon;

    width: 100%;
    justify-content: end;
    margin: {
      bottom: 1.5rem;
    }

    font-size: 0.875rem;
  }

  .section {
    margin: {
      bottom: 1.25rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
  }

  .requirements {
    list-style-type: disc;
    margin-left: 2rem;
  }

  .apply {
    margin-top: 1.875rem;
  }
</style>
