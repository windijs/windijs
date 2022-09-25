---
layout: home
---

<script lang="ts">
  export default {
    data() {
      return {
        dynamicComponent: null
      }
    },

    mounted() {
      import('@/Repl.vue').then((module) => {
        this.dynamicComponent = module.default
      })
    }
  }
</script>

<ClientOnly>
  <component v-if="dynamicComponent" :is="dynamicComponent"/>
</ClientOnly>
