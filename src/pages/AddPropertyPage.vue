<script setup>
import Header from "@/components/Header/Header.vue";
</script>

<template>
  <Header></Header>
  <div class="wrapper">
    <main>
      <form>
        <fieldset>
          <legend>Request to add property</legend>
          <div class="flex">
            <div>
              <p>Choose your property location on the map</p>
              <img src="../images/map.jpg" alt="map">
              <label for="name">Name of your property</label>
              <input type="text" id="name" name="name" autocomplete="off">
              <label for="tier">Tier or protection</label>
              <select id="tier" name="tier">
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Optimum">Optimum</option>
              </select>
            </div>
            <div>
              <label for="reason">What is the reason you want to add this property?</label>
              <textarea name="reason" id="reason" autocomplete="off"></textarea>
              <input type="submit" value="Submit">
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

input, select {
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

input[type='submit'] {
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
