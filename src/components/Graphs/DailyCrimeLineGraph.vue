<script setup>
import Chart from 'chart.js/auto';
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import {CategoryScale} from 'chart.js';

Chart.register(CategoryScale);

const crimeDay = [];
const crimeCount = [];

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
});


const data = {
  labels: crimeDay,
  datasets: [{
    label: "Number of Daily Crimes",
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
    new Chart(document.querySelector(".daily-crimes"), config);
  } catch (e) {
    console.error("Failed to initialize chart", e);
  }
});

</script>
<template>
  <div>
    <h2>Daily crimes in the area</h2>
    <canvas class="daily-crimes" width="500" height="300"></canvas>
  </div>
</template>

