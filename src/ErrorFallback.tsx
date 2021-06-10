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
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);
