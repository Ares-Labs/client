<script>
import Header from "@/components/Header/Header.vue";
import MapContainer from "../components/MapContainer.vue";

export default {
  name: "MainPage",
  components: {
    Header,
    MapContainer,
  },
  data: () => ({
    selected: undefined,
    geojson: {
      type: "Feature",
      properties: {
        name: "default object",
        quality: "top",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [[-3,3],[-3,8],[-8,8],[-8,3]],[[4,3], [4,8], [-1,8], [-1,3]],[[11,3], [11,8], [6,8], [6,3]], [[18,3], [18,8], [13,8], [13,3]]
        ],
      },
    },
  }),
};
</script>

<template>
  <Header/>
  <div id="MapPage">
    <div class="map-container">
      <MapContainer
        :geojson="geojson"
      ></MapContainer>
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
