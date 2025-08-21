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

    <Field
      type="text"
      label="Contact Emails"
      description="Separate multiple emails with semicolons ;"
      bind:value={$form.emails}
      placeholder="contact@yourcompany.com; hr@yourcompany.com"
      errormsgs={$errors.emails}
      name="emails"
      required
    />

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
</style>
