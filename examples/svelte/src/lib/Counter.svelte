<script>
  import { bg, w } from "../windi";

  let btn = [bg.pink[400]];

  let count = 0

  /** @type {import("windijs").NestedColors} */
  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  const increment = () => {
    btn = [bg[colors[count % 8]][400]];

    count += 1
  }

</script>

<button use:w={btn} on:click={increment}>
  count is {count}
</button>
