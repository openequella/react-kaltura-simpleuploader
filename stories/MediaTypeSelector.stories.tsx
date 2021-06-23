import { Meta, Story } from "@storybook/react";
import * as React from "react";
import { MediaTypes } from "../src/KalturaModule";
import {
  MediaTypeSelector,
  MediaTypeSelectorProps,
} from "../src/MediaTypeSelector";

export default {
  title: "Media Type Selector",
  component: MediaTypeSelector,
  argTypes: {
    idPrefix: { defaultValue: "story" },
    onChange: { action: "onChange triggered" },
  },
} as Meta<MediaTypeSelectorProps>;

export const Basic: Story<MediaTypeSelectorProps> = (args) => (
  <MediaTypeSelector {...args} />
);
Basic.args = {
  options: [
    { id: "audio", label: "Audio", value: MediaTypes.audio },
    { id: "video", label: "Video", value: MediaTypes.video },
  ],
  value: MediaTypes.audio,
};
