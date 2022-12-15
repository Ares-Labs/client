<script setup>
import Chart from 'chart.js/auto';
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import {CategoryScale} from 'chart.js';

Chart.register(CategoryScale);

let crimeDay = [];
let crimeCount = [];

Gateway.onReady(() => {
  Gateway.execute(Gateway.queries.GET_CRIMES_IN_AREA, {
    userId: Gateway.clientId,
    propertyId: "5",
  }).then((data) => {
    data.crimes.forEach(crime => {
      crimeDay.push("day " + crime.day);
      crimeCount.push(crime.count);
    });
  });
}, 1000);

console.log(crimeDay);

const data = {
  labels: crimeDay,
  datasets: [{
    label: "daily crimes",
    backgroundColor: "#f87979",
    data: crimeCount
  }]
};

const config = {
  type: "line",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    const chart = new Chart(document.querySelector(".daily-crimes"), config);
  } catch (e) {
    console.error("Failed to initialize chart", e);
  }
});

</script>
<template>
  <div>
    <h2>daily crimes</h2>
    <canvas class="daily-crimes"></canvas>
  </div>
</template>

<style scoped>
h2 {
  display: block;
}
</style>
