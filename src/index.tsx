import { KalturaUploader } from "KalturaUploader";
import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * Convenience constant pointing at common endpoint for using Kaltura SaaS platform.
 */
export const kalturaSaasEndpoint = "https://www.kaltura.com/";

/**
 * Renders the Kaltura Simple Uploader component to the specified DOM element.
 *
 * TODO: Add a method to return a link to the new Kaltura entry - maybe a callback. Need to confirm
 *       what the openEQUELLA Kaltura plugin is expecting.
 *
 * @param targetElem The element to render the component to - typically a `<div>`
 * @param endpoint The endpoint for the Kaltura server to use. (For Kaltura SaaS simply use
 *                 `kalturaSaasEndpoint`.
 * @param ks A Kaltura session token
 * @param partnerId The partner ID matching the provided `ks`
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
