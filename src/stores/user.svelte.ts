class UserStore {
  user = $state<string | null>(null);

  constructor() {
    const storedUser = localStorage.getItem("user");
    this.user = storedUser;
  }
}

const userStore = new UserStore();

export default userStore;
