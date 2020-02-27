<svelte:head>
  <title>Agora | Login</title>
</svelte:head>

<script>
  import { user } from './_store.js';
  import { goto, url } from '@sveltech/routify';

  let username = '';
  let password = '';

  function login() {
    $user = { username };
    /** We want to $goto our current location.
     *  Since we're now logged in, we shouldn't be redirected to this login page again.
     * **/
    $goto(window.location.href);
  }
</script>

<div>
  <h1>Login</h1>
  <label for="user-name">Username:</label>
  <input id="user-name" type="text" bind:value={username}>
  <br>
  <label for="user-pass">Password:</label>
  <input id="user-pass" type="password" bind:value={password}>
  <br>
  <button on:click={login}>Submit</button>

  <p>
    Don't have an account?
    <a href="/register">Register Here</a>.
  </p>
</div>
