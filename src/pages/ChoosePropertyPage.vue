<script>
import Header from "../components/Header.vue";
import Property from "../components/Property.vue";

export default {
  components: {
    Property,
    Header,
  }
};
</script>

<template>
<Header/>
<main>
  <div>
    <Property/>
  </div>
</main>
</template>

<style lang="scss" scoped>

</style>