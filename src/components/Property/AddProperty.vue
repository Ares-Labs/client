<script setup>
import Property from "@/components/Property/Property.vue";

function addProperty() {
  console.log("added property")
}
</script>

<script>
export default {
  name: "AddProperty"
};
</script>

<template>
  <property @click="addProperty" class="add"></property>
</template>

<style lang="scss" scoped>
.add {
  background: url("src/assets/media/add.svg") no-repeat center;
  background-size: 5rem;
}
</style>