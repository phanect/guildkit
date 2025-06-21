<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "./generic/Button.svelte";
  import Link from "./generic/Link.svelte";

  type Props = {
    isLoggedIn: boolean;
  };

  const { isLoggedIn }: Props = $props();
</script>

<style lang="scss">
  .nav {
    padding: 2rem;
  }

  .title {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
  }
  .title-text {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .right-section {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .text-separator::after {
    content: "|";
    color: #606060;
  }
</style>

<!-- TODO Pre-alpha caution: Delete on the official release -->
<div style="display: flex; justify-content: center; align-items: center; width=100%; height: 2.5rem; background-color: red; color: white;">
  Caution: GuildKit is still pre-alpha state and there are probably a lot of bugs. Do not enter any private information for your security.
</div>
<!-- /Pre-alpha caution -->

<nav class="nav flex items-center justify-between flex-wrap py-6 px-20">
  <a href="/" class="title">
    <img
      src="https://tmp.guildkit.net/canvaai/guildkit_icon_tmp.png"
      width="64"
      height="64"
      alt=""
      decoding="async"
    />
    <span class="title-text">GuildKit</span>
  </a>
  <div class="right-section">
    {#if !isLoggedIn}
      <Link href="/auth/signup" theme="button">Log in <span class="text-separator"></span> Sign up</Link>
    {:else}
      <a href="/employer/jobs" class="mr-8 font-bold">Dashboard</a>

      <form action="/auth/logout?" use:enhance>
        <Button>Log out</Button>
      </form>
    {/if}
  </div>
</nav>
