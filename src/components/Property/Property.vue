<script setup>
import { ref } from "vue";
import Gateway from "@/utils/events";
import { successNotification } from "@/utils/notifications";

let dialogState = ref(false);

defineProps({
  name: String,
  tier: Number,
  route: String,
  show: Boolean,
  id: Number
});

function deleteProperty(id) {
  Gateway.onReady(async () => {
    const response = await Gateway.execute(Gateway.queries.
      REQUEST_REMOVE_PROPERTY, {
      propertyId: id
    })
    if (response.success) {
      successNotification("You have successfully submitted " +
        "a request to remove the property");
    }
  });
}
</script>

<template>
<div class="property">
  <img v-if="show" src="src/images/action.svg" alt="action"
       @click="dialogState = true"/>

  <GDialog v-model="dialogState" max-width="max-content" local>
      <button class="button" @click="deleteProperty(id);dialogState = false">
        Request removal
      </button>
  </GDialog>

  <router-link :to="`${route}`">{{name}}</router-link>
  <p v-if="typeof this.tier === 'undefined'"></p>
  <p v-else>Tier {{ tier }}</p>
</div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";
@import "src/assets/css/app";

.hidden {
  display: none;
}

.property {
  color: $dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: normal;
  border: 0.25rem solid $dark;
  width: 20rem;
  height: 12rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 2rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0 1px 0, rgba(17, 17, 26, 0.1) 0 8px 24px,
  rgba(17, 17, 26, 0.1) 0 16px 48px;
  background: linear-gradient(20deg, $normal, $light);
  transition: transform ease 0.5s;

  button {
    @include button;
    font-weight: bold;
  }

  img {
    width: 3rem;
    padding-left: 90%;
  }

  a {
    color: $dark;
    margin-top: 1.5rem;
  }

  div {
    opacity: 0;
    width: 0.5rem;
    margin-top: 0.5rem;
  }

  &:hover {
    @include hover;
  }

}

.pending {
  border: green dashed;
  background-image: none;
}

</style>
