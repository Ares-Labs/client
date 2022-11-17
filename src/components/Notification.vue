<script setup>
const props = defineProps({
  name: String,
  description: String,
  time: String,
  urgent: Boolean
});
</script>

<template>
  <div v-if="urgent" class="urgent">
    <div class="main-noti">
      <img src="../assets/media/profile.svg" alt="profile">
      <div>
        <p>{{ name }}</p>
        <p>{{ description }}</p>
      </div>
      <p>{{ time }}</p>
    </div>
    <div class="actions">
      <div>
        <img src="../assets/media/phone.svg" alt="phone-icon">
        <p>Call authorities</p>
      </div>
      <div>
        <img src="../assets/media/view.svg" alt="arrow-left">
        <p>View Live</p>
      </div>
    </div>
  </div>
  <div v-else class="not-urgent">
    <img src="src/assets/media/profile.svg" alt="profile">
    <div>
      <p>{{ name }}</p>
      <p>{{ description }}</p>
    </div>
    <p>{{ time }}</p>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 2rem;
  height: 2rem;
}

.urgent {
  margin-bottom: 1.5rem;
  max-width: 30rem;
  box-shadow: black 0 0.5rem 0.3rem 0.01rem;
  padding: 1rem;
  border: solid black;
  border-radius: 1rem;
}

.not-urgent {
  margin-bottom: 2rem;
  max-width: 30rem;
  box-shadow: black 0 0.5rem 0.3rem 0.01rem;
  padding: 1rem;
  border: solid black;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
}

.main-noti {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  div {
    display: flex;
    flex-direction: column;
    margin: 0 2rem 0 1rem;
  }
}

.actions {
  display: flex;
  border-top: solid black 0.1rem;
  gap: 2rem;
  padding-top: 1rem;
  justify-content: center;

  div {
    font-size: 0.7rem;
    display: flex;
    border: solid black 0.1rem;
    border-radius: 4rem;
    padding: 0.2rem 1.5rem 0.3rem 1rem;
    align-items: center;
    gap: 0.4rem;
  }
}

.not-urgent div {
  margin: 0 2rem 0 1rem;
  p:first-child {
    font-weight: bold;
    margin-bottom: 0.4rem;
  }
  p:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
    font-size: 0.9rem;
  }
}

.main-noti div {
  p:first-child {
    font-weight: bold;
    margin-bottom: 0.4rem;

  }
  p:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20rem;
    max-height: 3rem;
    font-size: 0.9rem;
  }
}

.actions div img {
  width: 3rem;
}

div:last-child {
  display: flex;
}

</style>
