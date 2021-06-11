import { KalturaClient } from "kaltura-typescript-client";
import {
  KalturaMediaEntry,
  KalturaUploadToken,
} from "kaltura-typescript-client/api/types";
import { KalturaMediaType } from "kaltura-typescript-client/api/types/KalturaMediaType";
import { BasicEntryMetadata, createEntryForUpload } from "KalturaModule";
import { set } from "lodash";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "react-error-boundary";

export interface MetadataProps {
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
   * The media type for the Media Entry which is to be created - typically matching the type of file
   * uploaded which resulted in the value provided for `uploadResult`.
   */
  mediaType: KalturaMediaType;
  /**
   * Callback triggered on the successful creation of the Media Entry.
   *
   * @param entry Details returned from the server for the new Media Entry.
   */
  onEntryCreated: (entry: KalturaMediaEntry) => void;
  /**
   * The result of a previously successful upload - such as one completed with the `Upload`
   * component.
   */
  uploadResult: KalturaUploadToken;
}

/**
 * Having already uploaded a media file to Kaltura, this component then allows for the configuration
 * of some basic metadata and the creation of an enclosing Media Entry on Kaltura.
 */
export const Metadata = ({
  idPrefix,
  kClient,
  mediaType,
  onEntryCreated,
  uploadResult,
}: MetadataProps): JSX.Element => {
  // Alias type to bind the below two expressions to the same type
  type FormTarget = BasicEntryMetadata;
  const [form, setForm] = useState<FormTarget>({
    name: "",
    description: "",
    mediaType,
  });
  // Basic compile time validator for form fields
  const formField = (name: keyof FormTarget) => name;

  const [error, setError] = useState<string>("");
  const handleError = useErrorHandler();

  const onSubmit = async () => {
    try {
      const entry = await createEntryForUpload(kClient, form, uploadResult.id);
      if (!entry) {
        setError("Failed to create new Media Entry!");
      } else {
        onEntryCreated(entry);
      }
    } catch (e) {
      handleError(e);
    }
  };

  const onFormChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // We trust the below usage based on the use of the compile time validator `formField`.
    // TODO: Really though, we should add some Jest tests too.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setForm(set({ ...form }, target.name, target.value));
  };

  return (
    <div id={`${idPrefix}_metadata`}>
      <strong>Media Details</strong>
      {error && (
        <div role="alert">
          <p>error</p>
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
      >
        <label>
          Title
          <br />
          <input
            name={formField("name")}
            type="text"
            value={form.name}
            onChange={onFormChange}
          />
        </label>
        <br />
        <label>
          Description
          <br />
          <textarea
            name={formField("description")}
            value={form.description}
            onChange={onFormChange}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
