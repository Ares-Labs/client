<script>
const Header = require("../components/Header");
//import Header from "../components/Header";
export default {
  components: {
    Header,
  }
};
</script>
<template>

  <Header />
  <div>
    <h1>Manage your property</h1>
    <router-link to="/">dashboard</router-link>
    <router-link to="/live-data">live data</router-link>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: black 0.1rem 0.1rem 1.5rem 0.3rem;
}
</style>
