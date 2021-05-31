import { kalturaSaasEndpoint, render } from "../src";
import { kalturaUploaderId } from "../src/KalturaUploader";

describe("Exported render function", () => {
  it("correctly renders the component", () => {
    const targetElem = document.createElement("div");
    render(targetElem, kalturaSaasEndpoint, "not-a-real-ks", 1234);
    expect(targetElem.querySelector(`#${kalturaUploaderId}`)).toBeTruthy();
  });
});
