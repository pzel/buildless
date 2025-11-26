import { expect } from "chai";
import { App, mkApp } from "./app.js";

// This library (like Mocha) is magically imported in the test index
const tl = globalThis.TestingLibraryDom
const txt = tl.getByText;
const qid = tl.queryByTestId;
const until = (f) => tl.waitFor(f, {interval: 10});

const randomName = () => `db-${new Date().getTime()}`;

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
    mkApp(randomName(), div);

    expect(qid(div, "counter").innerText).to.be.equal("0");
  });

  it("can be incremented", async () => {
    const div = document.createElement('div');
    mkApp(randomName(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));
  });

  it("can be decremented too", async () => {
    const div = document.createElement('div');
    mkApp(randomName(), div);

    txt(div, 'Increment').click();
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));


    txt(div, 'Decrement').click();
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("0"));
  });

});

describe("Persisting counter values", () => {
  it("can be done after incrementing", async () => {
    const div = document.createElement('div');
    mkApp(randomName(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));

    txt(div, 'Save this counter').click()
    await until(() => expect(qid(div, "counter-list").innerText).to.be.equal("1"));
  });

  it("new counter is started after saving", async () => {
    const div = document.createElement('div');
    mkApp(randomName(), div);

    txt(div, 'Increment').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("1"));

    txt(div, 'Save this counter').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("0"));

    txt(div, 'Decrement').click()
    await until(() => expect(qid(div, "counter").innerText).to.be.equal("-1"))

    txt(div, 'Save this counter').click()
    await until(() =>
      // text is squashed, this is -1 and 1 on a list
      expect(qid(div, "counter-list").innerText).to.be.equal("-11"));
  });

});
