<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { jobSchema } from "$lib/validation/job.validation.ts";
  import Toast, { addToast } from "$lib/components/generic/Toast.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const { form, errors, enhance } = superForm(data.form, {
    validators: jobSchema,
    onError: (error) => {
      addToast({
        data: {
          title: "Error",
          description: error.result.error.message,
          color: "variant-filled-error",
        },
      });
    },
  });
</script>

<Toast />
<section class="px-24 py-16">
  <h1 class="text-2xl font-bold flex justify-center mb-5">Create a new job</h1>
  <div class="border border-gray-200 rounded-lg p-12">
    <form method="post" action="/employer/jobs?/create" use:enhance>
      <div class="mb-6">
        <label class="label" for="title">
          <span class="font-bold">Title <span class="text-red-400">*</span></span>
          <input
            class={$errors.title ? "input-error block w-full rounded-sm" : "input"}
            type="text"
            placeholder="Job Title"
            name="title"
            id="title"
            bind:value={$form.title}
          />
        </label>
        {#if $errors.title}
          <small class="text-red-600">{$errors.title}</small>
        {/if}
      </div>
      <div class="mb-6">
        <label class="label" for="description">
          <span class="font-bold">Description <span class="text-red-400">*</span></span>
          <textarea
            class={$errors.description ? "input-error block w-full rounded-sm" : "input"}
            placeholder="Job Description"
            name="description"
            id="description"
            bind:value={$form.description}
          ></textarea>
        </label>
        {#if $errors.description}
          <small class="text-red-600">{$errors.description}</small>
        {/if}
      </div>
      <div class="mb-6">
        <label class="label" for="requirements">
          <span class="font-bold">Requirements <span class="text-red-400">*</span></span>
          <span class="text-sm text-gray-500">(Separate using ";" for better formatting)</span>
          <textarea
            class={$errors.requirements ? "input-error block w-full rounded-sm" : "input"}
            placeholder="Requirement 1; Requirement 2; Requirement 3; etc"
            name="requirements"
            id="requirements"
            bind:value={$form.requirements}
          ></textarea>
        </label>
        {#if $errors.requirements}
          <small class="text-red-600">{$errors.requirements}</small>
        {/if}
      </div>

      <div class="mb-6">
        <label class="label" for="applicationUrl">
          <span class="font-bold">Application URL <span class="text-red-400">*</span></span>
          <span class="text-sm text-gray-500">(Separate using ";" for better formatting)</span>
          <input
            class={$errors.applicationUrl ? "input-error block w-full rounded-sm" : "input"}
            type="url"
            placeholder="https://yourcompany.com/careers/1"
            name="applicationUrl"
            id="applicationUrl"
            bind:value={$form.applicationUrl}
          />
        </label>
        {#if $errors.applicationUrl}
          <small class="text-red-600">{$errors.applicationUrl}</small>
        {/if}
      </div>
      <div class="mb-6 grid grid-cols-4 gap-6">
        <div class="col-span-2">
          <label class="label" for="location">
            <span class="font-bold">Location <span class="text-red-400">*</span></span>
            <input
              class={$errors.location ? "input-error block w-full rounded-sm" : "input"}
              type="text"
              placeholder="Remote"
              name="location"
              id="location"
              bind:value={$form.location}
            />
          </label>
          {#if $errors.location}
            <small class="text-red-600 block mt-1">{$errors.location}</small>
          {/if}
        </div>
        <div class="col-span-2">
          <label class="label" for="applicationUrl">
            <span class="font-bold">Salary <span class="text-red-400">*</span></span>
            <input
              class={$errors.salary ? "input-error block w-full rounded-sm" : "input"}
              type="text"
              placeholder="800000"
              name="salary"
              id="salary"
              bind:value={$form.salary}
            />
          </label>
          {#if $errors.salary}
            <small class="text-red-600 block mt-1">{$errors.salary}</small>
          {/if}
        </div>
      </div>
      <div class="mb-6 grid grid-cols-4 gap-6">
        <div class="col-span-2">
          <label class="label" for="location">
            <span class="font-bold">Company name <span class="text-red-400">*</span></span>
            <input
              class={$errors.company ? "input-error block w-full rounded-sm" : "input"}
              type="text"
              placeholder="Company Ltd"
              name="company"
              id="company"
              bind:value={$form.company}
            />
          </label>
          {#if $errors.company}
            <small class="text-red-600 block mt-1">{$errors.company}</small>
          {/if}
        </div>
        <div class="col-span-2">
          <label class="label" for="applicationUrl">
            <span class="font-bold">Deadline <span class="text-red-400">*</span></span>
            <input
              class={$errors.expiresAt ? "input-error block w-full rounded-sm" : "input"}
              type="date"
              name="expiresAt"
              id="expiresAt"
              bind:value={$form.expiresAt}
            />
          </label>
          {#if $errors.expiresAt}
            <small class="text-red-600 block mt-1">{$errors.expiresAt}</small>
          {/if}
        </div>
      </div>
      <button type="submit" class="btn variant-filled w-full mt-8 mb-8">Create Job</button>
    </form>
  </div>
</section>
