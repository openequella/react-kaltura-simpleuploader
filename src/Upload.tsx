import { Heading } from "Heading";
import { KalturaClient } from "kaltura-typescript-client";
import { KalturaUploadToken } from "kaltura-typescript-client/api/types";
import { createUploadToken, uploadFile } from "KalturaModule";
import * as React from "react";
import { useEffect, useReducer } from "react";
import { useErrorHandler } from "react-error-boundary";
import { Spinner } from "Spinner";
import { reducer } from "UploadReducer";
import "./main.css";

/**
 * Generate a compressed representation of the number of provided bytes.
 *
 * Taken from https://gist.github.com/lanqy/5193417#gistcomment-3590752
 *
 * @param bytes The number to convert to a SI unit
 */
const bytesToSize = (bytes: number): string => {
  if (bytes === 0) {
    return "";
  }

  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  const i: number = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString()
  );
  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

export interface UploadProps {
  /**
   * A list of file extensions which should be allowed.
   */
  allowedTypes: string[];
  /**
   * A prefix to add to the DOM `id` for the root of this component.
   */
  idPrefix: string;
  /**
   * A `KaltruaClient` that has been setup with valid session token and partner ID, possibly using
   * `createClient` from `KalturaModule`.
   */
  kClient: KalturaClient;
  /**
   * Callback to be triggered upon a successful file upload.
   *
   * @param filename the name of the file which was successfully uploaded
   * @param uploadResult details returned from the server about the upload attempt.
   */
  onUploadSuccessful: (
    filename: string,
    uploadResult: KalturaUploadToken
  ) => void;
}

/**
 * A component providing a file selector and then integration to upload to a Kaltura instance
 * configured by the provided `KalturaClient`.
 */
export const Upload = ({
  allowedTypes,
  idPrefix,
  kClient,
  onUploadSuccessful,
}: UploadProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { id: "start" });

  useErrorHandler(state.id === "error" ? state.error : undefined);

  useEffect(() => {
    const dispatchError = (c: string | Error) =>
      dispatch({ id: "failed", cause: c instanceof Error ? c : new Error(c) });

    const doUpload = async (file: File): Promise<void> => {
      try {
        const uploadToken = await createUploadToken(kClient);
        if (uploadToken) {
          const uploadResult = await uploadFile(kClient, uploadToken, file);
          uploadResult
            ? dispatch({ id: "upload_success", file, uploadResult })
            : dispatchError("Attempt to upload to Kaltura failed.");
        } else {
          dispatchError(
            "Attempt to create Kaltura Upload Token failed, please try again."
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatchError(e);
        } else {
          console.error(e);
          dispatchError(
            "Unknown failure attempting to upload file, please see console log."
          );
        }
      }
    };

    switch (state.id) {
      case "file_uploading":
        void doUpload(state.file);
        break;
      case "upload_complete":
        onUploadSuccessful(state.file.name, state.uploadResult);
        break;
    }
  }, [state, dispatch, kClient, onUploadSuccessful]);

  return (
    <div id={`${idPrefix}_upload`}>
      <Heading>Upload media</Heading>
      {state.id === "start" && (
        <input
          className="ku-margin-single"
          accept={allowedTypes.map((ext) => `.${ext}`).join()}
          type="file"
          name="sourceFile"
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              dispatch({ id: "select_file", file: event.target.files[0] });
            }
          }}
        />
      )}
      {state.id === "file_selected" && (
        <div className="ku-grid-container">
          <div className="ku-grid-item">
            {state.file.name} ({bytesToSize(state.file.size)})
          </div>
          <div className="ku-grid-item">
            <button
              onClick={() => {
                dispatch({ id: "upload_file", file: state.file });
              }}
            >
              Upload
            </button>
          </div>
        </div>
      )}
      {state.id === "file_uploading" && (
        <div className="ku-grid-container">
          <div className="ku-grid-item">
            Please wait, the file is uploading...
          </div>
          <div className="ku-grid-item">
            <Spinner />
          </div>
        </div>
      )}
      {state.id === "upload_complete" && <p>Upload is complete.</p>}
    </div>
  );
};
