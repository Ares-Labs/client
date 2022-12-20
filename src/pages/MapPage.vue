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
          [
            [-3, 3],
            [-3, 8],
            [-8, 8],
            [-8, 3],
          ],
          [
            [4, 3],
            [4, 8],
            [-1, 8],
            [-1, 3],
          ],
          [
            [11, 3],
            [11, 8],
            [6, 8],
            [6, 3],
          ],
          [
            [18, 3],
            [18, 8],
            [13, 8],
            [13, 3],
          ],
          [
            [25, 3],
            [25, 8],
            [20, 8],
            [20, 3],
          ],
          [
            [39, 3],
            [39, 8],
            [34, 8],
            [34, 3],
          ],
          [
            [39, -63],
            [39, -60],
            [34, -60],
            [34, -63],
          ],
          [
            [-24, -63],
            [-24, -60],
            [-18, -60],
            [-18, -63],
          ],
          [
            [-34, -83],
            [-34, -80],
            [-20, -80],
            [-20, -83],
          ],[
              [-3, -10],
            [-3, -5],
            [-8, -5],
            [-8, -10]
          ],[
            [4, -10],
            [4, -5],
            [-1, -5],
            [-1, -10]
          ],[
            [11, -10],
            [11, -5],
            [6, -5],
            [6, -10]
          ],[
            [18, -10],
            [18, -5],
            [13, -5],
            [13, -10]
          ],[
            [25, -10],
            [25, -5],
            [20, -5],
            [20, -10]
          ],[
            [39, -10],
            [39, -5],
            [34, -5],
            [34, -10],
          ],[
            [39, -17],
            [39, -12],
            [34, -12],
            [34, -17],
          ],
          [
            [39, -24],
            [39, -19],
            [34, -19],
            [34, -24],
          ],[
            [39, -31],
            [39, -26],
            [34, -26],
            [34, -31],
          ],[
            [25, -17],
            [25, -12],
            [20, -12],
            [20, -17]
          ],[
            [25, -31],
            [25, -26],
            [20, -26],
            [20, -31]
          ],[
            [25, 10],
            [25, 15],
            [20, 15],
            [20, 10],
          ],[
            [25, 17],
            [25, 22],
            [20, 22],
            [20, 17],
          ],[
            [25, 24],
            [25, 29],
            [20, 29],
            [20, 24],
          ],[
            [25, 31],
            [25, 36],
            [20, 36],
            [20, 31],
          ],[
            [39, 10],
            [39, 15],
            [34, 15],
            [34, 10],
          ],[
            [39, 31],
            [39, 36],
            [34, 36],
            [34, 31],
          ],
        ],
      },
    },
  }),
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
