<script>
  import { myForm } from './_forms.js';

  import Questionaire from './_components/Questionaire.svelte';

  let questionaireValues;
</script>

<h1>Form</h1>

<div>
  <Questionaire bind:values={questionaireValues} questions={myForm} />
  <br>
  <button on:click={() => console.log(questionaireValues)}>Log Values</button>
</div>