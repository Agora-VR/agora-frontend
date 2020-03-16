<script>
  import { getJson } from '../../../_api.js';

  export let sessionId;

  async function getSession() {
    return await getJson(`/session/${sessionId}`);
  }

  async function getResponses() {
    return await getJson(`/session/${sessionId}/responses`);
  }

  async function getFiles() {
    return await getJson(`/session/${sessionId}/files`);
  }
</script>

<h1>Session</h1>

{#await getSession()}
  <div>Loading Information...</div>
{:then sessionInfo}
  <table>
    <tr>
      <th>Patient Name</th>
      <td>{sessionInfo['user_full_name']} ({sessionInfo['user_name']})</td>
    </tr>
    <tr>
      <th>Date/Time</th>
      <td>{sessionInfo['session_datetime']}</td>
    </tr>
  </table>
{/await}

<h2>Files</h2>

{#await getFiles()}
  <!-- promise is pending -->
{:then files}
  <!-- promise was fulfilled -->
  <table>
    <tr>
      <th>Type</th>
    </tr>
    {#each files as file}
      <tr>
        <td>{file.type}</td>
        <td><a href="/app/session/{sessionId}/{file.type}">View</a></td>
      </tr>
    {/each}
  </table>
{/await}

<h2>Forms</h2>

<p>
  Respond to this session <a href="{sessionId}/response">here</a>.
</p>

<table>
<tr>
  <th>Name</th>
  <th>Date/Time</th>
</tr>
{#await getResponses()}
  <!-- promise is pending -->
{:then responses}
  {#each responses as response}
    <tr>
      <td>{response['user_full_name']} ({response['user_name']})</td>
      <td>{response['response_datetime']}</td>
      <td><a href="/app/form/{response['response_id']}">View</a></td>
    </tr>
  {/each}
{/await}
</table>
