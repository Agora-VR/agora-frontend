<script>
  import Checkbox from './Checkbox.svelte';
  import Textarea from './Textarea.svelte';

  export let questions;

  export let values = new Array(questions.length);
</script>

{#each questions as question, index}
  <svelte:component bind:value={values[index]} this={question.type} {...question.props} />
  <hr>
{/each}