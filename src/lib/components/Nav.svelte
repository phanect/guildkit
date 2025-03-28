<script lang="ts">
  import type { LayoutProps } from "../../routes/$types";
  import Button from "./generic/Button.svelte";

  const { isLoggedIn }: LayoutProps["data"] = $props();
</script>

<style>
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
      <Button href="/auth/signup">Log in <span class="text-separator"></span> Sign up</Button>
    {:else}
      <a href="/employer/jobs" class="mr-8 font-bold">Dashboard</a>
      <Button action="/auth/logout?">Log out</Button>
    {/if}
  </div>
</nav>
