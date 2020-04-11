<script>
  export let message;
</script>

<style>
  span {
    padding: 0.5em;

    background-color: lightgreen;

    border-radius: 4px;
  }

  span.warning {
    background-color: lightcoral;
  }
</style>

{#if message && message.text !== ''}
  <p>
    <span class:warning="{message.warning}">{message.text}</span>
  </p>
{/if}