<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { organizationSchema } from "$lib/validation/organization.validation.ts";
  import Button from "$lib/components/generic/Button.svelte";

  const { data } = $props();

  if (!data.form) {
    throw new Error("Could not receive form data. Sorry, this is probably a bug of this website.");
  }

  const { form, errors, enhance } = superForm(data.form, {
    validators: organizationSchema,
  });
</script>

<section class="root">
  <h1 class="page-title">Create a new organization</h1>
  <form method="post" action="/employer/orgs?/create" use:enhance>
    <div class="form-field">
      <label class="field-label" for="name">
        <span class="label-text">Organization Name <span class="required">*</span></span>
        <input
          class={$errors.name ? "input input-error" : "input"}
          type="text"
          placeholder="Your Company Name"
          name="name"
          id="name"
          bind:value={$form.name}
        />
      </label>
      {#if $errors.name}
        <small class="error-text">{$errors.name}</small>
      {/if}
    </div>

    <div class="form-row">
      <div class="form-field">
        <label class="field-label" for="slug">
          <span class="label-text">Organization Slug <span class="required">*</span></span>
          <span class="help-text">(Used in URLs, lowercase letters, numbers, and hyphens only)</span>
          <input
            class={$errors.slug ? "input input-error" : "input"}
            type="text"
            placeholder="your-company-name"
            name="slug"
            id="slug"
            bind:value={$form.slug}
          />
        </label>
        {#if $errors.slug}
          <small class="error-text">{$errors.slug}</small>
        {/if}
      </div>
      <div class="form-field">
        <label class="field-label" for="logo">
          <span class="label-text">Logo URL</span>
          <input
            class={$errors.logo ? "input input-error" : "input"}
            type="url"
            placeholder="https://yourcompany.com/logo.png"
            name="logo"
            id="logo"
            bind:value={$form.logo}
          />
        </label>
        {#if $errors.logo}
          <small class="error-text">{$errors.logo}</small>
        {/if}
      </div>
    </div>

    <div class="form-field">
      <label class="field-label" for="url">
        <span class="label-text">Website URL <span class="required">*</span></span>
        <input
          class={$errors.url ? "input input-error" : "input"}
          type="url"
          placeholder="https://yourcompany.com"
          name="url"
          id="url"
          bind:value={$form.url}
        />
      </label>
      {#if $errors.url}
        <small class="error-text">{$errors.url}</small>
      {/if}
    </div>

    <div class="form-field">
      <label class="field-label" for="about">
        <span class="label-text">About</span>
        <textarea
          class={$errors.about ? "input input-error" : "input"}
          placeholder="Tell us about your organization..."
          name="about"
          id="about"
          bind:value={$form.about}
        ></textarea>
      </label>
      {#if $errors.about}
        <small class="error-text">{$errors.about}</small>
      {/if}
    </div>

    <div class="form-field">
      <label class="field-label" for="emails">
        <span class="label-text">Contact Emails <span class="required">*</span></span>
        <span class="help-text">(Separate multiple emails with semicolons ";")</span>
        <input
          class={$errors.emails ? "input input-error" : "input"}
          type="text"
          placeholder="contact@yourcompany.com; hr@yourcompany.com"
          name="emails"
          id="emails"
          bind:value={$form.emails}
        />
      </label>
      {#if $errors.emails}
        <small class="error-text">{$errors.emails}</small>
      {/if}
    </div>

    <div class="form-field">
      <label class="field-label" for="addresses">
        <span class="label-text">Addresses <span class="required">*</span></span>
        <span class="help-text">(Separate multiple addresses with semicolons ";")</span>
        <textarea
          class={$errors.addresses ? "input input-error" : "input"}
          placeholder="123 Main St, City, Country; 456 Branch Ave, Another City, Country"
          name="addresses"
          id="addresses"
          bind:value={$form.addresses}
        ></textarea>
      </label>
      {#if $errors.addresses}
        <small class="error-text">{$errors.addresses}</small>
      {/if}
    </div>

    <div class="form-field">
      <label class="field-label" for="currencies">
        <span class="label-text">Supported Currencies <span class="required">*</span></span>
        <span class="help-text">(Separate multiple currencies with semicolons ";" - e.g., USD; EUR; JPY)</span>
        <input
          class={$errors.currencies ? "input input-error" : "input"}
          type="text"
          placeholder="USD; EUR; JPY"
          name="currencies"
          id="currencies"
          bind:value={$form.currencies}
        />
      </label>
      {#if $errors.currencies}
        <small class="error-text">{$errors.currencies}</small>
      {/if}
    </div>

    <Button theme="button-deep" width="100%">Create Organization</Button>
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
