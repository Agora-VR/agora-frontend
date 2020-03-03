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

{#if $user}
  <a href={$url('/app')}>Home</a>
  <button on:click={logout} style="position: absolute; right: 24px">
    Logout
  </button>

  <slot>
    <!-- optional fallback -->
  </slot>
{/if}