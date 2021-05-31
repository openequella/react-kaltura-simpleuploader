import { KalturaUploader, KalturaUploaderProps } from "../src/KalturaUploader";
import { Meta, Story } from "@storybook/react";
import * as React from "react";

export default {
  title: "KalturaUploader",
  component: KalturaUploader,
} as Meta<KalturaUploaderProps>;

export const Init: Story<KalturaUploaderProps> = (args) => (
  <KalturaUploader {...args} />
);
