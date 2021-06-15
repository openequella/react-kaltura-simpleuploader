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

/**
 * Hook to manage the main metadata form. Returns three things:
 *
 * 1. A variable point to the value of the form stored in state;
 * 2. A function to set an individual field of the form with a value; and
 * 3. A function to assist with compile time validation of field names when specified in JSX.
 *
 * This is in place of the larger (and many) react frameworks that are out there for forms. But
 * here we just need a simple solution that still honors (mostly) Typescript typing. If it turns
 * out we end up needing more, then we may want to look at one of them.
 *
 * @param initialFormState The initial values for the form.
 */
const useForm = (
  initialFormState: BasicEntryMetadata
): [
  form: BasicEntryMetadata,
  setFormField: (fieldName: string, value: string) => void,
  formField: (fieldName: keyof BasicEntryMetadata) => keyof BasicEntryMetadata
] => {
  const [form, setForm] = useState<BasicEntryMetadata>(initialFormState);

  return [
    form,
    // When I originally did this `setForm` and `set` before the hook I had various type issues
    // and had to suppress warnings. But for whatever reasons here it's working. 🤷
    (fieldName, value) => setForm(set({ ...form }, fieldName, value)),
    (fieldName: keyof BasicEntryMetadata) => fieldName,
  ];
};

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
  const [form, setFormField, formField] = useForm({
    name: "",
    description: "",
    mediaType,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const triggerErrorBoundary = useErrorHandler();

  const onSubmit = async () => {
    try {
      const entry = await createEntryForUpload(kClient, form, uploadResult.id);
      if (!entry) {
        setErrorMessage("Failed to create new Media Entry!");
      } else {
        onEntryCreated(entry);
      }
    } catch (e) {
      triggerErrorBoundary(e);
    }
  };

  const onFormChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormField(target.name, target.value);
  };

  return (
    <div id={`${idPrefix}_metadata`}>
      <strong>Media Details</strong>
      {errorMessage && (
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
