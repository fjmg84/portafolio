<script>
  import { experience } from "../../../data/data.json";
  let texts = experience.text.reverse();
</script>

<h1>{experience.title}</h1>
<ul>
  {#each texts as { entity, post, date }, i}
    <li>
      <div class="linetime">
        <div class="circle" />
        {#if i + 1 < texts.length}
          <div class="line" />
        {/if}
      </div>
      <div>
        <h3>{entity}</h3>
        <p>{post}</p>
        <small>{date}</small>
      </div>
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
    list-style-type: none;
    padding: 0%;
    li {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: baseline;
      h3 {
        text-transform: uppercase;
        font-size: 1.7rem;
        font-family: "Work Sans";
      }

      p {
        font-family: "Work Sans";
        font-size: 1.3rem;
        line-height: 40px;
        text-align: left;
        font-style: italic;
      }

      small {
        font-family: "Work Sans";
        font-style: italic;
        font-size: 1rem;
      }
    }
  }

  .linetime {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10px;
    margin: 10px 20px;
    gap: 20px;
  }

  .circle {
    width: 20px;
    height: 20px;
    background: $white;
    border-radius: 50%;
  }

  .line {
    width: 2px;
    height: 150px;
    background: $white;
  }
</style>
