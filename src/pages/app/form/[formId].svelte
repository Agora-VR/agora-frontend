<script>
  import { getJson } from '../../_api.js';

  export let formId;

  const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
  };

  async function getResponse() {
    return await getJson(`/form/response/${formId}`);
  }

  function getQuestionAnswers(response) {
    const formData = JSON.parse(response.form_data),
      responseData = JSON.parse(response.response_data);

    return zip(formData, responseData);
  }
</script>

<h1>Form</h1>

{#await getResponse()}
  <p>Loading form...</p>
{:then response}
  <p>
    <b>Filled by</b> {response.user_full_name} ({response.user_name})
    <b>at</b> {response.response_datetime}
  </p>
  <ol>
    {#each getQuestionAnswers(response) as questionAnswer}
      <li>
        <p>{questionAnswer[0].props.prompt}</p>
        <p>Answer: {questionAnswer[1]}</p>
      </li>
    {/each}
  </ol>
{/await}