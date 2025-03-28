<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  } & (
    {
      href: string;
      preload?: boolean;

      action?: undefined;
      method?: undefined;
      params?: undefined;
    }
    | {
      action: string;
      method?: "post";
      params?: Record<string, string>;

      href?: undefined;
      preload?: undefined;
    }
  );

  const { href, preload = false, action, method = "post", params = {}, children }: Props = $props();
</script>

<style>
  .button {
    background-color: #e0e0e0;
    color: #000000;
    transition: background-color 0.25s;

    width: fit-content;
    border-radius: 0.75rem;

    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.75em;
    padding-right: 0.75em;

    cursor: pointer;
  }
  .button:hover {
    background-color: #c0c0c0;
    color: #111111;
  }
</style>

{#if href}
  <a {href} class="button" data-sveltekit-preload-data={ preload ? "hover" : null }>
    {@render children()}
  </a>
{:else}
  <form {action} {method} use:enhance>
    {#each Object.entries(params) as [ name, val ] }
      <input type="hidden" {name} value={val} />
    {/each}

    <button type="submit" class="button">
      {@render children()}
    </button>
  </form>
{/if}
