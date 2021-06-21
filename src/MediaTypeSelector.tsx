import { Heading } from "Heading";
import { MediaTypeOptions } from "KalturaModule";
import * as React from "react";

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
}: MediaTypeSelectorProps) => {
  const mediaTypeSelectorId = `${idPrefix}_mts`;
  return (
    <div id={mediaTypeSelectorId}>
      <Heading>Media Type</Heading>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="radio"
            id={`${mediaTypeSelectorId}_${option.id}`}
            name="mediaType"
            value={option.id}
            checked={value === option.value}
            onChange={(event) => {
              if (event.target.checked) {
                onChange(option.value);
              }
            }}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};
