import { Meta, Story } from "@storybook/react";
import { KalturaUploader, KalturaUploaderProps } from "KalturaUploader";
import * as React from "react";

export default {
  title: "KalturaUploader",
  component: KalturaUploader,
} as Meta<KalturaUploaderProps>;

export const Init: Story<KalturaUploaderProps> = (args) => (
  <KalturaUploader {...args} />
);
Init.args = {
  endpoint: "https://www.kaltura.com/",
};
