import {expect} from 'chai';
import { App } from "./app.js";

describe("Sanity check", () => {
  it("App is loadable", () => {
    expect(App).to.not.be.undefined;
  });
});

