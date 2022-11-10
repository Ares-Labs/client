<script>
export default {
  name: "Property",
  props: ['name', 'route']
};
</script>

<template>
<div class="property">
  <router-link :to="`${route}`">{{name}}</router-link>
</div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";

.property {
  display: flex;
  align-items:center;
  justify-content:center;
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
  background: #e8e8e8 url("src/assets/media/options.svg") no-repeat 95% 15%;
  background-size: 0.4rem;
}

.property:hover {
  @include hover;
}

</style>