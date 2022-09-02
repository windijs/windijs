<script setup>
import HelloWorld from './components/HelloWorld.vue'

const logo = [ rounded.xl, m[4] ]
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" :class="[logo, bg.indigo[300]]" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <!-- TODO: Volar doesn't trigger suggestions when bind class with an Array. -->
      <img src="./assets/vue.svg" class="logo vue" :class="[logo, bg.green[300], lg(bg.blue[300])]" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
