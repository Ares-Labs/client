<script>
export default {
  name: "HeaderWithoutLinks",
  props: ['name']
};
</script>

<template>
  <header>
    <router-link to="/"><img src="src/images/ares-labs-logo.png" alt="Ares Labs logo"></router-link>
    <h1>{{name}}</h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="44" height="44"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  </header>
</template>

<style lang="scss" scoped>
$hover-color: #e8e8e8;

header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  box-shadow: black 0.1rem 0.1rem 0.7rem 0.1rem;
  margin-bottom: 15rem;

  h1 {
    font-size: 2rem;
    display: block;
    align-items: center;
    margin: 0.5rem 0 0 5rem ;
    height: 100%;
  }
  img {
    width: 3rem;
  }
}

</style>