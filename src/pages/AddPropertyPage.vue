<script setup>
import Header from "@/components/Header/Header.vue";
import Gateway from "@/utils/events";
import { ref } from "vue";

const location = ref("");
const tier = ref(0);
const reason = ref("");
const x = ref(0);
const y = ref(0);

function submitRequest() {
  Gateway.onReady(() => {
    Gateway.execute(Gateway.queries.ADD_PROPERTY, {
      location: location.value,
      clientId: Gateway.clientId,
      description: reason.value,
      x: x.value,
      y: y.value,
      tier: parseInt(tier.value),
    }).then((response) => {
      if (response.success) {
        console.log("Property added");
      } else {
        console.log("Property not added");
      }
    });
  });
}
</script>

<template>
  <Header></Header>
  <div class="wrapper">
    <main>
      <form @submit.prevent="submitRequest">
        <fieldset>
          <legend>Request to add property</legend>
          <div class="flex">
            <div>
              <p>Choose your property location on the map</p>
              <img src="../images/map.jpg" alt="map" />
              <label for="name">Name of your property *</label>
              <input
                v-model="location"
                type="text"
                id="name"
                name="name"
                autocomplete="off"
                required
              />
              <label for="tier">Tier or protection *</label>
              <select v-model="tier" id="tier" name="tier" required>
                <option value="1">Basic</option>
                <option value="2">Premium</option>
                <option value="3">Optimum</option>
              </select>
            </div>
            <div>
              <label for="reason"
                >What is the reason you want to add this property?</label
              >
              <textarea
                v-model="reason"
                name="reason"
                id="reason"
                autocomplete="off"
              ></textarea>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </fieldset>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>
legend {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin: auto auto 5rem;
}

input,
select {
  display: block;
  width: 100%;
  padding: 0;
}

label {
  display: block;
}

img {
  height: 24rem;
  width: available;
}

textarea {
  width: 100%;
  height: 23rem;
  margin-bottom: 7rem;
  resize: none;
}

input[type="submit"] {
  width: initial;
  float: right;
}

.wrapper {
  width: 80%;
  margin: auto;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  * {
    margin-bottom: 1rem;
  }
}

#reason {
  margin-bottom: 7.5rem;
}
</style>