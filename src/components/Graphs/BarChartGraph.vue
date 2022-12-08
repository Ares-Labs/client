<script>
import {Bar} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
