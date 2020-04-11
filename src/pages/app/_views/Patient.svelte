<script>
  import { getJson, postJsonWithAuth } from '../../_api.js';
  import { session } from '../../_store.js';

  import Card from '../_components/Card.svelte';
  import Message from '../../_components/Message.svelte';
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

  let caregiverRequestName = '';

  let caregiverMessage = {
    text: '',
    warning: false,
  };

  async function postCaregiverRequest() {
    const response = await postJsonWithAuth('/patient/caregiver', {
      user_name: caregiverRequestName,
    });

    caregiverMessage = {
      text: await response.text(),
      warning: !response.ok,
    };
  }

  let clinicianName = '';

  let clinicianMessage = {
    text: '',
    warning: false,
  };

  async function sendClinicianRequest() {
    const response = await postJsonWithAuth('/patient/clinician', {
      user_name: clinicianName,
    });

    clinicianMessage = {
      text: await response.text(),
      warning: !response.ok,
    };
  }
</script>

<Card title="Sessions">
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
</Card>

<Card title="Clinicians">
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

  <h3>Add</h3>

  <Message bind:message={clinicianMessage} />

  <div>
    <p>Enter a clinician's username to send them a request</p>
    <input type="text" bind:value={clinicianName}>
    <button on:click={sendClinicianRequest}>Send</button>
  </div>
</Card>

<Card title="Caregivers">
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

  <h3>Add</h3>

  <Message bind:message={caregiverMessage} />

  <div>
    <p>Enter a caregiver's username to send them a request</p>
    <input type="text" bind:value={caregiverRequestName}>
    <button on:click={postCaregiverRequest}>Send</button>
  </div>
</Card>
