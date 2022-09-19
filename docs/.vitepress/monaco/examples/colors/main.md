```jsx
import { iOSColors, macOSColors, watchOSColors, Color, getLightColor, getDarkColor, bootstrapColors, bulmaColors, materialColors, tailwindColors, webColors, windiColors } from "windijs";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

function ColorItem<T extends object>({
  name,
  color,
  parentColor,
  value,
  colors,
  onClick,
}: {
  name: string;
  parentColor?: string;
  color?: string;
  value: string;
  colors: T;
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      class={[
        list.none,
        backgroundColor[colors[color || name]],
        rounded.lg,
        p[2],
        ml[-10],
        mr[6],
        style.color[Color.hex(value).lightness > 70 ? getDarkColor(Color.hex(value)).hex : getLightColor(Color.hex(value)).hex],
      ]}>
      {name +
        (parentColor ? "." + parentColor : "") +
        (color === "DEFAULT" || !color ? "" : ".") +
        (color === "DEFAULT" ? "" : color == "50" ? "50 " : color ? color : "")}
      &nbsp;{"[" + value + "]"}
    </li>
  );
}

function Colors() {
  const [alert, showAlert] = useState(false);
  const [tab, selectTab] = useLocalStorage("colorsTab", 6);

  const center = [text.center, flexDirection.column, justifyContent.center];
  const material = [text.gray[700], backgroundColor.rgba(230, 230, 230, 0.3), dark(text.gray[300], backgroundColor.rgba(22, 22, 22, 0.25)), style.backdropFilter["blur(20px)"], style["-webkit-backdrop-filter"]["blur(20px)"]];
  const tabStyle = (id: number) => [tab === id ? text.blue[400] : undefined, hover(text.blue[300]), cursor.pointer, userSelect.none];
  const entries = <T extends object>(t: T) => Object.entries(t).filter(([k]) => /^[\d\w]/.test(k));

  function copyColor(color: string) {
    navigator.clipboard.writeText(color).then(() => {
      showAlert(true);
      setTimeout(() => {
        showAlert(false);
      }, 500);
    });
  }

  const allColors: Record<string, string | Record<string, string | Record<string, string>>> =
    tab === 0
      ? iOSColors
      : tab === 1
      ? bootstrapColors
      : tab === 2
      ? bulmaColors
      : tab === 3
      ? materialColors
      : tab === 4
      ? tailwindColors
      : tab === 5
      ? webColors
      : windiColors;

  return (
    <>
      <nav class={[w.full, px[3], py[4], material, position.fixed, style.top.px[0], style.left.px[0], space.x[4]]}>
        {["Apple", "Bootstrap", "Bulma", "Material", "Tailwind", "Web", "Windi"].map((label, id) => (
          <span onClick={() => selectTab(id)} class={tabStyle(id)}>
            {label}
          </span>
        ))}
      </nav>
      <ul class={[space.y[3], userSelect.none, font.mono, mt[12], mb[32]]}>
        <h2 class={[tab === 0 ? display.block : display.none, ml[-10], text.sm]}>{"iOS"}</h2>
        {entries(allColors).map(([name, colors]) =>
          typeof colors === "string" ? (
            <ColorItem name={name} value={colors} colors={allColors} onClick={() => copyColor(colors)} />
          ) : (
            entries(colors).map(([color, value]) =>
              typeof value === "string" ? (
                <ColorItem name={name} color={color} value={value} colors={colors} onClick={() => copyColor(value)} />
              ) : typeof value === "object" ? (
                entries(value).map(([k, v]) => (
                  <ColorItem parentColor={color} name={name} color={k} value={v} colors={value} onClick={() => copyColor(v)} />
                ))
              ) : (
                <></>
              )
            )
          )
        )}
        <h2 class={[tab === 0 ? display.block : display.none, ml[-10], text.sm]}>{"macOS"}</h2>
        {tab === 0 && entries(macOSColors).map(([name, colors]) =>
          entries(colors).map(([color, value]) => (
            <ColorItem name={name} color={color} value={value} colors={colors} onClick={() => copyColor(value)} />
          ))
        )}
        <h2 class={[tab === 0 ? display.block : display.none, ml[-10], text.sm]}>{"watchOS"}</h2>
        {tab === 0 && entries(watchOSColors).map(([name, colors]) => (
          <ColorItem name={name} value={colors} colors={watchOSColors} onClick={() => copyColor(colors)} />
        ))}
      </ul>
      <div
        class={[
          alert ? display.flex : display.none,
          style.position.fixed,
          style.top.percent[36],
          userSelect.none,
          left.percent[45],
          rounded.lg,
          material,
          center,
          zIndex[50],
          w[24],
          h[24],
        ]}>
        Copied
      </div>
    </>
  );
}

render(<Colors />, document.getElementById("app"));
```
