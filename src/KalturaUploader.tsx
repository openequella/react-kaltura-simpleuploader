import * as React from "react";

/**
 * The DOM ID for the component for easier custom styling and interaction.
 */
export const kalturaUploaderId = "kaltura-simple-uploader";

export interface KalturaUploaderProps {
  /**
   * The kaltura server endpoint - for cloud platform that'd be https://www.kaltura.com
   */
  endpoint: string;
  /**
   * A Kaltura session ID.
   */
  ks: string;
  /**
   * A Kaltura partner ID.
   */
  partnerId: number;
}

export const KalturaUploader = ({
  endpoint,
  ks,
  partnerId,
}: KalturaUploaderProps) => {
  return (
    <div id={kalturaUploaderId}>
      <strong>This is the Kaltura Uploader!!</strong>
      <p>endpoint: {endpoint}</p>
      <p>ks: {ks}</p>
      <p>partnerId: {partnerId}</p>
    </div>
  );
};
