import counterConfig from "./counter/config.ts?raw";
import counterMain from "./counter/main.md?raw";
import todosConfig from "./todos/config.ts?raw";
import todosMain from "./todos/main.md?raw";
import colorsConfig from "./colors/config.ts?raw";
import colorsMain from "./colors/main.md?raw";
import gradientsConfig from "./gradients/config.ts?raw";
import gradientsMain from "./gradients/main.md?raw";
import reposConfig from "./repos/config.ts?raw";
import reposMain from "./repos/main.md?raw";
import windicssConfig from "./windicss/config.ts?raw";
import windicssMain from "./windicss/main.md?raw";

type Examples = Record<string, { id: string; label: string; main: string; config: string }>;

const load = (md: string) => md.replace(/```jsx\s*/, "").replace("```", "");

export const counterExample = {
  id: "counter",
  label: "Simple Counter",
  main: load(counterMain),
  config: counterConfig,
};

export const examples: Examples = {
  counter: counterExample,
  todos: {
    id: "todos",
    label: "Todo List",
    main: load(todosMain),
    config: todosConfig,
  },
  repos: {
    id: "repos",
    label: "GitHub Repo List",
    main: load(reposMain),
    config: reposConfig,
  },
  colors: {
    id: "colors",
    label: "Colors Reference",
    main: load(colorsMain),
    config: colorsConfig,
  },
  gradients: {
    id: "gradients",
    label: "Gradients Reference",
    main: load(gradientsMain),
    config: gradientsConfig,
  },
  windicss: {
    id: "windicss",
    label: "Windi CSS (Experiment)",
    main: load(windicssMain),
    config: windicssConfig,
  },
  // animation: {
  //   id: "animation",
  //   label: "Animations",
  //   main: "// TODO: Animations",
  //   config: "export default {}",
  // },
};
