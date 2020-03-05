<script>
  import { onMount } from 'svelte';

  import { getJson } from '../../_api.js';

  import Table from '../_components/Table.svelte';

  async function getPatients() {
    return await getJson('/clinician/patients');
  }
</script>

<h2>Patients</h2>

<!-- <Table spec={patientTable} /> -->

{#await getPatients()}
  <p>Loading patients...</p>
{:then patients}
  <table>
    <tr>
      <th>Name</th>
    </tr>
    {#each patients as patient}
      <tr>
        <td>
          <a href="/app/user/{patient.user_id}">{patient.user_full_name}</a>
          ({patient.user_name})
        </td>
      </tr>
    {/each}
  </table>
{/await}
