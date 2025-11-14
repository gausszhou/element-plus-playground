<template>
  <router-link to="/">FormDisable</router-link>
  <span> | </span>
  <router-link to="/form-disabled-form-enable">FormDisableEnable</router-link>
  <span> | </span>
  <router-link to="/table-with-generic-type">TableWithGenericType</router-link>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
