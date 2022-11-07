<script>
export default {
  name: 'Header',
};
</script>

<template>
  <header>
    <img src="#" alt="ares-lab-icon">
    <p>Manage property</p>
    <p>Live data</p>
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
  padding: 3rem;
  margin-bottom: 20rem;
  background-color: orange;
  border-radius: 1rem;
  box-shadow: black 0.1rem 0.1rem 1.5rem 0.3rem;
}
</style>
