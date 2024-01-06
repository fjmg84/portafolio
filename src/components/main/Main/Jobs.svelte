<script>
  import { experience } from "../../../data/data.json";
  let texts = experience.text.reverse();
</script>

<h1>{experience.title}</h1>
<ul>
  {#each texts as { entity, post, date, description }, i}
    <li>
      <div style="display: flex; flex-direction:row; gap: 10px">
        <div
          style="display: flex; flex-direction: column; align-items: center; position: relative"
        >
          <div class="circle" />
          <div class="line" />
          {#if i + 1 >= texts.length}
            <img
              src="/svg/arrow-down-timeline.svg"
              alt="arrow-down"
              style="position: absolute; bottom: 0;"
              width="40px"
            />
          {/if}
        </div>
        <div style="display: flex; flex-direction:column; gap: 5px">
          <h3>{entity}</h3>
          <p>{post}</p>
          <p>{date}</p>
          <p class="description">{description}</p>
        </div>
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
        text-align: left;
        font-style: italic;
      }

      .description {
        font-family: "Work Sans";
        font-style: italic;
        font-size: 1rem;
        margin-bottom: 10%;
        line-height: 25px;
      }
    }
  }

  /* .linetime {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10px;
    margin: 10px 20px;
    gap: 20px;
  } */

  .circle {
    width: 20px;
    height: 20px;
    background: $white;
    border-radius: 50%;
  }

  .line {
    width: 2px;
    min-height: 180px;
    background: $white;
    height: 100%;
  }
</style>
