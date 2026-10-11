import { API_BASE_URL, PLANET_API_PREFIX } from "./config";

interface ApiEnvelope<T> {
  status?: number;
  statusCode?: number;
  code?: number;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${PLANET_API_PREFIX}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  let body: ApiEnvelope<T>;
  try {
    body = await res.json();
  } catch {
    throw new ApiError(res.status, "Invalid server response");
  }

  const status = body.status ?? body.statusCode ?? body.code ?? res.status;
  if (!res.ok || status >= 400) {
    throw new ApiError(status, body.message ?? "Request failed", body.data);
  }
  return body.data as T;
}
