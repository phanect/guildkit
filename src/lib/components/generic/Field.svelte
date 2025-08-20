<script lang="ts">
  type Props = {
    type: "text" | "email" | "url" | "password" | "textarea";
    label: string;
    description?: string;
    value: unknown;
    placeholder: string;
    errormsgs: string[] | undefined;
    name: string;
    required?: boolean;
  };

  const {
    type,
    label,
    description,
    value = $bindable(),
    placeholder,
    errormsgs,
    required = false,
    name,
  }: Props = $props();

  const errormsg = errormsgs?.join(" ");
</script>

<div class="form-field">
  <label class="field-label" for={name}>
    <span class="label-text">{label}{#if required} <span class="required">*</span>{/if}</span>
    {#if description}
      <span class="help-text">{description}</span>
    {/if}

    {#if type === "textarea"}
      <textarea
        {placeholder}
        class={errormsg ? "input input-error" : "input"}
        {name}
        id={name}
      >{value}</textarea>
    {:else}
      <input
        type={type}
        {value}
        {placeholder}
        class={errormsg ? "input input-error" : "input"}
        {name}
        id={name}
      />
    {/if}
  </label>
  {#if errormsg}
    <small class="error-text">{errormsg}</small>
  {/if}
</div>

<style>
  .form-field {
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
