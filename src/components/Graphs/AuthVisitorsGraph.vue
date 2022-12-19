<script setup>
import Chart from 'chart.js/auto';
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import {CategoryScale} from 'chart.js';

Chart.register(CategoryScale);

let userList = [];
let accessTime = [];

Gateway.onReady(() => {
  Gateway.execute(Gateway.queries.GET_AUTH_ENTRIES, {
    userId: Gateway.clientId,
    propertyId: 2,
  }).then((data) => {
    console.log(data.authEntries);

    data.authEntries.forEach(auth => {
      console.log(auth.user_id);

      Gateway.execute(Gateway.queries.GET_USER, {
        userId: auth.user_id,
      }).then((data) => {
        userList.push(data.fullName);
        accessTime.push(getDateTimeFromTimestamp(auth.timestamp));
      });

    })
  });
});

const data = {
  labels: userList,
  datasets: [{
    label: "Number of Daily Crimes",
    backgroundColor: "#f87979",
    data: accessTime
  }]
};

const config = {
  type: "pie",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    const chart = new Chart(document.querySelector("#auth-visitors-graph"), config);
  } catch (e) {
    console.error("Failed to initialize chart", e);
  }
});


// get date and time from timestamp
function getDateTimeFromTimestamp(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return year + '-' + month + '-' + dt + ' ' + hours + ':' + minutes + ':' + seconds;
}

</script>

<template>
  <div>
    <h2>Authenticated Visitors That entered</h2>
    <canvas id="auth-visitors-graph"></canvas>
  </div>
</template>

<style scoped>

</style>