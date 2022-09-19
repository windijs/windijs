```jsx
import type { MaterialColors } from "windijs";

function Counter() {
  const [value, setValue] = useState(0);
  const btnColors: MaterialColors[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal"];
  const btnStyle = [myBtn, bg.gray[400].opacity(60), hover(bg.gray[500].opacity(50)), dark(bg.stone[700], hover(bg.stone[500])), text.white];

  return (
    <div class={[marginTop.vh[35]]}>
      <div class={[bg[btnColors[Math.abs(value % 8)]][500].gradient, hocus(bg.opacity[90]), w.content.max, mx.auto, p[4], text.white, rounded.lg, userSelect.none]}>Counter: {value}</div>
      <div class={[layout.hstack, mt[4], space.x[4]]}>
        <button class={btnStyle} onClick={() => setValue(value + 1)}>Increment</button>
        <button class={btnStyle} onClick={() => setValue(value - 1)}>Decrement</button>
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
```