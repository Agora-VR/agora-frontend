<script>
  import { onMount } from 'svelte';

  import { getJson, postJsonWithAuth } from '../../_api.js';

  import Card from '../_components/Card.svelte';
  import Message from '../../_components/Message.svelte';
  import Table from '../_components/Table.svelte';

  async function getPatients() {
    return await getJson('/clinician/patients');
  }

  let patients = [];

  async function getRequests() {
    return await getJson('/clinician/requests');
  }

  let requests = [];

  let requestMessage = {
    text: '',
    warning: false,
  };

  async function sendResponse(id, accept) {
    const response = await postJsonWithAuth('/clinician/request/response', {
      patient_id: id,
      accept: accept,
    });

    requestMessage = {
      text: await response.text(),
      warning: !response.ok,
    };

    patients = await getPatients();

    requests = await getRequests();
  }

  onMount(async () => {
    patients = await getPatients();

    requests = await getRequests();
	});
</script>

<Card title="Patients">
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

  <h3>Requests</h3>

  <Message bind:message={requestMessage} />

  <table>
    <tr>
      <th>Name</th>
    </tr>
    {#each requests as request}
      <tr>
        <td>
          {request.user_full_name} ({request.user_name})
        </td>
        <td>
          <button on:click={async () => await sendResponse(request.user_id, true)}>Accept</button>
          <button on:click={async () => await sendResponse(request.user_id, false)}>Deny</button>
        </td>
      </tr>
    {/each}
  </table>
</Card>
