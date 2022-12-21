<template>
  <div ref="map-root" style="width: 100%; height: 100%"></div>
</template>

<script>
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import XYZSource from "ol/source/XYZ";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

export default {
  name: "MapContainer",
  components: {},
  props: {
    geojson: Object,
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
        coordinates: coordinates,
      },
    },
  }),
  mounted() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
    });

    this.olMap = new Map({
      target: this.$refs["map-root"],
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png",
          }),
        }),
        this.vectorLayer,
      ],
      view: new View({
        zoom: 2,
        center: [0, 0],
        constrainResolution: true,
      }),
    });
    this.updateSource(this.geojson);
    this.addMarker(fromLonLat([0, -40]));
  },
  watch: {
    geojson(value) {
      this.updateSource(value);
    },
  },
  methods: {
    updateSource(geojson) {
      const view = this.olMap.getView();
      const source = this.vectorLayer.getSource();

      const features = new GeoJSON({
        featureProjection: "EPSG:3857",
      }).readFeatures(geojson);

      source.clear();
      source.addFeatures(features);

      view.fit(source.getExtent());
    },
    addMarker(coordinates) {
      const marker = new Feature({
        geometry: new Point(coordinates),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
          }),
        })
      );

      this.vectorLayer.getSource().addFeature(marker);
    },
  },
};

const coordinates = [
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
  ],[
    [68, 31],
    [68, 36],
    [60, 36],
    [60, 31],
  ],[
    [68, 0],
    [68, 15],
    [60, 15],
    [60, 0],
  ],
];
</script>
