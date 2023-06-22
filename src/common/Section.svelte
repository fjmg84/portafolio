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

<h1>
  <span>
    {title}
  </span>
  <button class="btn" id={btnProps} on:click={toggleF}>
    <img src="./svg/close.svg" alt="close" width="25" height="25" />
  </button>
</h1>

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

  h1 {
    display: flex;
    align-items: center;
    gap: 20px;
    span {
      letter-spacing: -0.06em;
    }
  }

  .btn {
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
