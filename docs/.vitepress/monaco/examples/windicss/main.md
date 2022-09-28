```jsx
import type { MaterialColors } from "windijs";

function Counter() {
  const [value, setValue] = useState(0);
  const btnColors: MaterialColors[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal"];
  const btnStyle = "p-2 rounded-full bg-gray-400 hover:bg-gray-500 bg-opacity-50 dark:bg-stone-700 dark:hover:bg-stone-500 text-white focus:outline-none [border-style:none] style-cursor-pointer";

  return (
    <div class="mt-[35vh] style-userSelect-none">
      <div p="4" w="content-max" class={[bg[btnColors[Math.abs(value % 8)]][500].gradient, "hover:bg-opacity-90 mx-auto text-white rounded-lg"]}>
        Counter: {value}
      </div>
      <div space="x-4" class="style-display-flex [justifyContent:center] mt-4">
        <button class={btnStyle} onClick={() => setValue(value + 1)}>
          Increment
        </button>
        <button class={btnStyle} onClick={() => setValue(value - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
```
