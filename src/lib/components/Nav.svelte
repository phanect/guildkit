<script lang="ts">
  import type { LayoutProps } from "../../routes/$types";
  import Button from "./generic/Button.svelte";

  const { isLoggedIn }: LayoutProps["data"] = $props();
</script>

<nav class="flex items-center justify-between flex-wrap py-6 px-20">
  <div class="flex items-center shrink-0 mr-6">
    <img src="/images/to-be-added.svg" alt="GuildKit" decoding="async" />
    <a href="/" class="font-semibold text-xl tracking-tight">GuildKit</a>
  </div>
  <div class="flex items-center">
    {#if !isLoggedIn}
      <Button href="/auth/signup">Sign up</Button>
    {:else}
      <a href="/employer/jobs" class="mr-8 font-bold">Dashboard</a>
      <Button action="/auth/logout?">Log out</Button>
    {/if}
  </div>
</nav>
