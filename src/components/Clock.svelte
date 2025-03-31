<script lang="ts">
  import Greeting from "./Greeting.svelte";

  let hours = $state(new Date().getHours());
  let minutes = $state(new Date().getMinutes());

  let interval = setInterval(() => {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();
  }, 1000);

  $effect(() => () => clearInterval(interval));
</script>

<div class="flex flex-col items-center cursor-default">
  <h1 class="text-[150px] leading-none font-bold font-sans">
    {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}
  </h1>
  <Greeting {hours} />
</div>
