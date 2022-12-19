<script setup></script>

<template>
  <header>
    <router-link to="/admin">
      <img
        alt="ares-labs-logo"
        src="../assets/media/admin-ares-labs-logo.svg"
      />
    </router-link>

    <nav>
      <router-link to="/admin/users">
        <img alt="manage-users" src="../assets/media/manage-users.svg" />
      </router-link>

      <router-link to="/admin/properties">
        <img
          alt="manage-properties"
          src="../assets/media/manage-properties.svg"
        />
      </router-link>

      <router-link to="/admin/properties/pending">
        <img
          alt="pending-properties"
          src="../assets/media/pending-properties.svg"
        />
      </router-link>

      <router-link to="/admin/properties/remove">
        <img
          alt="pending-remove-properties"
          src="../assets/media/pending-remove-properties.svg"
        />
      </router-link>

      <router-link to="/admin/drones">
        <img alt="dispatch-drone" src="../assets/media/dispatch-drone.svg" />
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "/src/assets/css/admin-styles";

header {
  position: relative;
  background: linear-gradient(-70deg, $dark, $normal);
  height: 100vh;
  width: 9.125rem;

  > a:first-child {
    position: absolute;
    top: 1.75rem;

    left: 50%;
    transform: translateX(-50%);
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    a {
      margin-bottom: 2.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      :hover {
        transition: opacity 0.2s ease-in-out;
        opacity: 0.75;
      }
    }
  }
}
</style>