<script>
  import { jobs } from "../../../data/data.json";
</script>

<div class="gallery">
  {#each jobs as job}
    <div class="card">
      <div class="front glass">
        <img
          width="300"
          height="400"
          src={`./image/${job.image}`}
          alt={job.image}
        />
        <ul>
          {#each job.tools as tool}
            <li>{tool}</li>
          {/each}
        </ul>
      </div>

      <div class={`back orange`}>
        <h3><a target="_blank" href={job.site}>site</a></h3>
        <span />
        {#if job.github}
          <a target="_blank" href={job.github}>repo</a>
        {/if}
        <p>{job.description}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import "../../../color.scss";

  .gallery {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
  }

  .glass {
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .card {
    position: relative;
    width: 300px;
    height: 400px;

    div {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      backface-visibility: hidden;
      transition: 1s;
    }

    &:hover {
      cursor: pointer;
      .front {
        transform: perspective(500px) rotateY(180deg);
      }
      .back {
        transform: perspective(500px) rotateY(360deg);
      }
    }

    .front {
      display: flex;
      flex-direction: column;
      background: white;
      overflow: hidden;
      transform: perspective(500px) rotateY(0deg);

      ul {
        margin: 20px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
        align-items: center;
        justify-content: center;
        width: 100%;
        li {
          margin: 0 1%;
          display: inline;
          padding: 0;
          list-style: none;
          background-color: $black;
          border-radius: 10px;
          color: white;
          padding: 5px;
          font-size: 12px;
        }
      }

      img {
        width: 100%;
        height: auto;
        overflow: overlay;
      }
    }

    .orange {
      background: linear-gradient(45deg, $violet, $dark_violet, $black);
      h3,
      a {
        color: $black;
      }

      span {
        margin: 2% 0%;
        width: 90%;
        height: 0.5px;
        background: $black;
      }

      a {
        text-decoration: none;
      }
    }

    .back {
      display: flex;
      flex-direction: column;
      transform: perspective(500px) rotateY(180deg);

      p {
        color: white;
        margin: 2%;
        text-align: center;
      }
    }
  }

  @media (max-width: 825px) {
    .gallery {
      flex-direction: column;
    }

    img {
      margin: 5%;
      transform: rotateY(0deg);
    }
  }
</style>
