<script setup>
import HeaderWithoutLinks from "../components/Header/HeaderWithoutLinks.vue";
</script>
<template>
  <HeaderWithoutLinks name="Dashboard"></HeaderWithoutLinks>
  <div class="wrapper">
    <main>
      <div>
        <div class="link">
          <router-link to="/choose-property"><p>Manage Property</p></router-link>
        </div>
        <div class="link">
          <router-link to="/live-data"><p>Live Data</p></router-link>
        </div>
        <div class="link">
          <router-link to="/statistics"><p>Statistics</p></router-link>
        </div>
        <div class="link">
          <router-link to="/"><p>Map</p></router-link>
        </div>
        <div class="link">
          <router-link to="/pricing"><p>Pricing / Upgrade</p></router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins.scss";
@import "src/assets/css/app";

.wrapper {
  width: 90%;
  margin: auto;
}

main {
  font-size: 1.5rem;

  div {
    display: flex;
    justify-content: center;
    justify-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  p {
    color: $dark;
    font-weight: bold;
    font-size: 2rem;
  }

  .link {
    border: 0.25rem solid $black;
    padding: 6rem 7rem;
    border-radius: $border-radius;
    transition: transform ease 0.5s;
    box-shadow: rgba(17, 17, 26, 0.1) 0 1px 0, rgba(17, 17, 26, 0.1) 0 8px 24px, rgba(17, 17, 26, 0.1) 0 16px 48px;
    background: linear-gradient(20deg, $normal, $light);
    &:hover {
      @include hover;
    }
  }
}
</style>
