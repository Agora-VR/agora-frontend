<script>
  import { getJson } from '../../_api.js';
  import { session } from '../../_store.js';

  import Table from '../_components/Table.svelte';

  async function getCaregivers() {
    return await getJson('/patient/caregivers');
  }

  async function getClinicians() {
    return await getJson('/patient/clinicians');
  }

  async function getSessions() {
    return await getJson(`/user/${$session['user_id']}/sessions`);
  }
</script>

<h2>Clinicians</h2>

{#await getClinicians()}
  <p>Loading clinicians...</p>
{:then clinicians}
  <table>
    <tr>
      <th>Name</th>
    </tr>
    {#each clinicians as clinician}
      <tr>
        <td>
          {clinician.user_full_name} ({clinician.user_name})
        </td>
      </tr>
    {/each}
  </table>
{/await}

<h2>Caregivers</h2>

{#await getCaregivers()}
  <p>Loading caregivers...</p>
{:then caregivers}
  <table>
    <tr>
      <th>Name</th>
    </tr>
    {#each caregivers as caregiver}
      <tr>
        <td>
          {caregiver.user_full_name} ({caregiver.user_name})
        </td>
      </tr>
    {/each}
  </table>
{/await}

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
