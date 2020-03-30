<svelte:head>
  <title>Agora | Session</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  import { getData, getJson } from '../../../_api.js';
  import { user } from '../../../_store.js';

  import Card from '../../_components/Card.svelte';

  export let sessionId;

  async function getSession() {
    return await getJson(`/session/${sessionId}`);
  }

  async function getResponses() {
    return await getJson(`/session/${sessionId}/responses`);
  }

  async function getFiles() {
    return await getJson(`/session/${sessionId}/files`);
  }

  async function getAudioDataUrl() {
    const response = await getData(`/session/${sessionId}/files/audio_session`);

    const audioBlob = await response.blob();

    return URL.createObjectURL(audioBlob);
  }

  async function getText() {
    const response = await getData(`/session/${sessionId}/files/text_script`);

    return await response.text();
  }

  onMount(() => {
    var data = {
      // A labels array that can contain any sort of values
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [5, 2, 4, 2, 0]
      ]
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Line('.ct-chart', data);
  });
</script>

<style>
  audio {
    width: 100%;
  }

  pre {
    max-height: 16em;

    overflow: auto;

    white-space: pre-wrap;
  }

  #text-container {
    display: flex;
  }

  #text-container > div {
    flex-basis: 0;
    flex-grow: 1;

    padding: 0 1em;
  }
</style>

<h1>Session</h1>

{#await getSession()}
  <div>Loading Information...</div>
{:then sessionInfo}
  <table>
    <tr>
      <th>Patient Name</th>
      <td>{sessionInfo['user_full_name']} ({sessionInfo['user_name']})</td>
    </tr>
    <tr>
      <th>Date/Time</th>
      <td>{sessionInfo['session_datetime']}</td>
    </tr>
  </table>
{/await}


<Card title="Audio Performance">
  {#await getAudioDataUrl()}
    <p>Loading audio...</p>
  {:then audioData}
    <audio controls src={audioData}>
      Your browser does not support the <code>audio</code> element.
    </audio>
  {/await}

  <div id="text-container">
    <div>
      <h3>Script</h3>

      {#await getText()}
        <p>Loading script...</p>
      {:then scriptText}
        <pre id="script-text">
          {scriptText}
        </pre>
      {/await}
    </div>

    <div>
      <h3>Recorded</h3>

      <pre>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, laborum hic quos similique itaque numquam exercitationem! Adipisci nemo cupiditate laudantium totam obcaecati vero ipsa, nobis quibusdam sapiente quisquam temporibus asperiores?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nobis suscipit voluptate odit sequi repellendus debitis, numquam, labore cum dolorem officia, eos earum velit totam tempore aliquid sint explicabo in.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis suscipit placeat, impedit dicta nam vel reprehenderit nesciunt, est alias cum molestiae similique quo magni sunt libero nisi hic doloremque.
      </pre>
    </div>
  </div>
</Card>

<Card title="Heart-Rate Data">
  <div class="ct-chart ct-octave"></div>
</Card>

<Card title="Files">
  {#await getFiles()}
    <!-- promise is pending -->
  {:then files}
    <!-- promise was fulfilled -->
    <table>
      <tr>
        <th>Type</th>
      </tr>
      {#each files as file}
        <tr>
          <td>{file.type}</td>
          <td><a href="/app/session/{sessionId}/{file.type}">View</a></td>
        </tr>
      {/each}
    </table>
  {/await}
</Card>

<Card title="Forms">
  <p>
    Respond to this session <a href="{sessionId}/response">here</a>.
  </p>

  <table>
  <tr>
    <th>Name</th>
    <th>Date/Time</th>
  </tr>
  {#await getResponses()}
    <!-- promise is pending -->
  {:then responses}
    {#each responses as response}
      <tr>
        <td>{response['user_full_name']} ({response['user_name']})</td>
        <td>{response['response_datetime']}</td>
        <td><a href="/app/form/{response['response_id']}">View</a></td>
      </tr>
    {/each}
  {/await}
  </table>
</Card>
