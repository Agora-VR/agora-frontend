<script>
  import { onMount } from 'svelte';

  import { getJson } from '../../_api.js';

  import Table from '../_components/Table.svelte';

  let clinicianTable = {
    headers: [
      {title: 'Full Name', key: 'user_full_name'},
      {title: 'Username', key: 'user_name'},
    ],
    rows: []
  }

  let caregiverTable = {
    headers: [
      {title: 'Full Name', key: 'user_full_name'},
      {title: 'Username', key: 'user_name'},
    ],
    rows: []
  }

  onMount(async () => {
    clinicianTable.rows = await getJson('/user/clinicians');

    clinicianTable = clinicianTable; // Trigger reaction
  });
</script>

<h2>Clinicians</h2>

<Table spec={clinicianTable} />

<h2>Caregivers</h2>

<Table spec={caregiverTable} />
