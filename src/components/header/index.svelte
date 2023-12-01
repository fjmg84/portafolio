<script>
  import { presentation, contactUs } from "../../data/data.json";
  let logo = "./logo.png";
</script>

<header id="show__cursor">
  <section class="contactUs">
    <ul>
      {#each contactUs as contact}
        <li>
          <a href={contact.url}>
            <img
              src={`./svg/${contact.image}`}
              alt={contact.image}
              width="20px"
              height="20px"
            />
          </a>
        </li>
      {/each}
    </ul>
  </section>
  <section class="titles">
    <h1>
      Hi, <span>{presentation.title}</span>
    </h1>

    <div class="subtitles">
      <img class="logo" src={logo} alt="logo" width="200" height="200" />

      <div class="subtitles_text">
        <h2>{presentation.subtitle}</h2>
        <div class="subtitle2">
          <span>{presentation.subtitle2}</span>
        </div>

        <a
          target="_blank"
          href="https://drive.google.com/file/d/1iFWqfRCOrkGZ0DIorNyWAsf4eAaAFoti/view?usp=drive_link"
          >Download CV in pdf
          <div class="subtitles_text_link_img">
            <img
              src="/svg/arrow-down-white.svg"
              alt="arrow"
              width="20"
              height="20"
            />
            <img
              src="/svg/arrow-down-black.svg"
              alt="arrow"
              width="20"
              height="20"
            />
          </div>
        </a>
      </div>
    </div>
  </section>
</header>

<style lang="scss">
  @import "./../../color.scss";

  header {
    width: 100%;
    height: 100%;
    margin-bottom: 20vh;
  }

  .titles {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
    margin: 140px 0px 40px;

    h1 {
      text-align: center;
      font-size: 4rem;
      font-weight: bold;
      font-family: "Paytone One";
      padding: 0;
      margin: 0;
      line-height: 50px;

      span {
        font-size: 3rem;
        font-weight: bold;
        font-family: "Paytone One";
      }
    }
  }

  .subtitles {
    display: flex;
    gap: 2%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
    text-align: center;
  }

  .logo {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 10px;
    left: 10px;
  }

  .subtitles_text {
    display: flex;
    gap: 2vh;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 3rem; //4rem;
      font-family: "Ubuntu";
    }

    a {
      overflow: hidden;
      position: relative;
      padding: 18px 30px;
      color: $white;
      text-decoration: none;
      font-family: "Ubuntu";
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $light_black;
      border-radius: 10px;
      margin: 10px 0;
      max-width: 300px;
      gap: 18px;
      transition: all 0.5s ease;

      &:hover {
        background: $white;
        color: $light_black;
        .subtitles_text_link_img {
          :nth-child(1) {
            transform: translateY(400%);
          }

          :nth-child(2) {
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .subtitle2 {
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      font-size: 20px;
      font-family: "Ubuntu";
      display: block;
      border-right: 2px solid;
      overflow: hidden;
      width: 34ch;
      white-space: nowrap;
      animation:
        typing 2.5s steps(34),
        blink 0.5s infinite step-end alternate;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }

  .subtitles_text_link_img {
    display: flex;
    flex-direction: column;

    :nth-child(1) {
      transition: all 0.5s ease;
      transform: translateY(50%);
    }

    :nth-child(2) {
      transition: all 0.5s ease;
      transform: translateY(-400%);
    }
  }

  .contactUs {
    width: 100%;
    position: absolute;
    top: 10px;
    right: 10px;

    ul {
      display: flex;
      justify-content: right;
      list-style: none;
      gap: 20px;
      li {
        a {
          border-radius: 100%;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
        }
        a:hover {
          background: $black;
        }
      }
    }
  }

  @media (max-width: 375px) {
    .subtitles_text {
      h2 {
        font-size: 3rem;
      }
    }
    .subtitle2 {
      span {
        font-size: 16px;
      }
    }
  }

  @media (min-width: 768px) {
    header {
      height: 100vh;
      margin: 0;
    }
    .titles {
      margin: 0px;
      h1 {
        text-align: left;
        font-size: 5rem;

        span {
          font-size: 4rem;
        }
      }
    }

    .logo {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .subtitles {
      flex-wrap: nowrap;
      gap: 5%;
    }
    .subtitles_text {
      max-width: 600px;
      align-items: flex-start;
      h2 {
        font-size: 4rem;
      }
    }

    .subtitle2 {
      justify-content: flex-start;
      span {
        font-size: 24px;
      }
    }
  }
</style>
