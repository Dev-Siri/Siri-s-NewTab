<script lang="ts">
  import userStore from "../stores/user";

  let username = "";
  let isFocused = false;

  function createUser(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    e.preventDefault();

    localStorage.setItem("user", username);
    userStore.set(username);
  }
</script>

<form class="flex flex-col" on:submit={createUser}>
  <input
    placeholder="What's your name?"
    type="text"
    bind:value={username}
    on:focus={() => (isFocused = true)}
    on:blur={() => (isFocused = false)}
    class="text-5xl bg-transparent text-white outline-none placeholder:text-white"
  />
  <div
    class="h-1 w-full bg-white rounded-full duration-200 {isFocused
      ? 'scale-100'
      : 'scale-0'}"
  />
</form>
