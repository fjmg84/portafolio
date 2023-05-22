<script>
  import AboutMe from "./Main/AboutMe.svelte";
  import Jobs from "./Main/Jobs.svelte";
  import Skills from "./Main/Skills.svelte";
  import Gallery from "./Gallery/index.svelte";
</script>

<main>
  <div class="divSection">
    <section>
      <AboutMe />
    </section>
    <section>
      <Jobs />
    </section>
    <section>
      <Skills />
    </section>
  </div>
  <!-- <div class="divGallery">
    <section>
      <Gallery />
    </section>
  </div> -->
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
    padding: 0 5%;
    height: auto;
  }

  /* .divGallery {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    width: auto;
  } */

  .divSection {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    height: auto;
  }

  .divSection:nth-last-child(1) {
    max-width: 100%;
  }

  @media (max-width: 800px) {
    .divSection {
      width: 100%;
    }
  }
</style>
