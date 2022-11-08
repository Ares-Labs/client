<script setup>
import Gateway from "./utils/events";

if (!Gateway.is_initialized) {
  const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
  const id = localStorage.getItem("id") || defaultId;

  Gateway.init(id);
}

Gateway.subscribe(Gateway.ALL_EVENTS, (data) => {
  console.log(data);
});
</script>

<template>
  <router-view></router-view>
</template>
