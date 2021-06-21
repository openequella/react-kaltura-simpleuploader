import { Meta, Story } from "@storybook/react";
import React from "react";
import { Spinner } from "../src/Spinner";

export default {
  title: "Spinner",
  component: Spinner,
} as Meta;

export const Basic: Story = () => <Spinner />;
