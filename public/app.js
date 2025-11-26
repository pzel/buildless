import { useState } from "preact/hooks";
import { render } from "preact";
import { html }  from "htm/preact";

export function App() {
  let [count, setCount] = useState(0);

  return html`
    <div>
      <p>Count: ${count}</p>
      <button onClick=${() => setCount(count + 1)}>Increment</button>
    </div>
  `;
}


export function mkApp(element) {
  return render(html`<${App}/>`, element);
}


