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
<main>
  <div class="flex">
    <property name="Howest University"></property>
    <property name="Wall Street"></property>
    <property name="Space Station"></property>
    <property name="Mining Station"></property>
    <property></property>
  </div>
</main>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  box-shadow: black 0.1rem 0.1rem 0.7rem 0.1rem;
  margin-bottom: 15rem;

  h1 {
    font-size: 2rem;
    display: block;
    align-items: center;
    margin: 0.5rem 0 0 5rem ;
    height: 100%;
  }
  img {
    width: 3rem;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>