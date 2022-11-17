<script setup>
const props = defineProps({
  name: String,
  route: String,
  show: Boolean
})

function click() {
  console.log("clicked");
}
</script>

<template>
<div class="property">
    <img src="../../assets/media/options.svg" alt="options" id="options" @click="click" v-if="show === true">
    <div v-else>-</div>
  <router-link :to="`${route}`">{{name}}</router-link>
</div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";

.property {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid black 0.1rem;
  width: 20rem;
  height: 12rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 2rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
  transition: transform ease 0.5s;
  background: #e8e8e8;
  background-size: 0.4rem;

  a {
    margin-top: 3rem;
  }

  div {
    opacity: 0;
  }

  #options {
    width: 0.5rem;
    margin-left: 90%;
    margin-top: 0.5rem;
  }

  #options:hover {
    cursor: pointer;
  }

}

.property:hover {
  @include hover;
}

</style>
