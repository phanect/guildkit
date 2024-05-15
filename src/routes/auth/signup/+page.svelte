<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { signupSchema } from "$lib/validation/user.validation.ts";
  import type { PageData } from "./$types";
  import { Toast, toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  export let data: PageData;
  const { form, errors, enhance } = superForm(data.form, {
    validators: signupSchema,
    onError: (error) => {
      const t: ToastSettings = {
        message: error.result.error.message,
        background: "variant-filled-error",
      };
      toastStore.trigger(t);
    },
  });
</script>

<!--<SuperDebug data={$form} />-->
<Toast position="br" />

<section
  class="border border-gray-300 w-fit shadow-md mx-auto align-middle p-5 rounded font-roboto h-fit my-auto mt-8"
>
  <h3 class="font-medium mb-7 text-xl">Sign up</h3>

  <!-- <button class="bg-white hover:bg-gray-50  font-bold py-2 rounded flex items-center justify-center gap-2 border border-gray-200">
    <img src="/vendor/logos/google.svg" alt="" />
        <span class="font-medium">
                Login with google
            </span>
    </button>

    <hr class="h-px my-8 bg-gray-200 border-0"> -->

  <form method="post" use:enhance>
    <div>
      <label class="label" for="full_name">
        <span>Full name</span>
        <input
          class={$errors.full_name ? "input-error block w-full" : "input"}
          type="text"
          placeholder="John Doe"
          name="full_name"
          id="full_name"
          bind:value={$form.full_name}
        />
      </label>
      {#if $errors.full_name}
        <small class="text-red-600">{$errors.full_name}</small>
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
