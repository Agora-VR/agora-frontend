<svelte:head>
  <title>Agora | Profile</title>
</svelte:head>

<script>
  import { getJson } from '../_api.js';

  import { session } from '../_store.js';

  import Caregiver from './_views/Caregiver.svelte';
  import Clinician from './_views/Clinician.svelte';
  import Patient from './_views/Patient.svelte';

  const profiles = {
    'caregiver': Caregiver,
    'clinician': Clinician,
    'patient': Patient,
  }

  let sessionClass, sessionType;

  sessionType = $session['user_type'];
  sessionClass = profiles[sessionType];

  async function getRegistrationResponseId() {
    const response = await getJson('/user/registration_response');
    console.log(response);
    return response;
  }
</script>

<h1>Profile for {$session['user_name']} ({sessionType})</h1>

<p>Welcome to your profile!</p>

{#await getRegistrationResponseId()}
  <!-- promise is pending -->
{:then response}
  <!-- promise was fulfilled -->
  {#if response.user_response_id}
     <!-- content here -->
     <p>You filled out your registration form! Thank you!</p>
  {:else}
     <!-- else content here -->
    <p>Please <a href="/app/register_form">fill out the registration questionaire</a>!</p>
  {/if}
{/await}

<svelte:component this={sessionClass} />