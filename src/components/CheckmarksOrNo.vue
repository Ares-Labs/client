<script>
import {ref} from "vue";

export default {
  name: "CheckmarksOrNo"
};
export {checkmark};

const checkmark = ref(false);
function toggleHidden() {
  checkmark.value = !checkmark.value;
}
</script>

<template>
  <svg v-if="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 12l5 5l10 -10" />
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="5.7" y1="5.7" x2="18.3" y2="18.3" />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  width: 2rem;
}
</style>
