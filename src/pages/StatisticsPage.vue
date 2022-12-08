<script>
import {Bar} from 'vue-chartjs';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import Header from "../components/Header/Header.vue";
import Graphs from "../components/BarChart.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: {Graphs, Header, Bar},
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

<template>
  <Header/>
  <div class="graphs"></div>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :style="styles"
  />

</template>


<style lang="scss" scoped>
.graphs {
  width: 1rem;
  height: 1rem;
}

#my-chart-id {
  position: relative;
  height: 10vh;
  width: 80vw;
  margin: 1rem;
}

</style>
