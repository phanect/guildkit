<script lang="ts">
  import "../../app.postcss";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

{@render children()}
