<script setup>
import Header from "@/components/Header/Header.vue";
</script>

<template>
  <Header/>
  <main>
    <h1>Compare Plan Features</h1>
    <h4>Pick a plan that suits your needs.</h4>
    <article>
      <div id="select-plan-wrapper">
        <h2>Select Plan</h2>
        <div>
          <p class="selected">MONTHLY</p>
          <p>ANNUAL</p>
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
        <div>
          <h3>Basic</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>59</p>
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
        <button>Select Plan</button>

      </div>
      <div id="premium-plan-wrapper">
        <p class="hiddenRemove">current</p>
        <p class="recommended">Recommended</p>
        <div>
          <h3>Premium</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>79</p>
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
        <button>Select Plan</button>
      </div>
      <div id="optimum-plan-wrapper">
        <p class="current hiddenVisibility">current</p>
        <div>
          <h3>Optimum</h3>
          <div>
            <img src="../images/mars-coin.png" alt="mars-coin">
            <p>99</p>
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
        <button>Select Plan</button>

      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>

@import "src/assets/css/mixins";

main {
  width: 90%;
  margin: auto;
}

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
  margin-bottom: 1rem;
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

.current {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 1rem;
  opacity: 50%;
  font-weight: bold;

}
.recommended {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: bold;
  color: #485d76;
}

#optimum-plan-wrapper {
  border-radius: 0 0.8rem 0.8rem 0;
}

#basic-plan-wrapper, #premium-plan-wrapper, #optimum-plan-wrapper {
  border: solid #485d76;
  border-left: none;
}

#select-plan-wrapper {
  border: solid #485d76;
  border-radius: 0.8rem 0 0 0.8rem;
  padding: 3rem 3rem 2rem 3rem; // size of the select plan box (left side)
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
    margin-bottom: 8rem;
    border: solid #485d76 0.2rem;
    border-radius: 0.5rem;
    padding: 0.5rem;

    p:last-of-type {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      border-left: solid black;
    }
  }

#basic-plan-wrapper, #premium-plan-wrapper, #optimum-plan-wrapper {

}
#basic-plan-wrapper div:first-of-type,
#premium-plan-wrapper div:first-of-type,
#optimum-plan-wrapper div:first-of-type {
  background-color: #7ca1b9;
  border-radius: 2rem;
  margin: 1vw;
  text-align: center;
  padding: 1rem 3vw;  // size of the plan boxes

  p:nth-child(3) {
    opacity: 40%;
  }

  div {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
    img {
      width: 2rem;
      margin-right: 0.2rem;
    }
  }
}
</style>
