<script>
  import { onMount } from 'svelte';

  import { getJson } from '../../_api.js';
  import { session } from '../../_store.js';

  import Table from '../_components/Table.svelte';

  let clinicianTable = {
    headers: [
      {title: 'Full Name', key: 'user_full_name'},
      {title: 'Username', key: 'user_name'},
    ],
    rows: []
  }

  let caregiverTable = {
    headers: [
      {title: 'Full Name', key: 'user_full_name'},
      {title: 'Username', key: 'user_name'},
    ],
    rows: []
  }

  onMount(async () => {
    clinicianTable.rows = await getJson('/patient/clinicians');

    clinicianTable = clinicianTable; // Trigger reaction
  });

  async function getSessions() {
    return await getJson(`/user/${$session['user_id']}/sessions`);
  }
</script>

<h2>Clinicians</h2>

<Table spec={clinicianTable} />

<h2>Caregivers</h2>

<Table spec={caregiverTable} />

<h2>Sessions</h2>

{#await getSessions()}
  <p>Loading sessions...</p>
{:then sessions}
  <table>
    <tr>
      <th>Date/Time</th>
    </tr>
    {#each sessions as session}
      <tr>
        <td>
          <a href="/app/session/{session['session_id']}">{session['session_datetime']}</a>
        </td>
      </tr>
    {/each}
  </table>
{/await}
