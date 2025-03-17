<script lang="ts">
  import { onDestroy } from "svelte";
  import Greeting from "./Greeting.svelte";

  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();

  let interval = setInterval(() => {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();
  }, 1000);

  onDestroy(() => clearInterval(interval));
</script>

<div class="flex flex-col items-center cursor-default">
  <h1 class="text-[150px] leading-none font-bold font-sans">
    {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}
  </h1>
  <Greeting {hours} />
</div>
