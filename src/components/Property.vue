<script>
export default {
  name: "Property",
  props: ['name']
};
</script>

<template>
<div class="property">
  <p>{{name}}</p>
</div>
</template>

<style lang="scss" scoped>

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
  background-color: #e8e8e8;
  font-weight: bold;
  font-size: 2rem;
}

</style>