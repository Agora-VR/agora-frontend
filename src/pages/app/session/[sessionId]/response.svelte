<script>
  import { goto } from '@sveltech/routify';

  import { getJson, postJsonWithAuth } from '../../../_api.js';
  import { session } from '../../../_store.js';

  import Questionaire from '../../../_components/Questionaire.svelte';

  export let sessionId;

  async function getForm() {
    const forms = await getJson(`/session/${sessionId}/forms`);

    return await getJson(`/form/${forms[`${$session['user_type']}_form`]}`);
  }

  let questionaireValues;

  async function postFormResponse(name, data) {
    const response = await postJsonWithAuth(`/session/${sessionId}/respond`, {
      form_name: name,
      form_data: JSON.stringify(data),
    });

    if (response.ok) {
      $goto(`/app/session/${sessionId}`);
    }
  }
</script>

{#await getForm()}
  <!-- promise is pending -->
  <p>Loading form...</p>
{:then form}
  <!-- promise was fulfilled -->
  <Questionaire bind:values={questionaireValues} questions={JSON.parse(form.form_data)} />
  <br>
  <button on:click={postFormResponse(form.form_name, questionaireValues)}>Submit</button>
{/await}