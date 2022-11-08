<script setup>
import Gateway from "./utils/events";

if (!Gateway.isInitialized) {
  const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
  const id = localStorage.getItem("id") || defaultId;

  Gateway.init(id);
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  font-family: "Open Sans", sans-serif;
}
a, router-link {
  text-decoration: none;
}
</style>
