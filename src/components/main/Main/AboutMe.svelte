<script>
  import { aboutMe } from "../../../data/data.json";
</script>

<h1>{aboutMe.title}</h1>
<div class="text">{@html aboutMe.text}</div>

<style lang="scss">
  h1 {
    font-family: "Paytone One";
    font-size: 3rem;
    text-align: center;
  }
  .text {
    font-family: "Work Sans";
    font-size: 1.7rem;
    line-height: 40px;
    text-align: center;
  }
</style>
