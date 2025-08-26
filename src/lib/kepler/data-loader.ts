/**
 * Data loading utilities for ATRAI datasets
 * Provides enhanced error handling and loading state management
 */

/**
 * Gets a user-friendly error message for common error scenarios
 */
export function getErrorMessage(error: any): string {
  if (!error) return "Unknown error occurred";

  if (typeof error === "string") return error;

  if (error.status === 404) return "Dataset not found";
  if (error.status === 500) return "Server error occurred";
  if (error.status === 403) return "Access denied";
  if (error.status >= 400 && error.status < 500) return "Request failed";
  if (error.status >= 500) return "Server error";

  if (error.message) return error.message;

  return "Network error occurred";
}
