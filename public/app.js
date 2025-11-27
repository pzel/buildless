import { useState } from "preact/hooks";
import { render, Component } from "preact";
import { html }  from "htm/preact";

export class CounterList extends Component {
  constructor(props, _) {
    super();
    this.state = { db: props.db, counters: []}
    this.getCounters();
  }

  componentDidMount() {
    this.state.db.changes({
      since: 'now',
      live: true
    }).on('change', this.getCounters);
  }

  getCounters = async () => {
    const res = await this.state.db.allDocs({include_docs: true, descending: true});
    const ctrs = res.rows.map((c) => c.doc);
    this.setState({db: this.state.db, counters: ctrs});
  }

  render() {
    const items = this.state.counters.map((c) => html`<li role="counter-list-item">${c.n}</li>`)
    return html`<ul data-testid="counter-list">${items}</ul>`;
  }
}

export class App extends Component {
  constructor(props) {super(); this.state = {count: 0, db: new PouchDB(props.dbName) }}
  incr = () => {this.setState({count: this.state.count + 1});}
  decr = () => {this.setState({count: this.state.count - 1});}

  persistCurrent = async () => {
    const db = this.state.db;
    const counter = {
      _id: new Date().toISOString(),
      n: this.state.count,
    };
    const res = await db.put(counter);
    this.setState({db: this.state.db, count: 0});
  }

  render () {
    return html`
    <div>
      <p>Count: <span data-testid="counter">${this.state.count}</span></p>
      <button onClick=${this.incr}>Increment</button>
      <button onClick=${this.decr}>Decrement</button>
      <button onClick=${this.persistCurrent}>Save this counter</button>
      <${CounterList} db=${this.state.db}/>
    </div>
  `
  }
}

export function mkApp(dbName, element) {
  return render(html`<${App} dbName=${dbName}/>`, element);
}
