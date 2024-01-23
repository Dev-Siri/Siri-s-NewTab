import { writable } from "svelte/store";

const storedUser = localStorage.getItem("user");

const userStore = writable<string | null>(storedUser);

export default userStore;
