<script lang="ts">
  import { getRemainingTime } from "$lib/helpers/getRemainingTime.ts";
  import { parseString } from "$lib/helpers/parseString.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { job } = data;
</script>

<section class="p-24">
  <div class="border border-gray-200 min-h-screen rounded-lg p-12">
    <h1 class="text-3xl font-black text-gray-900">{job.title}</h1>
    <p class="italic inline-flex gap-2 mt-2 text-gray-400">
      <img src="/vendor/octicons/mention.svg" alt="At Symbol Icon" width="18" />
      {job.company}
    </p>
    <div class="mt-4">
      <span
        class="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full inline-flex gap-2"
      >
        <img src="/vendor/octicons/location.svg" alt="Location Icon" width="16" />
        {job.location}
      </span>
      <span
        class="bg-green-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full inline-flex gap-2"
      >
        <img src="/vendor/tabler/coins.svg" alt="Salary" width="16" />
        <!-- TODO Use user's locale in `toLocaleString()` -->
        {job.salary.toLocaleString("en-US")} {job.currency}/{job.salaryPer}
      </span>
      <span
        class="bg-red-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full inline-flex gap-2"
      >
        <img src="/vendor/octicons/clock.svg" alt="Money Icon" width="16" />
        {getRemainingTime(job.expiresAt)}
      </span>
    </div>
    <hr class="h-px my-8 mb-16 bg-gray-600 border-0 w-[300px]" />
    <h3 class="text-2xl font-bold text-gray-800 mb-4">Description</h3>
    <p>
      {job.description}
    </p>
    <h3 class="text-2xl font-bold text-gray-800 my-4">Requirements</h3>
    <ul class="list-disc ml-8">
      {#each parseString(job.requirements) as requirement, index (index)}
        {#if requirement}
          <li>{requirement}</li>
        {/if}
      {/each}
    </ul>

    <div class="mt-6">
      <a href={job.applicationUrl} class="btn btn-xl bg-black text-white w-fit rounded-full">Apply</a>
    </div>
  </div>
</section>
