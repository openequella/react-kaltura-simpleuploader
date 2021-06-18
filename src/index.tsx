import { KalturaUploader } from "KalturaUploader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { KalturaMediaEntry } from "kaltura-typescript-client/api/types";

/**
 * Convenience constant pointing at common endpoint for using Kaltura SaaS platform.
 */
export const kalturaSaasEndpoint = "https://www.kaltura.com/";

/**
 * Renders the Kaltura Simple Uploader component to the specified DOM element.
 *
 * @param targetElem The element to render the component to - typically a `<div>`
 * @param endpoint The endpoint for the Kaltura server to use. (For Kaltura SaaS simply use
 *                 `kalturaSaasEndpoint`.
 * @param ks A Kaltura session token
 * @param partnerId The partner ID matching the provided `ks`
 * @param callback Callback to call when an upload is completed. Typically, this is provided by openEQUELLA Kaltura plugin.
 */
export const render = (
  targetElem: HTMLElement,
  endpoint: string,
  ks: string,
  partnerId: number,
  callback: (entries: KalturaMediaEntry[]) => void
): void => {
  ReactDOM.render(
    <KalturaUploader {...{ endpoint, ks, partnerId, callback }} />,
    targetElem
  );
};
