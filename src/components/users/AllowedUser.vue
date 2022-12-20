<script setup>
import Gateway from "../../utils/events.js";
import { ref } from "vue";

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
  <div class="allowed-user">
    <div class="allowed-user-info">
      <img src="/src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> {{name}} </p>
        <p> ID: {{identity}} </p>
      </div>
    </div>
    <a @click="deleteUser(identity)" class="btn">
      <img src="/src/images/x.png" alt="delete">
    </a>
  </div>
</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";
@import "src/assets/css/app";

.allowed-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.15rem solid $dark;
  width: 20rem;
  height: 3rem;
  padding: 0.3rem;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  background-color: #e8e8e8;
  box-shadow: $dark 0 0.5rem 0.3rem 0.01rem;
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

.allowed-user-info {
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
