<script setup>
import {onMounted} from "vue";
import Chart from "chart.js/auto";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

const data = {
  labels: ["John Doe", "Mister Bean", "Jane Sanders", "John Smith", "Jane Doe", "Jeffrey Dahmer", "Jane Smith"],
  datasets: [{
    label: "Amount of visits",
    data: [
      {value: 9, color: randomRGB()},
      {value: 23, color: randomRGB()},
      {value: 12, color: randomRGB()},
      {value: 3, color: randomRGB()},
      {value: 7, color: randomRGB()},
      {value: 34, color: randomRGB()},
      {value: 3, color: randomRGB()},
    ]
  }]
};

const config = {
  type: "pie",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    new Chart(document.querySelector("#most-visiting-person"), config);
  } catch (err) {
    console.error("Failed to initialize chart", err);
  }
});


</script>

<template>
  <div>
    <h2>Frequency of property visitation</h2>
    <canvas id="most-visiting-person" width="400" height="500"></canvas>
  </div>
</template>

