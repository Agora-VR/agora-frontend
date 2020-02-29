<script>
  export let prompt;

  const labels = [
    'strongly disagree',
    'disagree',
    'neutral',
    'agree',
    'strongly agree',
  ];

  let numericValue = 2;

  export let value;

  $: value = labels[numericValue]
</script>

<p>{prompt}</p>

<div>
  <span>{value}</span>
  <br>
  <input type="range" min="0" max="4" bind:value={numericValue}>
</div>