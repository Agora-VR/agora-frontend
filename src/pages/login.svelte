<svelte:head>
  <title>Agora | Login</title>
</svelte:head>

<script>
  import { apiHost } from './_constants.js';
  import { user } from './_store.js';
  import { goto, url } from '@sveltech/routify';

  let userName = 'clin123';
  let userPass = 'password123';

  let errorMessage;

  async function login() {
    const response = await fetch(`${apiHost}/authenticate`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'user_name': userName,
        'user_pass': userPass,
      })
    });

    if (response.ok) {
      $user = await response.text();

      $goto('/app');
    } else {
      errorMessage = await response.text();
    }
  }
</script>

<div>
  <h1>Login</h1>
  {#if errorMessage}
  <p>{errorMessage}</p>
  {/if}
  <label for="user-name">Username:</label>
  <input id="user-name" type="text" bind:value={userName}>
  <br>
  <label for="user-pass">Password:</label>
  <input id="user-pass" type="password" bind:value={userPass}>
  <br>
  <button on:click={login}>Submit</button>

  <p>
    Don't have an account?
    <a href="/register">Register Here</a>.
  </p>
</div>
