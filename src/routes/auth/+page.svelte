<script lang="ts">
  import { signInWith } from "$lib/auth/client.ts";
  import Button from "$lib/components/generic/Button.svelte";
  import CenterBox from "$lib/components/generic/CenterBox.svelte";
</script>

<style lang="scss">
  .h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
</style>

<CenterBox>
  <h1 class="h1">Sign in or Sign up</h1>

  <div class="buttons">
    <Button onclick={() => signInWith("google")} width="16em">
      Signin with Google
    </Button>

    <Button onclick={() => signInWith("github")} width="16em">
      Signin with GitHub
    </Button>
  </div>
</CenterBox>
