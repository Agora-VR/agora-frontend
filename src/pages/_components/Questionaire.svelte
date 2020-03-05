<script>
  import Checkbox from './Checkbox.svelte';
  import Likert from './Likert.svelte';
  import LikertRadio from './LikertRadio.svelte';
  import Radio from './Radio.svelte';
  import Slider from './Slider.svelte';
  import Textarea from './Textarea.svelte';

  const componentMap = {
    'checkbox': Checkbox,
    'likert': Likert,
    'likert-radio': LikertRadio,
    'radio': Radio,
    'slider': Slider,
    'long-text': Textarea,
  };

  export let questions;

  export let results = new Array(questions.length);
</script>

{#each questions.questions as question, index}
  <p>{question.prompt}</p>
  <svelte:component bind:value={results[index]} this={componentMap[question.type]} {...question.props} />
  <hr>
{/each}
