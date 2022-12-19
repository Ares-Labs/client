<script setup>
import Header from "../components/Header/Header.vue";
import BarChartGraph from "../components/Graphs/BarChartGraph.vue";
import DailyCrimeLineGraph from "../components/Graphs/DailyCrimeLineGraph.vue";
import AuthVisitorsGraph from "../components/Graphs/AuthVisitorsGraph.vue";

</script>

<template>
  <Header/>
  <div class="graphs">
    <BarChartGraph/>
    <daily-crime-line-graph/>
    <AuthVisitorsGraph/>
    <BarChartGraph/>
    <BarChartGraph/>
    <BarChartGraph/>
  </div>


</template>


<style lang="scss" scoped>
.graphs {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 5rem;
}

</style>
