<script setup>
import Chart from 'chart.js/auto';
import Gateway from "../../utils/events.js";
import {onMounted} from "vue";
import {CategoryScale} from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(CategoryScale);

// get this month
const today = new Date();
const thisMonth = today.getMonth();

let userList = [];
let accessTime = [];
let userAccessRate = {};


Gateway.onReady(() => {
  Gateway.execute(Gateway.queries.GET_AUTH_ENTRIES, {
    userId: Gateway.clientId,
    propertyId: 2,
  }).then((data) => {
    data.authEntries.forEach(auth => {
      Gateway.execute(Gateway.queries.GET_USER, {
        userId: auth.user_id,
      }).then((data) => {
        // check if user is in userAccessRate list: if so + 1
        if (userAccessRate[data.fullName] === undefined) {
          userAccessRate[data.fullName] = 1;
        } else {
          userAccessRate[data.fullName] += 1;
        }
      });
    })
  });
});

setInterval(() => {
  for (let user in userAccessRate) {
    userList.push(user);
    accessTime.push(userAccessRate[user]);
    userList = [];
    accessTime = [];
  }
});


const data = {
  labels: userList,
  datasets: [{
    label: "Amount of times user has accessed the property",
    backgroundColor: "#f87979",
    data: accessTime
  }]
};

const config = {
  type: "line",
  data: data,
  options: {},
};

onMounted(() => {
  try {
    const chart = new Chart(document.querySelector("#auth-visitors-graph"), config);
  } catch (err) {
    console.error("Failed to initialize chart", err);
  }
});

</script>

<template>
  <div>
    <h2>Authorized entrance frequency</h2>
    <canvas id="auth-visitors-graph" width="400" height="450"></canvas>
  </div>
</template>

<style scoped>

</style>