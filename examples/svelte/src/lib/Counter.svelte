<script>
  let btn = [bg.pink[400]];

  let count = 0

  /** @type {import("windijs").BootstrapColors} */
  const colors = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"]

  const increment = () => {
    btn = [bg[colors[count % 8]][400]];

    count += 1
  }

</script>

<button class={btn.toString()} on:click={increment}>
  count is {count}
</button>
