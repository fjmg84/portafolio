<script>
  import { jobs } from "../../../data/data.json";
</script>

{#each jobs as job}
  <div class="container">
    <picture>
      <img src={`./image/${job.image}`} alt={job.image} />
    </picture>

    <div class="text">
      <div class="box">
        <ul>
          {#each job.tools as tool}
            <li>{tool}</li>
          {/each}
        </ul>
        <p>{job.description}</p>

        <div class="links">
          <a target="_blank" href={job.site}
            >go to site
            <div class="subtitles_text_link_img"></div>
          </a>

          {#if job.github}
            <a target="_blank" href={job.github}
              >go to github
              <div class="subtitles_text_link_img"></div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/each}

<style lang="scss">
  @import "../../../color.scss";
  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10vh 0;
    flex-wrap: wrap;
    position: relative;
    font-weight: 600;
    font-family: "Work Sans";
    overflow: hidden;
    cursor: pointer;
  }

  picture {
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  .text {
    height: 100%;
    width: 100%;
    transition: all 0.5s ease-out;
  }

  .box {
    padding: 5%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      gap: 20px;
      flex-wrap: wrap;
      li {
        list-style: none;
        background: $light_black;
        padding: 10px 20px;
        border-radius: 30px;
      }
    }
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    :nth-child(1) {
      background: $white;
      color: $light_black;
    }

    :nth-child(2) {
      background: transparent;
      color: $white;
      border: 1px solid $light_black;
    }

    a {
      width: 200px;
      height: 40px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      transition: all 0.5s ease;

      &:hover {
        &:nth-child(2) {
          background: $white;
          color: $light_black;
        }

        &:nth-child(1) {
          background: $light_black;
          color: $white;
        }
      }
    }
  }

  @media (min-width: 768px) {
    .container {
      margin: 5vh 0;

      &:hover {
        .text {
          transform: translateY(0%);
        }
      }
    }

    .text {
      transform: translateY(100%);
      position: absolute;
      background: #262626e3;
    }

    .links {
      :nth-child(2) {
        background: $light_black;
        color: $white;
        border: 0;
      }
    }
  }
</style>
