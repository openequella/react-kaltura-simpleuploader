import {
  KalturaMediaEntry,
  KalturaUploadToken,
} from "kaltura-typescript-client/api/types";

export type State =
  | { id: "start" }
  | { id: "media_uploaded"; filename: string; uploadResult: KalturaUploadToken }
  | { id: "complete"; entry: KalturaMediaEntry };

export type Action =
  | {
      id: "upload_successful";
      filename: string;
      uploadResult: KalturaUploadToken;
    }
  | { id: "entry_created"; entry: KalturaMediaEntry };

export const reducer = (_: State, action: Action): State => {
  switch (action.id) {
    case "upload_successful":
      return {
        id: "media_uploaded",
        filename: action.filename,
        uploadResult: action.uploadResult,
      };
    case "entry_created":
      return { id: "complete", entry: action.entry };
    default:
      throw new TypeError("Unexpected action passed to reducer!");
  }
};
