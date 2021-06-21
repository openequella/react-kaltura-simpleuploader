import React from "react";
import "./spinner.css";

export const Spinner = (): JSX.Element => (
  <div className="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
);
