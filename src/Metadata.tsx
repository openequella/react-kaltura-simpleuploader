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

export interface MetadataProps {
  /**
   * A prefix to add to the DOM `id` for the root of this component.
   */
  idPrefix: string;
  kClient: KalturaClient;
  mediaType: KalturaMediaType;
  onEntryCreated: (entry: KalturaMediaEntry) => void;
  uploadResult: KalturaUploadToken;
}

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

  const onSubmit = async () => {
    const entry = await createEntryForUpload(kClient, form, uploadResult.id);
    if (!entry) {
      throw new Error("Failed to create new Media Entry!");
    }
    console.log("FINAL RESULT");
    console.log(entry);

    onEntryCreated(entry);
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
