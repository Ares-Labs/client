<script setup>
import Property from "@/components/Property/Property.vue";
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
import AddProperty from "@/components/Property/AddProperty.vue";
import AwaitingProperty from "@/components/Property/AwaitingProperty.vue";
</script>

<template>
  <header-without-links name="Choose a property"></header-without-links>
  <div class="wrapper">
    <main>
      <div class="flex">
        <property name="Howest University" route="/manage-property" show="show"></property>
        <property name="Wall Street" show="show"></property>
        <property name="Space Station" show="show"></property>
        <property name="Mining Station" show="show"></property>
        <awaiting-property></awaiting-property>
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
