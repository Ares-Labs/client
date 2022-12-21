<script setup>
import Gateway from "@/utils/events";
import AdminNavbar from "../components/AdminNavbar.vue";
import { OrbitSpinner } from "epic-spinners";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { errorNotification, successNotification } from "@/utils/notifications";

/**
 * An object representing equipment.
 * @typedef {Object} Equipment
 * @property {number} id - The ID of the equipment.
 * @property {number} type - The type of the equipment.
 * @property {string} name - The type of the equipment.
 * @property {string} description - The description of the equipment.
 */

/**
 * An object representing a JSON object.
 * @typedef {Object} DetailedProperty
 * @property {string} owner - The owner of the object.
 * @property {string} tier_name - The name of the tier.
 * @property {string} description - The description of the object.
 * @property {Equipment[]} equipment - The equipment associated with the object.
 * @property {string} owner_full_name - The full name of the owner.
 * @property {string} tier - The tier of the object.
 * @property {number} x - The x coordinate of the object.
 * @property {number} width - The width of the object.
 * @property {number} y - The y coordinate of the object.
 * @property {string} location - The location of the object.
 * @property {number} id - The ID of the object.
 * @property {number} height - The height of the object.
 * @property {string} status - The status of the object.
 */

const properties = ref([]);
const equipment_types = ref([]);
const search = ref("");

/** @type {DetailedProperty} */
const selectedProperty = ref(null);
const propertyDrones = ref([]);

const addEquipment = ref(false);
const selectedEquipmentType = ref(null);
const equipmentDescription = ref("");

const hasFetched = ref(false);
const isFetching = ref(true);

const route = useRoute();
const router = useRouter();

const updateProperties = () => {
  Gateway.onReady(async () => {
    isFetching.value = true;
    const { properties: data } = await Gateway.execute(
      Gateway.queries.GET_PROPERTIES,
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
  updateProperties();
};

const getProperty = async (propertyId) =>
  await Gateway.execute(Gateway.queries.GET_PROPERTY_DETAILED, { propertyId });

const setSelectedProperty = async (property) => {
  if (!route.params.id) {
    await router.push({
      name: "AdminManagePropertiesParams",
      params: { id: property.id },
    });
  }

  isFetching.value = true;
  selectedProperty.value = await getProperty(property.id);
  isFetching.value = false;
  await updateDrones(property.id);
};

const updatePropertyEquipment = async () => {
  updateDrones(selectedProperty.value.id).then();
  const { equipment } = await Gateway.execute(
    Gateway.queries.GET_EQUIPMENT_PROPERTY,
    { propertyId: selectedProperty.value.id }
  );

  selectedProperty.value.equipment = equipment;
};

const updateDrones = async (propertyId) => {
  propertyDrones.value = (
    await Gateway.execute(Gateway.queries.GET_FREE_DRONES, { propertyId })
  ).drones;
};

const clearSelectedProperty = async () => {
  await router.push({ name: "AdminManageProperties" });
  selectedProperty.value = null;
  propertyDrones.value = [];
};

const handleRouteData = async () => {
  const propertyId = parseInt(route.params.id);

  if (!propertyId) {
    return;
  }

  const property = await getProperty(propertyId);
  await setSelectedProperty(property);
};

const syncPropertySize = async () => {
  await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_SIZE, {
    propertyId: selectedProperty.value.id,
    width: selectedProperty.value.width,
    height: selectedProperty.value.height,
  });
};

const syncPropertyCoordinates = async () => {
  await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_COORDINATES, {
    propertyId: selectedProperty.value.id,
    x: selectedProperty.value.x,
    y: selectedProperty.value.y,
  });
};

const syncPropertyTier = async () => {
  await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_TIER, {
    propertyId: selectedProperty.value.id,
    tier: parseInt(selectedProperty.value.tier),
  });
};

const removeEquipment = async (equipmentId) => {
  selectedProperty.value.equipment = selectedProperty.value.equipment.filter(
    (e) => e.id !== equipmentId
  );

  await Gateway.execute(Gateway.queries.REMOVE_EQUIPMENT_PROPERTY, {
    equipmentId,
    propertyId: selectedProperty.value.id,
  });
};

const dispatchDrone = async () => {
  await Gateway.execute(Gateway.queries.DISPATCH_DRONE, {
    propertyId: selectedProperty.value.id,
  });

  await updateDrones(selectedProperty.value.id);
  successNotification("Successfully dispatched drone");
};

const cancelAddEquipment = () => {
  addEquipment.value = false;
};

const proceedAddEquipment = async () => {
  addEquipment.value = false;
  await Gateway.execute(Gateway.queries.ADD_EQUIPMENT_PROPERTY, {
    propertyId: selectedProperty.value.id,
    equipmentType: parseInt(selectedEquipmentType.value),
    description: equipmentDescription.value,
  });
};

Gateway.subscribe(Gateway.events.PROPERTY_EQUIPMENT_CHANGE, (data) => {
  if (data.propertyId === selectedProperty.value.id) {
    updatePropertyEquipment();
  }
});

Gateway.subscribe(Gateway.events.PROPERTY_SIZE_CHANGED, (data) => {
  if (data.propertyId === selectedProperty.value.id) {
    selectedProperty.value.width = data.width;
    selectedProperty.value.height = data.height;
  }
});

Gateway.subscribe(Gateway.events.PROPERTY_COORDINATES_CHANGED, (data) => {
  if (data.propertyId === selectedProperty.value.id) {
    selectedProperty.value.x = data.x;
    selectedProperty.value.y = data.y;
  }
});

const refreshDrones = async () => await updateDrones(selectedProperty.value.id);

