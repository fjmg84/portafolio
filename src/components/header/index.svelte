<script>
  import { presentation, contactUs } from "../../data/data.json";
  let logo = "./logo.png";
</script>

<header id="show__cursor">
  <div class="contactUs">
    <ul>
      {#each contactUs as contact}
        <a href={contact.url}>
          <li>
            <img
              src={`./svg/${contact.image}`}
              alt={contact.image}
              width="20px"
              height="20px"
            />
          </li>
        </a>
      {/each}
    </ul>
  </div>
  <div class="description">
    <div class="logo">
      <img class="logo_img" src={logo} alt="logo" width="200" height="200" />
    </div>

    <h1 class="title">
      <span>
        {presentation.title}
      </span>
    </h1>

    <h2 class="subtitle1">{presentation.subtitle}</h2>

    <div class="subtitle2">
      <span>{presentation.subtitle2}</span>
    </div>

    <span class="downloadBtn"
      ><a
        target="_blank"
        href="https://drive.google.com/file/d/1rmxK27yQluikUUB1PDLwWQvpmgUcW8Qu/view?usp=share_link"
        >Download CV in pdf</a
      ></span
    >
  </div>
</header>

<style lang="scss">
  @import "./../../color.scss";

  header {
    height: 100vh;
    padding: 2%;
  }

  @media (max-width: 600px) {
    header {
      height: 100%;
    }
  }

  h1,
  h2 {
    text-align: center;
  }
  h1 {
    margin: 0%;
  }

  .contactUs {
    width: 100%;
    margin: 10px 0px;
    ul {
      display: flex;
      align-items: center;
      justify-content: right;
      list-style: none;
      gap: 20px;
      li {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
        border-radius: 100%;
      }
      li:hover {
        background: $black;
      }
    }
  }

  .gmail {
    background-color: $gmail;
  }
  .github {
    background-color: $github;
  }
  .facebook {
    background-color: $facebook;
  }
  .whatsapp {
    background-color: $whatsapp;
  }

  .downloadBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 200px;
    height: 50px;
    background: linear-gradient(90deg, $blue, $dark_violet);
    border: 0%;
    margin: 2%;
    transform: rotateZ(5deg);
    transition: all 0.2s ease-in-out;

    a {
      font-size: 1em;
      color: whitesmoke;
      text-decoration: none;
    }
    &:hover {
      transform: rotateZ(0deg);
      background: linear-gradient(45deg, $dark_violet, $blue);
      a {
        text-shadow: 5px 5px 10px #333;
      }
    }
  }

  .title {
    font-size: 4.5em;
    max-width: 750px;
    width: 100%;
    letter-spacing: -0.06em;
  }

  .subtitle1 {
    font-style: italic;
  }

  .subtitle2 {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .subtitle2 span {
    display: block;
    border-right: 2px solid;
    overflow: hidden;
    width: 38ch;
    white-space: nowrap;
    animation: typing 2.5s steps(38), blink 0.5s infinite step-end alternate;
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

  .logo {
    display: flex;
    position: relative;
  }

  .logo img {
    z-index: 1;
  }

  .logo::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: #9333ea;
    border-radius: 100%;
    animation: move 6s linear infinite;
  }

  @keyframes move {
    0% {
      box-shadow: 10px 10px 50px #3376ea, -10px 10px 70px #9333ea,
        10px -10px 0px 90#9333ea, -10px -10px 110px #3376ea;
    }
    25% {
      box-shadow: -20px -20px 100px #9333ea, 20px 20px 200px #3376ea,
        -20px 20px 100px #9333ea, 20px -20px 200px #3376ea;
    }
    50% {
      box-shadow: 30px 30px 50px #9333ea, -30px -30px 70px #3376ea,
        30px -30px 90px #9333ea, -30px 30px 200px #3376ea;
    }
    75% {
      box-shadow: -20px -20px 150px #9333ea, 20px 20px 250px #3376ea,
        -20px 20px 120px #9333ea, 20px -20px 50px #3376ea;
    }
    100% {
      box-shadow: 10px 10px 50px #3376ea, -10px 10px 70px #9333ea,
        10px -10px 0px 90#9333ea, -10px -10px 110px #3376ea;
    }
  }

  .logo_img {
    width: 100%;
    max-width: 200px;
  }

  .description {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    gap: 10px;
  }
</style>
