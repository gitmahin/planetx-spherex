import type { createContainer } from "@/container";

export interface ApiResponseType {
  status: number;
  message: string;
  data?: unknown;
  success?: boolean;
}

export interface ApiErrorType {
  status: number;
  success?: boolean;
  message: string;
  stack?: string;
  errors?: any[];
}

export type ContainerType = ReturnType<typeof createContainer>;
