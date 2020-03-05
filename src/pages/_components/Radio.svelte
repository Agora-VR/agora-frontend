<script>
  export let options;

  export let other = false;
  const otherValue = 'radio-other';
  let otherText = '';

  let selected = '';

  export let value = undefined;

  $: value = (selected === otherValue) ? otherText : selected
</script>

{#each options as option}
<div>
  <label>
    <input type="radio" bind:group={selected} value={option}>
    {option}
  </label>
</div>
{/each}
{#if other}
<div>
  <label>
    <input type="radio" bind:group={selected} value="radio-other">
    Other:
    <input type="text" bind:value={otherText}>
  </label>
</div>
{/if}