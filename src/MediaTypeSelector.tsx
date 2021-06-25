import { Heading } from "Heading";
import { MediaTypeOptions } from "KalturaModule";
import * as React from "react";
import "./main.css";

export interface MediaTypeSelectorProps {
  /**
   * A prefix to add to the DOM `id` for the root of this component.
   */
  idPrefix: string;
  /**
   * Called when the selection changes.
   */
  onChange: (newValue: MediaTypeOptions) => void;
  /**
   * A list of options to display.
   */
  options: {
    id: string;
    label: string;
    value: MediaTypeOptions;
  }[];
  /**
   * The value of the current selection.
   */
  value: MediaTypeOptions;
}

/**
 * Displays a list of media types allowing the user to select one.
 */
export const MediaTypeSelector = ({
  idPrefix,
  onChange,
  options,
  value,
}: MediaTypeSelectorProps): JSX.Element => {
  const mediaTypeSelectorId = `${idPrefix}_mts`;
  const inputId = (id: string): string => `${mediaTypeSelectorId}_${id}`;

  return (
    <div id={mediaTypeSelectorId}>
      <Heading>Media type</Heading>
      {options.map((option) => (
        <div key={option.id}>
          <input
            className="ku-margin-single"
            type="radio"
            id={inputId(option.id)}
            name="mediaType"
            value={option.id}
            checked={value === option.value}
            onChange={(event) => {
              if (event.target.checked) {
                onChange(option.value);
              }
            }}
          />
          <label htmlFor={inputId(option.id)}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};
