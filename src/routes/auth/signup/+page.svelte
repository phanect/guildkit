<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import Button from "$lib/components/generic/Button.svelte";

  const roleRaw = page.url.searchParams.get("defaultrole")?.toLowerCase();
  // If `role` is not set, set `candidate` as default
  let role = $state(roleRaw === "recruiter" ? roleRaw : "candidate");
</script>

<h1>
  You are creating a <strong>{ role }</strong> account
</h1>
<p>Correct it if it is a wrong account type.</p>

<form method="POST" action="?/setRole" use:enhance>
  <fieldset>
    <div>
      <input
        type="radio"
        name="role"
        id="candidate"
        value="candidate"
        checked={ role === "candidate" }
        onclick={ () => role = "candidate" }
      />
      <label for="candidate">Candidate</label>
    </div>
    <div>
      <input
        type="radio"
        name="role"
        id="recruiter"
        value="recruiter"
        checked={ role === "recruiter" }
        onclick={ () => role = "recruiter" }
      />
      <label for="recruiter">Recruiter</label>
    </div>
  </fieldset>

  <Button>
    Create account as a <strong>{ role }</strong>
  </Button>
</form>
