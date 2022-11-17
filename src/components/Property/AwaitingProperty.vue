<script setup>
import Property from "@/components/Property/Property.vue";

const props = defineProps({
  name: String,
});
</script>

<template>
  <Property name="Awaiting approval" class="awaiting"/>
</template>

<style lang="scss" scoped>
.awaiting {
  border: green dashed;
  background-image: none;
}
</style>
