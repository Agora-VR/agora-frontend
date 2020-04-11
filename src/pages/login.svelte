<svelte:head>
  <title>Agora | Login</title>
</svelte:head>

<script>
  import { apiHost } from './_constants.js';
  import { user } from './_store.js';
  import { goto, url } from '@sveltech/routify';

  import Message from './_components/Message.svelte';

  let userName = 'pat123';
  let userPass = 'password123';

  let errorMessage = {
    warning: false,
    text: '',
  };

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
      errorMessage = {
        warning: true,
        text: await response.text(),
      };
    }
  }
</script>

<style>
button {
  margin: 1em 0;

  width: 100%;
}

label {
  display: block;

  margin: 0.5em 0;

  font-size: 1.25em;
}

main {
  display: flex;

  align-items: center;
  flex-direction: column;

  margin: 0 auto;

  max-width: 24em;
}

#login {
  display: inline-block;

  padding: 0.25em 1em;

  background-color: #dadce0;

  border: 1px solid #efefef;
  border-radius: 4px;
}

#logo {
  display: block;

  margin: 1em 0;

  max-width: 20em;
}
</style>

<main>
  <img id="logo" src="/logo_transparent.png" alt="Agora VR Logo">

  <Message bind:message={errorMessage} />

  <div id="login">
    <label for="user-name">Username</label>
    <input id="user-name" type="text" bind:value={userName}>
    <br>
    <label for="user-pass">Password</label>
    <input id="user-pass" type="password" bind:value={userPass}>
    <br>
    <button on:click={login}>Submit</button>
  </div>

  <p>
    Don't have an account?
    <a href="/register">Register Here</a>
  </p>
</main>
