<script setup>
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
import Gateway from "../utils/events";
import {onMounted, onUpdated} from "vue";

onMounted(getUser);
onUpdated(getUser);

function getUser() {
  Gateway.onReady(() => {
    Gateway.execute(Gateway.queries.GET_USER, {
      userId: Gateway.clientId,
    }).then((data) => {
      document.querySelector("#id").innerHTML = `<strong>ID:</strong> ${data.id}`
      document.querySelector("#name").innerHTML = `<strong>Name:</strong> ${data.fullName}`
    });
  });
}

</script>

<template>
  <HeaderWithoutLinks name="User Profile"></HeaderWithoutLinks>
  <div class="wrapper">
    <main>
      <div class="vert">
        <img src="../assets/media/profile.svg" alt="profile">
        <p id="name"></p>
        <p id="id"></p>
      </div>

      <div class="hor">
        <div class="vert">
          <p><strong>Payment method:</strong></p>
          <p>0xD12fFe8b82b5978178da0aECdEED11f5808B38ed</p>
        </div>

        <div class="vert">
          <p><strong>Subscription Tier:</strong></p>
          <p>Optimum</p>
        </div>
      </div>

      <div class="hor">
        <div class="vert">
          <p><strong>Remaining Period:</strong></p>
          <p>22 days</p>
        </div>
      </div>

      <div class="hor">
        <button>
          Update payment method
        </button>

        <button>
          <router-link to="/pricing">
            Update subscription
          </router-link>
        </button>
      </div>
    </main>
  </div>

</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";

img {
  width: 15rem;
  height: 15rem;
}

button {
  @include button;
}

.wrapper {
  width: 50%;
  margin: auto auto 5rem;
}

.vert {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto auto 2rem;
  text-align: center;
}

.hor {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.vert {
  p {
    margin-bottom: 1rem;
  }
}

</style>
