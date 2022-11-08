<script setup>
import Gateway from "./utils/events";

const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
const id = localStorage.getItem("id") || defaultId;

Gateway.init(id);
</script>

<template>
  <router-view></router-view>
</template>
