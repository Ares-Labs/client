<script setup>
const props = defineProps(['name']);
</script>

<template>
  <header>
    <router-link to="/"
      ><img src="../../assets/media/ares-labs-logo.png" alt="Ares Labs logo"
    /></router-link>
    <h1>{{props.name}}</h1>
    <router-link to="/profile">
      <img src="../../assets/media/profile.svg" alt="profile">
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
@import "src/assets/css/app";

header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 10% 1.5rem 10%;
  box-shadow: $black 0.1rem 0.1rem 0.7rem 0.1rem;
  margin-bottom: 10rem;
  align-items: center;
  background: linear-gradient(30deg, $normal, $light);

  h1 {
    font-size: 2rem;
  }

  img {
    width: 3rem;
  }
}
</style>
