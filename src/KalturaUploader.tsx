import { ErrorFallback } from "ErrorFallback";
import {
  KalturaMediaEntry,
  KalturaUploadToken,
} from "kaltura-typescript-client/api/types";
import { createClient, MediaTypeOptions, MediaTypes } from "KalturaModule";
import { reducer } from "KalturaUploaderReducer";
import { MediaTypeSelector } from "MediaTypeSelector";
import { Metadata } from "Metadata";
import * as React from "react";
import { useEffect, useReducer, useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Upload } from "Upload";

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
  /**
   * Callback to call when an upload is completed.
   * @param entries A list of KalturaMediaEntry.
   */
  callback: (entries: KalturaMediaEntry[]) => void;
}

/**
 * A component which provides a guided method to uploading a single media asset and creating a basic
 * Media Entry in Kaltura.
 */
const KalturaUploaderInternal = ({
  endpoint,
  ks,
  partnerId,
  callback,
}: KalturaUploaderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { id: "start" });
  const [mediaType, setMediaType] = useState<MediaTypeOptions>(
    MediaTypes.video
  );

  useEffect(() => {
    if (state.id === "complete") {
      callback([state.entry]);
    }
  }, [state, callback]);

  const client = createClient(endpoint, ks, partnerId);

  return (
    <div id={kalturaUploaderId}>
      {state.id === "start" && (
        <>
          <MediaTypeSelector
            idPrefix={kalturaUploaderId}
            onChange={setMediaType}
            options={[
              { id: "audio", label: "Audio", value: MediaTypes.audio },
              { id: "video", label: "Video", value: MediaTypes.video },
            ]}
            value={mediaType}
          />
          <Upload
            allowedTypes={mediaType.allowedTypes}
            idPrefix={kalturaUploaderId}
            kClient={client}
            onUploadSuccessful={(
              filename: string,
              uploadResult: KalturaUploadToken
            ) => dispatch({ id: "upload_successful", filename, uploadResult })}
          />
        </>
      )}
      {state.id === "media_uploaded" && (
        <Metadata
          idPrefix={kalturaUploaderId}
          kClient={client}
          defaultTitle={state.filename}
          mediaType={mediaType.type}
          onEntryCreated={(entry: KalturaMediaEntry) =>
            dispatch({ id: "entry_created", entry })
          }
          uploadResult={state.uploadResult}
        />
      )}
    </div>
  );
};

export const KalturaUploader = withErrorBoundary(KalturaUploaderInternal, {
  FallbackComponent: ErrorFallback,
});
