<script>
  import { aboutMe } from "../../../data/data.json";
  import Section from "../../../common/Section.svelte";
</script>

<div class="container">
  <Section divProps={"aboutMe"} btnProps={"aboutMeBtn"} title={aboutMe.title}>
    <p>{aboutMe.text}</p>
  </Section>
</div>

<style lang="scss">
  p {
    font-size: large;
    font-style: italic;
    margin: 0%;
  }
</style>
