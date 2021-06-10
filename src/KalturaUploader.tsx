import { KalturaClient } from "kaltura-typescript-client";
import {
  KalturaMediaEntry,
  KalturaMediaType,
  KalturaUploadToken,
} from "kaltura-typescript-client/api/types";
import { reducer } from "KalturaUploaderReducer";
import { Metadata } from "Metadata";
import * as React from "react";
import { useReducer, useState } from "react";
import { Upload } from "Upload";

/**
 * Allowed types (based on file extension) for each of the media groups. These are based on the
 * values which openEQUELLA used to supply the Kaltura Contribution Wizard widget. However a
 * number of these are no longer used. Maybe revise in future versions.
 */
const MediaTypes = {
  audio: {
    type: KalturaMediaType.audio,
    allowedTypes: [
      "flv",
      "asf",
      "wmv",
      "qt",
      "mov",
      "mpg",
      "avi",
      "mp3",
      "wav",
    ],
  },
  video: {
    type: KalturaMediaType.video,
    allowedTypes: [
      "flv",
      "asf",
      "qt",
      "mov",
      "mpg",
      "avi",
      "wmv",
      "mp4",
      "rm",
      "3gp",
    ],
  },
};

/**
 * Supported options for types of media.
 */
type MediaTypeOptions = typeof MediaTypes.audio | typeof MediaTypes.video;

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

/**
 * A component which provides a guided method to uploading a single media asset and creating a basic
 * Media Entry in Kaltura.
 */
export const KalturaUploader = ({
  endpoint,
  ks,
  partnerId,
}: KalturaUploaderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { id: "start" });
  const [mediaType, setMediaType] = useState<MediaTypeOptions>(
    MediaTypes.video
  );

  const client = new KalturaClient(
    {
      endpointUrl: endpoint,
      clientTag: "openequella_react-kaltura-simpleuploader",
    },
    { ks, partnerId }
  );

  const mediaTypeSelectorOptions: {
    id: string;
    label: string;
    value: MediaTypeOptions;
  }[] = [
    { id: "audio", label: "Audio", value: MediaTypes.audio },
    { id: "video", label: "Video", value: MediaTypes.video },
  ];

  const mediaTypeSelectorId = "media-type-selector";
  const mediaTypeSelector = (
    <div id={mediaTypeSelectorId}>
      <p>
        <strong>Media Type:</strong>
      </p>
      {mediaTypeSelectorOptions.map((option) => (
        <div key={option.id}>
          <input
            type="radio"
            id={`${mediaTypeSelectorId}_${option.id}`}
            name="mediaType"
            value={option.id}
            checked={mediaType === option.value}
            onChange={(event) => {
              if (event.target.checked) {
                setMediaType(option.value);
              }
            }}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );

  return (
    <div id={kalturaUploaderId}>
      {state.id === "start" && (
        <>
          {mediaTypeSelector}
          <Upload
            allowedTypes={mediaType.allowedTypes}
            idPrefix={kalturaUploaderId}
            kClient={client}
            onUploadSuccessful={(uploadResult: KalturaUploadToken) =>
              dispatch({ id: "upload_successful", uploadResult })
            }
          />
        </>
      )}
      {state.id === "media_uploaded" && (
        <Metadata
          idPrefix={kalturaUploaderId}
          kClient={client}
          mediaType={mediaType.type}
          onEntryCreated={(entry: KalturaMediaEntry) =>
            dispatch({ id: "entry_created", entry })
          }
          uploadResult={state.uploadResult}
        />
      )}
      {state.id === "complete" && (
        <>
          <h2>New Media Entry created.</h2>
          <p>
            <strong>{state.entry.name}</strong>
          </p>
          <p>{state.entry.description}</p>
          <a target="_blank" href={state.entry.dataUrl} rel="noreferrer">
            <img src={state.entry.thumbnailUrl} alt="Thumbnail" />
          </a>
          <p>
            <a href={state.entry.downloadUrl}>Download Video.</a>
          </p>
        </>
      )}
    </div>
  );
};
