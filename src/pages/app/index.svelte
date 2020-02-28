<script>
  import { user } from '../_store.js';

  import Clinician from './_components/Clinician.svelte';
  import Patient from './_components/Patient.svelte';

  const profiles = {
    'patient': Patient,
    'clinician': Clinician,
    'caretaker': null,
  }

  let session, sessionClass, sessionType;

  user.subscribe(async (value) => {
    const payload = JSON.parse(atob(value.split('.')[1]));

    session = payload['agora'];

    console.log(session);

    sessionType = session['user_type'];
    sessionClass = profiles[sessionType];
  });
</script>

<h1>Profile for {session['user_name']} ({sessionType})</h1>

<p>Welcome to your profile!</p>

<svelte:component this={sessionClass} token={$user} />