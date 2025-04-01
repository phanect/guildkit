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

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;

    background-color: #ffffff;
    box-shadow: 2px 2px 5px 5px #f0f0f0;
    transition: box-shadow 0.25s;
    border-radius: 0.5rem;

    width: 100%;
    max-width: 100%;
    padding: 1rem;
  }

  .card:has(.card-link:hover) {
    box-shadow: 4px 4px 10px 7px #d0d0d0;
  }

  .card-link {
    cursor: pointer;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #101828;

    overflow: hidden;
    line-height: 1.5em;
    height: 3em; /* = (text height 2em) + (space between lines 0.5em) + (accomodation 0.5em) */
  }

  .card-desc {
    font-size: 0.875rem;
    color: #363636;

    overflow: hidden;
    text-overflow: ellipsis;

    height: 3em; /* = (text height 2em) + (space between lines 0.5em) + (accomodation 0.5em) */
  }

  .actions {
    display: flex;
    justify-content: end;
    align-items: center;
    column-gap: 0.5rem;

    font-size: 0.875rem;
  }

  .expire-text {
    color: #364153;
  }
</style>

<div class="card">
  <a class="card-link" href="jobs/{job.id}">
    <h3 class="card-title">
      {job.title}
    </h3>
    <div class="card-desc">
      {job.description}
    </div>
  </a>

  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

  <div class="actions">
    <div class="expire-text">
      Expires at {job.deadline.toLocaleDateString()} ({getRemainingTime(job.deadline)})
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
