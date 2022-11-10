<script setup>

</script>

<template>
  <header>
    <router-link to="/"
      ><img src="../../assets/media/ares-labs-logo.png" alt="ares-labs-logo"
    /></router-link>
    <div>
      <router-link to="/manage-property"><p>Manage Property</p></router-link>
      <router-link to="/live-data"><p>Live Data</p></router-link>
      <router-link to="#"><p>Map</p></router-link>
      <router-link to="#"><p>Recent activity</p></router-link>
      <router-link to="/pricing"><p>Pricing / Upgrade</p></router-link>
    </div>
    <img src="src/assets/media/profile.svg" alt="profile">
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 10% 1.5rem 10%;
  box-shadow: black 0.1rem 0.1rem 0.7rem 0.1rem;
  margin-bottom: 10rem;
  height: 3rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;

    p {
      height: 100%;
      transition: transform ease 0.5s;
      font-size: 1.25rem;
      color: black;
    }

    p:hover {
      transform: translate(0, 3px);
    }
  }

  img {
    width: 3rem;
  }
}
</style>
