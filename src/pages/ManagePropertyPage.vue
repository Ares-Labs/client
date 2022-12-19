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
    })
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

    <div id="allowedUserContainer">
      <AllowedUser v-for="user in allowedUserList"
                   :name="user.name"
                   :identity="user.identity"
      ></AllowedUser>
      <div id="addNewAllowedUser">
        <router-link :to="{ path: '/add-user/' + propertyBeingManaged }">
          <img src="../assets/media/plus-icon.svg" alt="plus" >
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 5rem;
}

#allowedUserContainer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 7rem 3rem 0 5rem;
}

#addNewAllowedUser {

  border: solid black 0.1rem;
  width: 15rem;
  height: 5rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  background-color: #e8e8e8;
  box-shadow: black 0 0.5rem 0.3rem 0.01rem;
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
