<script lang="ts">
  import { parseString } from "$lib/helpers/parseString.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { job } = data;
</script>

<div class="container">
  <h1 class="title">{job.title}</h1>
  <p class="company">
    <img src="/vendor/octicons/mention.svg" alt="At Symbol Icon" width="18" />
    {job.company}
  </p>
  <div class="tags">
    <span class="tag tag-location">
      <img src="/vendor/octicons/location.svg" alt="Location Icon" width="16" />
      {job.location}
    </span>
    <span class="tag tag-salary">
      <img src="/vendor/tabler/coins.svg" alt="Salary" width="16" />
      <!-- TODO Use user's locale in `toLocaleString()` -->
      {job.salary.toLocaleString("en-US")} {job.currency}/{job.salaryPer}
    </span>
    <span class="tag tag-expires">
      <img src="/vendor/octicons/clock.svg" alt="" width="16" />
      Last updated at {job.expiresAt.toLocaleDateString()}
    </span>
  </div>
  <hr class="divider" />
  <h3 class="section-title">Description</h3>
  <p>
    {job.description}
  </p>
  <h3 class="section-title">Requirements</h3>
  <ul class="requirements">
    {#each parseString(job.requirements) as requirement, index (index)}
      {#if requirement}
        <li>{requirement}</li>
      {/if}
    {/each}
  </ul>

  <div class="apply-section">
    <a href={job.applicationUrl} class="apply-btn">Apply</a>
  </div>
</div>

<style lang="scss">
  .container {
    max-width: 60rem;
    padding-left: 2.25rem;
    padding-right: 2.25rem;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 900;
    color: #111827;
  }

  .company {
    font-style: italic;
    display: inline-flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
    color: #9ca3af;
  }

  .tags {
    margin-top: 1rem;
  }

  .tag {
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    display: inline-flex;
    gap: 0.5rem;
    color: #1f2937;
  }

  .tag-location {
    background-color: #e5e7eb;
  }

  .tag-salary {
    background-color: #bbf7d0;
  }

  .tag-expires {
    background-color: #fecaca;
  }

  .divider {
    height: 1px;
    margin: 2rem 0 4rem 0;
    background-color: #4b5563;
    border: 0;
    width: 300px;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;

    &:not(:first-of-type) {
      margin-top: 1rem;
    }
  }

  .requirements {
    list-style-type: disc;
    margin-left: 2rem;
  }

  .apply-section {
    margin-top: 1.5rem;
  }

  .apply-btn {
    padding: 1rem 2rem;
    background-color: #000000;
    color: #ffffff;
    width: fit-content;
    border-radius: 9999px;
    text-decoration: none;
    display: inline-block;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #1f2937;
    }
  }
</style>
