<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/generic/Button.svelte";
</script>

<style lang="scss">
  .container-outer {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
  }
</style>

<div class="container-outer">
  <div>
    <h1>
      You are creating a <strong>candidate</strong> account. Are you sure?
    </h1>

    <form method="POST" action="?/setRole" use:enhance>
      <Button>
        Create account as a <strong>candidate</strong>
      </Button>
    </form>

    <a href="/auth/signup/recruiter">
      Create user as a recruiter instead
    </a>
  </div>
</div>
