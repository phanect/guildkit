<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  } & (
    {
      action: string;
      method?: "post";
      params?: Record<string, string>;

      onclick?: undefined;
    }
    | {
      onclick?: HTMLButtonElement["onclick"];

      action?: undefined;
      method?: undefined;
      params?: undefined;
    }
  );

  const { action, method = "post", params = {}, onclick, children }: Props = $props();
</script>

<style lang="scss">
  @import "$lib/styles/button-linktext.scss";
</style>

<!-- TODO Avoid if blocks? It might cause performance overhead on frontend. -->

{#if action}
  <form {action} {method} use:enhance>
    {#each Object.entries(params) as [ name, val ] }
      <input type="hidden" {name} value={val} />
    {/each}

    <button type="submit" class="button">
      {@render children()}
    </button>
  </form>
{:else}
  <button type="submit" class="button" {onclick}>
    {@render children()}
  </button>
{/if}
