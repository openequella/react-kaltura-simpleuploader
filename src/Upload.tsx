import { KalturaClient } from "kaltura-typescript-client";
import { KalturaUploadToken } from "kaltura-typescript-client/api/types";
import { createUploadToken, uploadFile } from "KalturaModule";
import * as React from "react";
import { useEffect, useReducer } from "react";
import { reducer } from "UploadReducer";

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
   * @param uploadResult details returned from the server about the upload attempt.
   */
  onUploadSuccessful: (uploadResult: KalturaUploadToken) => void;
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

  useEffect(() => {
    const dispatchError = (msg: string) =>
      dispatch({ id: "failed", cause: new Error(msg) });

    switch (state.id) {
      case "file_uploading":
        void (async () => {
          const { file } = state;

          const uploadToken = await createUploadToken(kClient);
          if (uploadToken) {
            const uploadResult = await uploadFile(kClient, uploadToken, file);
            uploadResult
              ? dispatch({ id: "upload_success", uploadResult })
              : dispatchError("Attempt to upload to Kaltura failed.");
          } else {
            dispatchError(
              "Attempt to create Kaltura Upload Token failed, please try again."
            );
          }
        })();
        break;
      case "upload_complete":
        onUploadSuccessful(state.uploadResult);
        break;
    }
  }, [state, dispatch, kClient, onUploadSuccessful]);

  return (
    <div id={`${idPrefix}_upload`}>
      <p>
        <strong>Upload Asset</strong>
      </p>
      {state.id === "start" && (
        <input
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
        <>
          <div>
            <p>Filename: {state.file.name}</p>
            <p>File size: {state.file.size}</p>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch({ id: "upload_file", file: state.file });
              }}
            >
              Upload
            </button>
          </div>
        </>
      )}
      {state.id === "file_uploading" && (
        // TODO: Add a pretty spinner
        <p>Please wait, the file is uploading...</p>
      )}
      {state.id === "upload_complete" && <p>Upload is complete.</p>}
      {state.id === "error" && (
        // TODO: Use a standard error component and make pretty
        <p color="red">{state.error}</p>
      )}
    </div>
  );
};
