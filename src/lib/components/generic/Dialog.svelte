<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";
  import type { Snippet } from "svelte";

  type Props = {
    openText: string;
    closeText: string;
    children: Snippet;
  }
  const { openText, closeText, children }: Props = $props();

  const {
    elements: { trigger, portalled, overlay, content, close },
    states: { open }
  } = createDialog();
</script>

<style lang="scss">
  .overlay {
    position: fixed;
    inset: 0;

    z-index: 50;

    background-color: rgba(86, 86, 86, 0.2);
  }

  .dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    padding: 1.5rem;
    border-radius: 0.5rem;

    z-index: 50;

    background-color: #ffffff;
  }
</style>

<button use:melt={$trigger}>
  { openText }
</button>

{#if $open}
  <div use:melt={$portalled} class="container">
    <div use:melt={$overlay} class="overlay"></div>
    <div use:melt={$content} class="dialog">
      {@render children()}
      <button use:melt={$close}>
        { closeText }
      </button>
    </div>
  </div>
{/if}
