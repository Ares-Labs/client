<script setup>
import Header from "@/components/Header/Header.vue";
</script>


<template>
  <Header/>
  <div class="wrapper">
    <main>
      <form>
        <fieldset>
          <legend>Request to add property</legend>
          <div class="flex">
            <div id="left">
              <p>Choose your property location on the map</p>
              <label for="name">Name of your property</label>
              <input type="text" id="name" name="name">
              <label for="tier">Tier or protection</label>
              <select id="tier" name="tier">
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
              </select>
            </div>
            <div id="right">
              <label for="reason">What is the reason you want to add this property?</label>
              <input type="text" id="reason" name="text" placeholder="">
              <input type="submit" value="Submit">
            </div>
          </div>
        </fieldset>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  width: 90%;
  margin: auto;
}

legend {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin: auto auto 5rem;
}

input {
  display: block;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>