<script>

</script>
<template>
  <header>
    <router-link to="/"><img src="../images/ares-labs-logo.png" alt="Ares Labs logo"></router-link>
    <h1>Dashboard</h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  </header>
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
$hover-animation: translate(0, 5px);
$transition-type-and-speed: transform ease 0.5s;

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
      transition: $transition-type-and-speed;
      border-radius: 0.3rem;
    }

    p:hover {
      background-color: $hover-color;
      box-shadow: none;
      transform: $hover-animation;
    }
  }
}

</style>
