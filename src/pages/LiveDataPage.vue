<script setup>
import Header from "../components/Header/Header.vue";
import LiveCamera from "../components/LiveCamera.vue";
import Notification from "../components/Notification.vue";

</script>
<template>
  <Header/>
  <main>
    <h1>Live data</h1>
    <div id="flex-container">
      <div id="camera-container">
        <LiveCamera/>
        <button>switch cam</button>
      </div>
      <div id="notification-center">
        <Notification name="El Criminel" description="STEALING" time="NOW" urgent/>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
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
    width: 45rem;
    margin-bottom: 3rem;
  }

  button {
    width: 7rem;
  }
}

#flex-container {
  display: flex;
  justify-content: space-around;

}

#notification-center {

}

</style>
