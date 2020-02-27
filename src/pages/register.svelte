<svelte:head>
  <title>Agora | Register</title>
</svelte:head>

<script>
  import { goto } from "@sveltech/routify";

  import {apiHost} from './_constants.js';
  import { user } from './_store.js';

  let userName = '';
  let userPass = '';

  const user_types = [
    'patient',
    'clinician',
    'caretaker',
  ];

  let selectedType = 'patient';

  let statusMessage;

  async function register() {
    const response = await fetch(`${apiHost}/register`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'user_name': userName,
        'user_pass': userPass,
        'user_type': selectedType
      })
    });

    if (!response.ok) {
      statusMessage = await response.text();
    }

    const auth_response = await fetch(`${apiHost}/authenticate`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'user_name': userName,
        'user_pass': userPass,
      })
    });

    if (auth_response.ok) {
      $user = await auth_response.text();

      $goto('/app');
    } else {
      statusMessage = await auth_response.text();
    }
  }
</script>

<div>
  <h1>Register</h1>
  {#if statusMessage}
    <p>{statusMessage}</p>
  {/if}
  <label for="user-name">Username:</label>
  <input name="user-name" type="text" bind:value={userName}>
  <br>
  <label for="user-pass">Password:</label>
  <input name="user-pass" type="password" bind:value={userPass}>
  <br>
  <div>
    <p>Choose an account type:</p>
    {#each user_types as user_type}
    <div>
      <input type="radio" id={user_type} name="user-type" value={user_type} bind:group={selectedType}  >
      <label for={user_type}>{user_type}</label>
    </div>
    {/each}
  </div>
  <button on:click={register}>Register</button>
</div>