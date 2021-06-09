import { KalturaClient } from "kaltura-typescript-client";
import {
  KalturaMediaEntry,
  KalturaUploadToken,
} from "kaltura-typescript-client/api/types";
import { KalturaMediaType } from "kaltura-typescript-client/api/types/KalturaMediaType";
import { createEntryForUpload } from "KalturaModule";
import * as React from "react";

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
  const onSubmit = async () => {
    const entry = await createEntryForUpload(
      kClient,
      {
        name: `${uploadResult.fileName} - ${new Date()}`,
        mediaType: mediaType,
        description: "This is a test upload video",
      },
      uploadResult.id
    );
    if (!entry) {
      throw new Error("Failed to create new Media Entry!");
    }
    console.log("FINAL RESULT");
    console.log(entry);

    onEntryCreated(entry);
  };

  return (
    <div id={`${idPrefix}_metadata`}>
      <strong>Asset metadata</strong>
      <p>This is the Metadata placeholder. Coming soon!</p>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
