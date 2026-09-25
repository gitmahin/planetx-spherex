import { type ApiResponseType } from "@repo/types";

/**
 * A standardized wrapper for all successful API responses.
 *
 * This class ensures that the frontend receives a predictable object
 * structure, making it easier to write global response interceptors.
 */
export class ApiResponse implements ApiResponseType {
  constructor(
    public status: number,
    public message: string,
    public data: unknown = null,
    public success: boolean = status < 400,
    public title: string = ""
  ) {
    this.status = status;
    this.title = title;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}
