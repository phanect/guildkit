<script lang="ts">
  import { signUpWith } from "$lib/auth/client.ts";
  import Button from "$lib/components/generic/Button.svelte";
  import CenterBox from "$lib/components/generic/CenterBox.svelte";
  import Link from "$lib/components/generic/Link.svelte";
</script>

<style lang="scss">
  .h1 {
    font-size: 1.75rem;
  }

  .description {
    margin-bottom: 1.25rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
</style>

<CenterBox>
  <h1 class="h1">Create new user?</h1>

  <p class="description">
    Your account is not associated with GuildKit account.<br />
    Create new user or login with another account.
  </p>

  <div class="options">
    <Button onclick={ () => signUpWith("github", "candidate") } width="16em">
      Create account as a <strong>candidate</strong>
    </Button>

    <Button onclick={ () => signUpWith("github", "recruiter") } width="16em">
      Create account as a <strong>recruiter</strong>
    </Button>

    <Link href="/auth">
      Login with another account
    </Link>
  </div>
</CenterBox>
