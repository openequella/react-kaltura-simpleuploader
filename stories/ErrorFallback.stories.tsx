import { Meta, Story } from "@storybook/react";
import React from "react";
import { ErrorFallback, ErrorFallbackProps } from "../src/ErrorFallback";

export default {
  title: "Error Fallback",
  component: ErrorFallback,
} as Meta<ErrorFallbackProps>;

export const Basic: Story<ErrorFallbackProps> = (args) => (
  <ErrorFallback {...args} />
);
Basic.args = {
  error: new Error("This is a error for Storybook"),
};
