<script setup>
import Header from "@/components/Header/Header.vue";
import { successNotification } from "@/utils/notifications";

function selectPeriod(e) {
  document.querySelectorAll(".selected")
    .forEach(el => el.classList.remove("selected"));
  e.target.classList.toggle("selected");
}

function selectPlan(e) {
  document.querySelectorAll(".plan")
    .forEach(el => el.classList.remove("plan"))
  e.target.parentElement.classList.add("plan");
}
</script>

<template>
  <Header/>
  <main>
    <h1>Compare Plan Features</h1>
    <h4>Pick a plan that suits your needs</h4>
    <article>
      <div id="select-plan-wrapper">
        <h2>Select Plan</h2>
        <div>
          <p @click="selectPeriod" class="selected">Monthly</p>
          <p @click="selectPeriod">Annual</p>
        </div>
        <div>
          <p>Cameras</p>
          <p>Live camera footage</p>
          <p>Automatic locking door</p>
          <p>Drone security</p>
          <p>Graph logging</p>
        </div>
      </div>
      <div id="basic-plan-wrapper">
        <p class="current">current</p>
        <div class="plan-header">
          <h3>Basic</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>35</p>
          </div>
          <p>per month</p>
        </div>
        <div class="checked-or-not">
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/x.png" alt="x"/>
          <img src="../images/x.png" alt="x"/>
          <img src="../images/x.png" alt="x"/>
        </div>
        <button @click="successNotification('The plan has been selected'); selectPlan($event)">Select Plan</button>

      </div>
      <div id="premium-plan-wrapper">
        <p class="hiddenRemove">current</p>
        <p class="recommended">Recommended</p>
        <div class="plan-header">
          <h3>Premium</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>48</p>
          </div>
          <p>per month</p>
        </div>
        <div class="checked-or-not">
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/x.png" alt="x"/>
          <img src="../images/x.png" alt="x"/>
        </div>
        <button @click="successNotification('The plan has been selected'); selectPlan($event)">Select Plan</button>
      </div>
      <div id="optimum-plan-wrapper">
        <p class="current hiddenVisibility">current</p>
        <div class="plan-header">
          <h3>Optimum</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>74</p>
          </div>
          <p>per month</p>
        </div>
        <div class="checked-or-not">
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
          <img src="../images/checkmark.png" alt="checkmark"/>
        </div>
        <button @click="successNotification('The plan has been selected'); selectPlan($event)">Select Plan</button>
      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";
@import "src/assets/css/app";

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}

h4 {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 2rem;
  opacity: 50%;
  margin-bottom: 4rem;
}

article {
  display: flex;
  justify-content: center;
  padding-bottom: 7rem;
}

.selected {
  background-color: #7ca1b9;
  padding: 0.1rem;
  margin: -0.2rem;
  border-radius: 0.3rem;
  color: white;
}

.checked-or-not {
  display: flex;
  flex-direction: column;

  img {
    width: 2rem;
    margin: 1rem auto;
    border-bottom: solid black 0.1rem;
    padding-bottom: 0.5rem;
  }
}

button {
  @include button;
  display: flex;
  margin: 1rem auto 1rem auto;
  text-align: center;
}

.plan {
  background-color: $light;
}

.current {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 1rem;
  opacity: 0;
}

.recommended {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: bold;
  color: #485d76;
}

.plan-header {
  background: linear-gradient(20deg, $normal, $light);
  border-radius: 2rem;
  margin: 1rem 1rem 2rem 1rem;
  text-align: center;
  padding: 1rem 3vw;


  p:nth-child(3) {
    opacity: 40%;
  }

  div {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    margin: 1rem auto;
    img {
      width: 2rem;
      margin-right: 0.2rem;
    }
  }
}

#optimum-plan-wrapper {
  border-radius: 0 0.8rem 0.8rem 0;
}

#basic-plan-wrapper, #premium-plan-wrapper, #optimum-plan-wrapper {
  border: solid #485d76;
  border-left: none;
  width: 20vw;
}

#select-plan-wrapper {
  border: solid #485d76;
  border-radius: 0.8rem 0 0 0.8rem;
  padding: 3rem 3rem 2rem 3rem;
  font-weight: bold;
  div:first-of-type {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}

#select-plan-wrapper h2 {
    margin-bottom: 2rem;
}

#select-plan-wrapper div:last-of-type {
  p {
    margin-bottom: 3rem;
    border-bottom: solid black 0.1rem;
    padding-bottom: 0.5rem;
  }
}

#select-plan-wrapper div:first-of-type {
    display: flex;
    margin-bottom: 7rem;
    border: solid #485d76 0.2rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
</style>
