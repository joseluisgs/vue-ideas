<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}

/* Programamos las transiciones
https://vuejs.org/v2/guide/transitions.html */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
