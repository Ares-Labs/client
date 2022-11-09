<script>
export default {
  name: "ToBeAddedUser"
};
</script>

<template>
  <div class="to-be-added-user">
    <div class="to-be-added-user-info">
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
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
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
