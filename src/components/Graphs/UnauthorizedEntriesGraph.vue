<script setup>
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import Chart from "chart.js/auto";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

const data = {
  labels: ["Jeffrey Dahmer", "Mister Bean", "Blake Sanders", "Baptiste Smith,", "Jane Doe", "John Doe", "Jane Smith"],
  datasets: [{
    label: "Amount of visits",
    backgroundColor: randomRGB(),
    data: [1, 4, 2, 3, 7, 34, 3]
  }]
};

const config = {
  type: "doughnut",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    const chart = new Chart(document.querySelector("#unauthorised-entries"), config);
  } catch (err) {
    console.error("Failed to initialize chart", err);
  }
});


</script>

<template>
  <div>
    <h2>Unauthorised entries</h2>
    <canvas id="unauthorised-entries" width="400" height="500"></canvas>
  </div>
</template>


<style scoped>

</style>
