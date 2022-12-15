<script setup>
import AdminNavbar from "../components/AdminNavbar.vue";
</script>

<template>
  <div id="wrapper">
    <AdminNavbar />
    <main>
      <h1>Manage users</h1>
      <div>
        <img alt="search" src="../assets/media/magnifying-glass.svg" />
        <input placeholder="Search" type="text" />
      </div>

      <div id="data">
        <div v-for="i in 10" :key="i">
          <p>id</p>
          <p>John Doe</p>
          <img alt="info" src="../assets/media/info.svg" />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/css/admin-styles";

#wrapper {
  display: grid;
  grid-template-columns: min-content 1fr;

  background-color: $secondary;
}
</style>
<style lang="scss" scoped>
@import "../assets/css/admin-styles";

#data {
  padding: 2rem;
  max-width: 85%;
  margin: 0 auto;
  border-radius: $border-radius;

  background: linear-gradient(-45deg, $dark, $normal);

  div {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-gap: 1rem;

    background-color: $secondary;
    border-radius: $border-radius;

    padding: 1rem;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    p {
      font-size: $font-size-base;
      color: $dark;
    }
  }
}
</style>
