<script>
  import { onMount } from 'svelte';

  import { getJson } from '../../_api.js';

  import Table from '../_components/Table.svelte';

  let patientTable = {
    headers: [
      {title: 'Full Name', key: 'user_full_name'},
      {title: 'Username', key: 'user_name'},
    ],
    rows: []
  }

  onMount(async () => {
    patientTable.rows = await getJson('/user/patients');

    patientTable = patientTable; // Trigger reaction
  });
</script>

<h2>Patients</h2>

<Table spec={patientTable} />