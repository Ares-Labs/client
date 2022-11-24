<script setup>
const props = defineProps({
  name: String,
  route: String,
  show: Boolean
})

function hide(e) {
  e.target.closest("div").classList.add("hidden");
  e.target.closest("div").classList.remove("property");
}
</script>

<template>
<div class="property">
    <img src="../../assets/media/bin.svg" alt="options" id="delete" @click="hide" v-if="show === true">
    <div v-else>-</div>
  <router-link :to="`${route}`">{{name}}</router-link>
</div>
</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";

.hidden {
  display: none;
}

.property {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: normal;
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
    margin-top: 2.5rem;
  }

  div {
    opacity: 0;
    width: 0.5rem;
    margin-top: 0.5rem;
  }

  #delete {
    width: 2rem;
    margin-left: 80%;
    margin-top: 0.5rem;
  }

  #delete:hover {
    cursor: pointer;
  }

}

.property:hover {
  @include hover;
}

"src/assets/css/mixins";

.hidden {
  display: none;
}

.property {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: normal;
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
    margin-top: 2.5rem;
  }

  div {
    opacity: 0;
    width: 0.5rem;
    margin-top: 0.5rem;
  }

  #delete {
    width: 2rem;
    margin-left: 80%;
    margin-top: 0.5rem;
  }

  #delete:hover {
    cursor: pointer;
  }

}

.property:hover {
  @include hover;
}

.pending {
  border: green dashed;
  background-image: none;
}

</style>
