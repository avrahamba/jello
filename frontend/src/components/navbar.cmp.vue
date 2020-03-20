<template>
  <header class="masthead">
    <div class="boards-menu">
      <button class="boards-btn btn">
        <i class="fab fa-trello boards-btn-icon"></i>Boards
      </button>

      <div class="board-search">
        <input type="search" class="board-search-input" aria-label="Board Search" />
        <i class="fas fa-search search-icon" aria-hidden="true"></i>
      </div>
    </div>
    <router-link to="/">
      <div class="logo">
        <h1>Jello</h1>
      </div>
    </router-link>

    <div class="user-settings">
      <button class="user-settings-btn btn" aria-label="Create">
        <i class="fas fa-plus" aria-hidden="true"></i>
      </button>

      <button class="user-settings-btn btn" aria-label="Information">
        <i class="fas fa-info-circle" aria-hidden="true"></i>
      </button>

      <button class="user-settings-btn btn" aria-label="Notifications">
        <i class="fas fa-bell" aria-hidden="true"></i>
      </button>

      <button class="user-settings-btn btn" aria-label="User Settings">
        <i class="fas fa-user-circle" aria-hidden="true"></i>
      </button>
      <button @click="doLogout" class="user-settings-btn btn" aria-label="User Settings">logout</button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
</style>
