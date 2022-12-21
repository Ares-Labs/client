<script setup>
import Property from "@/components/Property/Property.vue";
</script>

<template>
  <router-link to="/add-property">
    <Property class="add" :route="`/add-property`"/>
  </router-link>
</template>

<style lang="scss" scoped>
.add {
  background: url("../../assets/media/plus-icon.svg") no-repeat center;
  background-size: 5rem;
}
</style>
