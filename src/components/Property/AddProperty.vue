<script>
import Property from "@/components/Property/Property.vue";
export default {
  name: "AddProperty",
  components: { Property },
};
</script>

<template>
  <router-link to="/add-property">
    <property class="add"></property>
  </router-link>
</template>

<style lang="scss" scoped>
.add {
  background: url("src/assets/media/add.svg") no-repeat center;
  background-size: 5rem;
}
</style>