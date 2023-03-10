<script setup>
import Gateway from "@/utils/events";
import AdminNavbar from "../components/AdminNavbar.vue";
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";

const drones = ref([]);
const search = ref("");

const hasFetched = ref(false);
const isFetching = ref(true);

function recallDrone(id) {
  Gateway.onReady(async () => {
    await Gateway.execute(Gateway.queries.RECALL_DRONE, {
      droneId: id,
    });
  });
}

const updateDrones = () => {
  Gateway.onReady(async () => {
    isFetching.value = true;
    const { drones: data } = await Gateway.execute(
      Gateway.queries.GET_DISPATCHED_DRONES,
      {
        search: search.value,
        page: 1,
        limit: 10,
      }
    );
    drones.value = data;
    isFetching.value = false;
    hasFetched.value = true;
  });
};

const updateSearch = (e) => {
  search.value = e.target.value;
  updateDrones();
};

updateDrones();

Gateway.subscribe(Gateway.events.DRONE_DISPATCHED, updateDrones);
Gateway.subscribe(Gateway.events.DRONE_RECALLED, updateDrones);

</script>

<template>
  <div id="wrapper">
    <AdminNavbar />
    <main>
      <div class="title">
        <h1>Dispatched Drones</h1>
        <div class="search">
          <img alt="search" src="../assets/media/magnifying-glass.svg" />
          <input placeholder="Search" type="text" @input="updateSearch" />
        </div>
      </div>

      <div id="data">
        <div
          v-if="hasFetched && !isFetching && drones.length === 0"
          class="center big-text"
        >
          <h2>No matching drones found</h2>
        </div>
        <div v-else-if="isFetching" class="center">
          <orbit-spinner
            :animation-duration="1200"
            :size="128"
            color="#F1FAEE"
          />
        </div>
        <div v-for="drone in drones" v-else :key="drone.id" class="fetch">
          <p>{{ drone.id }}</p>
          <p>{{ drone.description }}</p>
          <img
            alt="info"
            src="../assets/media/return.svg"
            @click="() => recallDrone(drone.id)"
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

</style>
