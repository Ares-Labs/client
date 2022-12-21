<script setup>
import Property from "@/components/Property/Property.vue";
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
import AddProperty from "@/components/Property/AddProperty.vue";
import Gateway from "@/utils/events";
import { ref } from "vue";

const properties = ref(null);

Gateway.onReady(async () => {
  const response = await Gateway.execute(Gateway.queries.GET_USER_PROPERTIES, {
    userId: Gateway.clientId,
  });
  console.log(properties.value);
  setTimeout(() => {
    properties.value = response.properties;
    console.log(properties.value);
  }, 1000);
});
</script>

<template>
  <header-without-links name="Choose a property"></header-without-links>
  <div class="wrapper">
    <main>
      <div class="flex">
        <template v-if="properties === null">
          <p>Loading...</p>
        </template>
        <template v-else-if="properties.length > 0">
          <property
            v-for="property in properties"
            :key="property?.id"
            :name="property?.location"
            :tier="property?.tier"
            :class="property?.status.toLowerCase()"
            :route="`/manage-property/${property?.id}`"
          ></property>
          <add-property></add-property>
        </template>
        <template v-else>
          <add-property></add-property>
        </template>
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
