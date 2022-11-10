<script setup>

</script>

<template>
  <div class="to-be-added-user">
    <div class="to-be-added-user-info">
      <img src="src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> Mr.Bean </p>
        <p> ID: 4cc-4b03-9c3f66e3 </p>
      </div>
    </div>
    <img src="src/assets/media/plus-icon.svg" alt="plus">
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

button {
  display: flex;
  border: 0.1rem solid black;
  border-radius: 9rem;
  background-color: red;
  color: white;
  margin-top: 1.5rem;
}
</style>
