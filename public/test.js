import { expect } from "chai";
import { App, mkApp } from "./app.js";

// This library (like Mocha) is magically imported in the test index
const tl = globalThis.TestingLibraryDom
const txt = tl.getByText;
const qid = tl.queryByTestId;
const qar = tl.queryAllByRole;
const until = (f) => tl.waitFor(f, {interval: 10});

// clear all pouches
const dbs = await window.indexedDB.databases()
dbs.forEach(db => { 
  if (db.name.startsWith("_pouch"))
    window.indexedDB.deleteDatabase(db.name)
  });

let __nextId = 2;

const newUserId = () =>  {
//  window.indexedDB.deleteDatabase(db.name)
  const x = `user${__nextId++}`
  console.log("new user id", x, __nextId)
  return x
}

describe("Sanity check", () => {
  it("App is loadable", () => {
    expect(App).to.not.be.undefined;
  });

  it("testing library dom is available", () => {
    expect(tl).to.not.be.undefined;
  });
});

describe("Incrementing the current counter", () => {
  it("the starting value is 0", () => {
    const div = document.createElement('div');
    mkApp(newUserId(), div);

    expect(qid(div, "counter").innerText).to.be.equal("0");
  });

  it("can be incremented", async () => {
    const div = document.createElement('div');
    mkApp(newUserId(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));
  });

  it("can be decremented too", async () => {
    const div = document.createElement('div');
    mkApp(newUserId(), div);

    txt(div, 'Increment').click();
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));


    txt(div, 'Decrement').click();
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("0"));
  });

});

describe("Persisting counter values", () => {
  it("can be done after incrementing", async () => {
    const div = document.createElement('div');
    mkApp(newUserId(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));

    txt(div, 'Save this counter').click()
    await until(() => expect(qid(div, "counter-list").innerText).to.be.equal("1"));
  });

  it("new counter is started after saving the previous one", async () => {
    const div = document.createElement('div');
    mkApp(newUserId(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));

    txt(div, 'Save this counter').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("0"));

    txt(div, 'Decrement').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("-1"))

    txt(div, 'Save this counter').click()
    await until(() =>
      expect(qar(div, "counter-list-item")
             .map((i) => i.innerText))
             .to.have.ordered.members(["-1", "1"]))
  });
});
