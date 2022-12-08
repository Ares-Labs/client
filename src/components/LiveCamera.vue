<script setup>

const props = defineProps({
  camera: Number
});

console.log(props.camera);

</script>

<template>
  <div>
    <img v-if="camera === 0" src="http://195.223.180.50:443/cam_1.cgi" alt="live-camera-stream">
    <img v-if="camera === 1" src="http://69.70.96.98:8080/video" alt="live-camera-stream">
    <img v-if="camera === 2" src="http://142.179.32.212:8080/video" alt="live-camera-stream">
    <img v-if="camera === 3" src="http://193.80.89.0:9000/?action=stream" alt="live-camera-stream">
  </div>
</template>

<style lang="scss" scoped>

</style>
