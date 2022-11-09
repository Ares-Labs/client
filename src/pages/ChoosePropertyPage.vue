<script>
import Property from "@/components/Property/Property.vue";
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
import AddProperty from "@/components/Property/AddProperty.vue";
import AwaitingProperty from "@/components/Property/AwaitingProperty.vue";

export default {
  components: {
    AwaitingProperty,
    AddProperty,
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
        <router-link to="/manage-property"> <!-- TODO: add this for other components -->
          <property name="Howest University"></property>
        </router-link>
        <property name="Wall Street"></property>
        <property name="Space Station"></property>
        <property name="Mining Station"></property>
        <awaiting-property name="Something"></awaiting-property>
        <add-property></add-property>
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

</style>