<script>
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Bar } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
    styles() {
      return {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 0 1rem 0.1rem black',
        width: '60rem',
        height: '30rem',
      };
    },
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{data: [40, 20, 12]}]
      },
      chartOptions: {
        responsive: false,
      }
    };
  }
};
</script>
<script setup> </script>
<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :style="styles"
  />
</template>

<style scoped>

</style>
