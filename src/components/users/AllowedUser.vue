<script setup>
const allowedUserList = [];

function deleteUser(user) {
  //todo functionality to delete user (button @click already there)
  console.log('hi');
}
</script>

<template>
  <div id="allowedUser">
    <div id="userinfo">
      <img src="src/assets/media/profile.svg" alt="user-icon">
      <div>
        <p> Mr.Bean </p>
        <p> ID: 4cc-4b03-9c3f66e3 </p>
      </div>
    </div>
    <button @click="deleteUser()">Delete user</button>
  </div>
</template>

<style lang="scss" scoped>
#allowedUser {
  border: solid black 0.1rem;
  width: 15rem;
  height: 5rem;
  padding: 0.3rem;
  margin: 3rem;
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

#userinfo {
  display: flex;
}

img {
  width: 2rem;
  margin-right: 1rem;
  padding-left: 0.1rem;
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
