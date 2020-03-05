<script>
  export let options;

  export let value = [];
</script>

{#each options as option}
<div>
  <label>
    <input type="checkbox" bind:group={value} value={option}>
    {option}
  </label>
</div>
{/each}