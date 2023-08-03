<script>
  import "animate.css";
  import { contactUs } from "../../data/data.json";
</script>

<footer>
  <h1>Contact Us</h1>

  <div class="contacts">
    <ul>
      {#each contactUs as contact}
        <li class="fade fade_top scroll_content">
          <div class="container">
            <div class={`image ${contact.className}`}>
              <img
                src={`./svg/${contact.image}`}
                alt={contact.image}
                width="30"
                height="30"
              />
            </div>

            <div class="description">
              <span>
                <a target="_blank" href={contact.url}>
                  {contact.text}
                </a>
              </span>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</footer>

<style lang="scss">
  @import "./../../color.scss";

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }

  h1 {
    width: 100%;
    text-align: center;
    letter-spacing: -0.06em;
    font-size: 5rem;
    background: linear-gradient(45deg, $dark_violet, $blue);
    background: -webkit-linear-gradient(45deg, $dark_violet, $blue);
    background: -moz-linear-gradient(45deg, $dark_violet, $blue);
    background: -o-linear-gradient(45deg, $dark_violet, $blue);
    -webkit-text-fill-color: transparent;
    -o-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -o-background-clip: text;
    -moz-background-clip: text;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-bottom: none;
    gap: 10px;
    width: 100%;

    .image {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      img {
        width: 30px;
      }
    }

    .description {
      display: flex;
      flex-direction: column;
      font-size: 0.789em;
      width: 70%;
      *background-color: yellowgreen;

      a {
        font-size: 1.2em;
        color: rgb(156 163 175);
        text-decoration: none;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
          color: $violet;
        }
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

  .contacts {
    *background-color: red;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;

    li {
      width: 100%;
      max-width: 300px;
      float: left;
      display: flex;
      flex-direction: column;
      *background-color: white;
      padding: 2% 0%;
    }
  }
</style>
