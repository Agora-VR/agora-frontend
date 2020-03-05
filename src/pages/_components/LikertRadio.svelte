<script>
  export let type = 'string';

  export let labels = [
    'strongly disagree',
    'disagree',
    'neutral',
    'agree',
    'strongly agree',
  ];

  export let defaultLabel = labels[0];

  let currentLabel = defaultLabel;

  export let value;

  $: {
    if (type === 'string') {
      value = currentLabel;
    } else if (type === 'integer') {
      value = labels.indexOf(currentLabel);
    }
  }
</script>

<div class="likert-radio">
  {#each labels as label}
    <div>
      <label>{label}</label>
      <input type="radio" bind:group={currentLabel} value={label}>
    </div>
  {/each}
</div>