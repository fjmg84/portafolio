<script>
  import { skills } from "../../../data/data.json";
</script>

<h1>{skills.title}</h1>
<ul>
  {#each skills.text as skill, i}
    <li style={`background:${skill.bg}; color:${skill.color ?? ""}`}>
      {skill.name}
    </li>
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
    max-width: 750px;
    li {
      float: left;
      font-family: "Work Sans";
      font-size: 1.2rem;
      background: $light_black;
      padding: 10px 20px;
      transition: all 0.2s ease;
      p {
        display: flex;
        align-items: center;
        justify-content: right;
        color: white;
      }
      /* &:hover {
        background-color: white;
        color: $light_black;
      } */
    }
  }
</style>
