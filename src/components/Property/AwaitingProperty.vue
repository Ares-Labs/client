<script setup>
import Property from "@/components/Property/Property.vue";

const props = defineProps({
  name: String,
});
</script>

<template>
  <property name="Awaiting approval" class="awaiting">
  </property>
</template>

<style lang="scss" scoped>
.awaiting {
  border: green dashed;
  background-image: none;
}
</style>
