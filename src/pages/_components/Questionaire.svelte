<script>
  import Checkbox from './Checkbox.svelte';
  import Likert from './Likert.svelte';
  import Radio from './Radio.svelte';
  import Slider from './Slider.svelte';
  import Textarea from './Textarea.svelte';

  const componentMap = {
    'checkbox': Checkbox,
    'likert': Likert,
    'radio': Radio,
    'slider': Slider,
    'long-text': Textarea,
  };

  export let questions;

  export let values = new Array(questions.length);
</script>

{#each questions as question, index}
  <svelte:component bind:value={values[index]} this={componentMap[question.type]} {...question.props} />
  <hr>
{/each}