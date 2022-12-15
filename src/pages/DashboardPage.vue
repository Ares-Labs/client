<script setup>
import HeaderWithoutLinks from "../components/Header/HeaderWithoutLinks.vue";
</script>
<template>
  <HeaderWithoutLinks name="Dashboard"></HeaderWithoutLinks>
  <div class="wrapper">
    <main>
      <div>
        <router-link to="/choose-property"><p>Manage Property</p></router-link>
        <router-link to="/live-data"><p>Live Data</p></router-link>
        <router-link to="/"><p>Statistics</p></router-link>
        <router-link to="/map-page"><p>Map</p></router-link>
        <router-link to="/pricing"><p>Pricing / Upgrade</p></router-link>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins.scss";

$hover-color: #e8e8e8;

.wrapper {
  width: 90%;
  margin: auto;
}

main {
  font-size: 1.5rem;

  div {
    display: flex;
    justify-content: center;
    justify-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  p {
    border: solid black;
    padding: 6rem 9rem;
    box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
    transition: transform ease 0.5s;
    border-radius: 0.3rem;
  }

  p:hover {
    @include hover;
  }
}
</style>
