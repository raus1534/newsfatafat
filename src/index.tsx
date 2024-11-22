import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { RotateCw } from "lucide-react";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="text-xl font-semibold text-red-600 dark:text-gray-100">
        Something Went Wrong:
      </p>
      <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        <pre>{error.message}</pre>
      </p>
      <button
        onClick={resetErrorBoundary}
        className="flex items-center justify-center px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <RotateCw className="w-6 h-6 mr-2" />
        <span className="ml-2 text-sm">Try Again</span>
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
