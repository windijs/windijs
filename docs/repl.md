---
layout: home
---

<script setup>
  import { shallowRef, onMounted } from "vue";

  const dynamicComponent = shallowRef(null);

  onMounted(() => {
    import('@/Repl.vue').then((module) => {
      dynamicComponent.value = module.default
    })
  })
</script>

<ClientOnly>
  <component v-if="dynamicComponent" :is="dynamicComponent"/>
</ClientOnly>
