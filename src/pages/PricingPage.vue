<script>
import Header from "../components/Header.vue";
import CheckmarksOrNo from "../components/CheckmarksOrNo.vue";

export default {
  name: "PricingPage",
  components: {
    Header,
    CheckmarksOrNo,
  }

};
</script>

<template>
  <header/>
  <main>
    <h1>Compare Plan Features</h1>
    <p>Pick a plan that suits your needs.</p>

    <article>
      <div id="select-plan-wrapper">
        <h2>Select Plan</h2>
        <div>
          <p>MONTHLY</p>
          <p>ANNUAL</p>
        </div>
        <p>Cameras</p>
        <p>Live camera footage</p>
        <p>Automatic locking door</p>
        <p>Drone security</p>
        <p>Graph logging</p>
      </div>
      <div id="basic-plan-wrapper">
        <p>current</p>
        <div>
          <h3>Basic</h3>
          <div>
            <img src="#" alt="mars-coin">
            <p>59</p>
          </div>
          <p>per month</p>
        </div>
          <div class="checked-or-not">
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
          </div>
          <button>SELECT PLAN</button>

      </div>
      <div id="premium-plan-wrapper">
        <p class="hidden">current</p>
        <p>BEST VALUE</p>
        <div>
          <h3>Premium</h3>
          <div>
            <img src="#" alt="mars-coin">
            <p>59</p>
          </div>
          <p>per month</p>
        </div>
          <div class="checked-or-not">
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
          </div>
          <button>SELECT PLAN</button>
      </div>
      <div id="optimum-plan-wrapper">
        <p>current</p>
        <div>
          <h3>Optimum</h3>
          <div>
            <img src="#" alt="mars-coin">
            <p>59</p>
          </div>
          <p>per month</p>
        </div>
          <div class="checked-or-not">
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
            <CheckmarksOrNo/>
          </div>
          <button>SELECT PLAN</button>

      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

article {
  display: flex;
  margin-top: 10rem;
  margin-left: 10rem;
}

.checked-or-not {
  display: flex;
  flex-direction: column;
}

#basic-plan-wrapper,#premium-plan-wrapper ,#optimum-plan-wrapper {
  div:first-of-type {
    background-color: #e8e8e8;
    text-align: center;
    padding: 1rem 2rem;
  }
  border: solid black;
  border-radius: 0.5rem;
}

#select-plan-wrapper {
  border: solid black;
  padding: 3rem 1rem 2rem 1rem;
  h2 {
    margin-bottom: 1rem;
  }
  div {
    display: flex;
    margin-bottom: 3rem;
    p:last-of-type{
      margin-left: 1rem;
    }
  }
  p {
    margin-bottom: 2.5rem;
    border-bottom: solid black;
  }

}

svg {
  width: 2rem;
  margin: 1rem auto;
  border-bottom: solid black;
}
</style>
