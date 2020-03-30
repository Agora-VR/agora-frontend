<script>
  import { getData } from '../../../_api.js';
  import { user } from '../../../_store.js';

  export let sessionId;

  async function getAudioDataUrl() {
    const response = await getData(`/session/${sessionId}/files/audio_session`);

    const audioBlob = await response.blob();

    return URL.createObjectURL(audioBlob);
  }
</script>

<h1>Session Audio</h1>

{#await getAudioDataUrl()}
  <p>Loading audio...</p>
{:then audioData}
  <audio controls src={audioData}>
    Your browser does not support the <code>audio</code> element.
  </audio>
{/await}
