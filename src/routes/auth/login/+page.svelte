<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { loginSchema } from "$lib/validation/user.validation.ts";
  import type { PageData } from "./$types";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import { Toast, toastStore } from "@skeletonlabs/skeleton";

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form, {
    validators: loginSchema,
    onError: (error) => {
      const t: ToastSettings = {
        message: error.result.error.message,
        background: "variant-filled-warning",
      };
      toastStore.trigger(t);
    },
  });
</script>

<!--<SuperDebug data={$form} />-->
<Toast position="br" />
<section
  class="border border-gray-300 w-fit shadow-md mx-auto align-middle p-5 rounded font-roboto h-fit my-auto mt-32"
>
  <h3 class="font-medium mb-7 text-xl">Login</h3>

  <!-- <button
    class="bg-white hover:bg-gray-50 font-bold py-2 rounded flex items-center justify-center gap-2 border border-gray-200"
  >
    <img src="/vendor/logos/google.svg" alt="" />
    <span class="font-medium"> Login with google </span>
  </button>

  <hr class="h-px my-8 bg-gray-200 border-0" /> -->

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

  <hr class="h-px my-8 bg-gray-200 border-0" />

  <div class="flex flex-col justify-center items-center">
    <p class="text-gray-500">Don't have an account?</p>
    <a href="/auth/signup" class="block text-blue-700">Sign up</a>
  </div>
</section>
