<script>
  import AboutMe from "./Main/AboutMe.svelte";
  import Jobs from "./Main/Jobs.svelte";
  import Skills from "./Main/Skills.svelte";
  import Gallery from "./Gallery/index.svelte";
</script>

<main>
  <section>
    <div class="border-h-r" />
    <div class="border-v-r" />
    <article>
      <AboutMe />
    </article>
    <article>
      <Jobs />
    </article>
    <article>
      <Skills />
    </article>

    <div class="border-h-l" />
    <div class="border-v-l" />
  </section>

  <section>
    <div class="banner">
      <ul class="slider1">
        {#each [1, 2, 3, 4, 5] as _}
          <li>
            <h1>Frontend Developer</h1>
            <img src="/svg/arrow-left.svg" alt="arrow" />
          </li>
        {/each}
      </ul>
      <ul class="slider1">
        {#each [1, 2, 3, 4, 5] as _}
          <li>
            <h1>Frontend Developer</h1>
            <img src="/svg/arrow-left.svg" alt="arrow" />
          </li>
        {/each}
      </ul>
    </div>
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
    position: relative;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
  }

  article {
    padding: 5vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .border-v-r {
    display: none;
  }

  .banner {
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 10vh 0;

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

  @media (min-width: 768px) {
    article {
      max-width: 700px;
    }
  }

  @media (min-width: 1024px) {
    article {
      max-width: 900px;
    }

    .border-v-r,
    .border-h-r,
    .border-v-l,
    .border-h-l {
      display: inline;
      padding: 0.5px;
      position: absolute;
      background: $light_black;
    }

    .border-v-r {
      height: 100%;
      min-height: 500px;
      max-height: 1500px;
      right: 10%;
      top: -100px;
    }

    .border-h-r {
      width: 100%;
      min-width: 500px;
      max-width: 700px;
      right: 5%;
      top: -50px;
    }

    .border-v-l {
      height: 100%;
      min-height: 500px;
      max-height: 1500px;
      left: 10%;
      bottom: -100px;
    }

    .border-h-l {
      width: 100%;
      min-width: 500px;
      max-width: 700px;
      left: 5%;
      bottom: -50px;
    }
  }
</style>
