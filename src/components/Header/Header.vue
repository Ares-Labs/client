<script setup>
import { ref } from "vue";

const propertyBeingManaged = ref();

// Get the last path parameter from the url if It's not in localstorage
const endOfUrlIsANumber = window.location.pathname.match(/\d+$/);
if (endOfUrlIsANumber) {
  propertyBeingManaged.value = endOfUrlIsANumber[0];
} else {

  const storageValue = localStorage.getItem("propertyBeingManaged");
  if (storageValue) {
    propertyBeingManaged.value = storageValue;
  } else {
    propertyBeingManaged.value = "";
  }
}

</script>

<template>
  <header>
    <router-link to="/">
      <img src="../../assets/media/ares-labs-logo.png" alt="ares-labs-logo" />
    </router-link>
    <div>
<!--      Add a router link to /manage-property with the lastPath at the end-->
      <router-link :to="'/manage-property/' + propertyBeingManaged"><p>Manage Property</p></router-link>
      <router-link :to="'/live-data/' + propertyBeingManaged"><p>Live Data</p></router-link>
      <router-link to="/map-page"><p>Map</p></router-link>
      <router-link to="/statistics"><p>Statistics</p></router-link>
      <router-link to="/pricing"><p>Pricing / Upgrade</p></router-link>
    </div>
    <router-link to="/profile">
      <img src="../../assets/media/profile.svg" alt="profile" />
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
  margin-bottom: 5rem;
  height: 3rem;
  background: linear-gradient(30deg, $normal, $light);

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;

    p {
      height: 100%;
      transition: transform ease 0.5s;
      font-size: 1.25rem;
      color: $dark;
      font-weight: bold;
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
