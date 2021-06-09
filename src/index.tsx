import * as React from "react";
import * as ReactDOM from "react-dom";
import { KalturaUploader } from "./KalturaUploader";

/**
 * Convenience constant pointing at common endpoint for using Kaltura SaaS platform.
 */
export const kalturaSaasEndpoint = "https://www.kaltura.com/";

/**
 * TODO: Add doco
 * TODO: Add a method to return a link to the new Kaltura entry - maybe a callback
 *
 * @param targetElem
 * @param endpoint
 * @param ks
 * @param partnerId
 */
export const render = (
  targetElem: HTMLElement,
  endpoint: string,
  ks: string,
  partnerId: number
): void => {
  ReactDOM.render(
    <KalturaUploader {...{ endpoint, ks, partnerId }} />,
    targetElem
  );
};
