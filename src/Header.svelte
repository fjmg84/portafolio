<script>
  let logo = "./logo.png";
  let edad = new Date().getFullYear() - 1984;
</script>

<header>
  <!--grid grid-flow-row grid-cols-2 -->
  <div class="grid grid-cols-2">
    <div class="py-4 animate__animated animate__fadeIn">
      <img class="logo" src={logo} alt={logo} />
    </div>
    <div class="py-8 text-right">
      <ul>
        <li>
          <span class="titulo__personales">nombre:</span><span
            class="datos__personales">Fidel de Jesus Miranda Gallego</span
          >
        </li>
        <li>
          <span class="titulo__personales">edad:</span><span
            class="datos__personales">{edad} año</span
          >
        </li>
        <li>
          <span class="titulo__personales">móvil:</span><span
            class="datos__personales"
          >
            (+53) 54756652</span
          >
        </li>
        <li>
          <span class="titulo__personales">email:</span><span
            class="datos__personales"
          >
            <a href="mailto:fjmgqba@gmail.com">fjmgqba@gmail.com</a></span
          >
        </li>
      </ul>
    </div>
  </div>
</header>

<style>
  header {
    padding: 0px 10px 0px 10px;
  }

  .titulo__personales,
  .datos__personales {
    font-size: 14px;
  }

  .titulo__personales {
    font-weight: bolder;
    margin-right: 5px;
  }
  .datos__personales {
    font-style: italic;
    margin-right: 10px;
  }
  .logo {
    width: 100px;
  }
</style>
