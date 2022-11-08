<script setup>
import Gateway from "./utils/events";

if (!Gateway.isInitialized) {
  const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
  const id = localStorage.getItem("id") || defaultId;

  Gateway.init(id);
}

// const res = await Gateway.execute(Gateway.queries.NEW_PROPERTY, { name: "id", value: "123" });
// Gateway.execute("queries.add-property", {}).then(console.log);

Gateway.subscribe(Gateway.events.ALL, (data) => {
  console.log(data);
});
</script>

<template>
  <router-view></router-view>
</template>
