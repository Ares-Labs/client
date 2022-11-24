<script setup>
import {computed} from "vue";

const props = defineProps({
  camera: Number,
});



</script>

<template>
  <img v-if="camera === 0" src="../images/map.jpg" alt="live-camera-stream">
  <img v-if="camera === 1" src="../images/mars-coin.png" alt="live-camera-stream">
  <img v-if="camera === 2" src="http://193.80.89.0:9000/?action=stream" alt="live-camera-stream">
  <img v-if="camera === 4" src="http://193.80.89.0:9000/?action=stream" alt="live-camera-stream">
</template>

<style lang="scss" scoped>

</style>
