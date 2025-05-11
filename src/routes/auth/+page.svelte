<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { signInWith } from "$lib/auth/client.ts";
  import Button from "$lib/components/generic/Button.svelte";
  import Toast, { addToast } from "$lib/components/generic/Toast.svelte";
  import { loginSchema } from "$lib/validation/user.validation.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const { form, errors, enhance } = superForm(data.form, {
    validators: loginSchema,
    onError: (error) => {
      addToast({
        data: {
          title: "Error",
          description: error.result.error.message,
          color: "variant-filled-warning",
        },
      });
    },
  });
</script>

<style lang="scss">
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
</style>

<Toast />
<section
  class="border border-gray-300 w-fit shadow-md mx-auto align-middle p-5 rounded-sm font-roboto h-fit my-auto mt-32"
>
  <h3 class="font-medium mb-7 text-xl">Sign in or Sign up</h3>

  <div class="buttons">
    <Button onclick={() => signInWith("google")} width="16em">
      Signin with Google
    </Button>

    <Button onclick={() => signInWith("github")} width="16em">
      Signin with GitHub
    </Button>
  </div>

  <form method="post" use:enhance>
    <div>
      <label class="label" for="email">
        <span>Email</span>
        <input
          class={$errors.email ? "input-error block w-full" : "input"}
          type="email"
          placeholder="johndoe@example.com"
          name="email"
          id="email"
          bind:value={$form.email}
        />
      </label>
      {#if $errors.email}
        <small class="text-red-600">{$errors.email}</small>
      {/if}
    </div>
    <div>
      <label class="label" for="password">
        <span>Password</span>
        <input
          class="input"
          type="password"
          placeholder="•••••••••"
          name="password"
          id="password"
        />
      </label>
    </div>
    <button type="submit" class="btn variant-filled w-full mt-8 mb-8">Log in</button>
  </form>
</section>
