<script setup>
import Header from "../components/Header/Header.vue";
import AllowedUser from "../components/users/AllowedUser.vue";
import Gateway from "../utils/events";
import {onMounted, onUpdated} from "vue";

const allowedUserList = [];

onMounted(getAllowedUsers); // DOMContentLoaded
setTimeout(getAllowedUsers, 2000); // execute every 2 seconds

function getAllowedUsers() {
  Gateway.onReady(() => {
    Gateway.execute(Gateway.queries.GET_ALLOWED_USERS, {
      userId: Gateway.clientId,
    }).then((data) => {
      allowedUserList.value = data.properties;
    });
  });
}
</script>

<template>
  <Header/>
  <main>
    <h1>Currently allowed users</h1>

    <div id="allowedUserContainer">
      <AllowedUser v-for="user in allowedUserList"
                   :name="user.name"
                   :identity="user.id"
      ></AllowedUser>
      <AllowedUser name="Mr.Bean" identity="4cc-4b03-9c3f66e3"/>
      <AllowedUser name="Samantha" identity="4cc-4b03-9c3f66e3"/>
      <div id="addNewAllowedUser">
        <router-link to="/add-user">
          <img src="../assets/media/plus-icon.svg" alt="plus">
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

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

  img {
    display: block;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    width: 3rem;
  }
}
</style>
