<script>
  export let max = 10;

  export let value = max / 2;
</script>

<div>
  <span>{value}</span>
  <br>
  <input type="range" min="1" max={max} bind:value={value}>
</div>