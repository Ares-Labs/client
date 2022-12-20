<script setup>
function close(e) {
  e.target.closest("div").classList.add("hidden");
}

defineProps({
  text: String,
  error: Boolean
});

</script>

<template>
  <div class="alert hidden" :class="{error : error, success : !error}">
    <span class="alert-close" @click="close">X</span>
    <span class="alert-text"> {{text}} </span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.alert {
  position: relative;
  top: 5rem;
  width: 20rem;
  height: auto;
  padding: 0.6rem;
  margin: 0.6rem 0.6rem 2rem auto;
  line-height: 1.8;
  border-radius: 0.3rem;
  cursor: hand;
  font-family: sans-serif;
  font-weight: 400;
  @include notification-open;
}

.alert-text {
  display: table;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;
}

.alert-close {
  float: right;
  padding-top: 0.3rem;
  font-size: 0.6rem;
  cursor: pointer;
}

.success {
  background-color: #EFE;
  border: 0.1rem solid #DED;
  color: #9A9;
}

.error {
  background-color: #FEE;
  border: 1px solid #EDD;
  color: #A66;
}


.hidden {
  @include notification-close;
}

</style>
