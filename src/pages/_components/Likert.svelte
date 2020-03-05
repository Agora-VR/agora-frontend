<script>
  export let type = 'integer';

  export let labels = [
    'strongly disagree',
    'disagree',
    'neutral',
    'agree',
    'strongly agree',
  ];

  let numericValue = 2;
  let label;

  $: label = labels[numericValue];

  export let value;

  $: {
    if (type === 'integer') {
      value = numericValue;
    } else if (type === 'string') {
      value = label;
    }
  }
</script>

<div>
  <span>{label}</span>
  <br>
  <input type="range" min="0" max="4" bind:value={numericValue}>
</div>