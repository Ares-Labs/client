<script setup>
import Header from "../components/Header/Header.vue";
import BarChartGraph from "../components/Graphs/BarChartGraph.vue";
import DailyCrimeLineGraph from "../components/Graphs/DailyCrimeLineGraph.vue";
import AuthVisitorsGraph from "../components/Graphs/AuthVisitorsGraph.vue";
import WeeklyVisitorsGraph from "../components/Graphs/WeeklyVisitorsGraph.vue";
import MostVisitingPersonGraph from "../components/Graphs/MostVisitingPersonGraph.vue";
import UnauthorizedEntriesGraph from "../components/Graphs/UnauthorizedEntriesGraph.vue";

</script>

<template>
  <Header/>
  <h1>Statistics</h1>
  <div class="graphs">
    <BarChartGraph/>
    <daily-crime-line-graph/>
    <AuthVisitorsGraph/>
    <WeeklyVisitorsGraph/>
    <MostVisitingPersonGraph/>
    <UnauthorizedEntriesGraph/>
  </div>


</template>


<style lang="scss" scoped>

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 6rem;
}

.graphs {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 3rem;
  padding-bottom: 5rem;
}

</style>
