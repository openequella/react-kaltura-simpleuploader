import { KalturaUploadToken } from "kaltura-typescript-client/api/types";

export type State =
  | { id: "start" }
  | { id: "file_selected"; file: File }
  | { id: "file_uploading"; file: File }
  | { id: "upload_complete"; file: File; uploadResult: KalturaUploadToken }
  | { id: "error"; error: Error };

export type Action =
  | { id: "reset" }
  | { id: "select_file"; file: File }
  | { id: "upload_file"; file: File }
  | { id: "upload_success"; file: File; uploadResult: KalturaUploadToken }
  | { id: "failed"; cause: Error };

export const reducer = (_: State, action: Action): State => {
  switch (action.id) {
    case "reset":
      return { id: "start" };
    case "select_file":
      return { id: "file_selected", file: action.file };
    case "upload_file":
      return { id: "file_uploading", file: action.file };
    case "upload_success":
      return {
        id: "upload_complete",
        file: action.file,
        uploadResult: action.uploadResult,
      };
    case "failed":
      return { id: "error", error: action.cause };
    default:
      throw new TypeError("Unexpected action passed to reducer!");
  }
};
