<script setup>
import Gateway from "../../utils/events.js";

const props = defineProps({
  name: String,
  identity: String,
});

function deleteUser(id) {
  Gateway.onReady( () => {
    Gateway.execute(Gateway.queries.REMOVE_ALLOWED_USER, {
      propertyId: propertyBeingManaged,
      userId: id,
    });
  });
}

const propertyBeingManaged = window.location.pathname.split("/").pop();
</script>

<template>
  <div class="allowedUser">
    <div class="userinfo">
      <img src="/src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> {{ name }} </p>
        <p> ID: {{ identity }} </p>
        <button @click="deleteUser(identity)">Delete user</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";

.allowedUser {
  border: solid black 0.1rem;
  width: 15rem;
  height: 5rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  background-color: #e8e8e8;
  box-shadow: black 0 0.5rem 0.3rem 0.01rem;
  div {
    div {
      p:last-child {
        opacity: 50%;
        margin-top: 0.1rem;
      }
    }
  }
}

.userinfo {
  display: flex;
}

img {
  width: 2rem;
  margin-right: 1rem;
  padding-left: 0.1rem;
}

button {
  @include button;
}

button:hover {
  background-color: #852d26;
}

.hidden {
  display: none;
}

</style>
