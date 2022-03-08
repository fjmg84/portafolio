<script>
  import { Router, Route } from "svelte-routing";

  import Home from "./Home.svelte";
  import Download from "./views/Download.svelte";
</script>

<Router>
  <Route path="/"><Home /></Route>
  <Route path="/download"><Download /></Route>
</Router>
