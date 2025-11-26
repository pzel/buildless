import { expect } from "chai";
import { App, mkApp } from "./app.js";

// This library (like Mocha) is magically imported in the test index
const tl = window.TestingLibraryDom

describe("Sanity check", () => {
  it("App is loadable", () => {
    expect(App).to.not.be.undefined;
  });
  it("testing library dom is available", () => {
    expect(window.TestingLibraryDom).to.not.be.undefined;
  });
});

describe("The counter app", () => {
  it("has a default counter of 1", () => {
    const div = document.createElement('div');
    const res = mkApp(div);
    expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("0");
  });

  it("can be incremented", async () => {
    const div = document.createElement('div');
    const res = mkApp(div);
    tl.getByText(div, 'Increment').click()
    await tl.waitFor(() => {
      expect(tl.queryByTestId(div, "counter").innerText).to.be.equal("1");
    });
  });

});
