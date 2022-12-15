<script setup>
import Gateway from "@/utils/events";
import AdminNavbar from "../components/AdminNavbar.vue";
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";

const users = ref([]);
const search = ref("");

const hasFetched = ref(false);
const isFetching = ref(true);

const selectedUser = ref(null);
const selectedUserProperties = ref(null);
const isFetchingUserProperties = ref(false);

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

const setSelectedUser = async (user) => {
  selectedUser.value = user;
  isFetchingUserProperties.value = true;
  const { properties: data } = await Gateway.execute(
    Gateway.queries.GET_USER_PROPERTIES,
    {
      userId: user.id,
    }
  );

  selectedUserProperties.value = data;
  isFetchingUserProperties.value = false;
};

const clearSelectedUser = () => {
  selectedUser.value = null;
  selectedUserProperties.value = null;
};

updateUsers();
</script>

<template>
  <div v-if="!!selectedUser" class="popup">
    <div>
      <h3>{{ selectedUser.fullName }}</h3>
      <p>{{ selectedUser.id }}</p>
      <button @click="clearSelectedUser">
        <img alt="Close popup" src="../assets/media/fullscreen-exit.svg" />
      </button>
      <div v-if="isFetchingUserProperties" class="center">
        <orbit-spinner :animation-duration="1200" :size="64" color="#1d3557" />
      </div>
      <div v-else-if="!isFetchingUserProperties && !selectedUserProperties">
        <p>User does not have properties.</p>
      </div>
      <div
        v-for="property in selectedUserProperties"
        :key="property.id"
        class="property"
        v-else
      >
        <p>{{ property.location }}</p>
        <!-- TODO: Wrap a router-link around this -->
        <img alt="info" src="../assets/media/info.svg" />
      </div>
    </div>
  </div>
  <div id="wrapper">
    <AdminNavbar />
    <main>
      <div class="title">
        <h1>Manage users</h1>
        <div class="search">
          <img alt="search" src="../assets/media/magnifying-glass.svg" />
          <input placeholder="Search" type="text" @input="updateSearch" />
        </div>
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
          <img
            alt="info"
            src="../assets/media/info.svg"
            @click="() => setSelectedUser(user)"
          />
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

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;

    .search {
      display: flex;
      align-items: center;
      border: 0.2rem solid $dark;
      border-radius: $border-radius;
      padding: 0.1rem 0.5rem;

      input {
        width: 20rem;
        height: 2.5rem;
        padding: 0 1rem;
        color: $dark;
        background-color: $secondary;
        border: none;
        border-radius: $border-radius;
        outline: none;
        font-size: $font-size-base;
      }
    }
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

    img {
      cursor: pointer;
    }
  }
}

.popup {
  z-index: 100;
  background-color: rgba($dark, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: relative;
    width: 70%;
    padding: 2rem 3rem;
    background-color: $secondary;
    border-radius: $border-radius;

    h3 {
      font-size: $font-size-lg;
      font-weight: 700;
    }

    h3,
    p {
      text-align: center;
      color: $dark;
    }

    > p {
      font-size: $font-size-base;
      color: $normal;
      margin-bottom: 3rem;
    }

    button {
      background-color: transparent;
      border: none;
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }

    .property {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: $border-radius;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
      border: 0.25rem solid $dark;

      &:last-child {
        margin-bottom: 0;
      }

      p {
        width: 100%;
      }
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
