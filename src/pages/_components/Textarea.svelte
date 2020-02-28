<script>
  export let prompt;

  export let value = '';
</script>

<p>{prompt}</p>

<textarea cols="30" rows="10" bind:value={value}></textarea>
