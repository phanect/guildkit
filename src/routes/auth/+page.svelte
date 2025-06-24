<script lang="ts">
  import { signInWith } from "$lib/auth/client.ts";
  import Button from "$lib/components/generic/Button.svelte";
</script>

<style lang="scss">
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
</style>

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
</section>
