<script setup>
const props = defineProps({
  name: String,
  tier: Number,
  route: String,
  show: Boolean
});

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
  <p v-if="typeof this.tier === 'undefined'"></p>
  <p v-else>Tier {{ tier }}</p>
</div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins";
@import "src/assets/css/app";

.hidden {
  display: none;
}

.property {
  color: $dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: normal;
  border: 0.25rem solid $dark;
  width: 20rem;
  height: 12rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 2rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0 1px 0, rgba(17, 17, 26, 0.1) 0 8px 24px, rgba(17, 17, 26, 0.1) 0 16px 48px;
  background: linear-gradient(20deg, $normal, $light);
  transition: transform ease 0.5s;

  a {
    color: $dark;
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
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    @include hover;
  }
}

.pending {
  border: green dashed;
  background-image: none;
}

</style>
