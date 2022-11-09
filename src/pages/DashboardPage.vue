<script>
import HeaderWithoutLinks from "../components/Header/HeaderWithoutLinks.vue";
export default {
  components: { HeaderWithoutLinks }
};
</script>
<template>
  <header-without-links name="Dashboard"></header-without-links>
  <main>
    <div>
      <div>
        <router-link to="/manage-property"><p>Manage Property</p></router-link>
        <router-link to="/live-data"><p>Live Data</p></router-link>
        <router-link to="/"><p>Recent activity</p></router-link>
      </div>
      <div>
        <router-link to="/"><p>Map</p></router-link>
        <router-link to="/"><p>Pricing / Upgrade</p></router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$hover-color: #e8e8e8;

main {
  div {
    font-size: 1.5rem;
    div {
      :first-of-type {
        margin-bottom: 2rem;
      }
      display: flex;
      justify-content: center;
      justify-items: center;
      gap: 3rem;

    }

    p {
      border: solid black;
      padding: 7rem 12rem;
      box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
      transition: transform ease 0.5s;
      border-radius: 0.3rem;
    }

    p:hover {
      background-color: $hover-color;
      box-shadow: none;
      transform: translate(0, 5px);
    }
  }
}

</style>
