<script>
export default {
  name: 'Header',
};
</script>

<template>
  <header>
    <router-link to="/"><img src="#" alt="ares-lab-icon"></router-link>
    <router-link to="/manage-property">manage property</router-link>
    <router-link to="/live-data">live data</router-link>
    <p>Map</p>
    <p>Recent activity</p>
    <p>Pricing / Upgrade</p>
    <img src="#" alt="profile icon">
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  box-shadow: black 0.1rem 0.1rem 0.7rem 0.1rem;
}
</style>