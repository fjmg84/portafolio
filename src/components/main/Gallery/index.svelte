<script>
  import { jobs } from "../../../data/data.json";
</script>

{#each jobs as job}
  <article class="glass">
    <div class="balloon" />
    <picture>
      <img
        width="300"
        height="400"
        src={`./image/${job.image}`}
        alt={job.image}
      />
    </picture>

    <div class="text">
      <ul>
        {#each job.tools as tool}
          <li>{tool}</li>
        {/each}
      </ul>
      <p>{job.description}</p>
    </div>

    <div class="links">
      <a target="_blank" href={job.site}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z"
            /></svg
          >
        </span>
      </a>
      {#if job.github}
        <a target="_blank" href={job.github}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
              /></svg
            >
          </span>
        </a>
      {/if}
    </div>
  </article>
{/each}

<style lang="scss">
  @import "../../../color.scss";

  article {
    display: flex;
    flex-wrap: wrap;
    border-radius: 12px;
    padding: 10px 8px;
    gap: 40px;
    transition: all 0.5s ease;
    cursor: crosshair;
    width: 100%;
    max-width: 350px;
    position: relative;
    overflow: hidden;
    height: auto;

    &:hover {
      box-shadow: 0 0 4px $dark_violet;

      .balloon {
        bottom: -40%;
        right: -40%;
      }
    }
  }

  picture {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    position: relative;
    height: 250px;
    & img {
      width: auto;
      height: 100%;
      position: absolute;
    }
  }

  .glass {
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 20px;
    ul {
      list-style: none;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      li {
        background: lighten($color: $github, $amount: 15);
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 13px;
      }
    }

    p {
      line-height: 22px;
    }
  }

  .links {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;

    a {
      color: white;
      transition: all 0.5s ease;
      &:hover {
        color: $github;
      }
    }
  }

  .balloon {
    position: absolute;
    width: 80px;
    height: 80px;
    background: $dark_violet;
    padding: 5px;
    bottom: -25px;
    right: -25px;
    border-radius: 50%;
    transition: all 0.5s ease;
  }

  @media (min-width: 768px) {
    article {
      height: 560px;
    }
  }
</style>
