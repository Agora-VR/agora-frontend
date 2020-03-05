<script>
  import { myForm } from '../_forms.js';

  import Questionaire from '../_components/Questionaire.svelte';

  let questionaireValues;

  function totalScores(formData, formResults) {
    const totals = {};

    for (const [name, list] of Object.entries(formData.scores)) {
      totals[name] = list.map((index) => formResults[index])
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    return totals;
  }

  function getResults() {
    console.log({
      results: questionaireValues,
      scores: totalScores(myForm, questionaireValues),
    });
  }

  console.log(JSON.stringify(myForm));
</script>

<h1>{myForm.title}</h1>

<div>
  <Questionaire bind:results={questionaireValues} questions={myForm} />
  <br>
  <button on:click={() => getResults()}>Log Values</button>
</div>