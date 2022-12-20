<script setup>
import Header from "../components/Header/Header.vue";
import ToBeAddedUser from "@/components/users/ToBeAddedUser.vue";
import Gateway from "@/utils/events";
import { ref } from "vue";

const propertyBeingManaged = window.location.pathname.split("/").pop();

const users = ref([]);
const search = ref("");

const updateUsers = () => {
  Gateway.onReady(async () => {
    const { users: data } = await Gateway.execute(Gateway.queries.GET_USERS, {
      search: search.value,
      page: 1,
      limit: 10,
    });
    users.value = data;
  });
};

const updateSearch = (e) => {
  search.value = e.target.value;
  updateUsers();
};

updateUsers();
</script>

<template>
  <Header/>
  <main>
    <div class="wrapper">
      <h1>Add a user</h1>
      <div class="search">
        <img alt="search" src="../assets/media/magnifying-glass.svg" />
        <input placeholder="Search" type="text" @input="updateSearch" />
      </div>
      <div class="res">
        <ToBeAddedUser
          v-for="user in users"
          :identity = user.id
          :name = user.fullName>
        </ToBeAddedUser>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/css/app";

main {
  .wrapper {
    width: 40%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search {
    display: flex;
    align-items: center;
    border: 0.2rem solid $dark;
    border-radius: $border-radius;
    padding: 0.1rem 0.5rem;
    margin-bottom: 2rem;
    width: 20rem;
  }
    input {
      width: 20rem;
      height: 2.5rem;
      padding: 0 1rem;
      color: $dark;
      border: none;
      border-radius: $border-radius;
      outline: none;
      font-size: $font-size-base;
    }
  .res {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

</style>
