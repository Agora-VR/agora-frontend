<script>
  import { getJson } from '../../_api.js';

  export let formId;

  const zip = (...arrays) => {
    const length = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length }, (value, index) => arrays.map((array => array[index])));
  };

  async function getResponse() {
    const response = await getJson(`/form/response/${formId}`);

    const formData = JSON.parse(response.form_data),
      responseData = JSON.parse(response.response_data);

    response['form_object'] = formData;
    response['response_object'] = responseData;

    response['question_answers'] = zip(formData.questions, responseData.results);
    response['scores'] = responseData.scores;

    return response;
  }

  function getQuestionAnswers(response) {
    const formData = JSON.parse(response.form_data),
      responseData = JSON.parse(response.response_data);

    return zip(formData.questions, responseData.results);
  }
</script>

<style>
  table > tr:nth-child(2n+1) {
    background-color: lightgrey;
  }

  table > tr:first-child {
    background-color: transparent;
  }

  table th {
    padding: 0.25em;
  }

  table td {
    text-align: center;
  }
</style>

<h1>Form</h1>

{#await getResponse()}
  <p>Loading form...</p>
{:then response}
  <p>
    <b>Filled by</b> {response.user_full_name} ({response.user_name})
    <b>at</b> {response.response_datetime}
  </p>
  <!-- <ul>
    {#each Object.entries(response.scores) as score}
      <li>{score[0]}: {score[1]}</li>
    {/each}
  </ul> -->
  <!-- <ol>
    {#each getQuestionAnswers(response) as questionAnswer}
      <li>
        <p>{questionAnswer[0].prompt}</p>
        <p>Answer: {questionAnswer[1]}</p>
      </li>
    {/each}
  </ol> -->
  <table>
    <tr>
      <th>Question</th>
      <th>Response</th>
    </tr>
    {#each response.question_answers as question_answer}
      <tr>
        <td>{question_answer[0].prompt}</td>
        <td>{question_answer[1]}</td>
      </tr>
    {/each}
  </table>

  <table>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
    {#each Object.entries(response.scores) as score}
      <td>{score[0]}</td>
      <td>{score[1]}</td>
    {/each}
  </table>
{/await}
