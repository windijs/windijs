<script lang="ts">
  import { bg, w } from "../windi"
  import type { WindiColors } from "../windi"

  let btn = [bg.pink[400]]

  let count: number = 0

  const colors: WindiColors[] = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  const increment = () => {
    btn = [bg[colors[count % 8]][400]]
    count += 1
  }
</script>

<button use:w={btn} on:click={increment}>
  count is {count}
</button>
