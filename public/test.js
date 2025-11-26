import { expect } from "chai";
import { App, mkApp } from "./app.js";

// This library (like Mocha) is magically imported in the test index
const tl = globalThis.TestingLibraryDom

describe("Sanity check", () => {
  it("App is loadable", () => {
    expect(App).to.not.be.undefined;
  });

  it("testing library dom is available", () => {
    expect(tl).to.not.be.undefined;
  });
});

describe("The counter app", () => {
  it("has a default counter of 0", () => {
    const div = document.createElement('div');
    mkApp(div);

    expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("0");
  });

  it("can be incremented", async () => {
    const div = document.createElement('div');
    mkApp(div);

    tl.getByText(div, 'Increment').click()
    await tl.waitFor(() => {
      expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("1");
    });
  });

  it("can be decremented too", async () => {
    const div = document.createElement('div');
    mkApp(div);

    tl.getByText(div, 'Increment').click();
    await tl.waitFor(() => {
      expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("1");
    })

    tl.getByText(div, 'Decrement').click();
    await tl.waitFor(() => {
      expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("0");
    })
  });

});
