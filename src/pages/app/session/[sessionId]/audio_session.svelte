<script>
  import { onMount } from 'svelte';

  import { auth_token } from '../../../_api.js';
  import { apiHost } from '../../../_constants.js';
  import { user } from '../../../_store.js';

  export let sessionId;

  async function getAudioDataUrl() {
    const response = await fetch(`${apiHost}/session/${sessionId}/files/audio_session`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${auth_token}`,
      },
    });

    const audioBlob = await response.blob();

    return URL.createObjectURL(audioBlob);
  }

  // let audioDataUrl;

  // onMount(async () => {
  //   audioDataUrl = await getAudioDataUrl();
	// });
</script>

<h1>Session Audio</h1>

{#await getAudioDataUrl()}
  <p>Loading audio...</p>
{:then audioData}
  <!-- promise was fulfilled -->
  <audio controls src={audioData}>
    Your browser does not support the <code>audio</code> element.
  </audio>
{/await}
