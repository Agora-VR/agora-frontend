<svelte:head>
  <title>Agora | Profile</title>
</svelte:head>

<script>
  import { session } from '../_store.js';

  import Clinician from './_views/Clinician.svelte';
  import Patient from './_views/Patient.svelte';

  const profiles = {
    'patient': Patient,
    'clinician': Clinician,
    'caregiver': null,
  }

  let sessionClass, sessionType;

  sessionType = $session['user_type'];
  sessionClass = profiles[sessionType];
</script>

<h1>Profile for {$session['user_name']} ({sessionType})</h1>

<p>Welcome to your profile!</p>

<p>Please <a href="/app/register_form">fill out the registration questionaire</a>!</p>

<svelte:component this={sessionClass} />