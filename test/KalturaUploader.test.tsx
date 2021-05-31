import { render } from "@testing-library/react";
import { KalturaUploader, kalturaUploaderId } from "../src/KalturaUploader";
import * as React from "react";

describe("<KalturaUploader/>", () => {
  it("Successfully renders", () => {
    const { container } = render(
      <KalturaUploader
        endpoint="https://www.kaltura.com/"
        ks="not-a-real-key"
        partnerId={1234}
      />
    );

    expect(container.querySelector(`#${kalturaUploaderId}`)).toBeTruthy();
  });
});
