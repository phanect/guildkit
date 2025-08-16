<script lang="ts">
  import "../../app.scss";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

{@render children()}
