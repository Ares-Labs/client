<script setup>
const props = defineProps({
  name: String,
  identity: String,
});

function addUser(e) {

}
</script>

<template>
  <div class="to-be-added-user">
    <div class="to-be-added-user-info">
      <img src="/src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> {{name}} </p>
        <p> ID: {{identity}} </p>
      </div>
    </div>
    <a @click="addUser"><img src="/src/assets/media/plus-icon.svg" alt="plus"></a>
  </div>
</template>

<style lang="scss" scoped>
.to-be-added-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid black 0.1rem;
  width: 20rem;
  height: 3rem;
  padding: 0.3rem;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  background-color: #e8e8e8;
  div {
    div {
      p:last-child {
        opacity: 50%;
        margin-top: 0.1rem;
      }
    }
  }
}

.to-be-added-user-info {
  display: flex;
}

img {
  width: 2rem;
  margin-right: 1rem;
  padding-left: 0.3rem;
}

a {

  transition: transform .2s;
}

a:hover {
  transform: scale(1.25);
}
</style>
