<script setup>
import { infoNotification } from "@/utils/notifications";

defineProps({
  name: String,
  description: String,
  time: String,
  urgent: Boolean
});
</script>

<template>
  <div v-if="urgent" class="urgent">
    <div class="main-noti">
      <img src="/src/assets/media/profile.svg" alt="profile">
      <div>
        <p>{{ name }}</p>
        <p>{{ description }}</p>
      </div>
      <p>{{ time }}</p>
    </div>
    <div class="actions">
      <a href="#" @click="infoNotification('Calling authorities')">
        <div class="action" >
          <img src="/src/assets/media/phone.svg" alt="phone-icon">
          <p>Call authorities</p>
        </div>
      </a>
      <a href="#">
        <div class="action">
          <img src="/src/assets/media/view.svg" alt="arrow-left">
          <p>View Live</p>
        </div>
      </a>
  </div>
  <div v-else class="not-urgent">
    <img src="/src/assets/media/profile.svg" alt="profile">
    <div>
      <p>{{ name }}</p>
      <p>{{ description }}</p>
    </div>
    <p>{{ time }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/css/mixins.scss";
@import "src/assets/css/app";

img {
  width: 2rem;
  height: 2rem;
}

.urgent {
  margin-bottom: 1.5rem;
  max-width: 30rem;
  box-shadow: black 0 0.1rem 0.2rem 0.01rem;
  padding: 1rem;
  border: solid black;
  border-radius: 1rem;
}

.not-urgent {
  margin-bottom: 2rem;
  max-width: 30rem;
  box-shadow: black 0 0.1rem 0.2rem 0.01rem;
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

  .action {
    font-size: 0.7rem;
    display: flex;
    border: 0.15rem solid $dark;
    border-radius: 4rem;
    padding: 0.2rem 1.5rem 0.3rem 1rem;
    align-items: center;
    gap: 0.4rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  .action:hover {
    transform: scale(0.95);
    background-color: #7ca1b9;
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

.main-noti div p:first-child {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.main-noti div p:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20rem;
  max-height: 3rem;
  font-size: 0.9rem;
}

div:last-child {
  display: flex;
}

</style>
