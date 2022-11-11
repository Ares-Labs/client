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
    <div>
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
  <div v-else>
    <img src="#" alt="user-img">
    <p>{{ name }}</p>
    <p>{{ description }}</p>
    <p>{{ time }}</p>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 2rem;
}
.urgent {
  border: solid black;

  div:first-child {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      p:first-child {
        font-weight: bold;
        margin-bottom: 0.4rem;
      }
      p:last-child {
        font-size: 0.9rem;
      }
    }
  }

  .actions {
    border-top: solid black;
    gap: 2rem;
    div {
      gap: 0.4rem;
    }
  }

  div:last-child {
    display: flex;
  }
}
</style>
