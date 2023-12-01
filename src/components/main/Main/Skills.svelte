<script>
  import { skills } from "../../../data/data.json";
</script>

<h1>{skills.title}</h1>
<ul>
  {#each skills.text as skill}
    {#if skill !== "GraphQL"}
      <li><p>{skill}</p></li>
    {:else}
      <li>{skill}</li>
    {/if}
  {/each}
</ul>

<style lang="scss">
  @import "../../../color";

  h1 {
    font-family: "Paytone One";
    font-size: 3rem;
    text-align: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0%;
    gap: 20px;
    align-items: center;
    justify-content: center;
    li {
      float: left;
      font-family: "Work Sans";
      font-size: 1.7rem;
      background: $light_black;
      padding: 10px;
      p {
        display: flex;
        align-items: center;
        justify-content: right;
      }
    }
  }
</style>
