<script setup>
import Gateway from "./utils/events";

if (!Gateway.isInitialized) {
  const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
  const id = localStorage.getItem("id") || defaultId;

  try {
    Gateway.init(id);
  } catch (e) {
    console.error("Failed to initialize gateway", e);
  }
}

// If the url ends with a number, make that the propertyBeingManaged in localstorage
const urlEndsWithNumber = window.location.pathname.split("/").pop();
if (urlEndsWithNumber) {
  localStorage.setItem("propertyBeingManaged", parseInt(urlEndsWithNumber));
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  font-family: "Open Sans", sans-serif;
}

a,
router-link {
  text-decoration: none;
  text-transform: capitalize;
}

.hiddenRemove {
  display: none;
}

.hiddenVisibility {
  visibility: hidden;
}
</style>
