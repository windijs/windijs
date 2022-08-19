<script setup lang="ts">
import { ref } from 'vue'
import type { gradientConfig } from '../windi';
import { bg, gradient } from '../windi'

const btn = ref([bg.pink[400]])

const count = ref(0)

const names = ['red', 'blood', 'brown', 'orange', 'peach', 'mango', 'sunny', 'sunset', 'amber', 'gold', 'yellow', 'desert', 'milk', 'warm', 'wild', 'pine', 'warmth', 'rainy', 'amy', 'spring', 'grass', 'fresh', 'green', 'lime', 'teal', 'azure', 'acid', 'mint', 'aqua', 'cyan', 'sky', 'fly', 'blue', 'beach', 'fisher', 'sea', 'ocean', 'morpheus', 'miracle', 'purple', 'bootstrap', 'indigo', 'plum', 'night', 'pink', 'fuchsia', 'malinka', 'snow', 'fog', 'ink', 'winter', 'gray'] as (keyof typeof gradientConfig)[];

</script>

<template>
  <div class="ch-gradient-brick" v-for="name in names">
    <div class="ch-gradient" :class="[gradient[name]]"></div>
    <div class="ch-name">{{name}}</div>
  </div>
</template>

<style scoped>
.ch-gradient-brick {
  width: 180px;
  display: inline-block;
  margin: 25px;
  box-shadow: 0px 0px 51px 0px rgba(0, 0, 0, 0.08), 0px 6px 18px 0px rgba(0, 0, 0, 0.05);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0px);
}

.ch-gradient-brick:hover {
  box-shadow: 0px 0px 114px 0px rgba(0, 0, 0, 0.08), 0px 30px 25px 0px rgba(0, 0, 0, 0.05);
  transform: translateY(-5px);
}

.ch-gradient {
  width: 100%;
  height: 180px;
  position: relative;
  background-color: #CFD8DC;
}

.ch-gradient-brick:hover .ch-actions {
  display: block;
  animation: micro-move .3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ch-name {
  padding: 12px;
  text-align: left;
  /* text-transform: uppercase; */
  font-size: 18px;
}
</style>
