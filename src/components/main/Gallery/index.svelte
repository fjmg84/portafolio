<div class="gallery">
  <div class="card">
    <div class="front glass">
      <img src="./image/camongs.png" alt="camongs" />
    </div>
    <div class={`back orange`}>
      <h3>sitio: <a href="#">camongs.es</a></h3>
      <span />
      <a href="#">repo en github</a>
    </div>
  </div>
  <div class="card">
    <div class="front glass">
      <img src="./image/camongs.png" alt="camongs" />
    </div>
    <div class={`back orange`}>
      <h3>sitio: <a href="#">camongs.es</a></h3>
      <span />
      <a href="#">repo en github</a>
    </div>
  </div>
  <div class="card">
    <div class="front glass">
      <img src="./image/camongs.png" alt="camongs" />
    </div>
    <div class={`back orange`}>
      <h3>sitio: <a href="#">camongs.es</a></h3>
      <span />
      <a href="#">repo en github</a>
    </div>
  </div>
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
      background: white;
      overflow: hidden;
      transform: perspective(500px) rotateY(0deg);

      img {
        overflow: overlay;
      }
    }

    .orange {
      background: linear-gradient($orange, $black);
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
