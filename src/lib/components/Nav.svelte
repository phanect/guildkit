<script lang="ts">
  import { enhance } from "$app/forms";

  export let data: {
    isLoggedIn: boolean;
  };
</script>

<nav class="flex items-center justify-between flex-wrap py-6 px-20">
  <div class="flex items-center flex-shrink-0 mr-6">
    <img src="/images/to-be-added.svg" alt="GuildKit" decoding="async" />
    <a href="/" class="font-semibold text-xl tracking-tight">GuildKit</a>
  </div>
  <div class="flex items-center">
    {#if !data.isLoggedIn}
      <a
        href="/auth/signup"
        class="btn btn-xl border border-black w-fit rounded-full hover:bg-black hover:text-white"
        >Sign up</a
      >
    {:else}
      <a href="/employer/jobs" class="mr-8 font-bold">Dashboard</a>
      <form action="/auth/logout?" method="post" use:enhance>
        <button
          type="submit"
          class="btn btn-xl border border-black font-bold w-fit rounded-full hover:bg-black hover:text-white"
        >
          Log out
        </button>
      </form>
    {/if}
  </div>
</nav>
