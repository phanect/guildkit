<script lang="ts">
  import type { PageProps } from "./$types.d.ts";

  const { data }: PageProps = $props();
</script>

<p>
  { data.message }
</p>
