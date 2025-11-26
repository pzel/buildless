import { useState } from "preact/hooks";
import { render, Component } from "preact";
import { html }  from "htm/preact";

export class App extends Component {
  constructor() {
    super();
	  this.state = {count: 0 }
  }

  incr = () => {
    this.setState({count: this.state.count + 1});
  }

  decr = () => {
    this.setState({count: this.state.count - 1});
  }

  render () {
    return html`
    <div>
      <p>Count: <span data-testid="counter">${this.state.count}</span></p>
      <button onClick=${this.incr}>Increment</button>
      <button onClick=${this.decr}>Decrement</button>
    </div>
  `
  }
}

export function mkApp(element) {
  return render(html`<${App}/>`, element);
}
