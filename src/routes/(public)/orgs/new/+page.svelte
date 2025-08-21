<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { organizationSchema } from "$lib/validation/organization.validation.ts";
  import Button from "$lib/components/generic/Button.svelte";
  import Field from "$lib/components/generic/Field.svelte";

  const { data } = $props();

  if (!data.form) {
    throw new Error("Could not receive form data. Sorry, this is probably a bug of this website.");
  }

  const { form, errors, enhance } = superForm(data.form, {
    validators: organizationSchema,
  });

  // Initialize emails array from form data
  let emails = $state($form.emails ? $form.emails.split(";").map((email) => email.trim()).filter(Boolean) : [ "" ]);

  // Update form data when emails array changes
  $effect(() => {
    $form.emails = emails.filter((email) => email.trim()).join("; ");
  });

  function addEmail() {
    emails = [ ...emails, "" ];
  }

  function removeEmail(index: number) {
    if (emails.length > 1) {
      emails = emails.filter((_, i) => i !== index);
    }
  }

  function updateEmail(index: number, value: string) {
    emails[index] = value;
    emails = [ ...emails ]; // Trigger reactivity
  }
</script>

<section class="root">
  <h1 class="page-title">Create a new organization</h1>
  <form method="post" action="/employer/orgs?/create" use:enhance>
    <Field
      type="text"
      label="Organization Name"
      bind:value={$form.name}
      placeholder="Your Company Name"
      errormsgs={$errors.name}
      name="name"
      required
    />

    <div class="form-row">
      <Field
        type="text"
        label="Organization Slug"
        description="Used in URLs. Lowercase letters, numbers, and hyphens only"
        bind:value={$form.slug}
        placeholder="your-company-name"
        errormsgs={$errors.slug}
        name="slug"
        required
      />

      <Field
        type="url"
        label="Logo URL"
        bind:value={$form.logo}
        placeholder="https://yourcompany.com/logo.png"
        errormsgs={$errors.logo}
        name="logo"
      />
    </div>

    <Field
      type="url"
      label="Website URL"
      bind:value={$form.url}
      placeholder="https://yourcompany.com"
      errormsgs={$errors.url}
      name="url"
      required
    />

    <Field
      type="textarea"
      label="About"
      bind:value={$form.about}
      placeholder="Tell us about your organization..."
      errormsgs={$errors.about}
      name="about"
    />

    <div class="field-group">
      <label class="field-label">
        Contact Emails
        <span class="required">*</span>
      </label>
      <div class="emails-container">
        {#each emails as email, index (index)}
          <div class="email-row">
            <input
              type="email"
              class="email-input"
              bind:value={email}
              on:input={(e) => updateEmail(index, e.target.value)}
              placeholder="contact@yourcompany.com"
              required={index === 0}
              name="emails"
            />
            <button
              type="button"
              class="add-button"
              onclick={addEmail}
              title="Add another email"
            >
              <img src="/static/vendor/octicons/plus.svg" alt="Add" />
            </button>
            {#if emails.length > 1}
              <button
                type="button"
                class="remove-button"
                onclick={() => removeEmail(index)}
                title="Remove this email"
              >
                ×
              </button>
            {/if}
          </div>
        {/each}
      </div>
      {#if $errors.emails}
        <div class="error-messages">
          {#each $errors.emails as error}
            <div class="error-message">{error}</div>
          {/each}
        </div>
      {/if}
    </div>

    <Field
      type="textarea"
      label="Addresses"
      description="Separate multiple addresses with semicolons ;"
      bind:value={$form.addresses}
      placeholder="123 Main St, City, Country; 456 Branch Ave, Another City, Country"
      errormsgs={$errors.addresses}
      name="addresses"
      required
    />

    <Field
      type="text"
      label="Supported Currencies"
      description="Separate multiple currencies with semicolons ; - e.g., USD; EUR; JPY"
      bind:value={$form.currencies}
      placeholder="USD; EUR; JPY"
      errormsgs={$errors.currencies}
      name="currencies"
      required
    />

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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .field-group {
    margin-bottom: 1.5rem;
  }

  .field-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary, #333);
  }

  .required {
    color: var(--error-color, #dc2626);
  }

  .emails-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .email-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .email-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.375rem;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--primary-color-light, rgba(59, 130, 246, 0.1));
    }
  }

  .add-button,
  .remove-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.375rem;
    background: var(--background-secondary, #f9fafb);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--background-tertiary, #f3f4f6);
      border-color: var(--border-hover, #9ca3af);
    }
  }

  .add-button img {
    width: 16px;
    height: 16px;
  }

  .remove-button {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--error-color, #dc2626);

    &:hover {
      background: var(--error-background, #fef2f2);
      border-color: var(--error-color, #dc2626);
    }
  }

  .error-messages {
    margin-top: 0.5rem;
  }

  .error-message {
    color: var(--error-color, #dc2626);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
</style>
