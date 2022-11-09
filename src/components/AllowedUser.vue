<script>
export default {
  name: 'AllowedUser'
};
const allowedUserList = [];

function deleteUser(user) {
  //todo functionality to delete user (button @click already there)
  console.log('hi');
}
</script>

<template>
  <div id="allowedUser">
    <div id="userinfo">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="7" r="4"/>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
      </svg>
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

svg {
  width: 2rem;
  margin-right: 1rem;
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
