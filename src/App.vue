<script setup>
import Gateway from "./utils/events.js";

// Example gateway subscription
Gateway.subscribe("event", (data) => {
  console.log(data);
});
</script>

<template>
  <header>
    <h1>Ares LABS</h1>
  </header>

  <main>
    <p>Hello</p>
  </main>
</template>

<style lang="scss" scoped>
main {
  p {
    color: red;
  }
}
</style>
