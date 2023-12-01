<script>
  import AboutMe from "./Main/AboutMe.svelte";
  import Jobs from "./Main/Jobs.svelte";
  import Skills from "./Main/Skills.svelte";
  import Gallery from "./Gallery/index.svelte";
</script>

<main>
  <section>
    <article>
      <AboutMe />
    </article>
    <article>
      <Jobs />
    </article>
    <article>
      <Skills />
    </article>
  </section>

  <section>
    <article class="banner">
      <ul class="slider1">
        {#each [1, 2, 3] as _}
          <li>
            <h1>Frontend Developer</h1>
            <img src="/svg/arrow-left.svg" alt="arrow" />
          </li>
        {/each}
      </ul>
      <ul class="slider2">
        {#each [1, 2, 3] as _}
          <li>
            <h1>Frontend Developer</h1>
            <img src="/svg/arrow-left.svg" alt="arrow" />
          </li>
        {/each}
      </ul>
    </article>
  </section>

  <section>
    <article>
      <Gallery />
    </article>
  </section>
</main>

<style lang="scss">
  @import "../../color";

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10vh;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
  }

  article {
    padding: 2%;
  }

  .banner {
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    h1 {
      color: $light_black;
      font-family: "Work Sans";
      font-size: 4rem;
      text-wrap: nowrap;
    }
  }

  .slider1,
  .slider2 {
    display: flex;
    animation: scroll 40s linear infinite;
    li {
      width: auto;
      margin: 10px 0;
      display: flex;
      img {
        margin: 0px 80px;
      }
    }
  }

  .slider1 {
    animation: scroll1 40s linear infinite;
  }

  .slider2 {
    animation: scroll2 40s linear infinite;
  }

  @keyframes scroll1 {
    from {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }

    to {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  @keyframes scroll2 {
    from {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }

    to {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
</style>
