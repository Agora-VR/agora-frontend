<script>
  import { goto, url } from '@sveltech/routify';

  import { user, session } from '../_store';

  /** We set the static parameret to true since we don't want to change the browser's URL
   *  Notice the $: prefix swhich makes the statement reactive. This way if the user logs
   *  out the $goto is called again.
   * **/
  $: {
    if (!$user) {
      $goto('/login', {}, true);
    } else if (!$session) {
      const payload = JSON.parse(atob($user.split('.')[1]));

      $session = payload['agora'];
    }
  }

  function logout() {
    $user = false;
    $session = false;
  }
</script>

<style>
  header {
    display: flex;
  }

  header > div {
    display: flex;

    flex-grow: 1;
  }

  header > div:last-of-type {
    flex-direction: row-reverse;
  }

  main {
    max-width: 900px;

    margin: 0 auto;
  }
</style>

{#if $user}
  <header>
    <div>
      <a href={$url('/app')}>Home</a>
    </div>
    <div>
      <button on:click={logout}>Logout</button>
    </div>
  </header>
  <main>
    <slot>
      <!-- optional fallback -->
    </slot>
  </main>
{/if}