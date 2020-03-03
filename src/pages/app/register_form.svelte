<script>
  import { onMount } from 'svelte';

  import { getJson, postJsonWithAuth } from '../_api.js';

  import Questionaire from '../_components/Questionaire.svelte';

  let questionaireName = '', questionaireForm = [], questionaireValues;

  onMount(async () => {
    const formStuff = await getJson('/user/register_form');

    questionaireName = formStuff.form_name;
    questionaireForm = JSON.parse(formStuff.form_data);

    console.log(`Loaded ${questionaireName}`);
  });

  async function postResults() {
    const resultsResponse = await postJsonWithAuth('/user/register_form', {
      name: questionaireName,
      results: JSON.stringify(questionaireValues),
    });
  }
</script>

<h1>Form</h1>

<div>
  <Questionaire bind:values={questionaireValues} questions={questionaireForm} />
  <br>
  <button on:click={postResults}>Submit</button>
</div>