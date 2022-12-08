<script setup>
import Header from "../components/Header/Header.vue";
import BarChartGraph from "../components/Graphs/BarChartGraph.vue";

</script>

<template>
  <Header/>
  <div class="graphs">
    <BarChartGraph/>
    <BarChartGraph/>
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
