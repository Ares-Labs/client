<script>
import Property from "../components/Property.vue";
import HeaderWithoutLinks from "../components/Header/HeaderWithoutLinks.vue";

export default {
  components: {
    HeaderWithoutLinks,
    Property,
  }
};
</script>

<template>
  <header-without-links name="Choose a property"></header-without-links>
  <div class="wrapper">
    <main>
      <div class="flex">
        <property name="Howest University"></property>
        <property name="Wall Street"></property>
        <property name="Space Station"></property>
        <property name="Mining Station"></property>
        <property class="add"></property>
      </div>
    </main>
  </div>

</template>

<style lang="scss" scoped>

.wrapper {
  width: 90%;
  margin: auto;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.add {
  background: url("@/assets/media/sum.svg") no-repeat center;
  background-size: 5rem;
}
</style>