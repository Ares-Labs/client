<script setup>
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
import Gateway from "../utils/events";
import { onMounted, onUpdated, ref } from "vue";
import { successNotification } from "@/utils/notifications";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(getUser);
onUpdated(getUser);

const user = ref({
  name: "",
  id: ""
});

function getUser() {
  Gateway.onReady(() => {
    Gateway.execute(Gateway.queries.GET_USER, {
      userId: Gateway.clientId,
    }).then((data) => {
      user.value.name = data.fullName;
      user.value.id = data.id;
    });
  });
}

</script>

<template>
  <HeaderWithoutLinks name="User Profile"></HeaderWithoutLinks>
  <div class="wrapper">
    <main>
      <div class="card">
        <img src="../assets/media/profile.svg" alt="User">
        <div class="vert">
          <h2>{{ user.name }}</h2>
          <p>{{ user.id }}</p>
          <p><strong>Payment:</strong> 0xD12fFe8b82b5978178da0aECd</p>
        </div>
        <div class="hor">
          <button @click="successNotification('Payment method has been updated')">Update payment method</button>
          <button>
            <router-link to="/pricing">
              Update subscription
            </router-link>
          </button>
          <button @click="() => router.push({name: 'AdminManageUsers'})">
              Admin page (only for demo)
          </button>
        </div>
      </div>
    </main>
  </div>

</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";

button {
  @include button;
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
}

img {
  width: 15rem;
  height: 15rem;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 24rem;
  margin: auto;
  text-align: center;
}

.vert {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.hor {
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
}

</style>
