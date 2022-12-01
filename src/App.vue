<script setup>
import Gateway from "./utils/events";
import {useRouter} from "vue-router";

if (!Gateway.isInitialized) {
  const defaultId = "9a0fbbc6-55f3-11ed-82ca-9313c9a89e82";
  const id = localStorage.getItem("id") || defaultId;

  try {
    Gateway.init(id);
  } catch (e) {
    console.error("Failed to initialize gateway", e);
  }
}

const exampleUsage = async () => {
  await Gateway.execute(Gateway.queries.ADD_PROPERTY, {
    clientId: Gateway.clientId,
    location: "test",
    tier: 1,
    x: 50,
    y: 100,
    description: "test",
  });

  const { pendingProperties } = await Gateway.execute(
    Gateway.queries.GET_PENDING_PROPERTIES
  );

  const prop = pendingProperties[pendingProperties.length - 1];

  await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_STATUS, {
    propertyId: prop.id,
    status: "APPROVED",
  });

  await Gateway.execute(Gateway.queries.CHANGE_PROPERTY_SIZE, {
    propertyId: prop.id,
    width: 100,
    height: 100,
  });

  await Gateway.execute(Gateway.queries.ADD_ALERTS, {
    propertyId: prop.id,
    userId: "bedb80fc-55f3-11ed-b681-07688aa63f8a",
  });

  for (let i = 1; i < 4; i++) {
    const { id: cameraId } = await Gateway.execute(
      Gateway.queries.ADD_EQUIPMENT_PROPERTY,
      {
        propertyId: prop.id,
        equipmentType: 1,
        description: "test",
      }
    );

    for (let j = 0; j < 3; j++) {
      await Gateway.execute(Gateway.queries.ADD_VISITOR, {
        propertyId: prop.id,
        userId: "bedb80fc-55f3-11ed-b681-07688aa63f8a",
        cameraId,
      });
    }
  }

  const visitors = await Gateway.execute(Gateway.queries.GET_WEEKLY_VISITORS, {
    propertyId: prop.id,
  });
  console.log(visitors);

  const { equipment } = await Gateway.execute(
    Gateway.queries.GET_EQUIPMENT_PROPERTY,
    {
      propertyId: prop.id,
    }
  );
  console.log(equipment);

  await Gateway.execute(Gateway.queries.REMOVE_EQUIPMENT_PROPERTY, {
    propertyId: prop.id,
    equipmentId: equipment[0].id,
  });

  await Gateway.execute(Gateway.queries.GET_EQUIPMENT_PROPERTY, {
    propertyId: prop.id,
  });

  const { equipmentTypes } = await Gateway.execute(
    Gateway.queries.GET_EQUIPMENT_TYPES
  );
  console.log(equipmentTypes);

  const user = await Gateway.execute(Gateway.queries.GET_USER, {
    userId: Gateway.clientId,
  });
  console.log(user);

  const user_properties = await Gateway.execute(
    Gateway.queries.GET_USER_PROPERTIES,
    {
      userId: Gateway.clientId,
    }
  );
  console.log(user_properties);
};

Gateway.onReady(exampleUsage);

Gateway.subscribe(Gateway.events.ALERTS, (data) => {
  console.log("Received alert:", data);
});

// If the url ends with a number, make that the propertyBeingManaged in localstorage
const router = useRouter();
const urlEndsWithNumber = window.location.pathname.split("/").pop();
if (urlEndsWithNumber) {
  localStorage.setItem("propertyBeingManaged", parseInt(urlEndsWithNumber));
}

</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  font-family: "Open Sans", sans-serif;
}

a,
router-link {
  text-decoration: none;
  text-transform: capitalize;
}
</style>
