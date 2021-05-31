import * as React from "react";
import * as ReactDOM from "react-dom";
import { KalturaUploader } from "./KalturaUploader";

/**
 * Convenience constant pointing at common endpoint for using Kaltura SaaS platform.
 */
export const kalturaSaasEndpoint = "https://www.kaltura.com/";

export const render = (
  targetElem: HTMLElement,
  endpoint: string,
  ks: string,
  partnerId: number
) => {
  ReactDOM.render(
    <KalturaUploader {...{ endpoint, ks, partnerId }} />,
    targetElem
  );
};
