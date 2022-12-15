<script>
import {Bar} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import Gateway from "../../utils/events.js";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: {Bar},
  computed: {
    myStyles() {
      return {
        height: '50vh',
        width: '25vw',
      };
    }
  },
  data: () => ({
    loaded: false,
    chartData: null,
    chartOptions: {
      responsive: false,
    },
  }),

  async mounted() {
    this.loaded = false
    console.log(this.chartData);
    try {
      Gateway.onReady(() => {
        Gateway.execute(Gateway.queries.GET_CRIMES_IN_AREA, {
          userId: Gateway.clientId,
          propertyId: "5",
        }).then((data) => {
          data.crimes.forEach(crime => {
            this.chartData = {
              labels: [crime.day + ","],
              datasets: [{
                label: 'Crimes',
                backgroundColor: '#f87979',
                data: [crime.count + ","]
              }]
            }
          });
        });
        this.loaded = true
      }, 1000);
    } catch (err) {
      console.error("Failed to get crimes", err);
    }
  }
}


/*
export default {
  name: 'BarChartGraph',
  components: { Bar },
  computed: {
    myStyles() {
      return {
        height: '50vh',
        width: '25vw',
      };
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{label: "Monthly visitors", data: [40, 20, 12]}]
      },
      chartOptions: {
        responsive: false
      }
    };
  }
};
*/

Gateway.onReady(() => {
  Gateway.execute(Gateway.queries.GET_CRIMES_IN_AREA, {
    userId: Gateway.clientId,
    propertyId: "5",
  }).then((data) => {
    data.crimes.forEach(crime => {
      console.log(crime);
    });
  });
}, 1000);
</script>
<template>
  <Bar
      id="my-chart-id"
      :style="myStyles"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<style scoped>

</style>
