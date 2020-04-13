<svelte:head>
  <title>Agora | Home</title>
</svelte:head>

<style>
  header {
    display: flex;

    flex-direction: row;
    justify-content: end;
  }

  header > a {
    padding: 0.5em 1em;
  }

  main {
    display: flex;

    align-items: center;
    flex-direction: column;

    max-width: 900px;

    margin: 0 auto;
  }

  main > img {
    max-width: 95vw;
  }

  main > section {
    width: 100%;
  }
</style>

<header>
  <a href="/register">Register</a>
  <a href="/login">Login</a>
</header>

<main>
  <img src="/logo_transparent.png" alt="Agora VR Logo">

  <h1>Rutgers Capstone Group S20-61</h1>

  <section>
    <h2>Overview</h2>
    <p>
      Our goal is to enable patients who suffer from Agoraphobia or related disorders such as Schizoid personality disorder (SPD) to overcome their anxiety within the comfort of their own home.
      In response, we have created Agora VR: a virtual reality treatment option for social anxiety and social phobias patients.
      By gradually exposing the patient to different immersive and interactive environments, it is possible to reduce their anxiety over time.
    </p>
  </section>

  <section>
    <h2>Resources</h2>
    <p>
      For more details, watch our <a>overview video</a>
      or check our progress on <a href="https://github.com/Agora-VR">GitHub</a>.
    </p>
  </section>
</main>
