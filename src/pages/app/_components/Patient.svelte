<script>
  import { onMount } from 'svelte';

  import { getJson } from '../../_api.js';

  export let token;

  let clinicians = [];

  onMount(async () => clinicians = await getJson('/user/clinicians', token));
</script>

<h2>Clinicians</h2>

<table>
  <tr>
    <th>Username</th>
  </tr>
{#each clinicians as clinician}
  <tr>
    <td>{clinician.user_name}</td>
  </tr>
{/each}
</table>