Gateway.subscribe(Gateway.events.DRONE_DISPATCHED, refreshDrones);
Gateway.subscribe(Gateway.events.DRONE_RECALLED, refreshDrones);

Gateway.subscribe(Gateway.events.PROPERTY_TIER_CHANGED, (data) => {
  if (data.propertyId === selectedProperty.value.id) {
    selectedProperty.value.tier = data.tier;
  }
});

Gateway.onReady(handleRouteData);

Gateway.onReady(async () => {
  equipment_types.value = (
    await Gateway.execute(Gateway.queries.GET_EQUIPMENT_TYPES)
  ).equipmentTypes;
  selectedEquipmentType.value = equipment_types.value[0].type;
});

updateProperties();
</script>

<template>
  <div v-if="addEquipment" class="popup add-equipment">
    <div class="center">
      <h3>Add equipment</h3>

      <div class="align-vertical">
        <select v-model="selectedEquipmentType">
          <option
            v-for="type in equipment_types"
            :key="type.type"
            :value="type.type"
          >
            {{ type.name }}
          </option>
        </select>
        <label for="description">Provide a description:</label>
        <input id="description" v-model="equipmentDescription" type="text" />
        <button @click="proceedAddEquipment">Add</button>
        <button @click="cancelAddEquipment">Cancel</button>
      </div>

      <button class="close" @click="cancelAddEquipment">
        <img alt="Close popup" src="../assets/media/fullscreen-exit.svg" />
      </button>
    </div>
  </div>
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
      <button
        :class="{ 'no-drones-available': propertyDrones.length === 0 }"
        class="dispatch-drone"
        @click="
          () =>
            propertyDrones.length === 0
              ? errorNotification('No drones available')
              : dispatchDrone()
        "
      >
        <img alt="" src="@/assets/media/dispatch-drone.svg" />
        <span>Dispatch drone</span>
      </button>
      <div class="data-field">
        <h4>Owner:</h4>
        <p>{{ selectedProperty.owner_full_name }}</p>
      </div>
      <div class="double-field">
        <div class="data-field">
          <h4>Location x:</h4>
          <input
            v-model="selectedProperty.x"
            type="number"
            @input="syncPropertyCoordinates"
          />
        </div>
        <div class="data-field">
          <h4>Location y:</h4>
          <input
            v-model="selectedProperty.y"
            type="number"
            @input="syncPropertyCoordinates"
          />
        </div>
        <div class="data-field">
          <h4>Width:</h4>
          <input
            v-model="selectedProperty.width"
            type="number"
            @input="syncPropertySize"
          />
        </div>
        <div class="data-field">
          <h4>Height:</h4>
          <input
            v-model="selectedProperty.height"
            type="number"
            @input="syncPropertySize"
          />
        </div>
      </div>
      <div class="data-field">
        <h4>Status:</h4>
        <p>{{ selectedProperty.status }}</p>
      </div>
      <div class="data-field">
        <h4>Tier:</h4>
        <select
          id="tier"
          v-model="selectedProperty.tier"
          name="tier"
          @change="syncPropertyTier"
        >
          <option value="1">Basic</option>
          <option value="2">Premium</option>
          <option value="3">Optimum</option>
        </select>
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
          <img
            alt="Remove"
            class="remove"
            src="../assets/media/remove.svg"
            @click="() => removeEquipment(equipment.id)"
          />
        </div>
        <button class="add-equipment" @click="() => (addEquipment = true)">
          <img alt="Add equipment" src="../assets/media/add-small.svg" />
        </button>
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
        <h1>Manage Protected Properties</h1>
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
          <h2>No matching property found</h2>
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
          @click="() => setSelectedProperty(property)"
        >
          <p>{{ property.id }}</p>
          <p>{{ property.location }}</p>
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

.add-equipment {
  z-index: 1000;

  h3 {
    margin-bottom: 2rem;
  }

  .align-vertical {
    display: flex;
    flex-direction: column;

    button {
      border: none;
      border-radius: $border-radius;
      padding: 0.5rem 1rem;
      background-color: $accent;
      color: $secondary;
      gap: 1rem;
      font-size: $font-size-base;
      text-transform: uppercase;
      font-weight: 700;
      margin-top: 1rem;
      cursor: pointer;
    }

    select {
      cursor: pointer;
    }

    select,
    input {
      border: 0.2rem solid $dark;
      border-radius: $border-radius;
      padding: 0.25rem 0.5rem;
      background-color: $secondary;
      color: $dark;
      font-size: $font-size-base;
      font-weight: 700;
    }

    label {
      font-size: $font-size-base;
      font-weight: 700;
      color: $dark;
      margin-top: 1rem;
    }

    input {
      margin-bottom: 1rem;
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
    max-width: 50rem;
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
        margin-top: 1rem;
        margin-bottom: 3rem;
      }
    }

    button.dispatch-drone {
      margin: 2rem auto;
      background-color: $accent;
      border: none;
      border-radius: $border-radius;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.no-drones-available {
        opacity: 0.5;
        cursor: not-allowed;
      }

      span {
        color: $secondary;
        text-transform: uppercase;
        font-size: $font-size-base;
        font-weight: 700;
        text-align: center;
        min-width: 22rem;
      }
    }

    .double-field {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 1rem;
      margin-top: 1rem;
      column-gap: 1rem;
    }

    .data-field {
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-gap: 1rem;
      align-items: center;
      padding-bottom: 0.5rem;

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
    grid-template-columns: max-content 1fr min-content;
    grid-gap: 1rem;

    cursor: pointer;

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

#tier {
  background-color: $secondary;
  cursor: pointer;
}

.equipment-title {
  text-align: center;
  margin-top: 1rem;
}

h4 {
  font-size: $font-size-base;
  font-weight: 700;
  color: $dark;
}

</style>
