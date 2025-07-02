
import type { APIErrorResponse } from "@/types/index.types";

export function isAPIValidationError(error: unknown): error is APIErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    typeof (error as { status?: number; data?: unknown }).status === "number"
  );
}

