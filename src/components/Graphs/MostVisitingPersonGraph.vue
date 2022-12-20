<script setup>
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import Chart from "chart.js/auto";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

const data = {
  labels: ["John Doe", "Mister Bean", "Jane Sanders", "John Smith", "Jane Doe", "Jeffrey Dahmer", "Jane Smith"],
  datasets: [{
    label: "Amount of visits",
    backgroundColor: randomRGB(),
    data: [9, 23, 12, 3, 7, 34, 3]
  }]
};

const config = {
  type: "pie",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    const chart = new Chart(document.querySelector("#most-visiting-person"), config);
  } catch (err) {
    console.error("Failed to initialize chart", err);
  }
});


</script>

<template>
  <div>
    <h2>Who was around your property the most</h2>
    <canvas id="most-visiting-person" width="400" height="500"></canvas>
  </div>
</template>


<style scoped>

</style>
