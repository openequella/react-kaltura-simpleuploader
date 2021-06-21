import React from "react";
import "main.css";

export type HeadingProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Heading = (props: HeadingProps): JSX.Element => (
  <p className="ku-heading" {...props} />
);
