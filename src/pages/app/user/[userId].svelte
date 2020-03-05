<script>
  import { getJson } from '../../_api.js';

  export let userId;

  async function getPatientInfo() {
    return await getJson(`/user/${userId}`);
  }

  async function getPatientSessions() {
    return await getJson(`/user/${userId}/sessions`);
  }
</script>

{#await getPatientInfo()}
  <!-- promise is pending -->
  <p>Loading user...</p>
{:then info}
  <!-- promise was fulfilled -->
  <h1>User Profile for {info.user_name} ({info.user_full_name})</h1>
{/await}

<h2>Sessions</h2>

{#await getPatientSessions()}
  <p>Loading sessions...</p>
{:then sessions}
  <table>
    <tr>
      <th>Scenario</th>
      <th>Date/Time</th>
    </tr>
    {#each sessions as session}
      <tr>
        <td>{session['type_name']}</td>
        <td>
          <a href="/app/session/{session['session_id']}">{session['session_datetime']}</a>
        </td>
      </tr>
    {/each}
  </table>
{/await}