<script>
  import { getData } from '../../../_api.js';
  import { user } from '../../../_store.js';

  export let sessionId;

  async function getText() {
    const response = await getData(`/session/${sessionId}/files/text_script`);

    return await response.text();
  }
</script>

<h1>Session Script</h1>

{#await getText()}
  <p>Loading script...</p>
{:then scriptText}
  <pre>
    {scriptText}
  </pre>
{/await}
