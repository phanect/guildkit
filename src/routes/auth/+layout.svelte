<script lang="ts">
  import "$lib/styles/global.scss";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

{@render children()}
