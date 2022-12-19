<script setup>
import Gateway from "../../utils/events";
import { ref } from "vue";

const props = defineProps({
  name: String,
  identity: String,
});

const added = ref(false);

function addUser(id) {
  Gateway.onReady( () => {
    Gateway.execute(Gateway.queries.ADD_ALLOWED_USER, {
      propertyId: propertyBeingManaged,
      userId: id
    }).then(response => {
      console.log(response);
      if (response.success) {
        added.value = true
      }
    })
  });
}

const propertyBeingManaged = window.location.pathname.split("/").pop();
</script>

<template>
  <div class="to-be-added-user" :class="{added: added}">
    <div class="to-be-added-user-info">
      <img src="/src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> {{name}} </p>
        <p> ID: {{identity}} </p>
      </div>
    </div>
    <a @click="() => !added ? addUser(identity) : null" :class="{btn: !added}">
      <img v-if="added" src="/src/images/checkmark.png" alt="added">
      <img v-else src="/src/assets/media/plus-icon.svg" alt="plus">
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";

.to-be-added-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid black 0.1rem;
  width: 20rem;
  height: 3rem;
  padding: 0.3rem;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  background-color: #e8e8e8;

  div {
    div {
      p:last-child {
        opacity: 50%;
        margin-top: 0.1rem;
      }
    }
  }

  a {
    margin-right: 1rem;
  }

  a:hover {
    cursor: pointer;
  }
}

.added {
  background-color: #0BDA51;
}

.to-be-added-user-info {
  display: flex;
}

img {
  width: 2rem;
  padding-left: 0.3rem;
  margin-right: 1rem;
}

.btn {
  @include img-hover;
}

</style>