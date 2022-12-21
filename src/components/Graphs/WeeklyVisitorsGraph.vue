<script setup>
import {onMounted} from "vue";
import Chart from "chart.js/auto";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [{
    label: "Amount of people who visited this week",
    backgroundColor: "#f87979",
    data: [34, 3, 50, 23, 12, 3, 7]
  }]
};

const config = {
  type: "line",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    new Chart(document.querySelector("#weekly-visitors-graph"), config);
  } catch (err) {
    console.error("Failed to initialize chart", err);
  }
});


</script>

<template>
  <div>
    <h2>Weekly visitors</h2>
    <canvas id="weekly-visitors-graph" width="400" height="500"></canvas>
  </div>
</template>


<style scoped>

</style>
