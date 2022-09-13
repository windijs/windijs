<script setup lang="ts">
  import { style } from "@windijs/style";

  defineProps({
    ts: Boolean,
    head: String,
  })

  defineEmits(['update:ts'])

  const choiceStyle = [text.xs, text.stone[700], dark(text.stone[400])];
</script>

<template>
  <div :class="[layout.hstack, style.justifyContent['space-between']]">
    <h1>{{ head }}</h1>

    <div :class="[layout.hstack, space.x[4], bg.gray[300].opacity(30), dark(bg.dark[500]), w.content.min, p[4], rounded.xl]">
      <span :class="[choiceStyle, ts ? [] : [text.blue[600], dark(text.blue[500])]]">JavaScript</span>
      <div :class="[style.cursor.pointer, style.position.relative, style.alignItems.center, w[10]]" @click="$emit('update:ts', !ts);">
        <input type="checkbox" :class="[style.display.none]" v-model="ts">
        <div :class="[bg.gray[300], dark(bg.dark[50]), border[2], border.gray[200], h[5], w[10], rounded.full]"></div>
        <div :class="[style.position.absolute, ts ? style.right.px[0] : style.left.px[0], style.top.px[0], bg.blue[400], rounded.full, w[5], h[5]]"></div>
      </div>
      <span :class="[choiceStyle, ts ? [text.blue[600], dark(text.blue[500])] : []]">TypeScript</span>
    </div>
  </div>
</template>
