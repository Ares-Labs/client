<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  }
};

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
        <p>current</p>
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
        <button>SELECT PLAN</button>

      </div>
      <div id="premium-plan-wrapper">
        <p class="hidden">current</p>
        <p>BEST VALUE</p>
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
        <button>SELECT PLAN</button>
      </div>
      <div id="optimum-plan-wrapper">
        <p>current</p>
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
        <button>SELECT PLAN</button>

      </div>
    </article>
  </main>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

h1 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-top: 5rem;
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

}

#optimum-plan-wrapper {
  border-radius: 0 0.3rem 0.3rem 0;
}

#basic-plan-wrapper, #premium-plan-wrapper, #optimum-plan-wrapper {
  border: solid black;
  border-left: none;

  div:first-of-type {
    background-color: #e8e8e8;
    text-align: center;
    padding: 1rem 6rem;

    div {
      display: flex;
      font-size: 2rem;
      font-weight: bold;

      img {
        width: 2rem;
        margin-right: 0.2rem;
      }
    }

    p:nth-child(3) {
      opacity: 40%;
    }
  }
}

.selected {
  background-color: black;
  color: white;
}

#select-plan-wrapper {
  border: solid black;
  border-radius: 0.3rem 0 0 0.3rem;
  padding: 3rem 3rem 2rem 3rem;

  h2 {
    margin-bottom: 1rem;
  }

  div:first-of-type {
    display: flex;
    margin-bottom: 3.75rem;
    border: solid black 0.2rem;
    border-radius: 0.5rem;
    padding: 0.5rem;

    p:last-of-type {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      border-left: solid black;
    }
  }

  div:last-of-type {
    p {
      margin-bottom: 3rem;
      border-bottom: solid black 0.1rem;
      padding-bottom: 0.5rem;
    }
  }
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
  display: flex;
  margin: 1rem auto 1rem auto;
  text-align: center;
}
</style>