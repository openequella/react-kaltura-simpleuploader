import { Heading } from "Heading";
import React from "react";

export interface ErrorFallbackProps {
  error: Error;

  resetErrorBoundary: () => void;
}

/**
 * A fallback component to be used with error boundaries.
 */
export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => (
  <div role="alert">
    <Heading>Error</Heading>
    <div className="ku-grid-container">
      <div className="ku-grid-item">Something went wrong:</div>
      <div className="ku-grid-item ku-margin-single ku-message-block">
        <pre>{error.message}</pre>
      </div>
      <div className="ku-grid-item">
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  </div>
);
