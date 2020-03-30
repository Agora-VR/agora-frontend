<script>
  export let title;
</script>

<style>
  .card {
    margin: 1em 0;

    padding: 1em;

    background-color: #dadce0;

    border: 1px solid #efefef;
    border-radius: 4px;
  }

  h2 {
    margin: 0 0 1em;
  }
</style>

<section class="card">
  <h2>{title}</h2>
  <slot></slot>
</section>