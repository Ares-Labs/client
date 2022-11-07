<script setup></script>

<template>
  <header>
    <img src="images/ares-labs-logo.png" alt="Ares Labs logo">
    <h1>Dashboard</h1>
    <img src="#" alt="Profile icon">
  </header>

  <main>
    <div>
      <p id="manage"><a href="#">Manage property</a></p>
      <p id="live"><a href="">Live data</a></p>
      <p id="recent"><a href="">Recent activity</a></p>
      <p id="map"><a href="">Map</a></p>
      <p id="pricing"><a href="">Pricing / Upgrade</a></p>
    </div>
  </main>
</template>

<style lang="scss" scoped>

header {
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  h1 {
    font-size: 2rem;
  }

  margin-bottom: 20rem;
  background-color: orange;
  border-radius: 1rem;
  box-shadow: black 0.1rem 0.1rem 1.5rem 0.3rem;
}

a {
  text-decoration: none;
}

main {
  div {
    display: grid;
    grid-template-columns: 30rem 30rem 30rem;
    grid-template-rows: auto;
    grid-template-areas:
    "man live re"
    "map map pri";
    gap: 10rem;
    justify-content: center;
    justify-items: center;
    font-size: 1.5rem;
  }
}

#manage {
  grid-area: man;
  border: solid black;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
}

#manage:hover {
  background-color: orange;
  box-shadow: none;
}

#live {
  grid-area: live;
  border: solid black;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
}

#live:hover {
  background-color: orange;
  box-shadow: none;
}

#recent {
  grid-area: re;
  border: solid black;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
}

#recent:hover {
  background-color: orange;
  box-shadow: none;
}

#map {
  grid-area: map;
  border: solid black;
  border-radius: 2rem;
  padding: 2rem 10rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
}

#map:hover {
  background-color: orange;
  box-shadow: none;
}

#pricing {
  grid-area: pri;
  border: solid black;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: black 0.1rem 0.1rem 1rem 0.1rem;
}

#pricing:hover {
  background-color: orange;
  box-shadow: none;
}
</style>
