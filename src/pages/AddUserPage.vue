<script setup>
import Header from "../components/Header/Header.vue";
import ToBeAddedUser from "@/components/users/ToBeAddedUser.vue";

const propertyBeingManaged = window.location.pathname.split("/").pop();
</script>

<template>
  <Header/>
  <main>
    <aside id="recent-ppl" aria-label="recent-ppl">
      <h2>Recent People</h2>
      <div>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e1" name="Alice"/>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e2" name="Bob"/>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e3" name="John"/>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e4" name="James"/>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e5" name="Brad"/>
      </div>
    </aside>

    <article>
      <h1>Add a user</h1>
      <label for="search-users">Search:</label>
      <input id="search-users" type="search" placeholder="El criminel">
      <div>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e6" name="Sabine"/>
      </div>
    </article>

    <aside id="blacklist" aria-label="blacklist">
      <h2>Blacklist</h2>
      <div>
        <ToBeAddedUser identity="4cc-4b03-9c3f66e6" name="Chris"/>
      </div>
    </aside>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 7rem;
}

h1 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 5rem;
  margin-top: 2rem;
}

input, label {
  margin-bottom: 2rem;
}

article > div {
  height: 35rem;
  padding: 0 1rem;
  overflow-y: auto;
  div {
    box-shadow: black 0 0.5rem 0.3rem 0.01rem;
  }
}

#recent-ppl > div {
  height: 35rem;
  padding: 0 1rem;
  overflow-y: auto;
}

#blacklist h2 {
    text-align: end;
  }

#blacklist > div {
  height: 35rem;
  padding: 0 1rem;
  overflow-y: auto;

  div {
    box-shadow: black 0.5rem 0.5rem 0.3rem 0.01rem;
  }
}

#recent-ppl > div div {
  box-shadow: black -0.5rem 0.5rem 0.3rem 0.01rem;
}

</style>
