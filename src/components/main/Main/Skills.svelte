<script>
  import Section from "../../../common/Section.svelte";
  import { skills } from "../../../data/data.json";
</script>

<div class="container">
  <Section divProps={"skills"} btnProps={"skillsBtn"} title={skills.title}>
    <ul>
      {#each skills.text as skill}
        {#if skill !== "GraphQL"}
          <li><span>{skill}</span></li>
        {:else}
          <li>{skill}</li>
        {/if}
      {/each}
    </ul>
  </Section>
</div>

<style lang="scss">
  ul {
    display: inline-block;
    list-style: none;
    padding: 0%;
    li {
      float: left;
      font-style: italic;
      span {
        display: flex;
        align-items: center;
        justify-content: right;
        &::after {
          content: "";
          border-radius: 100px;
          background: #9333ea;
          margin: 0% 2vw;
          width: 5px;
          height: 5px;
        }
      }
    }
  }
</style>
