<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import Toast, { addToast } from "$lib/components/generic/Toast.svelte";
  import { signupSchema } from "$lib/validation/user.validation.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { form, errors, enhance } = superForm(data.form, {
    validators: signupSchema,
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

<section
  class="border border-gray-300 w-fit shadow-md mx-auto align-middle p-5 rounded-sm font-roboto h-fit my-auto mt-8"
>
  <h3 class="font-medium mb-7 text-xl">Sign up</h3>

  <form method="post" use:enhance>
    <div>
      <label class="label" for="fullname">
        <span>Full name</span>
        <input
          class={$errors.fullname ? "input-error block w-full" : "input"}
          type="text"
          placeholder="John Doe"
          name="fullname"
          id="fullname"
          bind:value={$form.fullname}
        />
      </label>
      {#if $errors.fullname}
        <small class="text-red-600">{$errors.fullname}</small>
      {/if}
    </div>
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
          class={$errors.password ? "input-error block w-full" : "input"}
          type="password"
          placeholder="•••••••••"
          name="password"
          id="password"
          bind:value={$form.password}
        />
      </label>
      {#if $errors.password}
        <small class="text-red-600">{$errors.password}</small>
      {/if}
    </div>
    <button type="submit" class="btn variant-filled w-full mt-8 mb-8">Sign up</button>
  </form>
  <hr class="h-px my-8 bg-gray-200 border-0" />

  <div class="flex flex-col justify-center items-center">
    <p class="text-gray-500">Already have an account?</p>
    <a href="/auth/login" class="block text-blue-700">Log in</a>
  </div>
</section>
