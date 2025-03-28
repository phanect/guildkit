<script lang="ts">
  import { getRemainingTime } from "$lib/helpers/getRemainingTime.ts";
  import Button from "./generic/Button.svelte";

  type Props = {
    job: {
      id: string;
      description: string;
      title: string;
      requirements: string;
      salary: string;
      deadline: Date;
      createdAt: Date;
    };
    editable?: boolean;
  };

  const { job, editable = false }: Props = $props();
</script>

<div class="overflow-hidden group relative rounded-lg p-[1px] flex justify-center items-center">
  <a class="block w-full relative z-10 rounded-lg bg-white p-6 sm:p-8" href="jobs/{job.id}">
    <div class="mt-12 sm:pr-8">
      <h3 class="text-xl font-bold text-gray-900">
        {job.title}
      </h3>
      <p class="mt-2 text-sm text-gray-500 truncate">
        {job.description}
      </p>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="text-sm flex justify-between">
        <p class="text-gray-700">Deadline</p>
        <div class="flex flex-col items-end">
          <p class="text-gray-400">{job.deadline.toLocaleDateString()}</p>
          <p class="text-red-300">({getRemainingTime(job.deadline)})</p>
        </div>

        {#if editable}
          <div class="flex items-end gap-2">
            <Button href={`/employer/jobs/edit/${ job.id }`} preload={true}>
              Edit
            </Button>
            <Button action="/employer/jobs?/delete" params={{ id: job.id }}>
              Delete
            </Button>
          </div>
        {/if}
      </div>
    </div>
  </a>
</div>
