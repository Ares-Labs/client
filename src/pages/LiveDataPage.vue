<script setup>
import Header from "../components/Header/Header.vue";
import LiveCamera from "../components/LiveCamera.vue";
import Notification from "../components/Notification.vue";
import {useRouter} from "vue-router";
import Gateway from "../utils/events";

// Check if the path ends with a number if not redirect to choose-property
const router = useRouter();
const urlEndsWithNumber = router.currentRoute.value.path.match(/\d+$/);
const localstoragePropertyBeingManaged = localStorage.getItem("propertyBeingManaged");
if (!urlEndsWithNumber) {
  // Check localstorage and redirect
  if (localstoragePropertyBeingManaged) {
    router.push(`/live-data/${localstoragePropertyBeingManaged}`);
  } else {
    router.push("/choose-property");
  }
}

let propertyId;

if (urlEndsWithNumber) {
  propertyId = urlEndsWithNumber[0];
} else {
  propertyId = localstoragePropertyBeingManaged;
}
propertyId = parseInt(propertyId);
// Get the property from the database
Gateway.onReady(() =>
    Gateway.execute(Gateway.queries.GET_PROPERTY, {
      propertyId: propertyId,
    }).then((data) => {
      console.log(data);
    }));

</script>
<template>
  <Header />
  <main>
    <h1>Live data</h1>
    <div id="flex-container">
      <div id="camera-container">
        <LiveCamera />
        <button>switch cam</button>
      </div>
      <div id="notification-center">
        <Notification
          name="El Criminel"
          description="STEALING"
          time="NOW"
          urgent
        />
        <Notification
          name="El bean"
          description="looking respectfully"
          time="5 mins ago"
        />
        <Notification
          name="El mista"
          description="petting your child"
          time="43 mins ago"
        />
        <Notification
          name="Bapiste"
          description="sleeping in the backyard"
          time="45 mins ago"
        />
        <Notification
          name="El crazy person"
          description="BOMBING THE DOOR"
          time="1h ago"
          urgent
        />
        <Notification
          name="Alberto"
          description="depressingly looking"
          time="2h ago"
        />
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
  margin-bottom: 4rem;
}

#camera-container {
  display: flex;
  flex-direction: column;

  img {
    height: 35rem;
    width: 60rem;
    margin-bottom: 3rem;
  }

  button {
    width: 7rem;
    @include button;
  }
}

#flex-container {
  display: flex;
  justify-content: space-around;
}

#notification-center {
  height: 35rem;
  padding: 0 1rem;
  overflow-y: auto;
}
</style>
