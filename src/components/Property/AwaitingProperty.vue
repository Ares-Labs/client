<script>
import Property from "@/components/Property/Property.vue";

export default {
  name: "AwaitingProperty",
  components: { Property },
  props: ['name'],
};
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