<script setup>
import Gateway from "@/utils/events";
import AdminNavbar from "../components/AdminNavbar.vue";
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const properties = ref([]);
const search = ref("");

const route = useRoute();
const router = useRouter();

const selectedProperty = ref(null);

const hasFetched = ref(false);
const isFetching = ref(true);

function approveProperty(id) {
  Gateway.onReady(async () => {
    await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_STATUS, {
      propertyId: id,
      status: "APPROVED",
    });
  });
}

const updatePendingProperties = () => {
  Gateway.onReady(async () => {
    isFetching.value = true;
    const { properties: data } = await Gateway.execute(
      Gateway.queries.SEARCH_PENDING_PROPERTIES,
      {
        search: search.value,
        page: 1,
        limit: 10,
      }
    );
    properties.value = data;
    isFetching.value = false;
    hasFetched.value = true;
  });
};

const updateSearch = (e) => {
  search.value = e.target.value;
  updatePendingProperties();
};

const clearSelectedProperty = async () => {
  await router.push({ name: "AdminManagePendingProperties" });
  selectedProperty.value = null;
};

const selectPropertyDetailed = async (id) => {
  isFetching.value = true;
  await router.push({
    name: "AdminManagePendingPropertiesParams",
    params: { id },
  });
  selectedProperty.value = await Gateway.execute(
    Gateway.queries.GET_PROPERTY_DETAILED,
    { propertyId: id }
  );
  isFetching.value = false;
};

const handleRouteData = async () => {
  const propertyId = parseInt(route.params.id);

  if (!propertyId) {
    return;
  }

  await selectPropertyDetailed(propertyId);
};

Gateway.subscribe(
  Gateway.events.PROPERTY_STATUS_CHANGE,
  updatePendingProperties
);
Gateway.subscribe(Gateway.events.PROPERTY_ADDED, updatePendingProperties);
Gateway.onReady(handleRouteData);

updatePendingProperties();
</script>

<template>
  <div v-if="!!selectedProperty" class="popup">
    <div v-if="isFetching">
      <div class="center">
        <orbit-spinner :animation-duration="1200" :size="64" color="#1d3557" />
      </div>
    </div>
    <div v-else>
      <h3>{{ selectedProperty.location }}</h3>
      <p>{{ selectedProperty.id }}</p>
      <p class="description">{{ selectedProperty.description }}</p>
      <div class="data-field">
        <h4>Owner:</h4>
        <p>{{ selectedProperty.owner_full_name }}</p>
      </div>
      <div class="double-field">
        <div class="data-field">
          <h4>Location x:</h4>
          <p>{{ selectedProperty.x }}</p>
        </div>
        <div class="data-field">
          <h4>Location y:</h4>
          <p>{{ selectedProperty.y }}</p>
        </div>
        <div class="data-field">
          <h4>Width:</h4>
          <p>{{ selectedProperty.width }}</p>
        </div>
        <div class="data-field">
          <h4>Height:</h4>
          <p>{{ selectedProperty.height }}</p>
        </div>
      </div>
      <div class="data-field">
        <h4>Status:</h4>
        <p>{{ selectedProperty.status }}</p>
      </div>
      <div class="data-field">
        <h4>Tier:</h4>
        <p>{{ selectedProperty.tier }}</p>
      </div>
      <h4 class="equipment-title">Installed Equipment</h4>
      <div class="double-field">
        <div
          v-for="equipment of selectedProperty.equipment"
          :key="equipment.id"
          class="equipment"
        >
          <p>
            {{ equipment.name }}
            {{ !!equipment.description ? `| ${equipment.description}` : "" }}
          </p>
        </div>
      </div>
      <button class="close" @click="clearSelectedProperty">
        <img alt="Close popup" src="../assets/media/fullscreen-exit.svg" />
      </button>
    </div>
  </div>
  <div id="wrapper">
    <AdminNavbar />
    <main>
      <div class="title">
        <h1>Pending Properties</h1>
        <div class="search">
          <img alt="search" src="../assets/media/magnifying-glass.svg" />
          <input placeholder="Search" type="text" @input="updateSearch" />
        </div>
      </div>

      <div id="data">
        <div
          v-if="hasFetched && !isFetching && properties.length === 0"
          class="center big-text"
        >
          <h2>No matching properties found</h2>
        </div>
        <div v-else-if="isFetching && !hasFetched" class="center">
          <orbit-spinner
            :animation-duration="1200"
            :size="128"
            color="#F1FAEE"
          />
        </div>
        <div
          v-for="property in properties"
          v-else
          :key="property.id"
          class="fetch"
        >
          <p>{{ property.id }}</p>
          <p>{{ property.description }}</p>
          <img
            alt="see property info"
            src="../assets/media/info.svg"
            title="more info"
            @click="() => selectPropertyDetailed(property.id)"
          />
          <img
            alt="approve"
            src="../assets/media/check-circle.svg"
            @click="() => approveProperty(property.id)"
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
    width: 50%;
    max-width: 30rem;
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
      font-size: $font-size-base * 0.85;
      color: $normal;

      &.description {
        color: $dark;
        font-size: $font-size-base;
        margin-bottom: 1.5rem;
      }
    }

    .double-field {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }

    .data-field {
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-gap: 1rem;
      align-items: center;

      input,
      #tier,
      p {
        display: block;
        text-align: left;
        font-weight: 700;
        border-radius: $border-radius;
        padding: 0.25rem 0.5rem;
        color: $dark;
      }

      input,
      #tier {
        border: 0.2rem solid $dark;
      }

      input {
        background-color: $secondary;
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    .equipment {
      display: grid;
      grid-template-columns: 1fr repeat(2, max-content);
      align-items: center;
      border-radius: $border-radius;
      padding: 0.25rem 0.5rem;
      margin-bottom: 0.5rem;
      border: 0.25rem solid $dark;

      p {
        text-align: left;
        font-weight: 700;
      }

      .remove {
        cursor: pointer;
      }
    }

    .add-equipment {
      background-color: $accent;
      border: none;
      border-radius: $border-radius;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 3rem;
    }

    button.close {
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
    grid-template-columns: max-content 1fr max-content max-content;
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

.equipment-title {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>
