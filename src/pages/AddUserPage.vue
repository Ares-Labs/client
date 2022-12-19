<script setup>
import Header from "../components/Header/Header.vue";
import ToBeAddedUser from "@/components/users/ToBeAddedUser.vue";

const propertyBeingManaged = window.location.pathname.split("/").pop();
</script>

<template>
  <Header/>
  <main>
    <article>
      <h1>Add a user</h1>
      <label for="search-users">Search:</label>
      <input id="search-users" type="search" placeholder="El criminel">
      <div>
        <ToBeAddedUser identity="9a0fbbc6-55f3-11ed-82ca-9313c9a89e82" name="John Doe"/>
        <ToBeAddedUser identity="b66e49ae-55f3-11ed-a877-6f6036c8577a" name="Jane Doe"/>
        <ToBeAddedUser identity="bedb80fc-55f3-11ed-b681-07688aa63f8a" name="Frankenstein"/>
      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-around;
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

</style>
