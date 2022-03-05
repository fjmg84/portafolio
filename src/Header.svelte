<script>
  let logo = "./logo.png";
  let edad = new Date().getFullYear() - 1984;
</script>

<header>
  <div class="grid grid-cols-1 md:grid-cols-2 m-6">
    <div
      class="py-4 text-center md:text-left animate__animated animate__fadeIn"
    >
      <img src={logo} alt={logo} class="logo inline" />
    </div>
    <div class="py-4 text-left md:text-right">
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

<style align="scss">
  .logo {
    position: relative;
    width: 100px;
  }

  .titulo__personales,
  .datos__personales {
    font-size: 14px;
  }

  .titulo__personales {
    font-weight: bolder;
  }
  .datos__personales {
    font-style: italic;
  }
</style>
