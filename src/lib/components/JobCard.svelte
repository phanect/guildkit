<script lang="ts">
  import { enhance } from "$app/forms";
  import { getRemainingTime } from "$lib/helpers/getRemainingTime.ts";
  import Button from "./generic/Button.svelte";
  import Link from "./generic/Link.svelte";
  import type { Job } from "$lib/db/schema/job.ts";

  type Props = {
    job: Job;
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
    max-width: 32.5rem;
    padding: 1rem;

    &:has(.card-link:hover) {
      box-shadow: 4px 4px 10px 7px #d0d0d0;
    }
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
    height: 3em; // = (text height 2em) + (space between lines 0.5em) + (accomodation 0.5em)
  }

  .card-desc {
    font-size: 0.875rem;
    color: #363636;

    overflow: hidden;
    text-overflow: ellipsis;

    height: 3em; // = (text height 2em) + (space between lines 0.5em) + (accomodation 0.5em)
  }

  .divider {
    height: 1px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: #e5e7eb;
    border: 0;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 0.875rem;
  }

  .company {
    font-weight: 700;
  }

  .actions-right {
    display: flex;
    justify-content: end;
    align-items: center;
    column-gap: 0.5rem;
  }

  .expire-text {
    color: #364153;
  }

  .actions-buttons {
    display: flex;
    align-items: end;
    gap: 0.5rem;
  }
</style>

<div class="card">
  <a class="card-link" href="/jobs/{job.id}">
    <h3 class="card-title">
      {job.title}
    </h3>
    <div class="card-desc">
      {job.description}
    </div>
  </a>

  <hr class="divider" />

  <div class="actions">
    <div class="company">
      {job.company}
    </div>

    <div class="actions-right">
      <div class="expire-text">
        Deadline: {job.expiresAt.toLocaleDateString()} <span class="text-red-300">({getRemainingTime(job.expiresAt)})</span>
      </div>

      {#if editable}
        <div class="actions-buttons">
          <Link href={`/employer/jobs/edit/${ job.id }`} preload={true} theme="button-pale">
            Edit
          </Link>
          <form action="/employer/jobs?/delete" use:enhance>
            <input type="hidden" name="id" value={ job.id} />
            <Button theme="button-pale">
              Delete
            </Button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</div>
