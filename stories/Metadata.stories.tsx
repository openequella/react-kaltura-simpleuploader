import { Meta, Story } from "@storybook/react";
import { Metadata, MetadataProps } from "Metadata";
import * as React from "react";

export default {
  title: "Metadata",
  component: Metadata,
  argTypes: {
    idPrefix: { defaultValue: "story" },
  },
} as Meta<MetadataProps>;

export const Init: Story<MetadataProps> = (args) => <Metadata {...args} />;
