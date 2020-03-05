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

  function totalScores(formData, formResults) {
    const totals = {};

    for (const [name, list] of Object.entries(formData.scores)) {
      totals[name] = list.map((index) => formResults[index])
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    return totals;
  }

  async function postFormResponse(formSpec) {
    const response = await postJsonWithAuth(`/session/${sessionId}/respond`, {
      form_name: formSpec.form_name,
      form_data: JSON.stringify({
        results: questionaireValues,
        scores: totalScores(JSON.parse(formSpec.form_data), questionaireValues),
      }),
    });

    if (response.ok) {
      $goto(`/app/session/${sessionId}`);
    }
  }
</script>

{#await getForm()}
  <p>Loading form...</p>
{:then form}
  <Questionaire bind:results={questionaireValues} questions={JSON.parse(form.form_data)} />
  <br>
  <button on:click={() => postFormResponse(form)}>Submit</button>
{/await}
