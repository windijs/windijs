```jsx
const SEARCH = "https://api.github.com/search/repositories";

function Repos() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${SEARCH}?q=windi`)
      .then(res => {
        const j = res.json();
        console.log(j);
        return j;
      })
      .then(data => setItems((data && data.items) || []));
  }, []);

  return (
    <div class={mb[32]}>
      <h1 class={[text.center, font.extralight]}>GitHub Repos</h1>
      <div class={[display.flex, flexDirection.column, space.y[4]]}>
        {items.map(result => (
          <Result {...result} />
        ))}
      </div>
    </div>
  );
}

const Result = result => (
  <div class={[bg.gray[200].opacity(30), dark(bg.stone[800].opacity(80)), p[6], rounded.lg, mr[8]]}>
    <div>
      <a class={[text.blue[500], hover(text.blue[400])]} href={result.html_url} target="_blank" rel="noopener noreferrer">
        {result.full_name}
      </a>
      {" - "}
      <strong class={[font.mono, text.sm]}>{result.stargazers_count}</strong>
    </div>
    <p>{result.description}</p>
  </div>
);

render(<Repos />, document.getElementById("app"));
```
