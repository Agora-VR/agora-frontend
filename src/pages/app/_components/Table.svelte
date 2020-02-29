<script>
  export let spec;
</script>

<table>
  <thead>
    <tr>
      {#each spec.headers as header}
      <th>{header.title}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each spec.rows as row}
    <tr>
      {#each spec.headers as header}
      <td>{row[header.key]}</td>
      {/each}
    </tr>
    {/each}
  </tbody>
</table>