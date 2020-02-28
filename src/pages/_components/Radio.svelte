<script>
  export let prompt;
  export let options;

  export let other = false;
  let otherValue = '';

  export let value = undefined;
</script>

<p>{prompt}</p>

{#each options as option}
<div>
  <label>
    <input type="radio" bind:group={value} value={option}>
    {option}
  </label>
</div>
{/each}
{#if other}
<div>
  <label>
    <input type="radio" bind:group={value} value={otherValue}>
    Other:
    <input type="text" on:input={(event) => value = event.target.value} bind:value={otherValue}>
  </label>
</div>
{/if}