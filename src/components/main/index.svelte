<script>
  import AboutMe from "./Main/AboutMe.svelte";
  import Jobs from "./Main/Jobs.svelte";
  import Skills from "./Main/Skills.svelte";
  import Gallery from "./Gallery/index.svelte";
</script>

<main>
  <section>
    <AboutMe />
  </section>
  <section>
    <Jobs />
  </section>
  <section>
    <Skills />
  </section>
  <section class="gallery">
    <Gallery />
  </section>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
    padding: 0 5%;
  }

  section {
    width: 100%;
    max-width: 800px;
  }

  .gallery {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    gap: 40px;
    max-width: 1000px;
  }
</style>
