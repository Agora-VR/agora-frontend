<svelte:head>
  <title>Agora | Register</title>
</svelte:head>

<script>
  import { goto } from "@sveltech/routify";

  import { postJson } from './_api.js';
  import { apiHost } from './_constants.js';
  import { user } from './_store.js';

  import Message from './_components/Message.svelte';

  let userName = '';
  let userFullName = '';
  let userPass = '';

  const user_types = [
    'patient',
    'clinician',
    'caregiver',
  ];

  let selectedType = 'patient';

  let statusMessage = {
    warning: false,
    text: '',
  };

  async function register() {
    const response = await postJson('/register',
      {
        'user_full_name': userFullName,
        'user_name': userName,
        'user_pass': userPass,
        'user_type': selectedType,
      });

    if (!response.ok) {
      // statusMessage = await response.text();
      statusMessage = {
        warning: true,
        text: await response.text(),
      };
    } else {
      const auth_response = await postJson('/authenticate',
        {
          'user_name': userName,
          'user_pass': userPass,
        });

      if (auth_response.ok) {
        $user = await auth_response.text();

        $goto('/app');
      } else {
        // statusMessage = await auth_response.text();
        statusMessage = {
          warning: true,
          text: await auth_response.text(),
        };
      }
    }
  }
</script>

<style>
button {
  margin: 1em 0;

  width: 100%;
}

main {
  display: flex;

  align-items: center;
  flex-direction: column;

  margin: 0 auto;

  max-width: 24em;
}

#register {
  display: inline-block;

  padding: 0.25em 1em;

  background-color: #dadce0;

  border: 1px solid #efefef;
  border-radius: 4px;
}

#register > label {
  display: block;

  margin: 0.5em 0;

  font-size: 1.25em;
}

#logo {
  display: block;

  margin: 1em 0;

  max-width: 20em;
}
</style>

<main>
  <img id="logo" src="/logo_transparent.png" alt="Agora VR Logo">

  <Message bind:message={statusMessage} />

  <div id="register">
    <label for="user-full-name">Full Name:</label>
    <input name="user-full-name" type="text" bind:value={userFullName}>
    <br>
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

  <p>
    Already have an account?
    <a href="/login">Login Here</a>
  </p>
</main>
