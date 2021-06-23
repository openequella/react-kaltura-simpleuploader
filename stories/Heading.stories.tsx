import { Meta, Story } from "@storybook/react";
import React from "react";
import { Heading, HeadingProps } from "../src/Heading";

export default {
  title: "Heading",
  component: Heading,
} as Meta<HeadingProps>;

export const Basic: Story<HeadingProps> = (args) => (
  <Heading {...args}>A Basic Heading</Heading>
);
