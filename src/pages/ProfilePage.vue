<script setup>
import HeaderWithoutLinks from "@/components/Header/HeaderWithoutLinks.vue";
</script>

<template>
  <HeaderWithoutLinks name="User Profile"></HeaderWithoutLinks>
  <div class="wrapper">
    <main>
      <div class="vert">
        <img src="../assets/media/profile.svg" alt="profile">
        <p><strong>ID:</strong> d2b840a9</p>
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
          Update subscription
        </button>
      </div>
    </main>
  </div>

</template>

<style lang="scss" scoped>

img {
  width: 15rem;
  height: 15rem;
}

button {
  margin: auto auto 2rem;
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
}

.hor {
  display: flex;
  justify-content: space-between;
}

</style>
