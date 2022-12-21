<script setup>
import {onMounted} from "vue";
import Chart from "chart.js/auto";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

const data = {
  labels: ["Jeffrey Dahmer", "Mister Bean", "Blake Sanders", "Baptiste Smith,", "Jane Doe", "John Doe", "Jane Smith"],
  datasets: [{
    label: "Amount of visits",
    data: [
      {value: 1, color: randomRGB()},
      {value: 4, color: randomRGB()},
      {value: 2, color: randomRGB()},
      {value: 3, color: randomRGB()},
      {value: 7, color: randomRGB()},
      {value: 34, color: randomRGB()},
      {value: 3, color: randomRGB()},
    ]
  }]
};

const config = {
  type: "doughnut",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    new Chart(document.querySelector("#unauthorised-entries"), config);
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
