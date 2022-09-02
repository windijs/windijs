<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)

const btn = ref([bg.pink[400]])

/** @type { import("windijs").BootstrapColors[] } */
const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"];

const increment = () => {
  btn.value = [bg[colors[count.value % 8]][400]];

  count.value ++
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" :class="btn" @click="increment">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
