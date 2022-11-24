<script setup>
const allowedUserList = [];

import Gateway from "../../utils/events.js";
const props = defineProps({
  name: String,
  identity: String,
});

//await Gateway.execute(Gateway.queries.GET-ALLOWED-USER);

async function deleteUser(e) {
  //api call
  /*
  await Gateway.execute(Gateway.queries.remove-allowed-user, {
    name: {name},
    identity: {identity},
  });
  */
  e.target.closest(".allowedUser").outerHTML="";
}
</script>

<template>
  <div class="allowedUser">
    <div class="userinfo">
      <img src="/src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> {{name}} </p>
        <p> ID: {{identity}} </p>
      </div>
    </div>
    <button @click="deleteUser">Delete user</button>
  </div>
</template>

<style lang="scss" scoped>

.allowedUser {
  border: solid black 0.1rem;
  width: 15rem;
  height: 5rem;
  padding: 0.3rem;
  margin: 3rem;
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
  display: flex;
  border: 0.1rem solid black;
  border-radius: 9rem;
  background-color: red;
  color: white;
  margin-top: 1.5rem;
}

button:hover {
  background-color: #852d26;
}

</style>
