import { KalturaClient } from "kaltura-typescript-client";
import {
  KalturaMediaEntry,
  KalturaUploadToken,
  KalturaUploadedFileTokenResource,
  MediaAddAction,
  MediaAddContentAction,
  UploadTokenAddAction,
  UploadTokenUploadAction,
} from "kaltura-typescript-client/api/types";

export type BasicEntryMetadata = Pick<
  KalturaMediaEntry,
  "name" | "description" | "mediaType" /*| "categoriesIds"*/
>;

/**
 * Creates a `KalturaClient` instance ready for use in all subsequent calls.
 *
 * @param endpoint The endpoint for the Kaltura API - e.g. https://www.kaltura.com/ for SaaS
 * @param ks A Kaltura Session ID
 * @param partnerId The partnerId associated with the account used to generate `ks`
 */
export const createClient = (
  endpoint: string,
  ks: string,
  partnerId: number
): KalturaClient =>
  new KalturaClient(
    {
      endpointUrl: endpoint,
      clientTag: "openequella_react-kaltura-simpleuploader",
    },
    { ks, partnerId }
  );

/**
 * Creates a `token` which is used for subsequent upload of files and later association of that
 * file with new Media entries.
 *
 * @param client a client from something like `createClient`
 */
export const createUploadToken = async (
  client: KalturaClient
): Promise<string | undefined> =>
  (await client.request<KalturaUploadToken>(new UploadTokenAddAction()))?.id;

/**
 * Uploads a file to Kaltura in the most simple way possible - i.e. using the default implementation
 * and not paying any specific information to chunking/resume etc.
 *
 * @param client a client from something like `createClient`
 * @param token a token returned from `createUploadToken`
 * @param file the file to be uploaded
 * @return a full `KalturaUploadToken` which contains the result of the upload operation from the
 *         Kaltura side. Or, `null` if the upload failed. The `id` in this should be used for
 *         subsequent operations to link the uploaded content to a Media entry.
 */
export const uploadFile = async (
  client: KalturaClient,
  token: string,
  file: File
): Promise<KalturaUploadToken | null> =>
  await client.request<KalturaUploadToken>(
    new UploadTokenUploadAction({
      uploadTokenId: token,
      fileData: file,
      resume: false,
      finalChunk: true,
      resumeAt: -1,
    })
  );

/**
 * Creates the Media Entry on Kaltura for a previously uploaded asset (e.g. video file).
 *
 * @param client a client from something like `createClient`
 * @param details The metadata to set for the new Entry (like title and description)
 * @param token The `id` from a `KalturaUploadToken` return from a previously successful upload
 */
export const createEntryForUpload = async (
  client: KalturaClient,
  details: BasicEntryMetadata,
  token: string
): Promise<KalturaMediaEntry | null> => {
  const entry = await client.request<KalturaMediaEntry>(
    new MediaAddAction({
      entry: new KalturaMediaEntry(details),
    })
  );
  if (!entry) {
    throw new Error("Failed to create new Kaltura Media Entry.");
  }

  return client.request<KalturaMediaEntry>(
    new MediaAddContentAction({
      entryId: entry.id,
      resource: new KalturaUploadedFileTokenResource({
        token: token,
      }),
    })
  );
};
