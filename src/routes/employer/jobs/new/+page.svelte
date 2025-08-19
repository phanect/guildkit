<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { jobSchema } from "$lib/validation/job.validation.ts";
  import Button from "$lib/components/generic/Button.svelte";
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
<section class="root">
  <h1 class="page-title">Create a new job</h1>
  <form method="post" action="/employer/jobs?/create" use:enhance>
    <div class="form-field">
      <label class="field-label" for="title">
        <span class="label-text">Title <span class="required">*</span></span>
        <input
          class={$errors.title ? "input input-error" : "input"}
          type="text"
          placeholder="Job Title"
          name="title"
          id="title"
          bind:value={$form.title}
        />
      </label>
      {#if $errors.title}
        <small class="error-text">{$errors.title}</small>
      {/if}
    </div>
    <div class="form-field">
      <label class="field-label" for="description">
        <span class="label-text">Description <span class="required">*</span></span>
        <textarea
          class={$errors.description ? "input input-error" : "input"}
          placeholder="Job Description"
          name="description"
          id="description"
          bind:value={$form.description}
        ></textarea>
      </label>
      {#if $errors.description}
        <small class="error-text">{$errors.description}</small>
      {/if}
    </div>
    <div class="form-field">
      <label class="field-label" for="requirements">
        <span class="label-text">Requirements <span class="required">*</span></span>
        <span class="help-text">(Separate using ";" for better formatting)</span>
        <textarea
          class={$errors.requirements ? "input input-error" : "input"}
          placeholder="Requirement 1; Requirement 2; Requirement 3; etc"
          name="requirements"
          id="requirements"
          bind:value={$form.requirements}
        ></textarea>
      </label>
      {#if $errors.requirements}
        <small class="error-text">{$errors.requirements}</small>
      {/if}
    </div>

    <div class="form-field">
      <label class="field-label" for="applicationUrl">
        <span class="label-text">Application URL <span class="required">*</span></span>
        <span class="help-text">(Separate using ";" for better formatting)</span>
        <input
          class={$errors.applicationUrl ? "input input-error" : "input"}
          type="url"
          placeholder="https://yourcompany.com/careers/1"
          name="applicationUrl"
          id="applicationUrl"
          bind:value={$form.applicationUrl}
        />
      </label>
      {#if $errors.applicationUrl}
        <small class="error-text">{$errors.applicationUrl}</small>
      {/if}
    </div>
    <div class="form-row">
      <div class="form-field">
        <label class="field-label" for="location">
          <span class="label-text">Location <span class="required">*</span></span>
          <input
            class={$errors.location ? "input input-error" : "input"}
            type="text"
            placeholder="Remote"
            name="location"
            id="location"
            bind:value={$form.location}
          />
        </label>
        {#if $errors.location}
          <small class="error-text">{$errors.location}</small>
        {/if}
      </div>
      <div class="form-field">
        <label class="field-label" for="salary">
          <span class="label-text">Salary <span class="required">*</span></span>
          <input
            class={$errors.salary ? "input input-error" : "input"}
            type="number"
            placeholder="800000"
            step="100"
            name="salary"
            id="salary"
            bind:value={$form.salary}
          />
        </label>
        {#if $errors.salary}
          <small class="error-text">{$errors.salary}</small>
        {/if}
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <label class="field-label" for="company">
          <span class="label-text">Company name <span class="required">*</span></span>
          <input
            class={$errors.company ? "input input-error" : "input"}
            type="text"
            placeholder="Company Ltd"
            name="company"
            id="company"
            bind:value={$form.company}
          />
        </label>
        {#if $errors.company}
          <small class="error-text">{$errors.company}</small>
        {/if}
      </div>
      <div class="form-field">
        <label class="field-label" for="expiresAt">
          <span class="label-text">Deadline <span class="required">*</span></span>
          <input
            class={$errors.expiresAt ? "input input-error" : "input"}
            type="date"
            name="expiresAt"
            id="expiresAt"
            bind:value={$form.expiresAt}
          />
        </label>
        {#if $errors.expiresAt}
          <small class="error-text">{$errors.expiresAt}</small>
        {/if}
      </div>
    </div>
    <Button theme="button-deep" width="100%">Create Job</Button>
  </form>
</section>

<style lang="scss">
  @use "$lib/styles/mixins.scss";

  .root {
    @include mixins.page-root;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .form-field {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .field-label {
    display: block;
    width: 100%;
  }

  .label-text {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  .required {
    color: #f87171;
  }

  .help-text {
    font-size: 0.875rem;
    color: #6b7280;
    display: block;
    margin-bottom: 0.5rem;
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &.input-error {
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
  }

  textarea.input {
    min-height: 100px;
    resize: vertical;
  }

  .error-text {
    color: #dc2626;
    font-size: 0.875rem;
    display: block;
    margin-top: 0.25rem;
  }
</style>
