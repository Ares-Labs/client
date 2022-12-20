<script>
import Header from "@/components/Header/Header.vue";
import MapContainer from "../components/MapContainer.vue";

export default {
  name: "MainPage",
  components: {
    Header,
    MapContainer,
  },
};
</script>

<template>
  <Header />
  <div id="MapPage">
    <div class="map-container">
      <MapContainer :geojson="geojson"></MapContainer>
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#MapPage {
  margin: -4.5rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.map-container {
  height: 43rem;
}
</style>
