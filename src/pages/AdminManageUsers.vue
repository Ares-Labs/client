<script setup>
import Gateway from "@/utils/events";
import AdminNavbar from "../components/AdminNavbar.vue";
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";

const users = ref([]);
const search = ref("");

const hasFetched = ref(false);
const isFetching = ref(true);

const updateUsers = () => {
  Gateway.onReady(async () => {
    isFetching.value = true;
    const { users: data } = await Gateway.execute(Gateway.queries.GET_USERS, {
      search: search.value,
      page: 1,
      limit: 10,
    });
    users.value = data;
    isFetching.value = false;
    hasFetched.value = true;
  });
};

const updateSearch = (e) => {
  search.value = e.target.value;
  updateUsers();
};

updateUsers();
</script>

<template>
  <div id="wrapper">
    <AdminNavbar />
    <main>
      <h1>Manage users</h1>
      <div>
        <img alt="search" src="../assets/media/magnifying-glass.svg" />
        <input placeholder="Search" type="text" @input="updateSearch" />
      </div>

      <div id="data">
        <div
          v-if="hasFetched && !isFetching && users.length === 0"
          class="center big-text"
        >
          <h2>No matching users found</h2>
        </div>
        <div v-else-if="isFetching" class="center">
          <orbit-spinner
            :animation-duration="1200"
            :size="128"
            color="#F1FAEE"
          />
        </div>
        <div v-for="user in users" v-else :key="user.id" class="fetch">
          <p>{{ user.id }}</p>
          <p>{{ user.fullName }}</p>
          <img alt="info" src="../assets/media/info.svg" />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/css/admin-styles";

#wrapper {
  display: grid;
  grid-template-columns: min-content 1fr;

  background-color: $secondary;
}
</style>
<style lang="scss" scoped>
@import "../assets/css/admin-styles";

main {
  width: 90%;
  margin: 0 auto;

  h1 {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $dark;
  }
}

#data {
  $min-data-height: 30rem;

  padding: 2rem;
  border-radius: $border-radius;
  min-height: $min-data-height;

  background: linear-gradient(-45deg, $dark, $normal);

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $min-data-height;
  }

  .big-text h2 {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $light;
  }

  .fetch {
    display: grid;
    grid-template-columns: max-content 1fr min-content;
    grid-gap: 1rem;

    background-color: $secondary;
    border-radius: $border-radius;

    padding: 1rem;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    p {
      font-size: $font-size-base;
      color: $dark;
    }
  }
}
</style>
