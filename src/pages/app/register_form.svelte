<script>
  import { onMount } from 'svelte';

  import { getJson, postJsonWithAuth } from '../_api.js';

  import Questionaire from '../_components/Questionaire.svelte';

  let questionaireValues;

  async function getForm() {
    const response = await getJson('/user/register_form');

    response['form_object'] = JSON.parse(response.form_data);

    console.log(response);

    return response;
  }

  function totalScores(formData, formResults) {
    const totals = {};

    for (const [name, list] of Object.entries(formData.scores)) {
      totals[name] = list.map((index) => formResults[index])
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    return totals;
  }

  async function postResults(formSpec) {
    const resultsResponse = await postJsonWithAuth('/user/register_form', {
      form_name: formSpec.form_name,
      form_data: JSON.stringify({
        results: questionaireValues,
        scores: totalScores(formSpec.form_object, questionaireValues),
      }),
    });
  }
</script>

{#await getForm()}
  <p>Loading form...</p>
{:then form}
  <h1>{form.form_object.title}</h1>

  <Questionaire bind:results={questionaireValues} questions={form.form_object} />
  <br>
  <button on:click={() => postResults(form)}>Submit</button>
{/await}
