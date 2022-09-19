```jsx
class TodoList extends Component {
  state = { todos: [{ value: "Hello Windi", finished: false }, { value: "Have Fun", finished: false }], value: "" };
  setValue = e => {
    this.setState({ value: e.target.value });
  };
  addTodo = () => {
    let { todos, value } = this.state;
    if (value.trim() === "") return;
    todos = todos.concat({ value, finished: false });
    this.setState({ todos, value: "" });
  };
  delTodo = () => {

  };
  toggle = (id) => {
    let { todos, value } = this.state;
    todos = todos.map((todo, index) => index === id ? { ...todo, finished: !todo.finished } : todo);
    this.setState({ todos, value });
  };
  render({}, { todos, value }) {
    const todoColors = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal"];

    return (
      <form onSubmit={this.addTodo} action="javascript:">
        <input
          placeholder="Todos..."
          class={[width.percent[75], mr[2], border.none, hocus(outline.none), bg.gray[200], dark(text.white, bg.dark[300]), p[2], rounded.lg]}
          value={value}
          onInput={this.setValue}
        />
        <button class={[border.none, cursor.pointer, rounded.lg, text.white, bg.gray[500], dark(bg.dark[50]), hover(bg.opacity[90]), width.percent[16], py[2]]} type="submit">
          Add
        </button>
        <ul class={[space.y[3], userSelect.none]}>
          {todos.map((todo, index) => (
            <li onClick={() => this.toggle(index)} class={[todo.finished ? decoration.linethrough : undefined, list.none, bg[todoColors[index % 8]][500].gradient, rounded.lg, p[2], ml[-10], mr[6], index % 8 === 5 ? text.amber[800] : text.white]}>{todo.value}</li>
          ))}
        </ul>
      </form>
    );
  }
}

render(<TodoList />, document.getElementById("app"));
```
