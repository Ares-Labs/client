<script setup>
import Header from "../components/Header/Header.vue";
import AllowedUser from "../components/users/AllowedUser.vue";

import Gateway from "../utils/events";
import { onUpdated, ref } from "vue";

const allowedUserList = ref([]);
const propertyBeingManaged = window.location.pathname.split("/").pop();
onUpdated(getAllowedUsers);

function getAllowedUsers() {
  Gateway.onReady(async () => {
    const data = await Gateway.execute(Gateway.queries.GET_ALLOWED_USERS, {
      userId: Gateway.clientId,
      propertyId: propertyBeingManaged
    });
    allowedUserList.value = (Object.entries(data.allowedUsers).
    map(([key, value]) => ({ identity: key, name: value })));
  });
}

getAllowedUsers();
localStorage.setItem("propertyBeingManaged", propertyBeingManaged);
</script>

<template>
  <Header/>
  <main>
    <h1>Currently allowed users</h1>

    <div id="allowed-user-container">
      <AllowedUser v-for="user in allowedUserList"
                   :name="user.name"
                   :identity="user.identity"
      ></AllowedUser>
      <div id="add">
        <router-link :to="{ path: '/add-user/' + propertyBeingManaged }">
          <img src="../assets/media/plus-icon.svg" alt="plus" >
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";
@import "src/assets/css/app";

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 5rem;
}

#allowed-user-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 7rem 3rem 0 5rem;
}

#add {
  border: 0.15rem solid $dark;
  width: 20rem;
  height: 3rem;
  padding: 0.3rem;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  background-color: #e8e8e8;
  box-shadow: $dark 0 0.5rem 0.3rem 0.01rem;
  img {
    display: block;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    width: 3rem;
    @include img-hover;
  }
}
</style>
