<script>
  import Section from "../../../common/Section.svelte";
  import { experience } from "../../../data/data.json";
</script>

<article class="container">
  <Section
    divProps={"experience"}
    btnProps={"experienceBtn"}
    title={experience.title}
  >
    <ul>
      {#each experience.text as job}
        <li class="">
          <span>{job.entity}</span>
          <small>{job.post}</small>
        </li>
      {/each}
    </ul>
  </Section>
</article>

<style lang="scss">
  ul {
    list-style-type: none;
    padding: 0%;
    li {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: left;
      margin: 2% 0%;
      span {
        display: flex;
        align-items: center;
        justify-content: right;
        text-transform: uppercase;
        margin: 0%;
        &::after {
          content: "";
          border-radius: 100px;
          background: #9333ea;
          margin: 0% 2vw;
          width: 5px;
          height: 5px;
        }
      }

      small {
        font-style: italic;
        font-size: 1rem;
      }
    }
  }
</style>
