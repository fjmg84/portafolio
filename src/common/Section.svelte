<script>
  import gsap from "gsap";

  export let divProps, btnProps, title;

  let show = false;
  function toggleF() {
    let div = document.querySelector(`#${divProps}`);
    let btn = document.querySelector(`#${btnProps}`);

    if (show) {
      gsap
        .timeline()
        .to(btn, {
          rotate: 90,
        })
        .to(div, {
          height: "0px",
        });
      show = false;
    } else {
      gsap
        .timeline()
        .to(btn, {
          rotate: -90,
        })
        .to(div, {
          height: div.scrollHeight,
        });
      show = true;
    }
  }
</script>

<button on:click={toggleF}>
  <h1>
    {title}
  </h1>
  <img id={btnProps} src="./svg/close.svg" alt="close" width="25" height="25" />
</button>

<div class="idDiv" id={`${divProps}`}>
  <div class="text">
    <slot />
  </div>
</div>

<style lang="scss">
  .idDiv {
    height: 0px;
    overflow: hidden;
  }
  .text {
    line-height: 1.5;
    margin-bottom: 5%;
  }

  button {
    font-family: "Wix Madefor Display", sans-serif;
    cursor: pointer;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    h1 {
      text-align: left;
      letter-spacing: -0.06em;
    }
  }

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #9333ea;
    font-size: 2rem;
    outline: none;

    img {
      width: 25px;
    }
  }
</style>
