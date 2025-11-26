import { useState } from "preact/hooks";
import { render } from "preact";
import { html }  from "htm/preact";

export function App() {
  const [count, setCount] = useState(0);

  return html`
    <div>
      <p>Count: <span data-testid="counter">${count}</span></p>
      <button onClick=${() => setCount(count + 1)}>Increment</button>
      <button onClick=${() => setCount(count - 1)}>Decrement</button>
    </div>
  `;
}

export function mkApp(element) {
  return render(html`<${App}/>`, element);
}
