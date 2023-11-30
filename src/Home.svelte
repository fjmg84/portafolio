<script>
  import "animate.css";
  import Header from "./components/header/index.svelte";
  import Main from "./components/main/index.svelte";
  import Footer from "./components/footer/index.svelte";
  import scrollAnimation from "../src/utils/scrollAnimation";
  scrollAnimation();

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  document.addEventListener("mousemove", (events) => {
    let X = events.pageX;
    let Y = events.pageY;
    const value = 100;

    let divLogo = document.getElementById("move__logo");
    let divHeader = document.getElementById("header");
    let divShowCursor = document.getElementById("show__cursor");

    divLogo.style.width = value + "px";
    divLogo.style.height = value + "px";

    const showCursor = (entries) => {
      const el = entries[0];

      if (X <= divHeader.offsetWidth - 100 && X >= 100) {
        divLogo.style.top = Y - 0 + "px";
        divLogo.style.left = X - 80 + "px";
      }

      if (el.isIntersecting) {
        divLogo.children.item(0).style.width = 0 + "px";
        divLogo.children.item(0).style.height = 0 + "px";
        observer.disconnect();
      } else {
        divLogo.children.item(0).style.width = 50 + "px";
        divLogo.children.item(0).style.height = 50 + "px";
      }
    };
    const observer = new IntersectionObserver(showCursor, options);
    observer.observe(divShowCursor);
  });
</script>

<Header />
<Main />
<Footer />

<!--  <div id="move__logo" class="move__logo">
    <img src="./logo.png" width="0" height="0" alt="logo" />
  </div> -->

<style lang="scss">
  .move__logo {
    position: absolute;
    z-index: 100;
    top: 0;
    /* transition: all 0.2s;
    img {
      transition: all 0.2s;
    } */
  }
</style>
