<script lang="ts">
  import { signOut } from "$lib/auth/client";
  import Button from "./generic/Button.svelte";
  import Link from "./generic/Link.svelte";
  import type { UserType } from "$lib/db/schema/user.ts";

  type Props = {
    for: UserType | "guest";
  };

  const { for: userType }: Props = $props();
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
    {#if userType === "recruiter" || userType === "administrative"}
      <a href="/employer/jobs" class="mr-8 font-bold">Dashboard</a>
    {/if}

    {#if userType === "guest"}
      <Link href="/auth" theme="button">Log in <span class="text-separator"></span> Sign up</Link>
    {:else}
      <Button onclick={ async () => signOut() }>Log out</Button>
    {/if}
  </div>
</nav>
