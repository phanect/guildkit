<script lang="ts">
  import { signOut } from "$lib/auth/client";
  import Button from "./generic/Button.svelte";
  import Link from "./generic/Link.svelte";
  import type { UserType } from "$lib/db/schema/user.ts";
  import TopBar from "./generic/TopBar.svelte";

  type Props = {
    for: UserType | "guest";
  };

  const { for: userType }: Props = $props();
</script>

<style lang="scss">
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.5rem 5rem;
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

  .dashboard-link {
    margin-right: 2rem;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
  }

  .text-separator::after {
    content: "|";
    color: #606060;
  }
</style>

<!-- TODO Pre-alpha caution: Delete on the official release -->
<TopBar>
  Caution: GuildKit is still pre-alpha state and there are probably a lot of bugs. Do not enter any private information for your security.
</TopBar>
<!-- /Pre-alpha caution -->

<nav class="nav">
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
      <a href="/employer/jobs" class="dashboard-link">Dashboard</a>
    {/if}

    {#if userType === "guest"}
      <Link href="/auth" theme="button-deep">Log in <span class="text-separator"></span> Sign up</Link>
    {:else}
      <Button theme="button-pale" onclick={ async () => signOut() }>Log out</Button>
    {/if}
  </div>
</nav>
