import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert" className="p-4 text-red-800 bg-red-100 rounded">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
      >
        Try again
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optional: Reset application state or perform cleanup
        console.log("Resetting error boundary...");
      }}
      onError={(error, info) => {
        // Optional: Log errors to an external service
        console.error("Logging error:", error, info);
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Optional for performance monitoring
reportWebVitals();
