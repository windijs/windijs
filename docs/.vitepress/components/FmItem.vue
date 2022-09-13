<script setup lang="ts">
import { style } from "@windijs/style"

defineProps({
  name: String,
  selected: Boolean,
  color: String,
  darkColor: String,
  focusColor: String,
})

</script>

<template>
  <div :class="[style.fill[selected ? focusColor : color], dark(style.fill[selected ? focusColor : darkColor]), hover(style.fill[focusColor]), w[12], rounded.md, p[1.5], bg.gray[200].opacity(50), hover(bg.gray[300].opacity(50)), dark(bg.dark[300], hover(bg.dark[200])), layout.vstack, cursor.pointer, space.y[0.5]]">
    <slot></slot>
    <span :class="[selected ? [text.stone[900], dark(text.stone[300])] : [text.stone[500], dark(text.stone[400])], text.xs]">{{name}}</span>
  </div>
</template>
