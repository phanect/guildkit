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

<div
  class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
  use:portal
>
  {#each $toasts as { id, data } (id)}
    <div
      use:melt={$content(id)}
      animate:flip={{ duration: 500 }}
      in:fly={{ duration: 150, x: "100%" }}
      out:fly={{ duration: 150, x: "100%" }}
      class="rounded-lg bg-neutral-800 text-white shadow-md"
    >
      <div
        class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
      >
        <div>
          <h3
            use:melt={$title(id)}
            class="flex items-center gap-2 font-semibold"
          >
            {data.title}
            <span class="size-1.5 rounded-full {data.color}"></span>
          </h3>
          <div use:melt={$description(id)}>
            {data.description}
          </div>
        </div>
        <button
          use:melt={$close(id)}
          class="absolute right-4 top-4 grid size-6 place-items-center rounded-full text-magnum-500
          hover:bg-magnum-900/50"
        >
          <img src="/vendor/octicons/x.svg" alt="Close" class="size-4" decoding="async" />
        </button>
      </div>
    </div>
  {/each}
</div>
