<script>
  import "animate.css";
  import Header from "./components/header/index.svelte";
  import Main from "./components/main/index.svelte";
  import Footer from "./components/footer/index.svelte";
  import scrollAnimation from "../src/utils/scrollAnimation";
  scrollAnimation();
</script>

<div class="header">
  <Header />
  <Main />
  <Footer />
</div>

<style lang="scss">
  /* .glass {
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  } */

  .header {
    background-color: rgb(38 38 38);
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    box-shadow: 5px 5px 20px rgb(38 38 38);
    z-index: 100;
  }
</style>
