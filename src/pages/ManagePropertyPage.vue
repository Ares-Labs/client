<script>
import Header from "../components/Header/Header.vue";
import AllowedUser from "../components/AllowedUser.vue";

export default {
  components: {
    Header,
    AllowedUser,
  }
};
</script>

<template>
  <Header/>
  <main>
    <h1>Currently allowed users</h1>

    <div id="allowedUserContainer">
      <AllowedUser/>
      <div id="addNewAllowedUser">
        <router-link to="/add-user">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44"
               height="44"
               viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round"
               stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9"/>
            <line x1="9" y1="12" x2="15" y2="12"/>
            <line x1="12" y1="9" x2="12" y2="15"/>
          </svg>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 5rem;
}

#allowedUserContainer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 7rem 3rem 0 5rem;
}

#addNewAllowedUser {
  border: solid black 0.1rem;
  width: 15rem;
  height: 5rem;
  padding: 0.3rem;
  margin: 3rem;
  border-radius: 1rem;
  background-color: #e8e8e8;

  svg {
    display: block;
    align-items: center;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
