```jsx
import { px, gradientConfig } from "windijs";

function Gradients() {
  const macroMove = css({
    "@keyframes micro-move": {
      from: {
        transform: "translateY(0px)",
      },
      to: {
        transform: "translateY(-10px)",
      },
    },
    animation: "micro-move .15s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  return (
    <div class={[display.grid, grid.cols[4], gap.y[6], mr[2], mt[2], mb[32]]}>
      {Object.entries(gradientConfig).map(([k, v]) => (
        <div class={[display.flex, flexDirection.column, w[24], text.center, font.italic]}>
          <div class={[bg.gradient[k], h[24], rounded.lg, userSelect.none, hover(style.transform.translateY(px[-10]), macroMove)]} />
          <span class={[text.xs, text.stone[700], dark(text.gray[300]), font.bold, font.serif, mt[1]]}>{k}</span>
          <span class={[fontSize.px[8], font.mono, text.gray[800], font.extralight, dark(text.stone[400]), mt[1], wordBreak["break-all"]]}>{v}</span>
        </div>
      ))}
    </div>
  );
}

render(<Gradients />, document.getElementById("app"));
```
