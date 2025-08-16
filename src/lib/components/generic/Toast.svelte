<script lang="ts" context="module">
  import { createToaster, melt } from "@melt-ui/svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  type ToastData = {
    title: string;
    description: string;
    color: string;
  };

  const {
    elements: { content, title, description, close },
    helpers: { addToast },
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>();

  export { addToast };
</script>

<div class="container" use:portal>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      animate:flip={{ duration: 500 }}
      in:fly={{ duration: 150, x: "100%" }}
      out:fly={{ duration: 150, x: "100%" }}
      class="item"
    >
      <div class="content">
        <div>
          <h3 use:melt={$title(id)} class="title">
            {data.title}
            <span class="status-indicator {data.color}"></span>
          </h3>
          <div use:melt={$description(id)}>
            {data.description}
          </div>
        </div>
        <button use:melt={$close(id)} class="close">
          <img src="/vendor/octicons/x.svg" alt="Close" class="close-icon" decoding="async" />
        </button>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 50;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;

    @media (min-width: 768px) {
      bottom: 0;
      top: auto;
    }
  }

  .item {
    border-radius: 0.5rem;
    background-color: rgb(38 38 38);
    color: white;
    box-shadow: 10px 10px 10px rgb(0 0 0 / 0.3);
  }

  .content {
    position: relative;
    display: flex;
    width: 24rem;
    max-width: calc(100vw - 2rem);
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .status-indicator {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
  }

  .close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    display: grid;
    width: 1.5rem;
    height: 1.5rem;
    place-items: center;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: rgb(245 158 11);
    cursor: pointer;

    &:hover {
      background-color: rgb(120 53 15 / 0.5);
    }
  }

  .close-icon {
    width: 1rem;
    height: 1rem;
  }
</style>
