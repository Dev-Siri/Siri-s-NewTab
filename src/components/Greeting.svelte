<script lang="ts">
  import userStore from "../stores/user";

  export let hours: number;

  function getGreeting(hours: number) {
    if (hours >= 5 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else if (hours >= 18 && hours < 23) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }
</script>

<h2 class="text-5xl">
  {getGreeting(hours)},
  {$userStore}
</h2>
