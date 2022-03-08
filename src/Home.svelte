<script>
  import "animate.css";
  import Lightbulb from "svelte-material-icons/LightbulbOn.svelte";

  import Main from "./views/main/Main.svelte";
  import Header from "./Header.svelte";

  let { texto, fondo } = JSON.parse(localStorage.getItem("theme")) || {
    texto: "text-white",
    fondo: "bg-slate-900",
  };

  const handleChangeTheme = () => {
    if (texto === "text-slate-900" && fondo === "bg-white") {
      document.documentElement.classList.add("dark");
      texto = "text-white";
      fondo = "bg-slate-900";
      localStorage.setItem("theme", JSON.stringify({ texto, fondo }));
    } else {
      document.documentElement.classList.remove("dark");
      texto = "text-slate-900";
      fondo = "bg-white";
      localStorage.setItem("theme", JSON.stringify({ texto, fondo }));
    }
  };
</script>

<div
  class={`container mx-auto ${texto} ${fondo} rounded-lg px-6 py-8 shadow-xl dark:bg-slate-900`}
>
  <Header />
  <div on:click={handleChangeTheme}>
    <Lightbulb size="25" />
  </div>
  <Main />
</div>
